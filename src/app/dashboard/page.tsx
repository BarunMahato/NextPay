// file: src/app/dashboard/page.tsx

import { SignOutButton } from '@/components/sign-out-button';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getOrCreateWallet } from '@/lib/wallet';
import { SendMoneyForm } from '@/components/sendMoneyForm';
import { WalletIcon } from 'lucide-react'; 

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if(!session?.user){ 
    return redirect("/auth/login");
  }

  const wallet = await getOrCreateWallet(session.user.id);

  if (!wallet) {
    console.error("Failed to load wallet for user:", session.user.id);
  }

  const getUserDisplayName = () => {
    const fullName = session.user?.name;
    if (fullName) {
      return fullName.split(' ')[0]; 
    }
    return session.user?.email || "User"; 
  };

  const displayName = getUserDisplayName();

  const formattedBalance = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(wallet?.balance || 0);
  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-4xl">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {displayName}.
          </h1>
          <SignOutButton />
        </div>

        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <WalletIcon className="w-5 h-5 mr-2 text-indigo-600" />
            Your Wallet
          </h2>
          <div className="text-4xl font-bold text-gray-900">
            {formattedBalance}
          </div>
          <p className="text-gray-600 mt-1">Available Balance</p>
        </div>

        <div className="mb-8">
          <SendMoneyForm />
        </div>


        // Shows session information

        {/* <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Session Info
          </h2>
          <p className="text-gray-700">
            This is your secure session data.
          </p>
          <pre className="mt-6 p-4 bg-gray-100 rounded text-sm overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div> */}
        
      </div>
    </div>
  );
}