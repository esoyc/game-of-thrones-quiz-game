# 🐉 Game of Thrones Quiz Game

Westeros dünyasına özel dinamik soru havuzu, canlı liderlik tablosu, Web Audio API ses efektleri ve atmosferik arka plan müziği ile geliştirilmiş full-stack quiz uygulaması.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-2ea44f?style=for-the-badge&logo=vercel)](https://game-of-thrones-quiz-game.vercel.app)

![Project Status](https://img.shields.io/badge/status-active-brightgreen)
![Framework](https://img.shields.io/badge/framework-React%20%2B%20Vite-blue)
![Database](https://img.shields.io/badge/database-Vercel%20Postgres-black)
![Styling](https://img.shields.io/badge/styling-Tailwind%20CSS-38bdf8)

🔗 **[Uygulamayı Canlıda Deneyin: game-of-thrones-quiz-game.vercel.app](https://game-of-thrones-quiz-game.vercel.app)** *(Link adresini kendi Vercel domaininle güncelleyebilirsin)*

---

## 🌟 Öne Çıkan Özellikler

- **Dinamik Veritabanı & API:** Sorular, skorlar ve geri bildirimler Vercel Postgres veritabanında saklanır; Serverless API (`/api/*`) uç noktaları üzerinden yönetilir.
- **Canlı Liderlik Tablosu (Leaderboard):** En yüksek puanı alan oyuncuların anlık sıralaması.
- **Web Audio API & Tematik Müzik:** Doğru/yanlış cevaplar için sentezlenen dinamik ses efektleri ve açılıp kapatılabilir arka plan müziği.
- **Geri Bildirim Sistemi:** Kullanıcıların uygulama içinden öneri ve hata bildirimlerini veritabanına iletebilmesi.
- **Responsive & Tematik UI:** Tailwind CSS ve Cinzel fontu ile hazırlanmış karanlık fantezi arayüzü.

---

## 🛠️ Kullanılan Teknolojiler

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide React
- **Backend / Veritabanı:** Vercel Serverless Functions, `@vercel/postgres`
- **Audio:** Web Audio API, HTML5 Audio
- **Deployment:** Vercel

---

## 📸 Ekran Görüntüleri

| Ana Menü | Quiz Ekranı |
| :---: | :---: |
| ![Ana Menü](./public/screenshot-1.png) | ![Quiz Ekranı](./public/screenshot-2.png) |

---

## 🚀 Yerel Kurulum

1. **Repoyu klonlayın ve proje dizinine gidin:**
   ```bash
   git clone [https://github.com/esoyc/game-of-thrones-quiz-game.git](https://github.com/esoyc/game-of-thrones-quiz-game.git)
   cd game-of-thrones-quiz-game
