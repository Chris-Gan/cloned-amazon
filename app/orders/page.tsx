"use client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import OrderCard from "../../components/Orders/OrderCard";

const fetchOrders = async () =>
  fetch(`/api/get-orders-lists`).then(async (res) => {
    const output = await res.json();
    return output.orders;
  });
const Orders = () => {
  const { data: session } = useSession();
  const { data: orders, isLoading } = useSWR<OrderList[]>(
    "orders",
    fetchOrders
  );

  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders ? orders.length : "0"} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders &&
            orders.map((item) => <OrderCard order={item} key={item.id} />)}
        </div>
      </main>
    </div>
  );
};

export default Orders;
