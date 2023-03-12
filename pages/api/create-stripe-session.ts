// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

type Data = {
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { items, email }: { items: Product[]; email: string } = req.body;

  const transformedItem = items.map((item) => {
    const { description, image, price, title } = item;
    return {
      // description,
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: price * 100,
        product_data: {
          name: title,
          description,
          images: [image],
        },
      },
    };
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_options: [{ shipping_rate: "shr_1MirYEB0kldOvkEfKv3fw22j" }],
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    line_items: transformedItem,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: checkoutSession.id });
}
