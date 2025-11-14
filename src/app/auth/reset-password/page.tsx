import { ResetPasswordForm } from "@/components/reset-password-form";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const token = (await searchParams).token;

  if (!token) {
    redirect("/auth/login");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Next<span className="text-blue-600">Pay</span>
          </h1>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Set a New Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your new password. Make sure it is at least 6 characters.
          </p>
        </div>

        <ResetPasswordForm token={token} />

        <div className="pt-4">
          <Link
            href="/auth/login"
            className="flex w-full justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}