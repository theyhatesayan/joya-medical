"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReviews(data);
    }
  }

  async function updateStatus(id: number, status: string) {
  const { data, error } = await supabase
    .from("reviews")
    .update({ status })
    .eq("id", id)
    .select();

  console.log("Updated:", data);
  console.log("Error:", error);

  if (!error) {
    fetchReviews();
  }
}

 async function approveReview(id: number) {
  console.log("Approve Clicked:", id);

  const { data, error } = await supabase
    .from("reviews")
    .update({ status: "Approved" })
    .eq("id", id)
    .select();

  console.log(data);
  console.log(error);

  if (!error) {
    fetchReviews();
  }
}

async function deleteReview(id: number) {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id);

  console.log(error);

  if (!error) {
    fetchReviews();
  }
}
  return (
    <div>
      <h1 className="text-4xl font-black mb-8">
        Reviews
      </h1>

      <div className="bg-white rounded-3xl shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-left">Review</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr
                key={review.id}
              >
                <td className="p-4 font-semibold">
                  {review.name}
                </td>

                <td className="p-4">
                  {review.city}
                </td>

                <td className="p-4">
                  ⭐ {review.rating}/5
                </td>

                <td className="p-4 max-w-lg">
                  {review.review}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      review.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {review.status || "Pending"}
                  </span>
                </td>

                <td className="p-4 flex gap-2">
                  {review.status !== "Approved" && (
                    <button
                      onClick={() => updateStatus(review.id, "Approved")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Approve
                    </button>
                  )}

                  <button
                    onClick={() => deleteReview(review.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reviews.length === 0 && (
          <div className="p-10 text-center">
            No Reviews Found
          </div>
        )}
      </div>
    </div>
  );
}