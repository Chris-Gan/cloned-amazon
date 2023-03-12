import LeftCheckout from "../../components/Checkout/LeftCheckout";
import RightCheckout from "../../components/Checkout/RightCheckout";

const Checkout = () => {
  return (
    <div>
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <LeftCheckout />
        <RightCheckout />
      </main>
    </div>
  );
};

export default Checkout;
