import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || "0.0.0.0";
const githubToken = process.env.GITHUB_TOKEN || process.env.GITHUB_MODELS_TOKEN || "";
const githubModel = process.env.GITHUB_MODEL || "openai/gpt-4.1";
const githubApiVersion = process.env.GITHUB_MODELS_API_VERSION || "2026-03-10";
const maxBodyBytes = Number(process.env.MAX_BODY_BYTES || 16 * 1024);
const maxQuestionLength = Number(process.env.MAX_QUESTION_LENGTH || 600);
const aiTimeoutMs = Number(process.env.AI_TIMEOUT_MS || 15_000);
const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const rateLimitMaxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 20);
const rateLimits = new Map();

const securityHeaders = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    ...securityHeaders,
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

async function readRequestBody(request) {
  const chunks = [];
  let receivedBytes = 0;

  for await (const chunk of request) {
    receivedBytes += chunk.length;

    if (receivedBytes > maxBodyBytes) {
      const error = new Error("För stor förfrågan.");
      error.statusCode = 413;
      throw error;
    }

    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    const error = new Error("Ogiltig JSON.");
    error.statusCode = 400;
    throw error;
  }
}

function getClientIp(request) {
  return String(request.headers["x-forwarded-for"] || request.socket.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
}

function isRateLimited(request) {
  const now = Date.now();
  const clientIp = getClientIp(request);
  const current = rateLimits.get(clientIp);

  if (!current || now - current.startedAt > rateLimitWindowMs) {
    rateLimits.set(clientIp, { count: 1, startedAt: now });
    return false;
  }

  current.count += 1;
  return current.count > rateLimitMaxRequests;
}

function slimPhone(phone) {
  if (!phone) {
    return null;
  }

  return {
    model: phone.model,
    brand: phone.brand,
    price: phone.price,
    screen: phone.screen,
    mainCamera: phone.mainCamera,
    ultraWideCamera: phone.ultraWideCamera,
    teleCamera: phone.teleCamera,
    selfieCamera: phone.selfieCamera,
    video: phone.video,
    battery: phone.battery,
    storage: phone.storage,
    ram: phone.ram,
    processor: phone.processor,
    processorSeries: phone.processorSeries,
    performanceClass: phone.performanceClass,
    weight: phone.weight,
    charging: phone.charging,
    warranty: phone.warranty,
    rating: phone.rating,
    os: phone.os,
  };
}

async function handleAi(request, response) {
  let timeout;

  if (isRateLimited(request)) {
    sendJson(response, 429, { error: "För många frågor. Försök igen om en stund." });
    return;
  }

  if (!githubToken) {
    sendJson(response, 500, {
      error: "AI-servern är inte konfigurerad just nu.",
    });
    return;
  }

  try {
    const body = await readRequestBody(request);
    const question = String(body.question || "").trim();

    if (!question) {
      sendJson(response, 400, { error: "Skriv en fråga först." });
      return;
    }

    if (question.length > maxQuestionLength) {
      sendJson(response, 400, { error: "Frågan är för lång. Korta ner den och försök igen." });
      return;
    }

    const first = slimPhone(body.first);
    const second = slimPhone(body.second);
    const controller = new AbortController();
    timeout = setTimeout(() => controller.abort(), aiTimeoutMs);

    const githubResponse = await fetch(
      "https://models.github.ai/inference/chat/completions",
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${githubToken}`,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": githubApiVersion,
        },
        body: JSON.stringify({
          model: githubModel,
          messages: [
            {
              role: "system",
              content:
                "Du är en svensk telefonrådgivare på en jämförelsesida. Svara kort, tydligt och vänligt. Använd bara telefondata som skickas till dig. Säg att priser och specifikationer är exempeldata om användaren frågar om exakta köpbeslut, butikslager eller live-priser. Rekommendera utifrån användarens fråga och förklara med konkreta specs.",
            },
            {
              role: "user",
              content: JSON.stringify(
                {
                  question,
                  selectedPhones: { first, second },
                  score: body.score,
                },
                null,
                2,
              ),
            },
          ],
          max_tokens: 500,
          temperature: 0.4,
        }),
      },
    );

    clearTimeout(timeout);
    timeout = null;

    const aiResponse = await githubResponse.json().catch(() => ({}));

    if (!githubResponse.ok) {
      console.error("GitHub Models error", {
        status: githubResponse.status,
        message: aiResponse?.message || aiResponse?.error?.message,
      });
      sendJson(response, 502, { error: "AI-chatten kunde inte svara just nu." });
      return;
    }

    sendJson(response, 200, {
      answer:
        aiResponse?.choices?.[0]?.message?.content || "Jag kunde inte skapa ett svar just nu.",
    });
  } catch (error) {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (!error?.statusCode) {
      console.error("AI request failed", error);
    }

    sendJson(response, error?.statusCode || 500, {
      error: error?.statusCode ? error.message : "AI-servern fick ett okänt fel.",
    });
  }
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(process.cwd(), "dist", safePath);

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      ...securityHeaders,
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
    });
    response.end(file);
  } catch {
    const indexFile = await readFile(join(process.cwd(), "dist", "index.html"));
    response.writeHead(200, { ...securityHeaders, "Content-Type": mimeTypes[".html"] });
    response.end(indexFile);
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "POST" && url.pathname === "/api/ai") {
    await handleAi(request, response);
    return;
  }

  if (url.pathname.startsWith("/api/")) {
    sendJson(response, 405, { error: "Metoden stöds inte." });
    return;
  }

  if (request.method === "GET") {
    await serveStatic(request, response);
    return;
  }

  sendJson(response, 405, { error: "Metoden stöds inte." });
});

server.listen(port, host, () => {
  console.log(`API-server kör på http://${host}:${port}`);
});
