import { JSX } from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/login-form';
import { Seperator } from '@/components/separator';
import { SignInOauthButton } from '@/components/sign-in-oauth-button';

export default function LoginPage(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            NextPay
          </Link>
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            Log in to your account
          </h2>
        </div>

        <LoginForm />
        <Seperator />
        <SignInOauthButton provider="google" />
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link 
            href="/auth/signup" 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}