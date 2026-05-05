import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Award, BatteryCharging, Check, Search, ShieldCheck, Smartphone } from "lucide-react";
import "./styles.css";

const phoneDefaults = {
  warranty: "2 år",
  os: "Android",
  ultraWideCamera: null,
  teleCamera: null,
  video: "4K",
};

function phone(data) {
  return {
    ...phoneDefaults,
    searchTags: "",
    ...data,
    mainCamera: data.mainCamera ?? data.camera ?? null,
  };
}

const phones = [
  phone({
    id: "iphone-se-2022",
    model: "iPhone SE (2022)",
    brand: "Apple",
    price: 4990,
    screen: 4.7,
    mainCamera: 12,
    selfieCamera: 7,
    battery: 2018,
    storage: 64,
    ram: 4,
    processor: "A15 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Mellan",
    weight: 144,
    charging: 20,
    warranty: "1 år",
    rating: 4.0,
    os: "iOS",
    searchTags: "se touch id liten",
  }),
  phone({
    id: "iphone-11",
    model: "iPhone 11",
    brand: "Apple",
    price: 5490,
    screen: 6.1,
    mainCamera: 12,
    ultraWideCamera: 12,
    selfieCamera: 12,
    battery: 3110,
    storage: 64,
    ram: 4,
    processor: "A13 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Mellan",
    weight: 194,
    charging: 18,
    warranty: "1 år",
    rating: 4.2,
    os: "iOS",
  }),
  phone({
    id: "iphone-12-mini",
    model: "iPhone 12 mini",
    brand: "Apple",
    price: 5990,
    screen: 5.4,
    mainCamera: 12,
    ultraWideCamera: 12,
    selfieCamera: 12,
    battery: 2227,
    storage: 64,
    ram: 4,
    processor: "A14 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Mellan",
    weight: 135,
    charging: 20,
    warranty: "1 år",
    rating: 4.2,
    os: "iOS",
    searchTags: "mini liten",
  }),
  phone({
    id: "iphone-12",
    model: "iPhone 12",
    brand: "Apple",
    price: 6490,
    screen: 6.1,
    mainCamera: 12,
    ultraWideCamera: 12,
    selfieCamera: 12,
    battery: 2815,
    storage: 64,
    ram: 4,
    processor: "A14 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Mellan",
    weight: 164,
    charging: 20,
    warranty: "1 år",
    rating: 4.3,
    os: "iOS",
  }),
  phone({
    id: "iphone-13-mini",
    model: "iPhone 13 mini",
    brand: "Apple",
    price: 6990,
    screen: 5.4,
    mainCamera: 12,
    ultraWideCamera: 12,
    selfieCamera: 12,
    battery: 2438,
    storage: 128,
    ram: 4,
    processor: "A15 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Mellan",
    weight: 141,
    charging: 20,
    warranty: "1 år",
    rating: 4.4,
    os: "iOS",
    searchTags: "mini liten",
  }),
  phone({
    id: "iphone-13",
    model: "iPhone 13",
    brand: "Apple",
    price: 7490,
    screen: 6.1,
    mainCamera: 12,
    ultraWideCamera: 12,
    selfieCamera: 12,
    battery: 3240,
    storage: 128,
    ram: 4,
    processor: "A15 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Mellan",
    weight: 174,
    charging: 20,
    warranty: "1 år",
    rating: 4.5,
    os: "iOS",
  }),
  phone({
    id: "iphone-13-pro",
    model: "iPhone 13 Pro",
    brand: "Apple",
    price: 8990,
    screen: 6.1,
    mainCamera: 12,
    ultraWideCamera: 12,
    teleCamera: 12,
    selfieCamera: 12,
    battery: 3095,
    storage: 128,
    ram: 6,
    processor: "A15 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Flaggskepp",
    weight: 204,
    charging: 23,
    warranty: "1 år",
    rating: 4.6,
    os: "iOS",
    searchTags: "pro tele",
  }),
  phone({
    id: "iphone-14",
    model: "iPhone 14",
    brand: "Apple",
    price: 8490,
    screen: 6.1,
    mainCamera: 12,
    ultraWideCamera: 12,
    selfieCamera: 12,
    battery: 3279,
    storage: 128,
    ram: 6,
    processor: "A15 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Mellan",
    weight: 172,
    charging: 20,
    warranty: "1 år",
    rating: 4.5,
    os: "iOS",
  }),
  phone({
    id: "iphone-14-plus",
    model: "iPhone 14 Plus",
    brand: "Apple",
    price: 9490,
    screen: 6.7,
    mainCamera: 12,
    ultraWideCamera: 12,
    selfieCamera: 12,
    battery: 4325,
    storage: 128,
    ram: 6,
    processor: "A15 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Mellan",
    weight: 203,
    charging: 20,
    warranty: "1 år",
    rating: 4.5,
    os: "iOS",
    searchTags: "plus stor",
  }),
  phone({
    id: "iphone-14-pro",
    model: "iPhone 14 Pro",
    brand: "Apple",
    price: 10990,
    screen: 6.1,
    mainCamera: 48,
    ultraWideCamera: 12,
    teleCamera: 12,
    selfieCamera: 12,
    battery: 3200,
    storage: 128,
    ram: 6,
    processor: "A16 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Flaggskepp",
    weight: 206,
    charging: 27,
    warranty: "1 år",
    rating: 4.7,
    os: "iOS",
    video: "4K ProRes",
    searchTags: "pro tele",
  }),
  phone({
    id: "iphone-14-pro-max",
    model: "iPhone 14 Pro Max",
    brand: "Apple",
    price: 11990,
    screen: 6.7,
    mainCamera: 48,
    ultraWideCamera: 12,
    teleCamera: 12,
    selfieCamera: 12,
    battery: 4323,
    storage: 128,
    ram: 6,
    processor: "A16 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Flaggskepp",
    weight: 240,
    charging: 27,
    warranty: "1 år",
    rating: 4.8,
    os: "iOS",
    video: "4K ProRes",
    searchTags: "pro max stor tele",
  }),
  phone({
    id: "iphone-15",
    model: "iPhone 15",
    brand: "Apple",
    price: 9990,
    screen: 6.1,
    mainCamera: 48,
    ultraWideCamera: 12,
    selfieCamera: 12,
    battery: 3349,
    storage: 128,
    ram: 6,
    processor: "A16 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Mellan",
    weight: 171,
    charging: 20,
    warranty: "1 år",
    rating: 4.6,
    os: "iOS",
  }),
  phone({
    id: "iphone-15-plus",
    model: "iPhone 15 Plus",
    brand: "Apple",
    price: 10990,
    screen: 6.7,
    mainCamera: 48,
    ultraWideCamera: 12,
    selfieCamera: 12,
    battery: 4383,
    storage: 128,
    ram: 6,
    processor: "A16 Bionic",
    processorSeries: "Apple A-serie",
    performanceClass: "Mellan",
    weight: 201,
    charging: 20,
    warranty: "1 år",
    rating: 4.6,
    os: "iOS",
    searchTags: "plus stor",
  }),
  phone({
    id: "iphone-15-pro",
    model: "iPhone 15 Pro",
    brand: "Apple",
    price: 13990,
    screen: 6.1,
    mainCamera: 48,
    ultraWideCamera: 12,
    teleCamera: 12,
    selfieCamera: 12,
    battery: 3274,
    storage: 128,
    ram: 8,
    processor: "A17 Pro",
    processorSeries: "Apple A-serie",
    performanceClass: "Flaggskepp",
    weight: 187,
    charging: 27,
    warranty: "1 år",
    rating: 4.8,
    os: "iOS",
    video: "4K ProRes",
    searchTags: "pro tele",
  }),
  phone({
    id: "iphone-15-pro-max",
    model: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 15490,
    screen: 6.7,
    mainCamera: 48,
    ultraWideCamera: 12,
    teleCamera: 12,
    selfieCamera: 12,
    battery: 4441,
    storage: 256,
    ram: 8,
    processor: "A17 Pro",
    processorSeries: "Apple A-serie",
    performanceClass: "Flaggskepp",
    weight: 221,
    charging: 27,
    warranty: "1 år",
    rating: 4.8,
    os: "iOS",
    video: "4K ProRes",
    searchTags: "pro max stor tele",
  }),
  phone({
    id: "iphone-16",
    model: "iPhone 16",
    brand: "Apple",
    price: 11490,
    screen: 6.1,
    mainCamera: 48,
    ultraWideCamera: 12,
    selfieCamera: 12,
    battery: 3561,
    storage: 128,
    ram: 8,
    processor: "A18",
    processorSeries: "Apple A-serie",
    performanceClass: "Flaggskepp",
    weight: 170,
    charging: 25,
    warranty: "1 år",
    rating: 4.7,
    os: "iOS",
  }),
  phone({
    id: "iphone-16-plus",
    model: "iPhone 16 Plus",
    brand: "Apple",
    price: 12490,
    screen: 6.7,
    mainCamera: 48,
    ultraWideCamera: 12,
    selfieCamera: 12,
    battery: 4674,
    storage: 128,
    ram: 8,
    processor: "A18",
    processorSeries: "Apple A-serie",
    performanceClass: "Flaggskepp",
    weight: 199,
    charging: 25,
    warranty: "1 år",
    rating: 4.7,
    os: "iOS",
    searchTags: "plus stor",
  }),
  phone({
    id: "iphone-16-pro",
    model: "iPhone 16 Pro",
    brand: "Apple",
    price: 14490,
    screen: 6.3,
    mainCamera: 48,
    ultraWideCamera: 48,
    teleCamera: 12,
    selfieCamera: 12,
    battery: 3582,
    storage: 128,
    ram: 8,
    processor: "A18 Pro",
    processorSeries: "Apple A-serie",
    performanceClass: "Flaggskepp",
    weight: 199,
    charging: 30,
    warranty: "1 år",
    rating: 4.8,
    os: "iOS",
    video: "4K ProRes",
    searchTags: "pro tele",
  }),
  phone({
    id: "iphone-16-pro-max",
    model: "iPhone 16 Pro Max",
    brand: "Apple",
    price: 16490,
    screen: 6.9,
    mainCamera: 48,
    ultraWideCamera: 48,
    teleCamera: 12,
    selfieCamera: 12,
    battery: 4685,
    storage: 256,
    ram: 8,
    processor: "A18 Pro",
    processorSeries: "Apple A-serie",
    performanceClass: "Flaggskepp",
    weight: 227,
    charging: 30,
    warranty: "1 år",
    rating: 4.9,
    os: "iOS",
    video: "4K ProRes",
    searchTags: "pro max stor tele",
  }),
  phone({
    id: "iphone-17",
    model: "iPhone 17",
    brand: "Apple",
    price: 11990,
    screen: 6.3,
    mainCamera: 48,
    ultraWideCamera: 48,
    selfieCamera: 18,
    battery: 3900,
    storage: 256,
    ram: 8,
    processor: "A19",
    processorSeries: "Apple A-serie",
    performanceClass: "Flaggskepp",
    weight: 177,
    charging: 40,
    warranty: "1 år",
    rating: 4.8,
    os: "iOS",
    video: "4K Dolby Vision",
    searchTags: "iphone 17 center stage ny apple",
  }),
  phone({
    id: "iphone-17-pro",
    model: "iPhone 17 Pro",
    brand: "Apple",
    price: 14990,
    screen: 6.3,
    mainCamera: 48,
    ultraWideCamera: 48,
    teleCamera: 48,
    selfieCamera: 18,
    battery: 4250,
    storage: 256,
    ram: 12,
    processor: "A19 Pro",
    processorSeries: "Apple A-serie",
    performanceClass: "Flaggskepp",
    weight: 206,
    charging: 40,
    warranty: "1 år",
    rating: 4.9,
    os: "iOS",
    video: "4K ProRes",
    searchTags: "iphone 17 pro tele center stage",
  }),
  phone({
    id: "iphone-17-pro-max",
    model: "iPhone 17 Pro Max",
    brand: "Apple",
    price: 16990,
    screen: 6.9,
    mainCamera: 48,
    ultraWideCamera: 48,
    teleCamera: 48,
    selfieCamera: 18,
    battery: 5000,
    storage: 256,
    ram: 12,
    processor: "A19 Pro",
    processorSeries: "Apple A-serie",
    performanceClass: "Flaggskepp",
    weight: 233,
    charging: 40,
    warranty: "1 år",
    rating: 4.9,
    os: "iOS",
    video: "4K ProRes",
    searchTags: "iphone 17 pro max stor tele center stage",
  }),
  phone({
    id: "pixel-6",
    model: "Pixel 6",
    brand: "Google",
    price: 4990,
    screen: 6.4,
    mainCamera: 50,
    ultraWideCamera: 12,
    selfieCamera: 8,
    battery: 4614,
    storage: 128,
    ram: 8,
    processor: "Google Tensor",
    processorSeries: "Google Tensor",
    performanceClass: "Mellan",
    weight: 207,
    charging: 30,
    rating: 4.2,
  }),
  phone({
    id: "pixel-6-pro",
    model: "Pixel 6 Pro",
    brand: "Google",
    price: 6490,
    screen: 6.7,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 48,
    selfieCamera: 11,
    battery: 5003,
    storage: 128,
    ram: 12,
    processor: "Google Tensor",
    processorSeries: "Google Tensor",
    performanceClass: "Flaggskepp",
    weight: 210,
    charging: 30,
    rating: 4.4,
    searchTags: "pro tele",
  }),
  phone({
    id: "pixel-6a",
    model: "Pixel 6a",
    brand: "Google",
    price: 3490,
    screen: 6.1,
    mainCamera: 12,
    ultraWideCamera: 12,
    selfieCamera: 8,
    battery: 4410,
    storage: 128,
    ram: 6,
    processor: "Google Tensor",
    processorSeries: "Google Tensor",
    performanceClass: "Bas",
    weight: 178,
    charging: 18,
    rating: 4.1,
    searchTags: "a billig",
  }),
  phone({
    id: "pixel-7",
    model: "Pixel 7",
    brand: "Google",
    price: 5990,
    screen: 6.3,
    mainCamera: 50,
    ultraWideCamera: 12,
    selfieCamera: 10.8,
    battery: 4355,
    storage: 128,
    ram: 8,
    processor: "Google Tensor G2",
    processorSeries: "Google Tensor",
    performanceClass: "Mellan",
    weight: 197,
    charging: 30,
    rating: 4.4,
  }),
  phone({
    id: "pixel-7-pro",
    model: "Pixel 7 Pro",
    brand: "Google",
    price: 7990,
    screen: 6.7,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 48,
    selfieCamera: 10.8,
    battery: 5000,
    storage: 128,
    ram: 12,
    processor: "Google Tensor G2",
    processorSeries: "Google Tensor",
    performanceClass: "Flaggskepp",
    weight: 212,
    charging: 30,
    rating: 4.6,
    searchTags: "pro tele",
  }),
  phone({
    id: "pixel-7a",
    model: "Pixel 7a",
    brand: "Google",
    price: 4490,
    screen: 6.1,
    mainCamera: 64,
    ultraWideCamera: 13,
    selfieCamera: 13,
    battery: 4385,
    storage: 128,
    ram: 8,
    processor: "Google Tensor G2",
    processorSeries: "Google Tensor",
    performanceClass: "Bas",
    weight: 194,
    charging: 18,
    rating: 4.3,
    searchTags: "a billig",
  }),
  phone({
    id: "pixel-fold",
    model: "Pixel Fold",
    brand: "Google",
    price: 14990,
    screen: 7.6,
    mainCamera: 48,
    ultraWideCamera: 10.8,
    teleCamera: 10.8,
    selfieCamera: 9.5,
    battery: 4821,
    storage: 256,
    ram: 12,
    processor: "Google Tensor G2",
    processorSeries: "Google Tensor",
    performanceClass: "Flaggskepp",
    weight: 283,
    charging: 30,
    rating: 4.2,
    searchTags: "fold vikbar tele",
  }),
  phone({
    id: "pixel-8",
    model: "Pixel 8",
    brand: "Google",
    price: 8490,
    screen: 6.2,
    mainCamera: 50,
    ultraWideCamera: 12,
    selfieCamera: 10.5,
    battery: 4575,
    storage: 128,
    ram: 8,
    processor: "Google Tensor G3",
    processorSeries: "Google Tensor",
    performanceClass: "Mellan",
    weight: 187,
    charging: 27,
    rating: 4.5,
  }),
  phone({
    id: "pixel-8-pro",
    model: "Pixel 8 Pro",
    brand: "Google",
    price: 10990,
    screen: 6.7,
    mainCamera: 50,
    ultraWideCamera: 48,
    teleCamera: 48,
    selfieCamera: 10.5,
    battery: 5050,
    storage: 128,
    ram: 12,
    processor: "Google Tensor G3",
    processorSeries: "Google Tensor",
    performanceClass: "Flaggskepp",
    weight: 213,
    charging: 30,
    rating: 4.7,
    searchTags: "pro tele",
  }),
  phone({
    id: "pixel-8a",
    model: "Pixel 8a",
    brand: "Google",
    price: 5490,
    screen: 6.1,
    mainCamera: 64,
    ultraWideCamera: 13,
    selfieCamera: 13,
    battery: 4492,
    storage: 128,
    ram: 8,
    processor: "Google Tensor G3",
    processorSeries: "Google Tensor",
    performanceClass: "Bas",
    weight: 188,
    charging: 18,
    rating: 4.4,
    searchTags: "a billig",
  }),
  phone({
    id: "pixel-9",
    model: "Pixel 9",
    brand: "Google",
    price: 9990,
    screen: 6.3,
    mainCamera: 50,
    ultraWideCamera: 48,
    selfieCamera: 10.5,
    battery: 4700,
    storage: 128,
    ram: 12,
    processor: "Google Tensor G4",
    processorSeries: "Google Tensor",
    performanceClass: "Flaggskepp",
    weight: 198,
    charging: 27,
    rating: 4.6,
  }),
  phone({
    id: "pixel-9-pro",
    model: "Pixel 9 Pro",
    brand: "Google",
    price: 11990,
    screen: 6.3,
    mainCamera: 50,
    ultraWideCamera: 48,
    teleCamera: 48,
    selfieCamera: 42,
    battery: 4700,
    storage: 128,
    ram: 16,
    processor: "Google Tensor G4",
    processorSeries: "Google Tensor",
    performanceClass: "Flaggskepp",
    weight: 199,
    charging: 27,
    rating: 4.8,
    video: "8K",
    searchTags: "pro tele",
  }),
  phone({
    id: "pixel-9-pro-xl",
    model: "Pixel 9 Pro XL",
    brand: "Google",
    price: 13490,
    screen: 6.8,
    mainCamera: 50,
    ultraWideCamera: 48,
    teleCamera: 48,
    selfieCamera: 42,
    battery: 5060,
    storage: 128,
    ram: 16,
    processor: "Google Tensor G4",
    processorSeries: "Google Tensor",
    performanceClass: "Flaggskepp",
    weight: 221,
    charging: 37,
    rating: 4.8,
    video: "8K",
    searchTags: "pro xl stor tele",
  }),
  phone({
    id: "pixel-9-pro-fold",
    model: "Pixel 9 Pro Fold",
    brand: "Google",
    price: 18990,
    screen: 8,
    mainCamera: 48,
    ultraWideCamera: 10.5,
    teleCamera: 10.8,
    selfieCamera: 10,
    battery: 4650,
    storage: 256,
    ram: 16,
    processor: "Google Tensor G4",
    processorSeries: "Google Tensor",
    performanceClass: "Flaggskepp",
    weight: 257,
    charging: 21,
    rating: 4.5,
    searchTags: "fold vikbar pro tele",
  }),
  phone({
    id: "pixel-9a",
    model: "Pixel 9a",
    brand: "Google",
    price: 6490,
    screen: 6.3,
    mainCamera: 48,
    ultraWideCamera: 13,
    selfieCamera: 13,
    battery: 5100,
    storage: 128,
    ram: 8,
    processor: "Google Tensor G4",
    processorSeries: "Google Tensor",
    performanceClass: "Bas",
    weight: 186,
    charging: 23,
    rating: 4.4,
    searchTags: "a billig",
  }),
  phone({
    id: "pixel-10",
    model: "Pixel 10",
    brand: "Google",
    price: 10490,
    screen: 6.3,
    mainCamera: 50,
    ultraWideCamera: 48,
    selfieCamera: 10.5,
    battery: 4970,
    storage: 128,
    ram: 12,
    processor: "Google Tensor G5",
    processorSeries: "Google Tensor",
    performanceClass: "Flaggskepp",
    weight: 204,
    charging: 30,
    rating: 4.7,
  }),
  phone({
    id: "pixel-10-pro",
    model: "Pixel 10 Pro",
    brand: "Google",
    price: 12490,
    screen: 6.3,
    mainCamera: 50,
    ultraWideCamera: 48,
    teleCamera: 48,
    selfieCamera: 42,
    battery: 4870,
    storage: 128,
    ram: 16,
    processor: "Google Tensor G5",
    processorSeries: "Google Tensor",
    performanceClass: "Flaggskepp",
    weight: 207,
    charging: 30,
    rating: 4.8,
    video: "8K",
    searchTags: "pro tele",
  }),
  phone({
    id: "pixel-10-pro-xl",
    model: "Pixel 10 Pro XL",
    brand: "Google",
    price: 13990,
    screen: 6.8,
    mainCamera: 50,
    ultraWideCamera: 48,
    teleCamera: 48,
    selfieCamera: 42,
    battery: 5200,
    storage: 256,
    ram: 16,
    processor: "Google Tensor G5",
    processorSeries: "Google Tensor",
    performanceClass: "Flaggskepp",
    weight: 224,
    charging: 45,
    rating: 4.9,
    video: "8K",
    searchTags: "pro xl stor tele",
  }),
  phone({
    id: "pixel-10-pro-fold",
    model: "Pixel 10 Pro Fold",
    brand: "Google",
    price: 19990,
    screen: 8,
    mainCamera: 48,
    ultraWideCamera: 10.5,
    teleCamera: 10.8,
    selfieCamera: 10,
    battery: 5015,
    storage: 256,
    ram: 16,
    processor: "Google Tensor G5",
    processorSeries: "Google Tensor",
    performanceClass: "Flaggskepp",
    weight: 258,
    charging: 30,
    rating: 4.6,
    searchTags: "fold vikbar pro tele",
  }),
  phone({
    id: "samsung-s21",
    model: "Galaxy S21",
    brand: "Samsung",
    price: 5490,
    screen: 6.2,
    mainCamera: 12,
    ultraWideCamera: 12,
    teleCamera: 64,
    selfieCamera: 10,
    battery: 4000,
    storage: 128,
    ram: 8,
    processor: "Exynos 2100",
    processorSeries: "Exynos",
    performanceClass: "Mellan",
    weight: 169,
    charging: 25,
    rating: 4.3,
    video: "8K",
    searchTags: "s serie tele",
  }),
  phone({
    id: "samsung-s21-ultra",
    model: "Galaxy S21 Ultra",
    brand: "Samsung",
    price: 7990,
    screen: 6.8,
    mainCamera: 108,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 40,
    battery: 5000,
    storage: 128,
    ram: 12,
    processor: "Exynos 2100",
    processorSeries: "Exynos",
    performanceClass: "Flaggskepp",
    weight: 227,
    charging: 25,
    rating: 4.6,
    video: "8K",
    searchTags: "s serie ultra tele periskop",
  }),
  phone({
    id: "samsung-s22",
    model: "Galaxy S22",
    brand: "Samsung",
    price: 6490,
    screen: 6.1,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 10,
    battery: 3700,
    storage: 128,
    ram: 8,
    processor: "Exynos 2200",
    processorSeries: "Exynos",
    performanceClass: "Mellan",
    weight: 167,
    charging: 25,
    rating: 4.3,
    video: "8K",
    searchTags: "s serie tele",
  }),
  phone({
    id: "samsung-s22-ultra",
    model: "Galaxy S22 Ultra",
    brand: "Samsung",
    price: 9490,
    screen: 6.8,
    mainCamera: 108,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 40,
    battery: 5000,
    storage: 128,
    ram: 8,
    processor: "Exynos 2200",
    processorSeries: "Exynos",
    performanceClass: "Flaggskepp",
    weight: 228,
    charging: 45,
    rating: 4.6,
    video: "8K",
    searchTags: "s serie ultra tele periskop",
  }),
  phone({
    id: "samsung-s23",
    model: "Galaxy S23",
    brand: "Samsung",
    price: 7490,
    screen: 6.1,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 12,
    battery: 3900,
    storage: 128,
    ram: 8,
    processor: "Snapdragon 8 Gen 2",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 168,
    charging: 25,
    rating: 4.5,
    video: "8K",
    searchTags: "s serie tele",
  }),
  phone({
    id: "samsung-s23-plus",
    model: "Galaxy S23+",
    brand: "Samsung",
    price: 8990,
    screen: 6.6,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 12,
    battery: 4700,
    storage: 256,
    ram: 8,
    processor: "Snapdragon 8 Gen 2",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 196,
    charging: 45,
    rating: 4.6,
    video: "8K",
    searchTags: "s serie plus stor tele",
  }),
  phone({
    id: "samsung-s23-ultra",
    model: "Galaxy S23 Ultra",
    brand: "Samsung",
    price: 11990,
    screen: 6.8,
    mainCamera: 200,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 12,
    battery: 5000,
    storage: 256,
    ram: 8,
    processor: "Snapdragon 8 Gen 2",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 234,
    charging: 45,
    rating: 4.7,
    video: "8K",
    searchTags: "s serie ultra tele periskop",
  }),
  phone({
    id: "samsung-s23-fe",
    model: "Galaxy S23 FE",
    brand: "Samsung",
    price: 5990,
    screen: 6.4,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 8,
    selfieCamera: 10,
    battery: 4500,
    storage: 128,
    ram: 8,
    processor: "Exynos 2200",
    processorSeries: "Exynos",
    performanceClass: "Mellan",
    weight: 209,
    charging: 25,
    rating: 4.3,
    video: "8K",
    searchTags: "fe fan edition tele",
  }),
  phone({
    id: "samsung-s24",
    model: "Galaxy S24",
    brand: "Samsung",
    price: 9490,
    screen: 6.2,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 12,
    battery: 4000,
    storage: 128,
    ram: 8,
    processor: "Exynos 2400",
    processorSeries: "Exynos",
    performanceClass: "Flaggskepp",
    weight: 167,
    charging: 25,
    rating: 4.5,
    video: "8K",
    searchTags: "s serie tele",
  }),
  phone({
    id: "samsung-s24-plus",
    model: "Galaxy S24+",
    brand: "Samsung",
    price: 11490,
    screen: 6.7,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 12,
    battery: 4900,
    storage: 256,
    ram: 12,
    processor: "Exynos 2400",
    processorSeries: "Exynos",
    performanceClass: "Flaggskepp",
    weight: 196,
    charging: 45,
    rating: 4.6,
    video: "8K",
    searchTags: "s serie plus stor tele",
  }),
  phone({
    id: "samsung-s24-ultra",
    model: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 15990,
    screen: 6.8,
    mainCamera: 200,
    ultraWideCamera: 12,
    teleCamera: 50,
    selfieCamera: 12,
    battery: 5000,
    storage: 256,
    ram: 12,
    processor: "Snapdragon 8 Gen 3",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 232,
    charging: 45,
    rating: 4.8,
    video: "8K",
    searchTags: "s serie ultra tele periskop",
  }),
  phone({
    id: "samsung-s24-fe",
    model: "Galaxy S24 FE",
    brand: "Samsung",
    price: 7490,
    screen: 6.7,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 8,
    selfieCamera: 10,
    battery: 4700,
    storage: 128,
    ram: 8,
    processor: "Exynos 2400e",
    processorSeries: "Exynos",
    performanceClass: "Mellan",
    weight: 213,
    charging: 25,
    rating: 4.4,
    video: "8K",
    searchTags: "fe fan edition tele",
  }),
  phone({
    id: "samsung-s25",
    model: "Galaxy S25",
    brand: "Samsung",
    price: 10490,
    screen: 6.2,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 12,
    battery: 4000,
    storage: 128,
    ram: 12,
    processor: "Snapdragon 8 Elite",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 162,
    charging: 25,
    rating: 4.6,
    video: "8K",
    searchTags: "s serie tele",
  }),
  phone({
    id: "samsung-s25-plus",
    model: "Galaxy S25+",
    brand: "Samsung",
    price: 12490,
    screen: 6.7,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 12,
    battery: 4900,
    storage: 256,
    ram: 12,
    processor: "Snapdragon 8 Elite",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 190,
    charging: 45,
    rating: 4.7,
    video: "8K",
    searchTags: "s serie plus stor tele",
  }),
  phone({
    id: "samsung-s25-ultra",
    model: "Galaxy S25 Ultra",
    brand: "Samsung",
    price: 16490,
    screen: 6.9,
    mainCamera: 200,
    ultraWideCamera: 50,
    teleCamera: 50,
    selfieCamera: 12,
    battery: 5000,
    storage: 256,
    ram: 12,
    processor: "Snapdragon 8 Elite",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 218,
    charging: 45,
    rating: 4.8,
    video: "8K",
    searchTags: "s serie ultra tele periskop",
  }),
  phone({
    id: "samsung-s26",
    model: "Galaxy S26",
    brand: "Samsung",
    price: 11490,
    screen: 6.3,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 12,
    battery: 4300,
    storage: 256,
    ram: 12,
    processor: "Snapdragon 8 Elite Gen 5",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 164,
    charging: 25,
    rating: 4.7,
    video: "8K",
    searchTags: "s serie tele",
  }),
  phone({
    id: "samsung-s26-plus",
    model: "Galaxy S26+",
    brand: "Samsung",
    price: 13490,
    screen: 6.7,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 12,
    battery: 5000,
    storage: 256,
    ram: 12,
    processor: "Snapdragon 8 Elite Gen 5",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 192,
    charging: 45,
    rating: 4.8,
    video: "8K",
    searchTags: "s serie plus stor tele",
  }),
  phone({
    id: "samsung-s26-ultra",
    model: "Galaxy S26 Ultra",
    brand: "Samsung",
    price: 17490,
    screen: 6.9,
    mainCamera: 200,
    ultraWideCamera: 50,
    teleCamera: 50,
    selfieCamera: 12,
    battery: 5200,
    storage: 256,
    ram: 12,
    processor: "Snapdragon 8 Elite Gen 5",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 220,
    charging: 45,
    rating: 4.9,
    video: "8K",
    searchTags: "s serie ultra tele periskop",
  }),
  phone({
    id: "samsung-a15",
    model: "Galaxy A15",
    brand: "Samsung",
    price: 2190,
    screen: 6.5,
    mainCamera: 50,
    ultraWideCamera: 5,
    selfieCamera: 13,
    battery: 5000,
    storage: 128,
    ram: 4,
    processor: "MediaTek Helio G99",
    processorSeries: "MediaTek",
    performanceClass: "Bas",
    weight: 200,
    charging: 25,
    rating: 4.0,
    searchTags: "a serie billig",
  }),
  phone({
    id: "samsung-a25",
    model: "Galaxy A25",
    brand: "Samsung",
    price: 3290,
    screen: 6.5,
    mainCamera: 50,
    ultraWideCamera: 8,
    selfieCamera: 13,
    battery: 5000,
    storage: 128,
    ram: 6,
    processor: "Exynos 1280",
    processorSeries: "Exynos",
    performanceClass: "Bas",
    weight: 197,
    charging: 25,
    rating: 4.1,
    searchTags: "a serie billig",
  }),
  phone({
    id: "samsung-a35",
    model: "Galaxy A35",
    brand: "Samsung",
    price: 3990,
    screen: 6.6,
    mainCamera: 50,
    ultraWideCamera: 8,
    selfieCamera: 13,
    battery: 5000,
    storage: 128,
    ram: 6,
    processor: "Exynos 1380",
    processorSeries: "Exynos",
    performanceClass: "Bas",
    weight: 209,
    charging: 25,
    rating: 4.2,
    searchTags: "a serie billig",
  }),
  phone({
    id: "samsung-a55",
    model: "Galaxy A55",
    brand: "Samsung",
    price: 4990,
    screen: 6.6,
    mainCamera: 50,
    ultraWideCamera: 12,
    selfieCamera: 32,
    battery: 5000,
    storage: 128,
    ram: 8,
    processor: "Exynos 1480",
    processorSeries: "Exynos",
    performanceClass: "Mellan",
    weight: 213,
    charging: 25,
    rating: 4.3,
    searchTags: "a serie",
  }),
  phone({
    id: "samsung-a56",
    model: "Galaxy A56",
    brand: "Samsung",
    price: 5490,
    screen: 6.7,
    mainCamera: 50,
    ultraWideCamera: 12,
    selfieCamera: 12,
    battery: 5000,
    storage: 128,
    ram: 8,
    processor: "Exynos 1580",
    processorSeries: "Exynos",
    performanceClass: "Mellan",
    weight: 198,
    charging: 45,
    rating: 4.4,
    searchTags: "a serie",
  }),
  phone({
    id: "samsung-z-flip5",
    model: "Galaxy Z Flip5",
    brand: "Samsung",
    price: 8990,
    screen: 6.7,
    mainCamera: 12,
    ultraWideCamera: 12,
    selfieCamera: 10,
    battery: 3700,
    storage: 256,
    ram: 8,
    processor: "Snapdragon 8 Gen 2",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 187,
    charging: 25,
    rating: 4.4,
    video: "4K",
    searchTags: "z flip vikbar",
  }),
  phone({
    id: "samsung-z-fold5",
    model: "Galaxy Z Fold5",
    brand: "Samsung",
    price: 15990,
    screen: 7.6,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 10,
    battery: 4400,
    storage: 256,
    ram: 12,
    processor: "Snapdragon 8 Gen 2",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 253,
    charging: 25,
    rating: 4.5,
    video: "8K",
    searchTags: "z fold vikbar tele",
  }),
  phone({
    id: "samsung-z-flip6",
    model: "Galaxy Z Flip6",
    brand: "Samsung",
    price: 11990,
    screen: 6.7,
    mainCamera: 50,
    ultraWideCamera: 12,
    selfieCamera: 10,
    battery: 4000,
    storage: 256,
    ram: 12,
    processor: "Snapdragon 8 Gen 3",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 187,
    charging: 25,
    rating: 4.5,
    video: "4K",
    searchTags: "z flip vikbar",
  }),
  phone({
    id: "samsung-z-fold6",
    model: "Galaxy Z Fold6",
    brand: "Samsung",
    price: 18990,
    screen: 7.6,
    mainCamera: 50,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 10,
    battery: 4400,
    storage: 256,
    ram: 12,
    processor: "Snapdragon 8 Gen 3",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 239,
    charging: 25,
    rating: 4.6,
    video: "8K",
    searchTags: "z fold vikbar tele",
  }),
  phone({
    id: "samsung-z-flip7",
    model: "Galaxy Z Flip7",
    brand: "Samsung",
    price: 12990,
    screen: 6.9,
    mainCamera: 50,
    ultraWideCamera: 12,
    selfieCamera: 10,
    battery: 4300,
    storage: 256,
    ram: 12,
    processor: "Exynos 2500",
    processorSeries: "Exynos",
    performanceClass: "Flaggskepp",
    weight: 188,
    charging: 25,
    rating: 4.6,
    video: "4K",
    searchTags: "z flip vikbar",
  }),
  phone({
    id: "samsung-z-fold7",
    model: "Galaxy Z Fold7",
    brand: "Samsung",
    price: 19990,
    screen: 8,
    mainCamera: 200,
    ultraWideCamera: 12,
    teleCamera: 10,
    selfieCamera: 10,
    battery: 4400,
    storage: 256,
    ram: 12,
    processor: "Snapdragon 8 Elite",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 215,
    charging: 25,
    rating: 4.7,
    video: "8K",
    searchTags: "z fold vikbar tele",
  }),
  phone({
    id: "oneplus-12",
    model: "OnePlus 12",
    brand: "OnePlus",
    price: 10990,
    screen: 6.82,
    mainCamera: 50,
    ultraWideCamera: 48,
    teleCamera: 64,
    selfieCamera: 32,
    battery: 5400,
    storage: 256,
    ram: 12,
    processor: "Snapdragon 8 Gen 3",
    processorSeries: "Snapdragon",
    performanceClass: "Flaggskepp",
    weight: 220,
    charging: 100,
    rating: 4.6,
    video: "8K",
    searchTags: "hasselblad tele",
  }),
];

