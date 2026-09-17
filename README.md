# 🐉 Game of Thrones Quiz Game

🔗 **[Canlı Demo'yu İnceleyin](https://got-quiz-game.vercel.app/)**

Westeros dünyasına özel kendim hazırladığım dinamik soru havuzu, canlı liderlik tablosu, Web Audio API ses efektleri ve atmosferik arka plan müziği ile geliştirilmiş full-stack quiz uygulaması.

![Project Status](https://img.shields.io/badge/status-active-brightgreen)
![Framework](https://img.shields.io/badge/framework-React%20%2B%20Vite-blue)
![Database](https://img.shields.io/badge/database-Vercel%20Postgres-black)
![Styling](https://img.shields.io/badge/styling-Tailwind%20CSS-38bdf8)

---

## 🌟 Öne Çıkan Özellikler

* **Dinamik Veritabanı Entegrasyonu:** Sorular, skorlar ve geri bildirimler Vercel Postgres veritabanında saklanır ve Serverless API uç noktaları (`/api/*`) üzerinden yönetilir.
* **Canlı Liderlik Tablosu (Leaderboard):** Kullanıcılar skorlarını kaydedebilir ve en yüksek puanı alan oyuncular listesinde yarışabilir.
* **Web Audio API Ses Efektleri:** Doğru ve yanlış cevaplar için harici dosya yüklemesi gerektirmeyen, tarayıcı üzerinde sentezlenen dinamik ses efektleri.
* **Westeros Temalı Tematik Müzik:** Kullanıcı kontrolünde açılıp kapatılabilen temaya uygun arka plan müziği.
* **Geri Bildirim Sistemi:** Oyuncuların uygulama içerisinden öneri ve hata bildirimlerini veritabanına iletebilmesi.
* **Responsive & Tematik UI:** Tailwind CSS ve Cinzel fontu ile Westeros atmosferine uygun karanlık fantezi arayüz tasarımı.

---

## 🛠️ Kullanılan Teknolojiler

* **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide React (İkonlar)
* **Backend / Database:** Vercel Serverless Functions, `@vercel/postgres`
* **Audio:** Web Audio API (Ses efektleri), HTML5 Audio (Arka plan müziği)
* **Deployment:** Vercel

---

## 📸 Ekran Görüntüleri

| Ana Menü | Quiz Ekranı |
| :---: | :---: |
| ![Ana Menü](./public/screenshot-1.png) | ![Quiz Ekranı](./public/screenshot-2.png) |

---

## 🚀 Yerel Kurulum (Local Setup)

Projeyi kendi bilgisayarınızda çalıştırıp geliştirmek için:

1. **Repoyu klonlayın:**
   ```bash
   git clone [https://github.com/esoyc/game-of-thrones-quiz-game.git](https://github.com/esoyc/game-of-thrones-quiz-game.git)
   cd game-of-thrones-quiz-game
