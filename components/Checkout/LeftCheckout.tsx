"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems } from "../../app/GlobalRedux/Features/basket/basketSlice";
import CheckoutProductCard from "./CheckoutProductCard";

const LeftCheckout = () => {
  const items = useSelector(selectItems);
  return (
    <div className="flex-grow m-5 shadow-sm">
      <Image
        src="https://links.papareact.com/ikj"
        className="object-contain"
        width={1020}
        height={250}
        alt="ads"
      />
      <div className="flex flex-col p-5 space-y-10 bg-white">
        <h1 className="text-3xl border-b pb-4">
          {items.length ? "Shopping Basket" : "Your Amazon Basket is empty."}
        </h1>
        {items.map((product, index) => {
          return (
            <CheckoutProductCard
              key={`${product.id} ${index}`}
              item={product}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LeftCheckout;
