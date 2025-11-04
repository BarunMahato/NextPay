import { JSX } from 'react';
import Link from 'next/link';
import { SignupForm } from '@/components/signup-form';
import { Seperator } from '@/components/separator';
import { SignInOauthButton } from '@/components/sign-in-oauth-button';

export default function SignUpPage(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            NextPay
          </Link>
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            Create your account
          </h2>
        </div>

        <SignupForm />
        <Seperator />
        <SignInOauthButton provider="google" signUp/>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            href="/auth/login" 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}