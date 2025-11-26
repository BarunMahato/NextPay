NextPay 💳
A simple, fast, and secure peer-to-peer (P2P) digital wallet built with modern web technologies. NextPay allows users to create accounts, simulate bank deposits, and transfer funds to other users instantly.

🚀 Tech Stack
Framework: Next.js (App Router)

Database: PostgreSQL

ORM: Prisma

Auth: BetterAuth.js

Styling: TailwindCSS

Monorepo Tool: Turborepo

Containerization: Docker

✨ Features
User Wallet: View current balance and transaction history.

Add Funds: Simulate depositing money from a bank (OnRamp simulation).

P2P Transfer: Send money to other registered users via phone number.

Merchant View: Dedicated dashboard for merchant transaction analytics.

🛠️ Getting Started
Follow these steps to run the project locally.

1. Clone the Repositorybash
git clone https://github.com/BarunMahato/NextPay.git cd NextPay


### 2. Install Dependencies
This project uses a monorepo structure. Run `npm install` at the root to install dependencies for all apps (User App, Merchant App, Backend).
```bash
npm install
3. Start the Database
Use Docker to spin up a local PostgreSQL instance.
```

```bash

docker-compose up -d
```
4. Configure Environment Variables
You need to set up the database connection strings.

Copy .env.example to .env in packages/db.

Copy .env.example to .env in apps/user-app.

Important: Ensure the DATABASE_URL matches your Docker configuration (usually postgresql://postgres:mysecretpassword@localhost:5432/postgres).

5. Initialize Database & Seed Data
Run the migrations and seed the database with test users (Alice & Bob).

```bash

cd packages/db
npx prisma migrate dev
npx prisma db seed
cd../..
```

6. Run the Application
Start all applications (User App, Merchant App, Webhook Handler) simultaneously.

```bash

npm run dev
User App: http://localhost:3000

Merchant App: http://localhost:3001

```
🧪 Testing Transactions
Log in with the seed credentials (e.g., Phone: 1111111111, Password: alice).

Go to Transfer to send money to another user.

To simulate a bank deposit, use the Add Money tab. Note: You may need to trigger the webhook manually or use the provided "Bank Webhook" button if available in the UI to confirm the transaction status from "Processing" to "Success".


### Key Implementation Details
*   **Monorepo Structure:** The project is divided into `apps` (user-app, merchant-app) and `packages` (db, ui), managed by Turborepo to ensure efficient building and code sharing.[1, 2]
*   **Database Seeding:** The `npx prisma db seed` command is crucial as it populates the database with initial users like "Alice" and "Bob" and their balances, allowing you to test transfers immediately without manual SQL entry.[3, 4]
*   **Bank Simulation:** The app includes a "Bank Webhook Handler" to simulate the asynchronous nature of real-world banking APIs (OnRamp), requiring a status update to finalize deposits.