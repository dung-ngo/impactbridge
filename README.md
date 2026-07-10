# ImpactBridge

ImpactBridge is a full-stack project, a modern web application development with authentication, protected routes, database-backed user flows, and donation-related product logic.

The project is designed as an MVP-style donation platform concept for grassroots animal welfare or community-focused initiatives.

> Status: MVP in progress
> This project is not a production payment platform yet. It focuses on full-stack architecture, authentication, database modeling, and product flow practice.

---

## Why I built this

The product idea is inspired by real bottlenecks that small rescue groups, foster homes, and grassroots animal welfare projects may face when raising funds. The project used the core parts of a real web product:

* User registration and login
* Protected dashboard pages
* Server-side session checks
* Database models and relationships
* Campaign and donation data
* Form validation
* Server actions
* Error, loading, and not-found states
* Clean project structure with reusable components

Many small groups rely on manual bank transfers, social media posts, and scattered updates. ImpactBridge explores how a simple web platform could make donation-related workflows easier to understand and manage.

---

## Core features

### Authentication

* Register new users
* Log in with credentials
* Store hashed passwords
* Manage authenticated sessions
* Protect private routes such as dashboard pages
* Redirect unauthenticated users away from protected content

### Campaign flow

* Display public campaign pages
* Show campaign title, description, image, goal amount, and current amount
* Support dynamic campaign detail routes
* Handle missing campaigns with a not-found page

### Donation flow

* Allow authenticated users to create donation records
* Validate donation amount before creating records
* Store donation data in the database
* Connect donations to users and campaigns
* Show user donation history on the dashboard

### Dashboard

* Protected dashboard for logged-in users
* Display user-specific donation data
* Show donation amount, campaign title, status, and donation date

### UI and product polish

* Reusable UI components
* Loading states
* Not-found states
* Error handling
* Responsive layout
* Minimal visual style focused on clarity

---

## Tech stack

### Frontend

* Next.js App Router
* React
* TypeScript
* Tailwind CSS

### Backend and data

* Next.js Server Actions
* Auth.js / NextAuth Credentials Provider
* Prisma ORM
* PostgreSQL
* bcryptjs for password hashing
* Zod for form validation

### Development tools

* Git
* GitHub
* Docker for local PostgreSQL
* Prisma Studio
* ESLint / TypeScript checking

---

## Database models

The project uses Prisma and PostgreSQL.

Main entities include:

### User

Represents a registered user.

Important fields:

* `id`
* `name`
* `email`
* `passwordHash`
* `role`
* `profilePicture`
* `createdAt`

### Campaign

Represents a fundraising campaign.

Important fields:

* `id`
* `creatorId`
* `title`
* `slug`
* `description`
* `goalAmountCents`
* `currentAmountCents`
* `currency`
* `status`
* `imageUrl`
* `createdAt`

### Donation

Represents a donation record connected to a user and campaign.

Important fields:

* `id`
* `campaignId`
* `donorId`
* `amountCents`
* `currency`
* `status`
* `createdAt`

---

## Project structure

Example structure:

```bash
src/
  app/
    login/
    register/
    dashboard/
    campaigns/
      [slug]/
    api/
  components/
  features/
    auth/
    campaigns/
    dashboard/
    donations/
  lib/
    auth/
    prisma/
    validations/
  generated/
    prisma/
prisma/
  schema.prisma
  seed.ts
```

The structure is organized around features so that related UI, logic, and helper functions are easier to maintain.

---

## Authentication approach

ImpactBridge uses a credentials-based authentication flow.

The login flow checks the user's email and password, compares the submitted password with the hashed password stored in the database, and creates a session when the credentials are valid.

Protected pages use server-side checks so unauthenticated users cannot access private routes only by changing the URL.

This helped me understand why server guards are more reliable than only using client-side checks.

---

## Validation approach

The project uses Zod to validate form input.

Examples of validation include:

* Required email
* Valid email format
* Required password
* Minimum password length
* Valid donation amount
* Confirm password matching during registration

Validation is handled before creating or updating records in the database.

---

## How to run locally

### 1. Clone the repository

```bash
git clone https://github.com/dung-ngo/impactbridge.git
cd impactbridge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/impactbridge_dev"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

Update the values based on your local database setup.

### 4. Run Prisma migration

```bash
npx prisma migrate dev
```

### 5. Seed the database

```bash
npx prisma db seed
```

### 6. Start the development server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Current status

The project currently focuses on:

* Full-stack architecture practice
* Authentication
* Campaign and donation records
* Protected dashboard
* Database-backed user flows
* UI polish

---

## Future improvements

Possible next steps:

* Add image upload
* Improve campaign creation flow
* Add admin or creator dashboard
* Add donation confirmation screen
* Add better empty states
* Improve accessibility
* Add tests for validation and server actions
* Add real payment or bank-transfer workflow only after product requirements are clearer
