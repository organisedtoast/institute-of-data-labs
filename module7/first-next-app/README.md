# Man Utd Next.js App

A Next.js 16 application built for Manchester United fans. This project demonstrates modern React patterns including Server Components, Client Components, custom hooks, context API, and API routes.

---

## � Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Key Concepts](#-key-concepts)
- [Pages Breakdown](#-pages-breakdown)
- [Components](#-components)
- [Custom Hooks](#-custom-hooks)
- [Context API](#-context-api)
- [API Routes](#-api-routes)
- [Styling](#-styling)
- [Key Technologies](#-key-technologies)
- [Deployment](#-deployment)
  - [Option 1: Vercel](#option-1-vercel-recommended)
  - [Option 2: Netlify](#option-2-netlify)
  - [Option 3: Docker](#option-3-docker)
  - [Option 4: Traditional Server (PM2)](#option-4-traditional-server-pm2)
  - [Deployment Checklist](#deployment-checklist)
- [Learning Resources](#-learning-resources)
- [Features Summary](#-features-summary)

---

## �🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
first-next-app/
├── src/
│   ├── app/                    # Next.js App Router (pages & API routes)
│   │   ├── about/              # About page
│   │   ├── api/                # API endpoints (backend)
│   │   │   └── coingecko/      # CoinGecko crypto API proxy
│   │   ├── bitcoinrates/       # Bitcoin exchange rates page
│   │   ├── contact/            # Contact page
│   │   ├── login/              # Login page
│   │   ├── posts/              # Posts listing & dynamic post pages
│   │   │   └── [id]/           # Dynamic route for individual posts
│   │   ├── favicon.ico         # Site favicon
│   │   ├── globals.css         # Global styles
│   │   ├── layout.js           # Root layout (wraps all pages)
│   │   ├── page.js             # Home page
│   │   └── page.module.css     # Home page specific styles
│   ├── components/             # Reusable React components
│   │   ├── Emoji.jsx           # Emoji display component
│   │   ├── Navbar.jsx          # Navigation bar
│   │   └── PostsLimit.jsx      # Posts limit selector
│   ├── contexts/               # React Context providers
│   │   └── EmojiContext.jsx    # Mood/emoji state management
│   └── hooks/                  # Custom React hooks
│       └── useDataReducer.jsx  # Data fetching with useReducer
├── public/                     # Static assets (images, fonts)
├── package.json                # Dependencies & scripts
└── next.config.mjs             # Next.js configuration (optional)
```

---

## 🎯 Key Concepts

### Server Components vs Client Components

| Server Components (Default) | Client Components (`'use client'`) |
|----------------------------|-----------------------------------|
| Render on the server | Render in the browser |
| Can fetch data directly | Use `useEffect` or hooks for data |
| Smaller bundle size | Can use `useState`, `onClick`, etc. |
| No interactivity | Full interactivity |

**Rule:** Start with Server Components. Only use Client Components when you need interactivity (state, events, effects).

---

## 📄 Pages Breakdown

### 1. Home Page (`app/page.js`)
- **Type:** Server Component
- **Purpose:** Landing page with welcome message
- **Features:** Displays Man Utd logo, intro text, and action buttons

### 2. About Page (`app/about/page.js`)
- **Type:** Server Component
- **Purpose:** Club history and information
- **Sections:** History, Busby Era, Ferguson Years, Old Trafford, Honours

### 3. Contact Page (`app/contact/page.js`)
- **Type:** Server Component
- **Purpose:** Club contact information
- **Includes:** Address, phone, email, opening hours, social media

### 4. Posts Page (`app/posts/page.js`)
- **Type:** Server Component (Async)
- **Purpose:** Display blog posts from JSONPlaceholder API
- **Features:**
  - Fetches posts dynamically based on limit
  - Uses `Promise.all()` for parallel data fetching
  - Links to individual post pages

### 5. Post Detail Page (`app/posts/[id]/page.js`)
- **Type:** Server Component (Dynamic Route)
- **Purpose:** Show individual post content
- **Dynamic Routing:** `[id]` folder captures URL parameter (e.g., `/posts/3`)

### 6. Bitcoin Rates Page (`app/bitcoinrates/page.js`)
- **Type:** Client Component (`'use client'`)
- **Purpose:** Display live Bitcoin exchange rates
- **Features:**
  - Currency selector (USD, AUD, NZD, GBP, EUR, SGD)
  - Real-time data via custom hook
  - Emoji mood toggle

### 7. Login Page (`app/login/page.js`)
- **Type:** Client Component (`'use client'`)
- **Purpose:** User authentication form
- **Features:** Email and password inputs with state management

---

## 🧩 Components

### Navbar (`components/Navbar.jsx`)
- **Type:** Client Component
- **Purpose:** Site-wide navigation
- **Key Features:**
  - Uses `usePathname()` hook to highlight active page
  - Links to all main pages
  - Styled with Manchester United colors

### Emoji (`components/Emoji.jsx`)
- **Type:** Client Component
- **Purpose:** Display mood emoji (😀/😡) based on Bitcoin price
- **Context:** Consumes `EmojiContext` for state

### PostsLimit (`components/PostsLimit.jsx`)
- **Type:** Client Component
- **Purpose:** Dropdown to select number of posts displayed
- **Key Features:**
  - Uses `useSearchParams()` to read URL params
  - Uses `router.replace()` to update URL without reload

---

## 🪝 Custom Hooks

### useDataReducer (`hooks/useDataReducer.jsx`)
- **Purpose:** Fetch crypto exchange rates with state management
- **Pattern:** Combines `useReducer` + `useEffect`
- **State Shape:**
  ```js
  {
    exchangeRate: number | null,
    loading: boolean,
    error: string | null
  }
  ```
- **Actions:** `FETCH_START`, `FETCH_SUCCESS`, `FETCH_ERROR`
- **Cleanup:** Uses `AbortController` to cancel stale requests

---

## 🌐 Context API

### EmojiContext (`contexts/EmojiContext.jsx`)
- **Purpose:** Share mood state across components
- **State:** `isHappy` (boolean)
- **Actions:** `handleChangeMood()` (toggles mood)
- **Usage:** Wrap components with `<EmojiProvider>` to access context

```jsx
// In any component:
const { isHappy, handleChangeMood } = useContext(EmojiContext);
```

---

## 🔌 API Routes

### CoinGecko Proxy (`app/api/coingecko/route.js`)
- **Method:** GET
- **Purpose:** Proxy requests to CoinGecko API (avoids CORS issues)
- **Query Params:**
  - `ids` — Cryptocurrency ID (e.g., `bitcoin`)
  - `vs_currencies` — Currency code (e.g., `usd`, `eur`)
- **Example:** `/api/coingecko?ids=bitcoin&vs_currencies=usd`

---

## 🎨 Styling

### Global Styles (`app/globals.css`)
Organised into categories:
1. **CSS Variables & Color Scheme** — Theme colors, dark mode
2. **Global Reset & Base Styles** — HTML/body defaults
3. **Navigation Bar Styles** — `.NavBar` component
4. **Bitcoin Rates Component Styles** — `.BitcoinRates` (Man Utd themed)
5. **Animations** — Keyframe animations
6. **Emoji Component Styles** — `.emoji-text`
7. **Home Page Logo Styles** — `.logo`

### Module CSS (`app/page.module.css`)
- Scoped CSS for home page only
- Uses CSS variables for theming
- Supports dark mode via `prefers-color-scheme`

---

## 🛠️ Key Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.1 | React framework with App Router |
| React | 19.2.4 | UI library |
| CSS3 | — | Styling with variables & flexbox |

---

## � Deployment

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps — built by the same team.

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/first-next-app.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click **New Project**
   - Import your GitHub repository
   - Click **Deploy**

3. **Done!** Your app is live at `https://your-app.vercel.app`

**Environment Variables:** If you add any API keys, set them in Vercel dashboard under **Settings → Environment Variables**.

---

### Option 2: Netlify

1. **Build the app locally first:**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **Configure build settings** when prompted:
   - Build command: `npm run build`
   - Publish directory: `.next`

---

### Option 3: Docker

For full control, containerise your app:

1. **Create a `Dockerfile`:**
   ```dockerfile
   FROM node:20-alpine AS base

   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package.json package-lock.json* ./
   RUN npm ci

   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV=production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   USER nextjs
   EXPOSE 3000
   ENV PORT=3000
   CMD ["node", "server.js"]
   ```

2. **Update `next.config.mjs`:**
   ```js
   const nextConfig = {
     output: 'standalone',
   };
   export default nextConfig;
   ```

3. **Build and run:**
   ```bash
   docker build -t first-next-app .
   docker run -p 3000:3000 first-next-app
   ```

---

### Option 4: Traditional Server (PM2)

Deploy to any VPS (DigitalOcean, AWS EC2, etc.):

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Upload to server** (via SCP, FTP, or Git)

3. **Install PM2 and start:**
   ```bash
   npm install -g pm2
   npm install --production
   pm2 start npm --name "first-next-app" -- start
   pm2 save
   pm2 startup
   ```

---

### Deployment Checklist

- [ ] Test production build locally: `npm run build && npm start`
- [ ] Add all environment variables to hosting platform
- [ ] Update any hardcoded URLs or API endpoints
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Set up custom domain (optional)
- [ ] Configure CI/CD for automatic deploys on git push

---

## �📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [App Router Guide](https://nextjs.org/docs/app)
- [Server vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

---

## 🏆 Features Summary

✅ Server-side rendering with Server Components  
✅ Client-side interactivity with Client Components  
✅ Dynamic routing (`/posts/[id]`)  
✅ API routes for backend proxy  
✅ Custom hooks for reusable logic  
✅ Context API for global state  
✅ Parallel data fetching with `Promise.all()`  
✅ Error boundaries (`posts/error.js`)  
✅ Responsive CSS with dark mode support  
✅ Manchester United theming  

---

Built with ❤️ for Man Utd developers
