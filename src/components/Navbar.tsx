"use client"

import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {

  const { user, isSignedIn } = useUser();

  return (
    <nav className="bg-yellow-400 bg-opacity-60 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                E-Store 🛒
              </Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/electronics" className="border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold">
                Electronics
              </Link>
              <Link href="/home-decoration" className="border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold">
                Home Decoration
              </Link>
              <Link href="/beauty-products" className="border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold">
                Beauty Products
              </Link>
              <Link href="/fashion" className="border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold">
                Fashion
              </Link>
              {/* Add more categories as needed */}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/cart" className="text-gray-500 hover:text-gray-700">
              <FaShoppingCart className="h-6 w-6" aria-hidden="true" />
            </Link>
            {
              isSignedIn ? <UserButton/> : <Link href={"/sign-in"} className=' font-bold text-gray-500 hover:text-gray-700'>Login</Link>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
