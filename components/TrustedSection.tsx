import FadeUp from "./FadeUp";

export default function TrustedSection() {
  return (
    <FadeUp>
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 rounded-3xl p-10 text-white">

        <h2 className="text-4xl font-bold text-center mb-10">
          Why Farmers Trust JOYA Medical?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="text-center">
            <div className="text-5xl mb-4">🐐</div>
            <h3 className="text-xl font-bold">
              Goat Specialists
            </h3>
            <p className="mt-2 text-gray-200">
              Specially selected veterinary products for goats.
            </p>
          </div>

          <div className="text-center">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-xl font-bold">
              Cash On Delivery
            </h3>
            <p className="mt-2 text-gray-200">
              Easy and secure ordering with COD.
            </p>
          </div>

          <div className="text-center">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-xl font-bold">
              Trusted Products
            </h3>
            <p className="mt-2 text-gray-200">
              Quality veterinary products trusted by farmers.
            </p>
          </div>

        </div>
      </div>
    </section>
    </FadeUp>
  );
}