"use client"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { productsData } from '@/components/products';

import convertToSubCurrency from "@/components/convertToSubCurrency";
import Checkout from "@/components/Checkout";

interface ProductParams {
    id: string; 
}

interface SingleProductPageProps {
    params: ProductParams;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

if(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined){
  throw new Error("Stripe publishable key is not defined")
};

const SinglePaymentPage: React.FC<SingleProductPageProps> = ({ params }) => {
    const { id } = params;

    // Find the product by matching id (converted to number) with _id
    const product = productsData.find(d => d._id === parseInt(id, 10));

    if (!product) {
        return <h1 className="text-3xl font-bold text-center mt-8">Product not found</h1>;
    }

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row items-center lg:items-start bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full lg:w-1/2 m-6">
                <div className="w-full">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
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
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full lg:w-1/2 m-6 p-6">
                <Elements stripe={stripePromise}
                  options={{
                    mode: "payment",
                    amount:convertToSubCurrency(product.price),
                    currency: "usd"
                  }}
                >
                <Checkout amount={product.price} name={product.title} />
                </Elements>
            </div>
        </div>
    );
};

export default SinglePaymentPage;
