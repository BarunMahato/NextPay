import { prisma } from "@/lib/prisma";

export async function getOrCreateWallet(userId: string) {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId: userId },
    });

    if (wallet) {
      return wallet;
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

    return newWallet;

  } catch (error) {
    console.error("Error finding or creating wallet:", error);
    return null;
  }
}