"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

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
    <div key={_id} className="bg-white border-2 shadow-xl max-w-sm rounded-lg overflow-hidden m-4">
        <div className='h-auto w-auto flex justify-center items-center'>
        <img className="w-[50%] h-52 overflow-hidden" src={image} alt={title} />
        </div>
      <div className="px-6 py-4 h-full bg-gray-300">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        {/* <p className="text-gray-700 text-base mb-2">{description}</p> */}
        <p className="text-sm text-gray-700 mb-2">Brand: {brand}</p>
        <p className="text-sm text-gray-700 mb-2">Category: {category}</p>
        {oldPrice && <p className="text-sm text-gray-500 line-through">Old Price: ${oldPrice}</p>}
        <p className="text-lg font-bold text-green-600">Price: ${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
