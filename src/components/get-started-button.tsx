"use client"

import { useSession } from "@/lib/auth-client"; 
import Link from "next/link";

export const GetStartedButton = () => {
    const {data: session, isPending}= useSession();
    if (isPending){
        return (
            <div className="mt-10 flex justify-center">
          <a
            href="/auth/signup"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700"
         >
            Get Started for Free
          </a>
        </div>
        )
    }
    const href = session ? "/dashboard" : "auth/login";
    return (
        <div className="mt-10 flex justify-center">
            <div className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700">
            <Link href ={href} > Get Started</Link>
        </div>
        </div>
    )
}