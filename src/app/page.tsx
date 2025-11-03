import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          The Simple, Fast Way to
          <br />
          <span className="text-indigo-600">Pay & Get Paid</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Join millions using MyPayApp for secure, instant transactions.
          From paying friends to managing your business, we've got you covered.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="/auth/signup"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700"
          >
            Get Started for Free
          </a>
        </div>
      </main>
    </div>
  );
}