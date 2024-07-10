"use client"

import React from 'react';
import { productsData } from '@/components/products';
import { useRouter } from 'next/navigation';

interface ProductParams {
    id: string; // Adjusted to number type
}

interface SingleProductPageProps {
    params: ProductParams;
}

const SingleProductPage: React.FC<SingleProductPageProps> = ({ params }) => {
    const { id } = params;
    
    const router = useRouter();
    // Find the product by matching id (converted to number) with _id
    const product = productsData.find(d => d._id === parseInt(id, 10));

    const paymentHandler = (id:number) => {
        router.push(`/payments/${id}`);
    }

    if (!product) {
        return <h1 className="text-3xl font-bold text-center mt-8">Product not found</h1>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full lg:w-1/2 p-6">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">{product.title}</h2>
                        <p className="text-gray-600 mb-4">{product.des}</p>
                        <div className="flex justify-between items-center mb-4">
                            {product.oldPrice && (
                                <span className="text-red-500 line-through text-lg">${product.oldPrice}</span>
                            )}
                            <span className="text-green-600 font-bold text-lg">${product.price}</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">Brand: {product.brand}</div>
                        <div className="text-sm text-gray-500">Category: {product.category}</div>
                        <div className="mt-6 flex justify-between px-3 items-center">
                            <button onClick={() => paymentHandler(product._id)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Buy Now
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;
