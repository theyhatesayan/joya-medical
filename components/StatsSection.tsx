export default function StatsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 rounded-[40px] p-10 text-white">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div>
            <h2 className="text-5xl font-black">
              500+
            </h2>
            <p className="mt-2 text-gray-200">
              Happy Farmers
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-black">
              1000+
            </h2>
            <p className="mt-2 text-gray-200">
              Orders Delivered
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-black">
              24/7
            </h2>
            <p className="mt-2 text-gray-200">
              WhatsApp Support
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-black">
              100%
            </h2>
            <p className="mt-2 text-gray-200">
              Genuine Products
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}