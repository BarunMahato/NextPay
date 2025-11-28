import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";

type Transaction = {
  id: string;
  amount: number;
  timestamp: Date;
  senderId: string; 
  receiverId: string;
  sender: { name: string | null; email: string };
  receiver: { name: string | null; email: string };
};

export function TransactionList({ 
  transactions, 
  currentUserId 
}: { 
  transactions: Transaction[]; 
  currentUserId: string; 
}) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm">
        <Clock className="w-10 h-10 mx-auto mb-3 opacity-20" />
        <p>No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {transactions.map((tx) => {
          const isReceived = tx.receiverId === currentUserId;
          const otherUser = isReceived ? tx.sender : tx.receiver;
          
          return (
            <div key={tx.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${isReceived ? 'bg-green-100' : 'bg-red-100'}`}>
                  {isReceived ? (
                    <ArrowDownLeft className={`w-5 h-5 ${isReceived ? 'text-green-600' : 'text-red-600'}`} />
                  ) : (
                    <ArrowUpRight className={`w-5 h-5 ${isReceived ? 'text-green-600' : 'text-red-600'}`} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {isReceived ? "Received from" : "Sent to"} {otherUser.name || otherUser.email.split('@')[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                   {new Date(tx.timestamp).toLocaleDateString()} at {new Date(tx.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
              
              <div className={`font-bold ${isReceived ? 'text-green-600' : 'text-gray-900'}`}>
                {isReceived ? "+" : "-"} 
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  minimumFractionDigits: 0,
                }).format(tx.amount)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}