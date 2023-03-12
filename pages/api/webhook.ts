// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import * as admin from "firebase-admin";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { adminDb } from "../../firebaseAdmin";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK;

const fulfillOrder = async (session: {
  total_details: any;
  amount_total: number;
  metadata: {
    images: string;
    email: string;
  };
  id: string;
}) => {
  const message = {
    amount: session.amount_total / 100,
    amount_shipping: session.total_details.amount_shipping / 100,
    images: JSON.parse(session.metadata.images),
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };

  const addedDoc = await adminDb
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set(message);

  return addedDoc;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();

    // personally, I believe if the webhook is sent from strip, it
    // will contain some values for such header attribute
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      // verify that the webhook comes from the stripe such that (personally) the
      // value we got back from the stripe-signature can used to verify the
      // validity of the webhook if combined with the secret key
      event = stripe.webhooks.constructEvent(payload, sig, stripeWebhookSecret);
    } catch (err) {
      res.status(400).send({ error: `Webhook error: verification failed` });
      return;
    }
    if ("checkout.session.completed" === event.type) {
      const session = event.data.object;
      return fulfillOrder(session);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
