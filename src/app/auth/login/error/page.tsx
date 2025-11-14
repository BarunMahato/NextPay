import { AlertTriangle } from "lucide-react"; 


interface PageProps {
  searchParams: Promise<{ error: string }>;
}


export default async function Page({ searchParams }: PageProps) {
 
  const error = (await searchParams).error;

  const errorMessage =
    error === "account_not_linked"
      ? "This account is already linked to another sign-in method."
      : "Oops! Something went wrong. Please try again.";

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
       
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Next<span className="text-blue-600">Pay</span>
          </h1>
        </div>

       
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Authentication Error
        </h2>

       
        <div className="p-4 text-center bg-red-50 rounded-lg border border-red-200">
          <div className="flex flex-col items-center space-y-3">
            <AlertTriangle className="w-10 h-10 text-red-600" />
            
           
            <p className="text-red-700 font-medium">
              {errorMessage}
            </p>
          </div>
        </div>

       
        <div className="pt-4">
          <a
            href="/auth/login"
            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}