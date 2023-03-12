import Banner from "../components/Header/Banner";
import ProductFeed from "../components/HomePage/ProductFeed";

const page = () => {
  return (
    <main className="max-w-screen-2xl mx-auto">
      <Banner />
      {/* @ts-expect-error Server Component */}
      <ProductFeed />
    </main>
  );
};

export default page;
