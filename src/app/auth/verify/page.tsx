import { ReturnButton } from "@/components/return-button"
import { SendVerificationEmailForm } from "@/components/send-verification-email-form";
import { redirect } from "next/navigation";
import { MailWarning } from "lucide-react"; 

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error;

  
  if (!error) {
    redirect("/profile");
  }

  
  const formattedError = error.replace(/_/g, " ").replace(/-/g, " ");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Next<span className="text-blue-600">Pay</span>
          </h1>
        </div>


        <div className="space-y-4">
          <ReturnButton href="/auth/login" label="Back to Login" />
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
            Verify Your Email
          </h2>
        </div>

        
        <div className="p-4 text-center bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900">
          <div className="flex flex-col items-center space-y-3">
            <MailWarning className="w-10 h-10 text-red-600" />
            <p className="text-red-700 dark:text-red-300 font-medium text-sm">
              <span className="capitalize">{formattedError}</span>.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please request a new verification email below.
            </p>
          </div>
        </div>
        <SendVerificationEmailForm />
      </div>
    </div>
  );
}