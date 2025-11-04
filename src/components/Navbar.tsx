/* components/Navbar.tsx */
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md">
      {/* This 'container mx-auto' div is what "centers" the whole thing.
        It creates a block in the middle of the screen.
      */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* This is the 1st item (pushed to the LEFT) */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          MyPayApp
        </Link>

        {/* This is the 2nd item (pushed to the RIGHT) */}
        <div className="flex gap-4 items-center">
          <Link
            href="/auth/signup"
            className="text-gray-600 hover:text-indigo-600 font-medium"
          >
            Sign Up
          </Link>
          <Link
            href="/auth/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}