import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { GoogleIcon } from "./google-icon";

interface SignInOauthButtonProps {
  provider: "google";
  signUp?: boolean;
}

export const SignInOauthButton = ({
  provider,
  signUp,
}: SignInOauthButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);

    await signIn.social({
      provider,
      callbackURL: "/profile",
      errorCallbackURL: "/auth/login/error",
    });

    setIsPending(false);
  }

  const action = signUp ? "Up" : "In";
  //Add on some logic if login is meant to be done by other providers too.
  const providerName = provider;

  return (
        <div>
          <button
            onClick = {handleClick}
            disabled={isPending}
            type="button"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign {action} with {providerName}
          </button>
        </div>
  );
};