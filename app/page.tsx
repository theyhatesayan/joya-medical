"use client";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedSection from "../components/TrustedSection";
import StatsSection from "../components/StatsSection";
import ProductCard from "../components/ProductCard";
import Reviews from "../components/Reviews";
import ReviewForm from "../components/ReviewForm";
import Faq from "../components/Faq";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import WhatsappButton from "../components/WhatsappButton";
import FloatingCart from "../components/FloatingCart";
import Loader from "../components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Hero />
      <TrustedSection />
      <StatsSection />
      <ProductCard />
      <Reviews />
      <div className="text-center py-10">
        <a
          href="#review-form"
          className="inline-block bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-2xl font-bold transition"
        >
          ⭐ Write A Review
        </a>
      </div>
      <ReviewForm />
      <Faq />
      <ContactSection />
      <Footer />
      <WhatsappButton />
      <FloatingCart />
    </>
  );
}
