# KDE Plasma Portfolio

Interactive portfolio inspired by the KDE Plasma desktop environment, built with React, TypeScript, Tailwind, and Three.js.

## Features

- KDE-style desktop interface with draggable app windows
- Window controls for minimize, maximize, restore, and close
- Tray behavior to focus/minimize apps
- Android-inspired mobile mode with swipeable app pages and bottom dock
- Three.js wallpaper scene with full-screen loading gate and fallback flow
- Bilingual content (English and Portuguese) with in-app language toggle
- CV app with inline preview plus localized files (`cv-en.pdf` and `cv-pt.pdf`)
- Projects app where `liveUrl` is optional (projects without demo only show source link)

## App Modules

- Projects
- About
- Skills
- Contact
- CV

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Three.js + @react-three/fiber
- i18next + react-i18next
- Phosphor Icons

## Local Development

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev      # start development server
npm run lint     # run eslint
npm run build    # type-check and create production build
npm run preview  # preview production build
```

## Content and Customization

Main content is managed in:

- `src/data/portfolioContent.ts`

Update this file to manage profile data, projects, contacts, skills, and CV sources.  
For projects, use:

- `liveUrl` (optional)
- `repoUrl` (required)

Translations are defined in:

- `src/i18n/resources.ts`

CV files are served from:

- `public/cv-en.pdf`
- `public/cv-pt.pdf`
