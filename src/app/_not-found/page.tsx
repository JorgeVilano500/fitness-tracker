'use client';
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="mt-2 text-lg text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
