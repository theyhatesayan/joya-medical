export default function Hero() {
  return (
    <section
      className="relative min-h-[85vh] lg:min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[85vh] lg:min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-3xl">

            <span className="inline-flex items-center bg-teal-600/90 backdrop-blur-sm text-white px-5 py-3 rounded-full text-sm md:text-base font-semibold shadow-lg">
              🐐 Trusted Veterinary Products
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.05]">
              JOYA Medical
              <br />
              <span className="text-teal-300">
                & General Store
              </span>
            </h1>

            <p className="mt-6 text-base md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl">
              Premium veterinary products for stronger immunity,
              better health and faster growth of your goats.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href="#products"
                className="text-center bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Shop Products
              </a>

              <a
                href="/cart"
                className="text-center bg-white/95 hover:bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
              >
                View Cart
              </a>
            </div>

            <div className="flex flex-wrap gap-8 mt-12 text-white">
              <div>
                <h3 className="text-3xl font-black">
                  100%
                </h3>
                <p className="text-gray-300">
                  Genuine Products
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black">
                  COD
                </h3>
                <p className="text-gray-300">
                  Available
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black">
                  Fast
                </h3>
                <p className="text-gray-300">
                  WhatsApp Order
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}