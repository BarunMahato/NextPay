/* app/dashboard/page.tsx */

import { SignOutButton } from '@/components/sign-out-button';
import { auth } from '@/lib/auth'; // Our main server config
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  // 1. Get the session on the server
  const session = await auth.api.getSession({
    headers: await headers()
  })

  // 2. If no session, redirect to login
  if(!session){
    return <h1>Unauthorized</h1>
  }
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-4xl">
        {/* --- Header --- */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome,
          </h1>

        </div>

        {/* --- Main Dashboard Content --- */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Your Dashboard
          </h2>
          <p className="text-gray-700">
            This is your secure dashboard for NextPay. We will build your payment features here.
          </p>
          
          {/* A simple session data display for debugging */}
          <pre className="mt-6 p-4 bg-gray-100 rounded text-sm overflow-auto">
           
          </pre>
        </div>
      </div>
      <div>
        <SignOutButton />
      </div>
      <div>
        <h1>Displaying Cookie information</h1>
        {JSON.stringify(session, null, 2)}
      </div>
    </div>
  );
}