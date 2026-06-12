"use client";

import { useState } from "react";
import FadeUp from "./FadeUp";

export default function Faq() {
  const faqs = [
    {
      question: "Cash On Delivery Available Hai?",
      answer: "Haan, hum Cash On Delivery provide karte hain.",
    },
    {
      question: "Delivery Kitne Din Me Hoti Hai?",
      answer: "Normally 3-7 working days lagte hain.",
    },
    {
      question: "Products Genuine Hai?",
      answer: "Haan, hum sirf genuine veterinary products provide karte hain.",
    },
    {
      question: "Order Kaise Kare?",
      answer:
        "Products cart me add karke WhatsApp par order place kar sakte hain.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <FadeUp>
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
      </FadeUp>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FadeUp key={index}>
            <div className="border rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full text-left p-5 font-semibold flex justify-between"
              >
                {faq.question}
                <span>{open === index ? "−" : "+"}</span>
              </button>

              {open === index && (
                <div className="px-5 pb-5 text-slate-600">{faq.answer}</div>
              )}
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
