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
            subject: "Action Required: Reset Your NextPay Password",
            meta: {
                description: `Hello,
                <br/><br/>
                We received a request to reset the password for your NextPay account. If this was you, please click the button below to set a new password.
                <br/><br/>
                This password reset link is valid for the next 1 hour.
                <br/><br/>
                If you did not request a password reset, please safely ignore this email. Your password will not be changed.`,
                link: url,
                linkText: "Reset My Password"
            },
        });
},
    },
    emailVerification:{
        sendOnSignUp: true,
        expiresIn: 60 * 60,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            const link = new URL(url);
            link.searchParams.set("callbackURL", "/auth/verify");
            await sendEmailAction({
                to: user.email,
                subject: "Action Required: Verify Your NextPay Account",
                meta: {
                    description: `Welcome to NextPay! We're excited to have you. To complete your account setup and ensure it's secure, please verify your email address by clicking the button below.
                    <br/><br/>
                    This verification link is valid for the next 1 hours.
                    <br/><br/>
                    If you did not sign up for NextPay, please safely ignore this email.`,
                    link: String(link),
                    linkText: "Verify My Email Address"
                },
            });
        }
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
        })
    },
    socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }},
    plugins: [nextCookies()],
})
export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";