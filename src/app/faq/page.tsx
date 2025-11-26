"use client";

import { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is NextPay?",
      answer:
        "NextPay is a peer-to-peer payment app that allows users to send and receive money instantly with zero hassle."
    },
    {
      question: "Is NextPay secure?",
      answer:
        "Yes. All transactions are encrypted and handled with banking-grade security to protect your financial data."
    },
    {
      question: "Are there any fees for transfers?",
      answer:
        "No. NextPay does not charge any additional fees for user-to-user payments."
    },
    {
      question: "How fast are the payments?",
      answer:
        "Most payments are processed instantly, allowing users to transfer money within seconds."
    },
    {
      question: "Can I cancel a payment?",
      answer:
        "Instant transfers cannot be reversed once sent, but pending transfers can be cancelled from your dashboard."
    }
  ];

  return (
    <section className="w-full max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">NextPay FAQ</h1>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="font-semibold text-lg">{item.question}</span>
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>

            {openIndex === index && (
              <p className="mt-3 text-gray-700">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
