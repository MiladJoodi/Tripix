# Tripix - Travel Booking Platform

A modern, production-ready travel booking frontend built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Search and book bus, train, and flight tickets — all in one beautifully designed interface.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

## Features

- **Multi-transport search** — Bus, train, and flight tickets in one place
- **Smart search with fallback** — Always returns results (exact, partial, or suggested)
- **Complete booking flow** — Search → Results → Ticket Details → Passenger Info → Review → Confirmation
- **Responsive design** — Mobile-first with full desktop support (sidebar navigation, multi-column layouts)
- **Filter & sort** — By price, departure time, stops, and sorting options
- **Booking management** — View all bookings with status tracking
- **User profile** — Payment methods, notifications, privacy settings, preferences, and help center
- **Smooth animations** — Framer Motion transitions, staggered lists, and micro-interactions
- **Persistent state** — Recent searches and bookings saved to localStorage

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | App Router, static export |
| [React 19](https://react.dev/) | UI library |
| [TypeScript 5](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling with custom theme |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Form validation |
| [Lucide React](https://lucide.dev/) | Icons |
| [Sonner](https://sonner.emilkowal.dev/) | Toast notifications |

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/MiladJoodi/Tripix.git
cd Tripix
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

Static files are generated in the `out/` directory.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home — hero, search form, popular routes
│   ├── search/             # Search results with filters
│   ├── ticket/             # Ticket detail view
│   ├── booking/            # Multi-step booking flow
│   ├── confirmation/       # Booking confirmation
│   ├── bookings/           # My bookings list
│   └── profile/            # User profile & settings
├── components/
│   ├── layout/             # Sidebar nav, bottom nav, page header
│   └── ui/                 # Ticket card, timeline, stepper, skeleton, etc.
├── features/
│   ├── search/             # Search form, city picker, date picker, filters
│   └── booking/            # Passenger form, review step
├── store/                  # Zustand stores (search, booking, user)
├── data/                   # Mock data (120+ tickets, 20 cities, 15 providers)
├── types/                  # TypeScript interfaces
└── utils/                  # Helper functions
```

## Deployment

This project is configured for **Netlify** deployment with static export.

### Deploy to Netlify

1. Push the repo to GitHub
2. Connect the repo in [Netlify](https://app.netlify.com/)
3. Netlify auto-detects the config from `netlify.toml`
4. Deploy!

Build settings are pre-configured:
- **Build command:** `npm run build`
- **Publish directory:** `out`

## Screenshots

### Mobile
- Home page with search form and popular routes
- Search results with filter modal
- Ticket details with trip timeline
- Multi-step booking flow
- Booking confirmation

### Desktop
- Sidebar navigation with multi-column layouts
- Filter sidebar alongside search results
- Trip summary sidebar during booking

## Author

**Milad Joodi**

- [LinkedIn](https://www.linkedin.com/in/joodi/)
- [GitHub](https://github.com/MiladJoodi)

## License

This project is open source and available under the [MIT License](LICENSE).
