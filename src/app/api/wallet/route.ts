import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"; 

export async function GET(request: Request) {
  const session = await auth.api.getSession(request);

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId: userId },
    });

    if (wallet) {
      return NextResponse.json(wallet);
    }

    console.log(`No wallet found for user ${userId}. Creating one...`);

    const minBalance = 10000;
    const maxBalance = 50000;
    const randomBalance = Math.floor(Math.random() * (maxBalance - minBalance + 1)) + minBalance;

    const newWallet = await prisma.wallet.create({
      data: {
        userId: userId,
        balance: randomBalance,
      },
    });

    return NextResponse.json(newWallet);

  } catch (error) {
    console.error("Error finding or creating wallet:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}