export default function ThankYouPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50 px-4">

      <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl p-6 md:p-10 text-center border border-slate-100">

        <div className="w-28 h-28 mx-auto rounded-full bg-green-100 flex items-center justify-center animate-bounce">
          <span className="text-6xl">✅</span>
        </div>

        <h1 className="mt-8 text-3xl md:text-5xl font-black text-slate-900">
          Order Confirmed
        </h1>

        <p className="mt-5 text-base md:text-lg text-slate-600">
          Thank you for ordering from
          <span className="font-bold text-teal-700">
            {" "}JOYA Medical & General Store
          </span>
        </p>

        <p className="mt-3 text-slate-500">
          Your order has been received successfully.
          Our team will contact you shortly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

          <div className="bg-teal-50 rounded-2xl p-4">
            <div className="text-3xl">🚚</div>
            <p className="text-sm mt-2 font-medium">
              Fast Delivery
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-4">
            <div className="text-3xl">💵</div>
            <p className="text-sm mt-2 font-medium">
              COD Available
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-4">
            <div className="text-3xl">🛡️</div>
            <p className="text-sm mt-2 font-medium">
              Trusted Store
            </p>
          </div>

        </div>

        <a
          href="/"
          className="inline-block mt-10 bg-gradient-to-r from-teal-600 to-teal-800 hover:scale-105 transition text-white px-10 py-4 rounded-2xl font-bold shadow-lg"
        >
          Continue Shopping
        </a>

      </div>

    </section>
  );
}