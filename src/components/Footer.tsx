import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-purple-100 bg-purple-50/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-slate-700 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-slate-900">The Crafty CEO</h3>
          <p className="mt-2">Expert Etsy shop guides, product ideas, and seller tips to build a profitable Etsy business.</p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Guides</h3>
          <ul className="mt-2 space-y-1">
            <li><Link href="/best-products-to-sell-on-etsy" className="hover:text-purple-700">What to Sell</Link></li>
            <li><Link href="/etsy-fees-explained" className="hover:text-purple-700">Etsy Fees</Link></li>
            <li><Link href="/etsy-shop-setup-checklist" className="hover:text-purple-700">Shop Setup</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Contact</h3>
          <p className="mt-2">hello@thecraftyceo.com</p>
          <ul className="mt-2 space-y-1">
            <li><Link href="/privacy-policy" className="hover:text-purple-700">Privacy Policy</Link></li>
            <li><Link href="/affiliate-disclosure" className="hover:text-purple-700">Affiliate Disclosure</Link></li>
            <li><Link href="/about" className="hover:text-purple-700">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-purple-100 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} The Crafty CEO</div>
    </footer>
  );
}
