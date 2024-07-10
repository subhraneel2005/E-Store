"use client";

import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const { user, isSignedIn } = useUser();

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-yellow-500">
              E-Store 🛒
            </Link>
            <div className="hidden md:flex md:space-x-6 ml-6">
              {user && <Link href="/dashboard" className="hover:text-yellow-500 text-[13px]">
                Admin Dashboard
              </Link>}
              <Link href="/electronics" className="hover:text-yellow-500 text-[13px]">
                Electronics
              </Link>
              <Link href="/home-decoration" className="hover:text-yellow-500 text-[13px]">
                Home Decoration
              </Link>
              <Link href="/beauty-products" className="hover:text-yellow-500 text-[13px]">
                Beauty Products
              </Link>
              {/* Add more categories as needed */}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-white rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 w-80 text-black"
              />
              <button className="bg-yellow-500 px-4 py-2">
                <FaSearch className="text-gray-900" />
              </button>
            </div>
            <Link href="/cart" className="text-white relative">
              <FaShoppingCart className="h-6 w-6" aria-hidden="true" />
              {/* Add a cart counter badge here if needed */}
            </Link>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link href="/sign-in" className="font-bold hover:text-yellow-500">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-800 py-2 md:hidden">
        <div className="flex justify-center space-x-4">
          <Link href="/electronics" className="hover:text-yellow-500">
            Electronics
          </Link>
          <Link href="/home-decoration" className="hover:text-yellow-500">
            Home Decoration
          </Link>
          <Link href="/beauty-products" className="hover:text-yellow-500">
            Beauty Products
          </Link>
          <Link href="/fashion" className="hover:text-yellow-500">
            Fashion
          </Link>
          {/* Add more categories as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