const comparisonRows = [
  { key: "brand", label: "Märke", suffix: "", type: "text" },
  { key: "os", label: "Operativsystem", suffix: "", type: "text" },
  { key: "price", label: "Pris", suffix: " kr", type: "number", better: "lower" },
  { key: "screen", label: "Skärm", suffix: '"', type: "number", better: "higher" },
  { key: "mainCamera", label: "Huvudkamera", suffix: " MP", type: "number", better: "higher" },
  { key: "ultraWideCamera", label: "Ultravidvinkel", suffix: " MP", type: "number", better: "higher" },
  { key: "teleCamera", label: "Tele/periskop", suffix: " MP", type: "number", better: "higher" },
  { key: "selfieCamera", label: "Selfiekamera", suffix: " MP", type: "number", better: "higher" },
  { key: "video", label: "Video", suffix: "", type: "text" },
  { key: "battery", label: "Batteri", suffix: " mAh", type: "number", better: "higher" },
  { key: "storage", label: "Lagring", suffix: " GB", type: "number", better: "higher" },
  { key: "ram", label: "RAM", suffix: " GB", type: "number", better: "higher" },
  { key: "processor", label: "Processor", suffix: "", type: "text" },
  { key: "processorSeries", label: "Processorserie", suffix: "", type: "text" },
  { key: "performanceClass", label: "Prestandaklass", suffix: "", type: "text" },
  { key: "weight", label: "Vikt", suffix: " g", type: "number", better: "lower" },
  { key: "charging", label: "Laddning", suffix: " W", type: "number", better: "higher" },
  { key: "warranty", label: "Garanti", suffix: "", type: "text" },
  { key: "rating", label: "Betyg", suffix: "/5", type: "number", better: "higher" },
];

