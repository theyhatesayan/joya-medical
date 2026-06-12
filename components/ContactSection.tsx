import FadeUp from "./FadeUp";

export default function ContactSection() {
  return (
    <FadeUp>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-slate-900 to-teal-900 rounded-[40px] p-10 md:p-16 text-white">
          <h2 className="text-4xl md:text-5xl font-black text-center">
            Contact JOYA Medical
          </h2>

          <p className="text-center text-gray-300 mt-4 text-lg">
            Order products directly through WhatsApp
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
              <h3 className="font-bold text-xl mb-2">📞 Phone</h3>

              <p className="text-gray-200">+91 96699 13326</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
              <h3 className="font-bold text-xl mb-2">💬 WhatsApp</h3>

              <p className="text-gray-200">Available 24/7</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
              <h3 className="font-bold text-xl mb-2">🚚 Delivery</h3>

              <p className="text-gray-200">Across India</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="https://wa.me/919669913326"
              target="_blank"
              className="inline-block bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-2xl font-bold text-lg transition"
            >
              Order On WhatsApp
            </a>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
