# NextPay 💸

**NextPay** is a high-performance, full-stack Peer-to-Peer (P2P) payment application designed for secure and instant financial transfers. Built with a modern tech stack, it features robust authentication, atomic database transactions, and automated wallet initialization.

---

## 🚀 Key Features

* **Secure P2P Transfers:** Atomic database transactions ensure data integrity—money is never lost or duplicated during transfers.
* **Automated Wallet System:** New users are automatically provisioned a wallet with a randomized starting balance (₹10,000 - ₹50,000) via custom **Better Auth hooks**.
* **Robust Authentication:** Implemented **Better Auth** with Email/Password and Google OAuth, featuring secure **Argon2** password hashing.
* **Email Verification:** Automated onboarding flow with custom-styled email templates for account verification and password resets.
* **Server-Side Security:** Middleware-protected routes and centralized API error handling for high-reliability financial operations.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 15 (App Router), Tailwind CSS
* **Backend:** Node.js, Next.js Server Actions, Route Handlers
* **Database:** PostgreSQL (via Prisma ORM)
* **Auth:** Better Auth (with Prisma Adapter and Next.js Plugins)
* **Security:** Argon2 for password hashing, TypeScript for end-to-end type safety
* **Email:** Custom `send-email` actions (Integrated with Nodemailer)

---

## 🏗️ Architecture Highlights

### 1. Transaction Integrity
NextPay utilizes Prisma’s `$transaction` API to ensure that when money is sent, both the sender's debit and the receiver's credit happen simultaneously or not at all—preventing "ghost money" errors.

### 2. Event-Driven Onboarding
Using Better Auth's `after` hooks, the system intercepts successful signups to trigger secondary processes like wallet creation and balance seeding.

<pre>
// Example logic from auth.ts
after: createAuthMiddleware(async (ctx) => {
    if (ctx.path.startsWith("/sign-up")) {
        const userId = ctx.context.newSession.user.id;
        await prisma.wallet.create({
            data: { 
                userId: userId, 
                balance: randomBalance 
            }
        });
    }
})
</pre>

## ⚙️ Local Setup

### 1.  Clone the setup

<pre>
git clone https://github.com/BarunMahato/NextPay
cd next-pay
</pre>

### 2. Install Dependencies:

<pre>
npm install
</pre>

### 3. Environment variables

Create a .env file in the root directory

<pre>
DATABASE_URL="your_postgres_url"
BETTER_AUTH_SECRET="your_secret"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your_google_id"
GOOGLE_CLIENT_SECRET="your_google_secret"
NODEMAILER_USER="gmail"
NODEMAILER_APP_PASSWORD="passkey"
NODE_ENV = "production" //Once you deploy the code implement it
</pre>

### 4. Database Migration:

<pre>
npx prisma migrate dev
</pre>

### 5. Run Development Server:

<pre>
npm run dev
</pre>

🛡️ License
Distributed under the MIT License. See LICENSE for more information.

Developed by Barun Mahato Computer Engineering Student @ Jain (Deemed-to-be University)