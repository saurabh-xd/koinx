import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="md:px-21 px-5 py-6 shadow-md border-b bg-background shadow-[0px_0px_12px_rgba(16,38,73,0.06)]">
      <Link href="/#">
        <Image src="/koinx.svg" width="100" height="100" alt="logo" />
      </Link>
    </nav>
  );
}