const scoringRules = [
  { key: "price", better: "lower" },
  { key: "battery", better: "higher" },
  { key: "mainCamera", better: "higher" },
  { key: "selfieCamera", better: "higher" },
  { key: "storage", better: "higher" },
  { key: "ram", better: "higher" },
  { key: "rating", better: "higher" },
];

const featuredPhoneIds = [
  "iphone-17",
  "iphone-17-pro",
  "iphone-17-pro-max",
  "pixel-9",
  "pixel-9-pro",
  "pixel-9-pro-xl",
  "pixel-10",
  "pixel-10-pro",
  "pixel-10-pro-xl",
  "samsung-s26",
  "samsung-s26-ultra",
  "samsung-z-fold7",
];

function formatValue(value, suffix = "") {
  if (value === undefined || value === null || value === "") {
    return "-";
  }

  if (typeof value === "number") {
    return `${value.toLocaleString("sv-SE")}${suffix}`;
  }

  return `${value}${suffix}`;
}

function getNumericValue(phoneToRead, key) {
  const value = Number(phoneToRead?.[key]);
  return Number.isFinite(value) ? value : null;
}

function getWinnerForRow(first, second, row) {
  if (!first || !second || row.type !== "number" || !row.better) {
    return "none";
  }

  const left = getNumericValue(first, row.key);
  const right = getNumericValue(second, row.key);

  if (left === null || right === null || left === right) {
    return "tie";
  }

  if (row.better === "lower") {
    return left < right ? "left" : "right";
  }

  return left > right ? "left" : "right";
}

