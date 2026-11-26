# civicpulse-ai
AI-powered civic issue reporting and tracking platform
# CivicPulse AI

> A transparent civic issue-reporting platform that helps residents report local problems and lets city teams track them through resolution.

CivicPulse AI is a hackathon prototype for Mathura, Uttar Pradesh. It turns a local issue—such as a pothole, overflowing bin, broken streetlight, or water leak—into a trackable report shared between residents and city administrators.

## The problem

Residents often report civic problems without knowing whether anyone saw the report or when it will be fixed. CivicPulse AI makes the process visible: report, review, assign, update, and resolve.

## What the prototype demonstrates

- A citizen dashboard with neighborhood reports, issue trends, and a community map.
- A report form with category, description, image preview, and browser location support.
- Local triage suggestions for issue category and urgency.
- Searchable, filterable report lists and progress timelines.
- A demo admin dashboard that can update report status.
- Browser-based persistence through local storage, so demo reports remain after refresh on the same device.
- Responsive layouts for desktop and mobile.

## Technology

| Layer | Technology |
| --- | --- |
| User interface | React |
| Development and build tooling | Vite |
| Icons | Lucide React |
| Styling | Custom CSS |
| Prototype persistence | Browser local storage |
| Browser features | Geolocation and image-preview APIs |

## Project structure

```text
civicpulse-ai/
├── docs/                 # Architecture, demo plan, and roadmap
├── src/
│   ├── App.jsx           # Main UI, screens, state, and report workflow
│   ├── main.jsx          # React startup point
│   └── styles.css        # Responsive design system
├── .gitignore            # Files never uploaded to GitHub
├── CONTRIBUTING.md       # Team workflow
├── index.html            # Web-page entry point
├── package.json          # Commands and dependencies
└── README.md             # Project overview
```

## Run locally

```sh
npm install
npm run dev
```

Vite prints a local address to open in a browser. Use **View as** in the left sidebar, or the avatar menu, to switch between the citizen and admin experiences.

## Demo flow

1. Open the citizen dashboard and show a nearby civic issue.
2. Submit a realistic issue with a location, description, and optional image.
3. Use the triage suggestion and submit the report.
4. Find the new report in the list or map.
5. Switch to the admin dashboard and update its status.
6. Return to the citizen view and show the transparent progress timeline.

See [the full demo guide](docs/DEMO.md).

## Architecture

```text
Browser
  └── React application
        ├── Citizen and admin screens
        ├── Report creation and local triage
        ├── Search, filters, map, and timelines
        └── Browser local storage
```

See [the architecture notes](docs/ARCHITECTURE.md) for the technical detail.

## Prototype boundaries

This is a functioning front-end prototype. To keep the demo honest:

- The map is a custom Mathura illustration, not a live geocoded map.
- The current AI suggestion is local rule-based triage, not a connected Gemini service.
- Reports are stored only in the current browser, not in a shared cloud database.
- Switching between citizen and admin views is a demo role switch, not real authentication.

No resident data is sent to a server in the current version.

## Production roadmap

The intended production path is Firebase Authentication, Firestore, Cloud Storage, a secured Gemini or similar AI service, and Leaflet/OpenStreetMap. API keys must stay in a trusted backend or cloud function—not in browser code.

See [the roadmap](docs/ROADMAP.md) for the recommended build order.

## Team workflow

Read [CONTRIBUTING.md](CONTRIBUTING.md) before making a change. Keep each feature in a small, focused commit so the team can safely collaborate.
