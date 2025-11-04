import { createAuthClient } from "better-auth/client";
import type { auth } from "@/lib/auth";

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const{
    signIn,
    signUp,
    signOut
} = authClient