"use client";

import React from 'react';
import { productsData } from "@/components/products";
import ProductCard from './ProductCard';
import { useRouter } from 'next/navigation';
import SkeletonLoader from './SkeletonLoader';
import { useUser } from '@clerk/nextjs';

function Homepage() {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  const { user } = useUser();

  const dashoardHandler = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto p-4">
          <img 
            onClick={dashoardHandler} 
            src="https://images.pexels.com/photos/5632408/pexels-photo-5632408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
            alt="bannerImage" 
            className="w-full h-[190px] cursor-pointer md:h-[270px] object-cover"
          />
        </div>
      </header>
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productsData.map((product) => (
            product ? (
              <div key={product._id} onClick={() => handleClick(product._id)}>
                <ProductCard
                  _id={product._id}
                  title={product.title}
                  image={product.image}
                  brand={product.brand}
                  category={product.category}
                  description={product.des}
                  isNew={product.isNew}
                  oldPrice={product.oldPrice}
                  price={product.price}
                />
              </div>
            ) : <SkeletonLoader key={Math.random()} />
          ))}
        </div>
      </main>
      <footer className="bg-gray-800 text-white shadow-md mt-8">
        <div className="container mx-auto p-4 text-center">
          <p className="text-sm">© 2024 Your E-commerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
