import { SignOutButton } from '@/components/sign-out-button';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){
    return redirect("/auth/login");
  }

  const getUserDisplayName = () => {
    const fullName = session.user?.name;
    if (fullName) {
      return fullName.split(' ')[0];
    }
    return session.user?.email || "User";
  };

  const displayName = getUserDisplayName();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-90CM0">
            Welcome, {displayName}.
          </h1>
        
          <SignOutButton />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Your Dashboard
          </h2>
          <p className="text-gray-700">
            This is your secure dashboard for NextPay. We will build your payment features here.
          </p>
          
          <pre className="mt-6 p-4 bg-gray-100 rounded text-sm overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Cookie Information
          </h2>
          <p className="text-gray-700">
            [This is where you would display cookie info if needed]
          </p>
        </div>
      </div>
    </div>
  );
}