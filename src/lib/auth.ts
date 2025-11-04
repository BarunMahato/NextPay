import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { hashPassword, verifyPassword } from "@/lib/argon2";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
    provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        autoSignIn: false,
        password: {
        hash: hashPassword,
        verify: verifyPassword,
        }
    },
    advanced: {
        database: {
        generateId: false,
        }
    },
    socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }}
})
export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";