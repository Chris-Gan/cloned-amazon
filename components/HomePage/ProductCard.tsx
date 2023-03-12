"use client";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../app/GlobalRedux/Features/basket/basketSlice";

type Props = {
  product: Product;
};

const MAX_RATING = 5;
const MIN_RATING = 1;

const ProductCard = ({ product }: Props) => {
  const { title, description, price, image, category } = product;
  const [rating, setRating] = useState(0);
  const [hasPrime, setHasPrime] = useState(false);

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ ...product, hasPrime, rating }));
  };

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setHasPrime(Math.random() < 0.5);
  }, []);
  return (
    <div className="flex flex-col relative m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        alt={title}
        height={200}
        width={200}
        className="object-contain"
      />
      <h4 className="my-4">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">$ {price}</div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
};

export default ProductCard;
