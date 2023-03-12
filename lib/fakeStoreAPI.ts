export const fetchProducts = async () => {
  const products: Product[] = await fetch(
    "https://fakestoreapi.com/products"
  ).then((res) => res.json());

  return products;
};
