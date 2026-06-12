"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const submitReview = async () => {
    if (!name || !city || !review) {
      toast.error("Please fill all fields");
      return;
    }

    const { error } = await supabase.from("reviews").insert([
      {
        name,
        city,
        rating,
        review,
      },
    ]);

    if (error) {
      console.log(error);
      alert(JSON.stringify(error));
      return;
    }

    toast.success("Review submitted successfully ⭐");

    setName("");
    setCity("");
    setRating(5);
    setReview("");
  };

  return (
    <section id="review-form" className="max-w-3xl mx-auto px-6 py-20">
      <div className="bg-white rounded-3xl shadow-xl border p-8">
        <h2 className="text-4xl font-bold text-center mb-8">
          Write A Review ⭐
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Your City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border p-4 rounded-xl"
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
            <option value={4}>⭐⭐⭐⭐ (4)</option>
            <option value={3}>⭐⭐⭐ (3)</option>
            <option value={2}>⭐⭐ (2)</option>
            <option value={1}>⭐ (1)</option>
          </select>

          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full border p-4 rounded-xl h-32"
          />

          <button
            onClick={submitReview}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-xl font-bold"
          >
            Submit Review
          </button>
        </div>
      </div>
    </section>
  );
}
