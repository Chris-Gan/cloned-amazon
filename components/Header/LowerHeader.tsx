import { Bars3Icon } from "@heroicons/react/24/outline";

const LowerHeader = () => {
  return (
    <div className="flex items-center bg-amazon_blue-light text-white text-sm space-x-2 p-2 pl-6">
      <p className="flex link items-center">
        <Bars3Icon className="h-6 mr-1" />
        All
      </p>
      <p className="link">Prime Video</p>
      <p className="link">Amazon Business</p>
      <p className="link">Today's Deals</p>
      <p className="link hidden lg:inline-flex">Electronics</p>
      <p className="link hidden lg:inline-flex">Food & Grocery</p>
      <p className="link hidden lg:inline-flex">Prime</p>
      <p className="link hidden lg:inline-flex">Buy Again</p>
      <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
      <p className="link hidden lg:inline-flex">Health & Personal Care</p>
    </div>
  );
};

export default LowerHeader;
