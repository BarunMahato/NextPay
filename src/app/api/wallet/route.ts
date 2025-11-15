// file: e.g., src/app/api/wallet/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Your Better Auth instance
import { prisma } from "@/lib/prisma"; // Your Prisma client

export async function GET(request: Request) {
  // 1. Get the current user's session
  const session = await auth.api.getSession(request);

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // 2. Try to find an existing wallet for this user
    const wallet = await prisma.wallet.findUnique({
      where: { userId: userId },
    });

    // 3. If the wallet already exists, return it
    if (wallet) {
      return NextResponse.json(wallet);
    }

    // 4. If NO wallet exists, create it NOW
    console.log(`No wallet found for user ${userId}. Creating one...`);

    // Generate the random balance
    const minBalance = 10000;
    const maxBalance = 50000;
    const randomBalance = Math.floor(Math.random() * (maxBalance - minBalance + 1)) + minBalance;

    const newWallet = await prisma.wallet.create({
      data: {
        userId: userId,
        balance: randomBalance,
      },
    });

    // 5. Return the newly created wallet
    return NextResponse.json(newWallet);

  } catch (error) {
    console.error("Error finding or creating wallet:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}