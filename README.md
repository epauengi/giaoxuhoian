**English** | [日本語](./README.ja.md)

<div align="center">
  <img src="./public/logo.png" alt="Giáo xứ Hội An Logo" width="84" height="84" />
  <h1>Giáo xứ Hội An (Hoi An Parish Portal)</h1>
  <p>Official pastoral web portal, liturgical schedule calculation engine, and editorial content workspace for the historic Catholic Parish of Hoi An (Diocese of Da Nang).</p>
  <p>
    <a href="#overview">Overview</a> ·
    <a href="#key-features">Key Features</a> ·
    <a href="#tech-stack">Tech Stack</a> ·
    <a href="#technical-highlights">Technical Highlights</a> ·
    <a href="#architecture">Architecture</a> ·
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

<p align="center">
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16.3.1-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img alt="React 19" src="https://img.shields.io/badge/React-19.2.8-23272f?style=flat-square&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript 5" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose_9.9-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img alt="Node.js 24" src="https://img.shields.io/badge/Node.js-24.x-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
</p>

---

## Overview

**Giáo xứ Hội An** is the official digital communication portal serving the Catholic community of Hoi An (106 Nguyen Truong To, Hoi An, Da Nang Diocese, Vietnam). Located in a UNESCO World Heritage site with over four centuries of Catholic missionary and cultural history, the parish serves a diverse constituency: local parishioners, domestic pilgrims, overseas diaspora, and international visitors.

The platform balances three primary roles:
1. **Pastoral Information Gateway:** Immediate access to confirmed Mass times, liturgical calendars, emergency contacts, and sacramental procedures.
2. **Community & Ministry Hub:** Publishing channels for catechetical materials, daily Gospel reflections, youth and guild activities, and financial transparency.
3. **Heritage of Faith Archive:** Curated historical records detailing early Christian missions in Hoi An and the historic development of the Vietnamese national script (*chữ Quốc ngữ*).

---

## Key Features

- **Real-Time Next Mass Calculation Engine:** A client-hydrated countdown badge evaluates the parish weekly liturgical schedule against client local time to determine the next available Mass with exact minute deltas.
- **Multilingual Mass & Visitor Support:** Clear schedule surfacing for international attendees, including the weekly Sunday English Mass (16:00) and church visitation decorum guidelines.
- **Structured Sacraments Guide:** Detailed procedural roadmaps for all 7 Sacraments (Baptism, Confirmation, Holy Eucharist, Reconciliation, Anointing of the Sick, Holy Orders, and Matrimony).
- **Protected Editorial Workspace:** Secure administration dashboard (`/admin/bai-viet`) for drafting, filtering, updating, and publishing parish announcements and reflections.
- **Multi-Criteria Article Search & Filter:** Administrative query parser and filter engine supporting full-text search, publication status (`published`, `draft`, `archived`), article kinds, and categories.
- **Vietnamese Diacritics Slug Engine:** Deterministic title-to-slug transformation engine preserving Vietnamese tone semantics and generating clean, collision-resistant URLs.
- **High-Readability Editorial Layout:** Newsprint-inspired typography and responsive layouts optimized for readability across elderly parishioners and mobile viewports, respecting `prefers-reduced-motion`.

---

## Tech Stack

