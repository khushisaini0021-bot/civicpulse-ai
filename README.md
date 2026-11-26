# CIVICPULSE---AI
AI Powered Civic Issue Reporting Platform

---

A responsive civic reporting web app built with React + Vite.

## Run locally

```sh
npm install
npm run dev
```

Vite prints a local address to open in a browser. Use **View as** in the left sidebar (or the avatar menu) to switch between the citizen experience and the admin dashboard.

## What works in this prototype

- Browse a neighborhood overview, recent reports and issue map.
- Submit a report with a category, description, photo and location. The browser will ask for location access; manual location entry remains available.
- Search and filter reports, open a report, and follow its status timeline.
- Switch to admin view and update report status.
- Reports persist in the current browser through local storage.

The sample map is a Mathura neighborhood illustration rather than a live geocoded map. AI suggestions are a local demo interaction. No resident data is sent to a server.

## Production connection points

The reference decks name Firebase for authentication, Firestore and image storage, Gemini for issue suggestions, Leaflet/OpenStreetMap for live mapping, and Vercel for deployment. Those services need project credentials and security rules that were not included with the presentation files. Keep the Gemini key in a trusted server function or Firebase callable function; never put it in browser code.

Before a public launch, connect sign-in and database/storage services, enforce citizen/admin access with server-side rules, replace demo map coordinates with geocoded report locations, and route AI suggestions through a protected backend. The UI labels AI output as a suggestion for administrator review.
