"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-black text-slate-900 animate-pulse">
          JOYA
        </h1>

        <p className="text-teal-700 font-semibold tracking-[4px] uppercase mt-2">
          Medical & General Store
        </p>

        <div className="mt-8 flex justify-center gap-2">
          <div className="w-3 h-3 bg-teal-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-teal-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-3 h-3 bg-teal-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
}