| Category | Technology | Version | Purpose in Project |
| --- | --- | --- | --- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | 16.3.1 | Server Components, Streaming SSR, Route Handlers, Turbopack |
| **UI Library** | [React](https://react.dev/) | 19.2.8 | Server Actions, modern hook primitives, concurrent transitions |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.x | Strict end-to-end type safety across DTOs, schemas, and UI |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first styling with `@tailwindcss/postcss`, responsive grid |
| **Database & ODM** | [MongoDB](https://www.mongodb.com/) / [Mongoose](https://mongoosejs.com/) | 9.9.3 | Article persistence, lean projection queries, connection caching |
| **Authentication** | [NextAuth.js](https://authjs.dev/) (Auth.js) | 5.0.0-beta.32 | JWT session management, Credentials provider, bcrypt hashing |
| **Validation** | [Zod](https://zod.dev/) | 4.4.3 | Runtime validation for admin credentials, article schemas, and forms |
| **Markdown / Content** | `next-mdx-remote` & `gray-matter` | 6.0.0 / 4.0.3 | Markdown and frontmatter parsing for content import pipelines |
| **Icons & Design** | [Lucide React](https://lucide.dev/) | 1.31.0 | Minimal, accessible iconography |
| **Testing** | Node.js Test Assertions (`tsx`) | Native / 4.23 | Fast, framework-free verification scripts for navigation, slugs, and filters |

---

## Technical Highlights

### 1. Relative Liturgical Mass Engine with Hydration Guard

**Problem**  
Parishioners need to know when the next Mass is taking place within seconds of landing on the homepage. Computing real-time countdowns on the server causes hydration mismatches due to differences between the server rendering clock and the client's local system time.

**Approach**  
Implemented a pure calendar calculation engine (`src/lib/data/gio-le.ts`) that maps weekly Mass slots across weekdays (05:00, 18:00), Saturday (05:00, 17:30 vigil), and Sunday (05:30, 09:00, 16:00 English, 18:30). Wrapped the client display component (`src/components/blocks/next-mass-badge.tsx`) in a two-phase hydration guard: an SSR fallback renders static schedule metadata, and client state activates upon mounting without causing layout shift or hydration warnings.

**Result**  
Accurate, real-time relative countdown badges ("Hôm nay 18:00", "Ngày mai 05:00") that update dynamically with zero server-client clock drift.

```typescript
// Core scheduling calculation excerpt from src/lib/data/gio-le.ts
export function getNextMass(date: Date = new Date()): NextMassResult {
  const currentDay = date.getDay();
  const currentMinutes = date.getHours() * 60 + date.getMinutes();
  let bestSlot: MassSlot | null = null;
  let minDiff = Infinity;

  for (const slot of ALL_WEEKLY_MASSES) {
    let dayDiff = slot.dayOfWeek - currentDay;
    let minuteDiff = dayDiff * 24 * 60 + (slot.minutes - currentMinutes);
    if (minuteDiff <= 0) minuteDiff += 7 * 24 * 60; // Next week loop

    if (minuteDiff < minDiff) {
      minDiff = minuteDiff;
      bestSlot = slot;
    }
  }
  // Returns normalized slot label, relative target, and minute difference
}
```

---

### 2. Multi-Tier Article Caching with Tagged Revalidation

**Problem**  
Public article views (pastoral letters, reflections, news) experience high read traffic, while editorial updates occur intermittently. Querying MongoDB Atlas directly on every request introduces unnecessary latency and database connection overhead.

**Approach**  
Wrapped Mongoose queries in Next.js `unstable_cache` with a lean projection strategy (`publicFields` for listings, `detailFields` for full articles) in `src/lib/articles.ts`. Structured fine-grained cache tags (`articles`, `articles:${locale}`, `articles:${locale}:${kind}`, and `article:${locale}:${kind}:${slug}`). Attached `revalidateTag` triggers to Server Actions upon creating, updating, or deleting content.

**Result**  
Read operations execute from in-memory cache with sub-millisecond response times, while updates purge the affected cached routes immediately without stale data persistence.

---

### 3. Defense-in-Depth Admin Authentication

**Problem**  
Parish content must not be tampered with. Relying solely on edge middleware can fail if routes are improperly matched, while relying solely on page components risks executing unprotected server actions.

**Approach**  
Implemented a dual-layer security perimeter:
1. **Edge Proxy Interceptor (`src/proxy.ts`):** Edge-level NextAuth session verification intercepts all `/admin/*` routes (excluding login) and redirects unauthenticated traffic before rendering occurs.
2. **Server-Side Action Guard (`src/lib/auth-guard.ts`):** Enforces a strict `requireAdmin()` check using `auth()` directly inside server action mutations and data loaders, raising an explicit unauthorized exception if session validation fails.

**Result**  
Administrative routes and mutations remain fully protected against direct action invocations, unauthorized URL tampering, and session replay attempts.

---

### 4. Deterministic Vietnamese Diacritics Slug Engine

**Problem**  
Standard ASCII slug generators strip or corrupt Vietnamese tone marks (`ả, ã, ạ, ắ, ế, ỗ, đ`), resulting in ambiguous or illegible URL identifiers (e.g., "giao-xu-hoi-an" vs broken encodings).

**Approach**  
Authored a specialized slugifier (`src/lib/article-slug.ts`) that decomposes Unicode characters (NFD), normalizes specific Vietnamese phonemes (such as mapping `đ/Đ` to `d`), strips combining diacritical marks, removes punctuation, and enforces a strict 120-character boundary.

**Result**  
Clean, predictable permalinks that conform to RFC 3986 and preserve semantic meaning for search engine crawlers.

---

## Architecture

```mermaid
flowchart TD
    Client[Browser / Client Device] --> Ingress[Next.js Edge Proxy / Middleware]
    
    subgraph Edge Layer
        Ingress -->|Public Request| LocaleRewrite[Locale Rewrite /vi]
        Ingress -->|Admin Path Check| EdgeAuthCheck{Authenticated?}
        EdgeAuthCheck -->|No| LoginRedirect[/admin/dang-nhap]
        EdgeAuthCheck -->|Yes| AdminWorkspace[/admin/bai-viet]
    end

    subgraph Server Layer [Next.js App Router]
        LocaleRewrite --> PublicPages[Public Server Components]
        AdminWorkspace --> AdminActions[Admin Server Actions]
        
        PublicPages --> MassEngine[Liturgy & Mass Calculator]
        PublicPages --> CachedStore[Next.js unstable_cache]
        AdminActions --> AuthGuard{requireAdmin}
        AuthGuard -->|Mutate & Revalidate| MongooseDriver[Mongoose ORM]
        CachedStore -->|Cache Miss| MongooseDriver
    end

    subgraph Data Layer
        MongooseDriver --> ConnPool[(Cached Mongo Connection)]
        ConnPool --> MongoDBAtlas[(MongoDB Atlas)]
        MassEngine --> StaticData[(Static Liturgy Matrix)]
    end
```

---

## Project Structure

```text
giaoxuhoian2/
├── scripts/                      # Automated assertion-based verification scripts
│   ├── check-admin-article-filter.ts
│   ├── check-admin-article-slug.ts
│   └── check-public-navigation.ts
├── src/
│   ├── app/                      # Next.js App Router hierarchy
│   │   ├── [locale]/             # Public localized pages (vi)
│   │   │   ├── bi-tich/          # Sacraments guide and detail routes
│   │   │   ├── cong-doan/        # Parish community organizations
│   │   │   ├── dong-hanh/        # Accompaniment & donation policies
│   │   │   ├── giao-xu/          # Parish overview & historical timeline
│   │   │   ├── lien-he/          # Contact details & office location
│   │   │   ├── loi-chua/         # Gospel reflections and homilies
│   │   │   ├── phung-vu/         # Mass schedules & adoration hours
│   │   │   ├── tin-tuc/          # News articles and announcements
│   │   │   └── page.tsx          # Editorial homepage
│   │   ├── admin/                # Protected editorial workspace
│   │   │   ├── bai-viet/         # Article management, creation, edit
│   │   │   └── dang-nhap/        # Credentials login screen
│   │   ├── api/                  # API route handlers (auth, form submission)
│   │   └── globals.css           # Tailwind CSS v4 design tokens & base rules
│   ├── components/
│   │   ├── admin/                # Admin navigation, forms, and article tables
│   │   ├── blocks/               # NextMassBadge, article cards, forms
│   │   ├── layout/               # Newspaper masthead, nav, footer, quick access
│   │   └── ui/                   # Reusable buttons, badges, inputs, plates
│   ├── lib/
│   │   ├── data/                 # Liturgy matrix (gio-le.ts), parish data
│   │   ├── i18n/                 # Dictionaries and locale routing helpers
│   │   ├── admin-article-filter.ts # Multi-field filtering logic
│   │   ├── article-slug.ts       # Vietnamese title-to-slug engine
│   │   ├── articles.ts           # Cached data access layer
│   │   ├── auth-guard.ts         # Server-side authorization guard
│   │   └── mongodb.ts            # Mongoose global connection cache
│   ├── models/                   # Mongoose schemas (article.ts)
│   └── proxy.ts                  # Edge request proxy and auth routing
├── auth.ts                       # NextAuth configuration and credentials provider
├── package.json
└── tsconfig.json
```

---

## Verification & Testing

The repository maintains lightweight, deterministic verification scripts utilizing Node.js native assertions. These tests validate core business logic without external harness overhead:

```bash
# Verify administrative article filtering logic
npm run check:admin-filter

# Verify Vietnamese diacritical slug engine
npm run check:admin-slug

# Verify navigation route normalization and active item detection
node --conditions=react-server --import tsx scripts/check-public-navigation.ts

# Execute TypeScript type checking
npm run typecheck
```

---

## Getting Started

### Prerequisites

- **Node.js:** `24.x` (configured in `engines`)
- **Package Manager:** `npm` (lockfile provided)
- **Database:** MongoDB instance or MongoDB Atlas cluster

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/epauengi/giaoxuhoian.git
   cd giaoxuhoian
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Provide valid values in `.env.local` (see [Environment Variables](#environment-variables)).

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or configured port) in your browser.

5. Build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## Environment Variables

Configured in `.env.example`:

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB Atlas server-only connection URI with connection pooling parameters |
| `AUTH_SECRET` | Yes | 32-byte cryptographic secret used by NextAuth to sign JWT tokens |
| `ADMIN_USERNAME` | Yes | Designated administrator username for the editorial workspace |
| `ADMIN_PASSWORD_HASH` | Yes | Bcrypt password hash corresponding to the administrator password |

*Note: Never commit `.env` or `.env.local` to version control.*

---

## Roadmap

Planned milestones aligned with the parish product roadmap:
- [ ] **Interactive Campus Exploration:** Visual map of the church grounds, grotto, and historical markers.
- [ ] **Full English Public Localization:** Dedicated route support for international tourists and pilgrims.
- [ ] **Sacramental Registration Flows:** Online forms for catechism enrollments and sacrament preparation.
- [ ] **Audio Reflection Feeds:** Podcast player and audio streaming for weekly homilies.

---

## License

Private repository. All rights reserved by **Giáo xứ Hội An** (Diocese of Da Nang).
