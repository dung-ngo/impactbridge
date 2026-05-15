# ImpactBridge

ImpactBridge is a fullstack donation platform for campaigns, donors, pledges, and impact tracking.

## Current Sprint Stack

- Next.js App Router
- TypeScript
- PostgreSQL
- Prisma ORM
- Tailwind CSS
- Stripe test mode later
- Auth.js/NextAuth later
- Vercel deployment later

## Core Roles

- Admin
- Campaign Creator
- Donor

## MVP Features

### Core MVP for June 12

- User authentication
- Role-based access control: Admin, Campaign Creator, Donor
- Campaign creation, editing, draft saving, and publishing
- Public campaign listing page
- Public campaign detail page
- Pledge flow
- One-time donation flow with Stripe test mode
- Donor dashboard
- Creator dashboard
- Admin dashboard
- Hall of Fame leaderboard
- Basic responsive design
- Production deployment
- Portfolio README and demo video

### Stretch Goals

These features are valuable, but only after the core MVP is stable:

- Recurring donations
- AI campaign analysis
- Email receipts
- Campaign approval/moderation
- Advanced analytics
- Image upload

## Architecture Direction

This sprint uses a Next.js fullstack architecture.

- UI: React components inside Next.js
- Backend: Next.js Route Handlers
- Database: PostgreSQL accessed through Prisma
- Auth: planned with Auth.js/NextAuth
- Payments: planned with Stripe test mode

## Engineering Principles Practiced

- KISS
- YAGNI
- Separation of Concerns
- Single Responsibility
- Least Privilege
- Fail Fast
- Secure by Default

## RUN COMMANDS

### Run dev database:

- docker compose -f docker-compose.dev.yml up -d

### Run backend

- cd backend
- go run ./cmd/api

### Run frontend

- cd frontend
- npm run dev

## DOCKER COMMANDS

- Check: docker ps
- Shutdown: docker ps
- Shutdown & delete database: docker compose -f docker-compose.dev.yml down -v