function calculateScore(first, second) {
  if (!first || !second) {
    return { left: 0, right: 0 };
  }

  return scoringRules.reduce(
    (score, rule) => {
      const left = getNumericValue(first, rule.key);
      const right = getNumericValue(second, rule.key);

      if (left === null || right === null || left === right) {
        return score;
      }

      const leftWins = rule.better === "lower" ? left < right : left > right;
      return {
        ...score,
        [leftWins ? "left" : "right"]: score[leftWins ? "left" : "right"] + 1,
      };
    },
    { left: 0, right: 0 },
  );
}

function chooseByNumber(first, second, key, better = "higher") {
  const left = getNumericValue(first, key);
  const right = getNumericValue(second, key);

  if (left === null || right === null) {
    return null;
  }

  if (left === right) {
    return { winner: null, left, right };
  }

  const leftWins = better === "lower" ? left < right : left > right;
  return { winner: leftWins ? first : second, left, right };
}

function describeChoice(result, first, second, label, suffix = "", reason = "") {
  if (!result) {
    return `Jag saknar tillräcklig data för ${label.toLowerCase()} på en av telefonerna. Kolla tabellen för resten av jämförelsen.`;
  }

  if (!result.winner) {
    return `${first.model} och ${second.model} är lika på ${label.toLowerCase()}: ${formatValue(
      result.left,
      suffix,
    )}. ${reason}`;
  }

  const loser = result.winner.id === first.id ? second : first;
  const winnerValue = result.winner.id === first.id ? result.left : result.right;
  const loserValue = result.winner.id === first.id ? result.right : result.left;

  return `${result.winner.model} är starkare på ${label.toLowerCase()} med ${formatValue(
    winnerValue,
    suffix,
  )}, jämfört med ${loser.model} som har ${formatValue(loserValue, suffix)}. ${reason}`;
}

