import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

export default function Reviews() {
  const [books, setBooks] = useState([]);

  const [review, setReview] = useState({
    name: "",
    stars: "",
    country: "",
    content: "",
    bookId: ""
  });

  const [testimonial, setTestimonial] = useState({
    patient_name: "",
    content: ""
  });

  const handleReviewChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleTestimonialChange = (e) => {
    setTestimonial({ ...testimonial, [e.target.name]: e.target.value });
  };

  async function getAllBooks() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getBooks`);
      setBooks(response.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  }

  useEffect(() => {
    getAllBooks();
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin-token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(testimonial)
      });

      const data = await res.json();
      if(res.status === 200){
        toast.success("Added Review")
      }
      
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const submitTestimonial = async(e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin-token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/testimonial`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(testimonial)
      });

      const data = await res.json();
      if(res.status === 200){
        toast.success("Added Testimonial")
      }
      
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    }
   
  };

  return (
    <div className="p-6 space-y-10 max-w-2xl mx-auto">
      {/* Review Form */}
      <form onSubmit={submitReview} className="space-y-4 border border-gray-300 p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Submit a Review</h2>

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={review.name}
            onChange={handleReviewChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
            placeholder="Name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Stars (1-5)</label>
          <input
            name="stars"
            type="number"
            min="1"
            max="5"
            value={review.stars}
            onChange={handleReviewChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
            placeholder="Stars"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Country</label>
          <input
            name="country"
            value={review.country}
            onChange={handleReviewChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
            placeholder="Country"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Review Content</label>
          <textarea
            name="content"
            value={review.content}
            onChange={handleReviewChange}
            className="border border-gray-300 p-2 w-full rounded"
            rows={4}
            required
            placeholder="Review Content"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Select Book</label>
          <select
            name="bookId"
            value={review.bookId}
            onChange={handleReviewChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
          >
            <option value="">Select a Book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
        >
          Submit Review
        </button>
      </form>

      {/* Testimonial Form */}
      <form onSubmit={submitTestimonial} className="space-y-4 border border-gray-300 p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Submit a Testimonial</h2>

        <div>
          <label className="block mb-1 font-medium">Patient Name</label>
          <input
            name="patient_name"
            value={testimonial.patient_name}
            onChange={handleTestimonialChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
            placeholder="Patient Name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Testimonial</label>
          <textarea
            name="content"
            value={testimonial.content}
            onChange={handleTestimonialChange}
            className="border border-gray-300 p-2 w-full rounded"
            rows={4}
            required
            minLength="100" 
            maxLength="500"
            placeholder="Testimonial"
          />
        </div>

        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
        >
          Submit Testimonial
        </button>
         <NavLink to="/" className="flex flex-col items-center mt-4" >
                 <span className="text-blue-600 ">Move to Home</span>
        </NavLink>
      </form>
    </div>
  );
}
