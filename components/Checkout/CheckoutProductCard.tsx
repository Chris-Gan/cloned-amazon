"use client";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
} from "../../app/GlobalRedux/Features/basket/basketSlice";

type Props = {
  item: Product;
};
const CheckoutProductCard = ({ item }: Props) => {
  const { id, description, image, title, price, rating, hasPrime } = item;
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket(item));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket(id));
  };
  return (
    <div className="grid grid-cols-5">
      <Image
        className="object-contain"
        src={image}
        width={200}
        height={200}
        alt={`${title} image`}
      />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <StarIcon key={`${id}-${i}`} className="text-yellow-500 h-5" />
            ))}
        </div>
        <p className="text-sm my-2 line-clamp-3">{description}</p>
        <p>$ {price}</p>

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-auto">
        <button onClick={addItemToBasket} className="button">
          Add to Basket
        </button>
        <button onClick={removeItemFromBasket} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
