import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black">JOYA</h2>

            <p className="text-teal-400 font-semibold">
              Medical & General Store
            </p>

            <p className="mt-4 text-slate-400">
              Trusted veterinary products for better goat health. Cash On
              Delivery available across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>

            <div className="flex flex-col gap-3">
              <a
                href="#products"
                className="text-slate-400 hover:text-white transition"
              >
                Products
              </a>

              <Link
                href="/cart"
                className="text-slate-400 hover:text-white transition"
              >
                Cart
              </Link>

              <Link
                href="/checkout"
                className="text-slate-400 hover:text-white transition"
              >
                Checkout
              </Link>

              <a href="/about" className="block hover:text-teal-400 transition">
                About Us
              </a>

              <a
                href="/privacy-policy"
                className="block hover:text-teal-400 transition"
              >
                Privacy Policy
              </a>

              <a
                href="/terms-and-conditions"
                className="block hover:text-teal-400 transition"
              >
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>

            <div className="space-y-3 text-slate-400">
              <p>📞 +91 96699 13326</p>

              <p>💬 WhatsApp Support</p>

              <p>🚚 Delivery Across India</p>

              <a
                href="https://wa.me/919669913326"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl text-white font-semibold transition"
              >
                Chat On WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center">
          <p className="text-slate-500">
            © 2026 JOYA Medical & General Store. All Rights Reserved.
          </p>

          <p className="text-slate-600 mt-2 text-sm">
            Cash On Delivery Available Across India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