function performanceRank(phoneToRank) {
  const classScore = {
    Bas: 1,
    Mellan: 2,
    Flaggskepp: 3,
  };

  return (classScore[phoneToRank?.performanceClass] ?? 0) * 100 + (phoneToRank?.ram ?? 0);
}

function getLocalAiAnswer(question, first, second, score) {
  const normalized = question.trim().toLowerCase();

  if (!normalized) {
    return "Skriv en fråga först, till exempel: vilken har bäst kamera, batteri, pris eller spelprestanda?";
  }

  if (!first || !second) {
    return "Välj två telefoner först, så kan jag jämföra dem utifrån appens exempeldata.";
  }

  if (normalized.includes("selfie") || normalized.includes("frontkamera")) {
    return describeChoice(
      chooseByNumber(first, second, "selfieCamera"),
      first,
      second,
      "selfiekamera",
      " MP",
      "Det är extra viktigt för videosamtal, TikTok och bilder med framkameran.",
    );
  }

  if (normalized.includes("kamera") || normalized.includes("foto") || normalized.includes("bild")) {
    const main = chooseByNumber(first, second, "mainCamera");
    const selfie = chooseByNumber(first, second, "selfieCamera");
    const tele = chooseByNumber(first, second, "teleCamera");
    const base = describeChoice(
      main,
      first,
      second,
      "huvudkamera",
      " MP",
      "Jag tittar också på selfie och telekamera när det finns data.",
    );
    const selfieText = selfie?.winner ? ` Selfie: ${selfie.winner.model} har starkare framkamera.` : "";
    const teleText = tele?.winner ? ` Zoom/tele: ${tele.winner.model} har bättre telekamera.` : "";
    return `${base}${selfieText}${teleText}`;
  }

  if (normalized.includes("batteri") || normalized.includes("ladd")) {
    return describeChoice(
      chooseByNumber(first, second, "battery"),
      first,
      second,
      "batteri",
      " mAh",
      "Högre mAh brukar betyda bättre uthållighet, men riktig batteritid påverkas också av skärm och processor.",
    );
  }

  if (
    normalized.includes("spel") ||
    normalized.includes("gaming") ||
    normalized.includes("processor") ||
    normalized.includes("prestanda") ||
    normalized.includes("snabb")
  ) {
    const leftRank = performanceRank(first);
    const rightRank = performanceRank(second);

    if (leftRank === rightRank) {
      return `${first.model} och ${second.model} är nära varandra för spel. ${first.model} har ${first.processor} och ${first.ram} GB RAM, medan ${second.model} har ${second.processor} och ${second.ram} GB RAM.`;
    }

    const winner = leftRank > rightRank ? first : second;
    const loser = winner.id === first.id ? second : first;
    return `${winner.model} ser bäst ut för spel och prestanda. Den har ${winner.processor}, ${winner.ram} GB RAM och prestandaklass ${winner.performanceClass}. ${loser.model} har ${loser.processor}, ${loser.ram} GB RAM och klass ${loser.performanceClass}.`;
  }

  if (normalized.includes("pris") || normalized.includes("billig") || normalized.includes("kost")) {
    return describeChoice(
      chooseByNumber(first, second, "price", "lower"),
      first,
      second,
      "pris",
      " kr",
      "Lägre pris vinner här, men jämför gärna med batteri och kamera innan du bestämmer dig.",
    );
  }

  if (normalized.includes("lagring") || normalized.includes("minne")) {
    return describeChoice(
      chooseByNumber(first, second, "storage"),
      first,
      second,
      "lagring",
      " GB",
      "Mer lagring är bra om du sparar många bilder, videos och appar.",
    );
  }

  if (normalized.includes("bäst") || normalized.includes("rekommendera") || normalized.includes("välja")) {
    const winner = score.left === score.right ? null : score.left > score.right ? first : second;
    if (!winner) {
      return `Det är väldigt jämnt mellan ${first.model} och ${second.model}. Välj efter det du bryr dig mest om: kamera, batteri, pris eller spel.`;
    }
    return `Mitt enkla råd är ${winner.model}. Den vinner fler kategorier i appens poängsystem: pris, batteri, huvudkamera, selfiekamera, lagring, RAM och betyg.`;
  }

  return `Jag är en enkel lokal AI-guide. Fråga gärna om kamera, selfie, batteri, spel, processor, pris eller lagring så jämför jag ${first.model} och ${second.model}.`;
}

