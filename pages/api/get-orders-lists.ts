import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { authOptions } from "./auth/[...nextauth]";
import moment from "moment";

type Data = {
  message?: string;
  orders?: OrderList[];
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const firebaseOrders = await getDocs(
      query(
        collection(db, "users", session.user!.email!, "orders"),
        orderBy("timestamp", "desc")
      )
    );
    const stripeOrders: OrderList[] = await Promise.all(
      firebaseOrders.docs.map(async (order) => ({
        id: order.id,
        amount: order.data().amount,
        amountShipping: order.data().amount_shipping,
        images: order.data().images,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
        items: (
          await stripe.checkout.sessions.listLineItems(order.id, { limit: 100 })
        ).data,
      }))
    );
    res.status(200).json({ orders: stripeOrders });
  } else {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
}
