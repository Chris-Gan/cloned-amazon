"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import HeaderInteractiveSection from "./HeaderInteractiveSection";
import LowerHeader from "./LowerHeader";
import SearchBox from "./SearchBox";
const Header = () => {
  const router = useRouter();
  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 grow py-2">
        <div className="flex mt-2 items-center grow sm:grow-0">
          <Image
            priority
            onClick={() => router.push("/")}
            alt="logo"
            src="/amazon_logo.png"
            width={150}
            height={40}
            className="cursor-pointer object-contain"
          />
        </div>
        <SearchBox />
        <HeaderInteractiveSection />
      </div>
      <LowerHeader />
    </header>
  );
};

export default Header;