function getSearchText(phoneToSearch) {
  return [
    phoneToSearch.brand,
    phoneToSearch.model,
    phoneToSearch.os,
    phoneToSearch.processor,
    phoneToSearch.processorSeries,
    phoneToSearch.performanceClass,
    phoneToSearch.searchTags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function LocalAiGuide({ first, second, score }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Fråga den riktiga AI:n om kamera, selfie, batteri, spel, processor, pris eller lagring.",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("checking");
  const [error, setError] = useState("");
  const isAuthenticated = authStatus === "authenticated";

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const response = await fetch("/.auth/me", { credentials: "include" });
        const data = response.ok ? await response.json() : [];
        const hasUser = Array.isArray(data) ? data.length > 0 : Boolean(data?.clientPrincipal);

        if (isMounted) {
          setAuthStatus(hasUser ? "authenticated" : "unauthenticated");
        }
      } catch {
        if (isMounted) {
          setAuthStatus("unauthenticated");
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  function redirectToLogin(loginUrl = "/.auth/login/google") {
    const redirectUrl = `${loginUrl}?post_login_redirect_uri=${encodeURIComponent(
      window.location.pathname + window.location.search,
    )}`;
    window.location.assign(redirectUrl);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isAuthenticated) {
      redirectToLogin();
      return;
    }

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setError("Skriv en fråga först.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmedQuestion,
          first,
          second,
          score,
        }),
      });

      const data = await response.json();

      if (response.status === 401 && data.loginUrl) {
        redirectToLogin(data.loginUrl);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "AI-servern svarade inte.");
      }

      setAnswer(data.answer);
    } catch (requestError) {
      setError(requestError.message);
      setAnswer("AI-chatten kunde inte svara just nu.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="aiPanel" aria-label="AI-guide">
      <div className="aiHeader">
        <div>
          <p className="eyebrow">Riktig AI-guide</p>
          <h2>Fråga AI:n om telefonerna</h2>
        </div>
        <span>Github OpenAI</span>
      </div>

      <form className="aiForm" onSubmit={handleSubmit}>
        <label className="aiInput">
          <Search size={18} aria-hidden="true" />
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ex: vilken har bäst kamera?"
          />
        </label>
        <button disabled={isLoading || authStatus === "checking"} type="submit">
          {authStatus === "checking"
            ? "Kontrollerar..."
            : isAuthenticated
              ? isLoading
                ? "Tänker..."
                : "Fråga"
              : "Logga in för AI"}
        </button>
      </form>

      {error && <p className="aiError">{error}</p>}
      <p className="aiAnswer">{answer}</p>
      <p className="aiNote">
        AI:n använder de två valda telefonerna och appens exempeldata. Priser och specifikationer är
        inte live-hämtade.
      </p>
    </section>
  );
}

