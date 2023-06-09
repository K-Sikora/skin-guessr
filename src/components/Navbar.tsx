import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <header className="px-1 h-20 flex items-center justify-start bg-gradient-to-b from-gray-950/90 to-gray-950/50">
      <Link href="/">
        <img
          src="./logo.svg"
          className="w-16"
        ></img>
      </Link>
    </header>
  );
};

export default Navbar;
