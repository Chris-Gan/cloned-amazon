declare module "react-currency-formatter";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating?: number;
  hasPrime?: boolean;
}

interface OrderList {
  id: string;
  amount: number | string;
  amountShipping: number | string;
  images: string[];
  timestamp: number;
  items: string[];
}
