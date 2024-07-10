"use client";

import React from 'react';

interface ProductCardProps {
  _id: number;
  title: string;
  description: string;
  image: string;
  oldPrice: string | undefined;
  price: string;
  brand: string;
  isNew: boolean;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  _id,
  title,
  description,
  image,
  oldPrice,
  price,
  brand,
  isNew,
  category,
}) => {

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <div className="flex justify-center items-center bg-gray-100">
        <img className="w-full h-52 object-contain p-4" src={image} alt={title} />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-2">Brand: {brand}</p>
        <p className="text-sm text-gray-600 mb-2">Category: {category}</p>
        {oldPrice && <p className="text-sm text-gray-500 line-through mb-1">Old Price: ${oldPrice}</p>}
        <p className="text-lg font-semibold text-green-600">Price: ${price}</p>
        {isNew && <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full mt-2">New</span>}
      </div>
    </div>
  );
};

export default ProductCard;
