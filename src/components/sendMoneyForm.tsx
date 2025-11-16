
"use client";

import { useState } from "react";

export function SendMoneyForm() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState({ type: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", content: "" });

    const transferAmount = Number(amount);
    if (transferAmount <= 0 || !email) {
      setMessage({ type: "error", content: "Please enter a valid email and amount." });
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail: email, amount: transferAmount }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", content: data.message });
        // Clear form on success
        setEmail("");
        setAmount("");
      } else {
        setMessage({ type: "error", content: data.error || "An unknown error occurred." });
      }
    } catch (error) {
      console.error("Transfer failed:", error);
      setMessage({ type: "error", content: "Failed to connect to the server." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Send Money
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Recipient's Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="friend@example.com"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount (in INR)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="100"
            min="1" 
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>

        {message.content && (
          <p className={`mt-4 text-sm ${
            message.type === "error" ? "text-red-600" : "text-green-600"
          }`}>
            {message.content}
          </p>
        )}
      </form>
    </div>
  );
}