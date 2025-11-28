import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  
  const senderId = session.user.id;
  const { toEmail, amount } = await request.json();

  if (!toEmail || !amount) {
    return NextResponse.json({ error: "Missing email or amount" }, { status: 400 });
  }

  const transferAmount = Number(amount);
  if (transferAmount <= 0) {
    return NextResponse.json({ error: "Amount must be positive" }, { status: 400 });
  }

  const recipient = await prisma.user.findUnique({
    where: { email: toEmail },
  });

  if (!recipient) {
    return NextResponse.json({ error: "Recipient not found" }, { status: 404 });
  }

  if (recipient.id === senderId) {
    return NextResponse.json({ error: "Cannot send money to yourself" }, { status: 400 });
  }

  try {
    await prisma.$transaction(async (tx) => {
      
      const senderWallet = await tx.wallet.findUnique({
        where: { userId: senderId },
      });

      if (!senderWallet || senderWallet.balance < transferAmount) {
        throw new Error("Insufficient funds");
      }

      await tx.wallet.update({
        where: { userId: senderId },
        data: { balance: { decrement: transferAmount } },
      });

      await tx.wallet.update({
        where: { userId: recipient.id },
        data: { balance: { increment: transferAmount } },
      });

      await tx.transaction.create({
        data: {
          amount: transferAmount,
          senderId: senderId,
          receiverId: recipient.id,
          timestamp: new Date(), 
        }
      });
    });

    return NextResponse.json({ message: `Successfully sent ${transferAmount} to ${toEmail}` });

  } catch (error: any) {
    console.error("Transaction failed:", error);

    if (error.message === "Insufficient funds") {
      return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
    }
    
    if (error.code === 'P2025') {
       return NextResponse.json({ error: "Recipient wallet not found. The user must log in once to activate their wallet." }, { status: 404 });
    }

    return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
  }
}