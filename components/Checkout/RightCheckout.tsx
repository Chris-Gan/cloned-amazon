"use client";

import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import {
  selectItems,
  selectTotal,
} from "../../app/GlobalRedux/Features/basket/basketSlice";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.stripe_public_key as string);

const RightCheckout = () => {
  const items = useSelector(selectItems);
  const totalPrice = useSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // call the NextJS backend with the to create a sessionID

    const stripeCheckoutSession = await fetch("/api/create-stripe-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: items, email: session?.user?.email }),
    }).then((response) => response.json());

    // then use the session id and the stripe instance created
    // from the stripe promise above to redirect to the checkout
    // page created by stripe
    const result = await stripe?.redirectToCheckout({
      sessionId: stripeCheckoutSession.id,
    });

    if (result?.error) {
      throw result.error.message;
    }
  };
  return (
    <div className="flex flex-col bg-white p-10 shadow-sm">
      {items.length > 0 && (
        <>
          <h2 className="whitespace-nowrap">
            Subtotal ({items.length} items)
            <span className="font-bold">
              ${Math.round(totalPrice * 100) / 100}
            </span>
          </h2>

          <button
            className="button mt-2 disabled:from-gray-300 disabled:to-gray-500 disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed"
            disabled={!session}
            onClick={createCheckoutSession}
          >
            {!session ? "Sign in to checkout" : "Proceed to checkout"}
          </button>
        </>
      )}
    </div>
  );
};

export default RightCheckout;
