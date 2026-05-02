import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || "0.0.0.0";
const githubToken = process.env.GITHUB_TOKEN || process.env.GITHUB_MODELS_TOKEN || "";
const githubModel = process.env.GITHUB_MODEL || "openai/gpt-4.1";
const githubApiVersion = process.env.GITHUB_MODELS_API_VERSION || "2026-03-10";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

async function readRequestBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
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
  if (!githubToken) {
    sendJson(response, 500, {
      error:
        "GITHUB_TOKEN saknas. Skapa en GitHub-token med models:read, lägg den i .env och starta om API-servern.",
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

    const first = slimPhone(body.first);
    const second = slimPhone(body.second);

    const githubResponse = await fetch("https://models.github.ai/inference/chat/completions", {
      method: "POST",
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
    });

    const aiResponse = await githubResponse.json();

    if (!githubResponse.ok) {
      throw new Error(
        aiResponse?.message ||
          aiResponse?.error?.message ||
          `GitHub Models svarade med HTTP ${githubResponse.status}.`,
      );
    }

    sendJson(response, 200, {
      answer:
        aiResponse?.choices?.[0]?.message?.content || "Jag kunde inte skapa ett svar just nu.",
    });
  } catch (error) {
    sendJson(response, 500, {
      error: error?.message || "AI-servern fick ett okänt fel.",
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
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
    });
    response.end(file);
  } catch {
    const indexFile = await readFile(join(process.cwd(), "dist", "index.html"));
    response.writeHead(200, { "Content-Type": mimeTypes[".html"] });
    response.end(indexFile);
  }
}

const server = createServer(async (request, response) => {
  if (request.method === "POST" && request.url === "/api/ai") {
    await handleAi(request, response);
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
