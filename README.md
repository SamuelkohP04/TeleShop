# Awareness Living

## Overview
A project that integrates a Telegram bot and a Next.js website for managing appointments for a Tarot Card Reading & Numerology Business. The Telegram bot serves as a personalised bot to interact with customers, while the website is the main channel for booking Tarot Card appointments.

## Technologies used:
Click [here](https://app.diagrams.net/?src=about#G1Bc7YP-3i8AsA31N5bOQry-a5MI5n74n3#%7B%22pageId%22%3A%22ZgpZzdNCQvJGO9xpxhlk%22%7D) to view the full technical architecture on Draw.io.

### Front-End:
- React
- ESLint
- Tailwind CSS
- ShadCn

### Backend:
- Node/Express JS
- Stripe (Using Stripe CLI for Local Development)
- Telegraf (Telegram Bot Framework)

### Database & Production 
- Firebase Libraries
    - Firebase-REST-Firestore (View documentation [here](https://github.com/nabettu/firebase-rest-firestore))
    - Firebase-Auth-Cloudflare-Workers (View documentation [here](https://www.npmjs.com/package/firebase-auth-cloudflare-workers?activeTab=readme#run-example-code))

- Cloudflare Workers (View documentation [here](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/))
  
---

## How to Install & Run the Project

In the project directory, you can run:

### `npm start:bot`

Runs the Telegram bot in development mode.

### `npm run dev`

Launches the Next.js website in development mode.

### `npm run build`

Builds the app for production in the `.next` folder locally.
Optimizes the build for NextJS.

### `npm run preview`

Builds the app for production in the `.open-next` folder.  
Optimizes the build for deployment for Cloudflare Workers.
