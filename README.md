# FitMe — Your Virtual Wardrobe

FitMe is a cute retro-digital virtual wardrobe for experimenting with outfits from clothes you already own. It is a portfolio-focused React and TypeScript project that takes a user through a complete local workflow: create an avatar, record wardrobe items, build a look, get simple outfit ideas, and save favourites for later.

## What Works

| Product area | Current behaviour |
|---|---|
| My Avatar | Customise a stylised 2D avatar with appearance, body, facial-hair, tattoo, glasses, and accessory choices. Changes persist after refresh. |
| My Wardrobe | Add, edit, delete, search, and filter clothing items by category and colour. Small image previews are supported alongside illustrated fallbacks. |
| Outfit Builder | Combine real wardrobe items around the saved avatar using independent garment cyclers. |
| Outfit ideas | Generate Casual, Smart Casual, and Streetwear combinations with transparent, deterministic rules and a colour/style score out of 100. |
| Saved Outfits | Save, rename, duplicate, open, update, and delete named looks. |
| Data portability | Export the wardrobe to JSON and import a validated backup without overwriting existing pieces. |
| First launch | A dismissible welcome guide explains the sample-wardrobe workflow and persists its dismissal. |
| Installability | Web app manifest and production service worker provide an installable PWA shell with offline fallback support. |

## Technology

FitMe uses **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Lucide icons**. It does not use a backend, database, user account, or paid third-party service in this MVP.

## Run Locally

Use Node.js 20 or later and pnpm.

```bash
pnpm install
pnpm run dev
```

Use the Vite address printed in the terminal to open the application. The main quality commands are:

```bash
pnpm run lint
pnpm run build
```

## Project Structure

```text
src/
├── components/
│   ├── avatar/          # Avatar preview and controls
│   ├── outfit/          # Builder, recommendations, and saved-look UI
│   └── wardrobe/        # Clothing cards, form, and garment fallback visuals
├── data/                # First-launch starter wardrobe
├── lib/                 # Storage, wardrobe helpers, and recommendation rules
├── pages/               # Home, Avatar, Wardrobe, Builder, and Saved Outfits
└── types/               # Shared TypeScript domain models
```

The PWA entry points live in `index.html` and `public/manifest.webmanifest`; offline behavior is handled by `public/sw.js` and registered from `src/main.tsx`.

## Browser-Only MVP Boundaries

FitMe stores the avatar, wardrobe, image previews, saved looks, and onboarding preference in browser `localStorage`. This means the data is available only in the same browser profile and on the same device. Clearing browser storage also clears FitMe’s data. Wardrobe JSON export provides a manual backup and transfer path.

Image previews are converted into local data URLs and limited to small files so they fit browser storage. FitMe does **not** perform background removal, garment segmentation, cloud backup, or photorealistic virtual try-on. The Outfit Builder is a stylised 2D composition that helps users plan a look; it does not predict garment fit or appearance on a photograph.

The outfit suggestions are transparent rule-based combinations that choose from existing wardrobe items. They are not presented as AI recommendations or personal style advice.

## Future Extension Points

The existing separation between domain types, storage helpers, recommendation rules, and visual components leaves clear paths for future work:

1. Replace local storage with authenticated cloud storage and a database.
2. Add a real server-side image-upload pipeline with background removal.
3. Replace or augment `src/lib/recommendations.ts` with a server-backed AI stylist.
4. Add a photorealistic try-on service after evaluating privacy, consent, image-processing, and hosting requirements.

## Development Approach

This repository was built in small commits. Each milestone adds one understandable part of the product: accessibility foundations, wardrobe backup, colour filtering, outfit scoring, onboarding, PWA metadata, offline caching, and documentation. That history is intentionally kept clean so the project can be reviewed as a learning journey as well as a finished prototype.

## Portfolio Notes

FitMe is deliberately a browser-only product prototype. It demonstrates React and TypeScript component design, local persistence, deterministic product logic, responsive UI, keyboard accessibility, data portability, and installable web-app behavior without requiring accounts or a backend. The recommendation score is a transparent heuristic, not an AI stylist, and the 2D Outfit Builder does not claim to predict real-world garment fit.
