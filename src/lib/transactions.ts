import { prisma } from "@/lib/prisma";

export async function getTransactionHistory(userId: string) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        sender: {
          select: { name: true, email: true }
        },
        receiver: {
          select: { name: true, email: true }
        }
      },
      orderBy: {
        timestamp: 'desc'
      },
      take: 10 
    });

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}