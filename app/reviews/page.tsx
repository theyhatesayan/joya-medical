import Navbar from "../../components/Navbar";
import Reviews from "../../components/Reviews";
import ReviewForm from "../../components/ReviewForm";
import Footer from "../../components/Footer";

export default function ReviewsPage() {
  return (
    <>
      <Navbar />
      <Reviews />
      <ReviewForm />
      <Footer />
    </>
  );
}