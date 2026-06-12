"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Review = {
  id: number;
  name: string;
  city: string;
  rating: number;
  review: string;
};

const fallbackReviews = [
  {
    id: 1,
    name: "Imran Khan",
    city: "Bhopal",
    rating: 5,
    review: "Bakra Liv use karne ke baad bakre ki health improve hui.",
  },
  {
    id: 2,
    name: "Sajid Ali",
    city: "Indore",
    rating: 5,
    review: "Fast delivery aur original product mila.",
  },
  {
    id: 3,
    name: "Arif Sheikh",
    city: "Sehore",
    rating: 5,
    review: "Trusted veterinary store aur genuine products.",
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(5);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      setReviews(data);

      const avg =
        data.reduce((sum, item) => sum + item.rating, 0) /
        data.length;

      setAverageRating(Number(avg.toFixed(1)));
      setTotalReviews(data.length);
    } else {
      setReviews(fallbackReviews);
      setAverageRating(5);
      setTotalReviews(fallbackReviews.length);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl md:text-5xl font-black text-center text-slate-900">
        Customer Reviews
      </h2>

      <div className="flex flex-col items-center mt-4 mb-12">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-2xl">
            ⭐⭐⭐⭐⭐
          </span>

          <span className="font-bold text-xl text-slate-900">
            {averageRating}/5
          </span>
        </div>

        <p className="text-slate-500 mt-2">
          Based on {totalReviews}+ Customer Reviews
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div
            key={`${review.id}-${index}`}
            className="bg-white rounded-[32px] p-8 shadow-xl hover:shadow-2xl border border-slate-100 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-5xl text-teal-100 font-serif mb-2">"</div>

            <div className="text-yellow-500 text-2xl mb-3">
              {"⭐".repeat(review.rating)}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-600 font-semibold text-sm">
                ✓ Verified Customer
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed italic">
              {review.review}
            </p>

            <div className="flex items-center gap-3 mt-6">
              <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold">
                {review.name.charAt(0)}
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {review.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {review.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}