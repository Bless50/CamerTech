# 🔧 Technician Booking Platform

A web platform that connects people with trusted technicians for home services, electronics, auto repair, plumbing, and more.

---

## 📚 Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Environment Setup](#environment-setup)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [API Reference](#api-reference)
* [Testing](#testing)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)
* [Support](#support)

---

## ✨ Features

### For Customers

* Search technicians by service, location, and availability
* Book services in real time
* Transparent CFA pricing
* Rate and review technicians
* Pay securely online
* Track service progress live
* Satisfaction guaranteed

### For Technicians

* Analytics dashboard for performance insights
* Manage profile and service offerings
* Monitor earnings in real time
* See how you rank in the industry
* Mobile-friendly dashboard
* Instant booking alerts
* Fast payouts (within 24 hours)

### For Admins

* Manage users and providers
* Monitor platform metrics
* Review and verify provider credentials
* Track platform revenue
* Add or update service categories
* Access real-time business analytics

---

## 🛠 Tech Stack

### Frontend

* **Next.js 14 (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide Icons**
* **Recharts**

### Backend

* **Node.js + Next.js API Routes**
* **PostgreSQL (via Neon or Supabase)**
* **NextAuth.js** for authentication
* **Vercel Blob** for file storage
* **Resend** for emails

### Dev Tools

* ESLint + Prettier
* TypeScript
* npm / yarn
* Git

---

## 🧰 Getting Started

### Prerequisites

Install these tools first:

* Node.js (v18+)
* npm (v8+) or yarn (v1.22+)
* Git (v2+)
* PostgreSQL (optional if using Neon/Supabase)

### Installation

```bash
git clone https://github.com/Joeltabe/camrtech.git
cd technician-booking-platform

npm install      # or yarn install

cp .env.example .env.local

npm run db:migrate    # if using a local database

npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🔐 Environment Setup

Edit `.env.local`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/technician_booking"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

RESEND_API_KEY="..."
FROM_EMAIL="..."

BLOB_READ_WRITE_TOKEN="..."

STRIPE_SECRET_KEY="..."
STRIPE_PUBLISHABLE_KEY="..."

OPENAI_API_KEY="..."
GOOGLE_ANALYTICS_ID="..."
```

Choose one for the database:

* **Neon**: Free, fast, cloud Postgres
* **Supabase**: Real-time and scalable
* **Local PostgreSQL**: Manual setup

---

## 💻 Usage

### Dev Scripts

```bash
npm run dev          # Start local server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Lint code
npm run type-check   # TypeScript check
npm run test         # Run tests
```

### App URLs

* `/` — Home
* `/search` — Search for technicians
* `/services` — View available services
* `/how-it-works` — Guide
* `/admin` — Admin dashboard
* `/dashboard/customer` — Customer dashboard
* `/dashboard/technician` — Provider dashboard

---

## 📁 Project Structure

```
├── app/                → Pages & routes
│   ├── api/            → API handlers
│   ├── admin/          → Admin views
│   ├── dashboard/      → Customer and provider views
│   └── ...             
├── components/         → UI components
├── lib/                → Utilities and helpers
├── hooks/              → Custom React hooks
├── types/              → TypeScript types
├── public/             → Static files
├── scripts/            → DB migration scripts
```

---

## 📡 API Reference

### Auth

* `POST /api/auth/signin`
* `POST /api/auth/signup`
* `POST /api/auth/signout`

### Bookings

* `GET /api/bookings`
* `POST /api/bookings`
* `PUT /api/bookings/[id]`
* `DELETE /api/bookings/[id]`

### Providers

* `GET /api/providers`
* `POST /api/providers`
* `PUT /api/providers/[id]`

### Admin

* `GET /api/admin/analytics`
* `GET /api/admin/users`
* `PUT /api/admin/users/[id]`

---

## 🦪 Testing

### Run Tests

```bash
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

### Example

```ts
import { formatCurrency } from '@/lib/currency'

test('format CFA', () => {
  expect(formatCurrency(1000, 'CFA')).toBe('1,000 CFA')
})
```

Test folders:

* `__tests__/unit/`
* `__tests__/integration/`
* `__tests__/e2e/`

---

## 🚀 Deployment

### Vercel (Recommended)

* Connect GitHub repo
* Add env vars via Vercel dashboard
* Deploy on push to main

### Manual

```bash
npm run build
npm start
```

---

## 🤝 Contributing

### Steps

* Fork the repo
* Create a feature branch
* Write code + tests
* Commit using [Conventional Commits](https://www.conventionalcommits.org/)
* Push and open a PR

### Commit Types

* `feat:` New features
* `fix:` Bug fixes
* `docs:` Docs only
* `test:` Test updates
* `chore:` Internal updates

### Guidelines

* Use TypeScript
* Keep UI responsive
* Follow linting/formatting rules
* Write clear commit messages

---

## 🗒 License

This project uses the **MIT License**.

✔ Free to use, modify, and distribute
❌ No warranty or liability

---

## 🚘 Support

### Need Help?

* Review this README
* Check code comments
* Open a GitHub issue
* Email: `support@technicianplatform.com`

When reporting:

* List your OS and Node version
* Show steps to reproduce
* Include logs or screenshots

---

## 🙌 Acknowledgments

* Next.js
* Vercel
* Tailwind CSS
* shadcn/ui
* Open source contributors

---

**Built by Lucenex Technologies**
Visit [technicianplatform.com](https://technicianplatform.com)
Follow [@technicianplatform](https://twitter.com/technicianplatform)
