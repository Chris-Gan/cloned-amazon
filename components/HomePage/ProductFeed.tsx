import ProductCard from "./ProductCard";
import { fetchProducts } from "../../lib/fakeStoreAPI";

const ProductFeed = async () => {
  const products = await fetchProducts();

  return (
    <div
      className="grid grid-flow-row-dense md:grid-cols-2 
    lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto"
    >
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt="ads"
      />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.slice(5, products.length).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductFeed;
