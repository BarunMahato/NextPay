"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
// Updated import path from alias to relative
import { signInEmailAction } from "../app/actions/sign-in-email.action";
import Link from "next/link"; // Added for the "Forgot password?" link

export const LoginForm = () => {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        setIsPending(true);

        const formData = new FormData(evt.currentTarget);

        const { error } = await signInEmailAction(formData);

        if (error) {
        toast.error(error);
        setIsPending(false);
        } else {
        toast.success("Login successful. Good to have you back.");
        router.push("/dashboard");
        }
    }
    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email Field */}
            <div>
                <label
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
                >
                Email Address
                </label>
                <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="you@example.com"
                />
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label
                    htmlFor="password" 
                    className="block text-sm font-medium text-gray-700"
                    >
                    Password
                    </label>
                    <div className="text-sm">
                        <Link
                            href="/auth/forgot-password"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password" 
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="••••••••"
                />
            </div>

            <div>
                <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isPending}
                >
                    {isPending ? "Logging in..." : "Log In"}
                </button>
            </div>
        </form>
    )
}