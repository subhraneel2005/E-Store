"use client"

import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/components/convertToSubCurrency";

type CheckoutProps = {
  amount: string;
  name: string;
};

function Checkout({ amount, name }: CheckoutProps) {

  const stripe = useStripe();
  const elements = useElements();

  const [errmessage, setErrmessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
    //   setErrmessage(submitError.message);
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}&name=${name}`
      },
    });

    setIsLoading(false);
  }

  if (!clientSecret || !elements || !stripe) {
    return <div className="loader"></div>;
  }

  return (
    <div className="flex justify-evenly items-center">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-3 rounded-xl">
        {clientSecret && <PaymentElement />}
        <button type="submit" className="bg-gray-900 text-gray-200 w-full rounded-lg px-4 py-2 mt-6">
          Pay ${amount}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
