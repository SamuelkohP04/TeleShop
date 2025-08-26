# Awareness Living - Automate Managing Appointments for Tarot Card Consultation

---
![GitHub contributors](https://img.shields.io/github/contributors/SamuelKohP04/TeleShop)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/SamuelKohP04/TeleShop)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr-closed/SamuelKohP04/TeleShop)


<img width="1592" height="849" alt="image" src="https://github.com/user-attachments/assets/ce2fb3da-e58e-4230-83be-f9de266a9f79" />

## 🚀 Overview
A project that integrates a Telegram bot and a Next.js website for managing appointments for a Tarot Card Reading & Numerology Business. The Telegram bot serves as a personalised bot to interact with customers, while the website is the main channel for booking Tarot Card appointments.



## ⚙️ Technologies used
Click [here](https://app.diagrams.net/?src=about#G1Bc7YP-3i8AsA31N5bOQry-a5MI5n74n3#%7B%22pageId%22%3A%22ZgpZzdNCQvJGO9xpxhlk%22%7D) to view the full technical architecture on Draw.io.

#### Front-End:
- React
- ESLint
- Tailwind CSS
- ShadCn

#### Backend:
- Node/Express JS
- Stripe (Using Stripe CLI for Local Development)
- Telegraf (Telegram Bot Framework)

#### Database & Production:
- Firebase Libraries
    - Firebase-REST-Firestore (View documentation [here](https://github.com/nabettu/firebase-rest-firestore))
    - Firebase-Auth-Cloudflare-Workers (View documentation [here](https://www.npmjs.com/package/firebase-auth-cloudflare-workers?activeTab=readme#run-example-code))
- Cloudflare Workers (View documentation [here](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/))

#### Other Development Tools Used:
- Jira (Project Management)
- CodeRabbit (AI Code Reviewer upon Pull Request) (View Documentation [here](https://www.coderabbit.ai/))
- GitHub Copilot (Code Suggestions)
  
---

## Features
- [x] Login & signup for account on the website

- [x] Send feedback via feedback form in FAQ section

- [x] Book appointment using the calendar within the website

- [x] Check appointment scheduled via dashboard portal

- [x] Access miniapp via Awareness's Telegram bot

- [ ] Payment via Stripe (TBC)

## 📦 How to Install & Run the Project

1. Git clone the project and navigate to the /Teleshop folder.
2. Install dependencies (ensure Node version is > 16.0):
```
npm install
```

4. In the project directory, you can run:

```
npm start:bot
```
- Runs the Telegram bot in development mode.

```
npm run dev
```
- Launches the Next.js website in development mode.

```
npm run build
```
- Builds the app for production in the `.next` folder locally.
Optimizes the build for NextJS.

```
npm run preview
```
- Builds the app for production in the `.open-next` folder.  
Optimizes the build for deployment for Cloudflare Workers.


## 🤝 Contributors
- SamuelKohP04 (Lead Software Developer)
- Ang-Wei-Liang (Software Developer - Web Development)
- kohct1 (Software Developer - Web Development)
- WireNotCable (Software Developer - Bot Development)
- APandamonium1 (Software Developer - Bot Development)
- lkn120305 (Software Developer)
- Cheryl Neo (UI/UX Designer)