function PhonePicker({ label, selectedId, onSelect, takenId }) {
  const [query, setQuery] = useState("");
  const selectedPhone = phones.find((phoneToFind) => phoneToFind.id === selectedId);

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = normalized
      ? phones.filter((phoneToFilter) => getSearchText(phoneToFilter).includes(normalized))
      : featuredPhoneIds
          .map((id) => phones.find((phoneToFind) => phoneToFind.id === id))
          .filter(Boolean);

    return filtered.slice(0, 12);
  }, [query]);

  return (
    <section className="picker" aria-label={label}>
      <div className="pickerHeader">
        <span>{label}</span>
        {selectedPhone && <strong>{selectedPhone.brand}</strong>}
      </div>

      <label className="searchBox">
        <Search size={18} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Sök modell, serie, processor eller Android/iOS"
        />
      </label>

      <div className="results" role="listbox" aria-label={`${label} sökresultat`}>
        {matches.map((phoneResult) => {
          const selected = phoneResult.id === selectedId;
          const sameAsOther = phoneResult.id === takenId;

          return (
            <button
              className={`resultButton ${selected ? "selected" : ""}`}
              key={phoneResult.id}
              onClick={() => onSelect(phoneResult.id)}
              type="button"
            >
              <span>
                <strong>{phoneResult.model}</strong>
                <small>
                  {phoneResult.brand} · {phoneResult.os} · {phoneResult.processor} ·{" "}
                  {phoneResult.price.toLocaleString("sv-SE")} kr
                </small>
              </span>
              {selected && <Check size={18} aria-hidden="true" />}
              {!selected && sameAsOther && <small className="sameHint">vald</small>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Recommendation({ first, second, score }) {
  if (!first || !second) {
    return (
      <section className="recommendation empty">
        <Smartphone size={28} aria-hidden="true" />
        <div>
          <h2>Välj två telefoner</h2>
          <p>Sök i rutorna ovan för att få upp exempel och starta jämförelsen.</p>
        </div>
      </section>
    );
  }

  const winner = score.left === score.right ? null : score.left > score.right ? first : second;

  return (
    <section className="recommendation">
      <div className="recommendationIcon">
        <Award size={30} aria-hidden="true" />
      </div>
      <div>
        <p className="eyebrow">Rekommendation</p>
        <h2>{winner ? `${winner.model} passar bäst här` : "Det är väldigt jämnt"}</h2>
        <p>
          Poäng: {first.model} {score.left} - {score.right} {second.model}. Appen väger in pris,
          batteri, huvudkamera, selfiekamera, lagring, RAM och betyg.
        </p>
      </div>
    </section>
  );
}

function PhoneSummary({ phone: selectedPhone }) {
  if (!selectedPhone) {
    return <div className="phoneSummary placeholder">Ingen telefon vald</div>;
  }

  return (
    <article className="phoneSummary">
      <div className="phoneIcon">
        <Smartphone size={28} aria-hidden="true" />
      </div>
      <div>
        <p>{selectedPhone.brand}</p>
        <h2>{selectedPhone.model}</h2>
        <span>
          {selectedPhone.os} · {selectedPhone.storage} GB · {selectedPhone.processor}
        </span>
      </div>
    </article>
  );
}

function Comparison({ first, second }) {
  if (!first || !second) {
    return null;
  }

  return (
    <section className="comparison" aria-label="Telefonjämförelse">
      <div className="summaryGrid">
        <PhoneSummary phone={first} />
        <PhoneSummary phone={second} />
      </div>

      <div className="tableShell">
        <div className="tableHeader">
          <span>Egenskap</span>
          <span>{first.model}</span>
          <span>{second.model}</span>
        </div>

        {comparisonRows.map((row) => {
          const rowWinner = getWinnerForRow(first, second, row);

          return (
            <div className="compareRow" key={row.key}>
              <span className="rowLabel">{row.label}</span>
              <span className={rowWinner === "left" ? "bestValue" : ""}>
                {formatValue(first[row.key], row.suffix)}
              </span>
              <span className={rowWinner === "right" ? "bestValue" : ""}>
                {formatValue(second[row.key], row.suffix)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function App() {
  const [firstId, setFirstId] = useState("iphone-16");
  const [secondId, setSecondId] = useState("samsung-s24");

  const firstPhone = phones.find((phoneToFind) => phoneToFind.id === firstId);
  const secondPhone = phones.find((phoneToFind) => phoneToFind.id === secondId);
  const score = calculateScore(firstPhone, secondPhone);

  return (
    <main className="app">
      <section className="topBar">
        <div>
          <p className="eyebrow">Telefonjämförelse</p>
          <h1>Jämför två modeller snabbt</h1>
        </div>
        <div className="topStats">
          <span>
            <BatteryCharging size={18} aria-hidden="true" />
            Batteri
          </span>
          <span>
            <ShieldCheck size={18} aria-hidden="true" />
            Kamera & processor
          </span>
        </div>
      </section>

      <section className="pickerGrid">
        <PhonePicker
          label="Telefon 1"
          selectedId={firstId}
          onSelect={setFirstId}
          takenId={secondId}
        />
        <PhonePicker
          label="Telefon 2"
          selectedId={secondId}
          onSelect={setSecondId}
          takenId={firstId}
        />
      </section>

      <Recommendation first={firstPhone} second={secondPhone} score={score} />
      <LocalAiGuide first={firstPhone} second={secondPhone} score={score} />
      <Comparison first={firstPhone} second={secondPhone} />
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
