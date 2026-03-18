import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { prisma } from "./prisma";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { normalizeName } from "./utiils";
import { sendEmailAction } from "@/app/actions/send-email.action";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
    provider: "postgresql",
    }),
     emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");

      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
          description:
            "Please verify your email address to complete the registration process.",
          link: String(link),
        },
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Reset your password",
        meta: {
          description: "Please click the link below to reset your password.",
          link: String(url),
        },
      });
    },
  },
    
    session: {
        expiresIn: 60 * 30,
    },
    advanced: {
        database: {
        generateId: false,
        }
    },
    hooks:{
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/sign-up/email"){
                const name = normalizeName(ctx.body.name)
                return {
                    context: {
                        ...ctx,
                        body: {
                            ...ctx.body,
                            name,
                        },
                    },
                };
            }
        }),
        after: createAuthMiddleware(async (ctx) => {
            // 1. Check if the hook was triggered by a signup endpoint
            if (ctx.path.startsWith("/sign-up")) {
                
                // 2. A successful signup creates a new session.
                //    We can get the new user from this session.
                const newSession = ctx.context.newSession;
                if (newSession && newSession?.user) {
                const userId = newSession.user.id;

                // 3. Generate a random starting balance
                const minBalance = 10000;
                const maxBalance = 50000;
                const randomBalance = Math.floor(Math.random() * (maxBalance - minBalance + 1)) + minBalance;
                console.log(randomBalance);
                // 4. Create the wallet in your database
                try {
                    await prisma.wallet.create({
                    data: {
                            userId: userId,
                        balance: randomBalance,
                    },
                    });
                    console.log(`Wallet created for new user ${userId} with balance ${randomBalance}`);

                } catch (error) {
                    console.error(`Failed to create wallet for user ${userId}:`, error);
                    // Even if this fails, we don't want to break the user's
                    // login, so we just log the error.
                }
                }
            }
        }),
    },
    socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }},
    plugins: [nextCookies()],
})
export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";