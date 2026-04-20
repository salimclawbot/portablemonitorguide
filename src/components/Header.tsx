"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-purple-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-bold text-purple-800">The Crafty CEO</Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/best-products-to-sell-on-etsy" className="hover:text-purple-700">What to Sell</Link>
          <Link href="/etsy-fees-explained" className="hover:text-purple-700">Etsy Fees</Link>
          <Link href="/etsy-shop-setup-checklist" className="hover:text-purple-700">Shop Setup</Link>
          <Link href="/about" className="hover:text-purple-700">About</Link>
        </nav>
      </div>
    </header>
  );
}
