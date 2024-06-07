"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "@/lib/supabase/products";
import { useAppSelector } from "@/hooks/redux";
import { getCart } from "@/redux/cartSlice";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
  image: string;
  rating: number;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

const OrderSummary = () => {
  const cart = useAppSelector(getCart);

  let totalprice = 0;
  cart.forEach((item: Product) => {
    totalprice += item.price * item.quantity;
  });

  const createStripeSession = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const stripe = await stripePromise;
    //
    const checkoutSession = await axios.post("/api/checkout-sessions", {
      items: cart,
      email: user?.email,
    });

    // redirect to checkout session
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result?.error) {
      console.log(result.error.message);
    }
  };
  return (
    <div className="border border-gray p-4 mt-5 h-fit">
      <div>
        <h1 className="font-bold ">Order Summary</h1>
        <div>
          <div className="flex items-center justify-between">
            <p>items</p>
            <p>price</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Delivery:</p>
            <p>₹40.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Total:</p>
            <p>₹789.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Promotion Applied:</p>
            <p>-₹40.00</p>
          </div>
          <div className="flex justify-between text-2xl font-bold text-[#B12704] py-2 border-t border-b border-gray-300 my-1">
            <h1>Order Total: </h1>
            <h1>{totalprice}</h1>
          </div>
        </div>
        <button
          onClick={createStripeSession}
          className="bg-[#FFD814] w-full rounded-md px-4 py-1 my-3"
        >
          Place your Order Now
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
