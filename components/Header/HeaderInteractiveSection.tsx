"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectItems } from "../../app/GlobalRedux/Features/basket/basketSlice";
const HeaderInteractiveSection = () => {
  const { data: session } = useSession();
  const items = useSelector(selectItems);
  const router = useRouter();

  const signInAndOut = () => {
    if (!session) {
      signIn("google");
    } else {
      signOut();
    }
  };
  return (
    <div
      className="text-white flex items-center space-x-6 text-xs
     mx-6 whitespace-nowrap"
    >
      <div className="link" onClick={signInAndOut}>
        <p className="hover:underline">
          {session ? `Hello, ${session?.user?.name}` : "Sign In"}
        </p>
        <p className="font-extrabold md:text-sm">Account & Lists</p>
      </div>
      <div className="link" onClick={() => router.push("/orders")}>
        <p>Returns</p>
        <p className="font-extrabold md:text-sm">& Orders</p>
      </div>
      <div
        className="link relative items-center flex"
        onClick={() => router.push("/checkout")}
      >
        <span
          className="absolute top-0 right-0 md:right-10 h-4 w-4
         bg-yellow-400 text-center rounded-full text-black font-bold"
        >
          {items.length || 0}
        </span>
        <ShoppingCartIcon className="h-10" />
        <p className="hidden md:inline font-extrabold md:text-sm mt-2">
          Basket
        </p>
      </div>
    </div>
  );
};

export default HeaderInteractiveSection;
