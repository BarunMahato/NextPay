import { ForgotPasswordForm } from "@/components/forgot-password-form";
import Link from "next/link";
import { KeyRound } from "lucide-react"; 

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
        
      
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Next<span className="text-blue-600">Pay</span>
          </h1>
        </div>

     
        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <KeyRound className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Forgot Password
          </h2>
          <p className="text-sm text-center text-gray-600">

            Please enter your email address to receive a password reset link.
          </p>
        </div>

       
        <ForgotPasswordForm />

       
        <div className="text-center">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}