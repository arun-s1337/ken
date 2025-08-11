import { useState,useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function AdditionalDetail({ reviews,book }) {

  
  const [activeTab, setActiveTab] = useState("editorial");
  const[userToken,setToken] = useState("");
  const [stars, setStars] = useState(0);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmitReview = async () => {
    if (!stars || !content) {
      toast("Please provide both a rating and a comment.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}api/v1/admin/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          bookId : book.id ,
          stars,
          content,
          name,
          country
        }),
      });

      if (response.ok) {
        toast.success("Review submitted!");
        setContent("");
        setStars(0);
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Something went wrong.");
    }
  };


  const tabs = [
    { id: "editorial", label: "Editorial Review" },
    { id: "author", label: "About Author" },
    { id: "product", label: "Product Detail" },
    { id: "review", label: "Review" },
  ];

   useEffect(() =>{
    const token = localStorage.getItem("user-token")
    setToken(token)
  },[]) 

  return (
    <div className="py-10">
      <ToastContainer/>
      <div className="flex justify-center space-x-4  pb-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-1 px-3 border-b-2 ${
              activeTab === tab.id
                ? "border-[#FFA200] text-[#FFA200] font-semibold"
                : "border-transparent text-gray-600 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
        
      </div>

      {/* Tab Content */}
      <div className="space-y-6 text-black text-medium font-light">
        {activeTab === "editorial" && (
          <>
            <p className="flex flex-col">
              <span className="font-bold">Review:</span>
              <span>{book.editorial_review}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-bold">About Author:</span>
              <span>{book.about_author}</span>
            </p>
          </>
        )}

        {activeTab === "author" && (
          <p className="flex flex-col">
            <span className="font-bold">About Author:</span>
            <span>{book.about_author}</span>
          </p>
        )}

        {activeTab === "product" && (
          <p className="text-gray-500 italic">Product Details will go here.</p>
        )}

        {activeTab === "review" && (
      <div className="flex flex-col justify-center space-y-4">
        <h1 className="font-medium text-xl mb-5">Top reviews from the United States</h1>

        {reviews?.length === 0 ? (
          <p className="text-gray-600">No reviews available.</p>
        ) : (
          reviews
            
            .map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm space-y-2"
              >
                <div className="flex flex-col  space-x-2">
                  <div className="flex flex-row items-center space-x-2">
                   <div className="w-10 h-10 bg-blue-950 rounded-full text-white font-bold text-lg flex items-center justify-center">
                      {review.name.charAt(0)}
                   </div>

                    <p className="font-semibold mt-2">{review.name}</p>
                  </div>
                  
                  <span>
                    {"⭐".repeat(review.stars)} Practical Advice
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Review in the {review.country} on{" "}
                  {new Date(review.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-green-700 font-bold text-lg">Verified Purchase</p>
                <p>Book Review: {book.title} by Kenneth K. Hansraj, MD</p>
                <p className="text-gray-800">{review.content}</p>
                <p className="text-xs text-gray-400">
                  Reviewed on {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
        )}
        {userToken && (
            <div className="mt-6 border border-gray-300 p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Write a Review</h2>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                placeholder="Your name"
              />
               <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                placeholder="Country"
              />

              <select
                value={stars}
                onChange={(e) => setStars(parseInt(e.target.value))}
                className="w-full p-2 mb-3 border border-gray-300 rounded-md"
              >
                <option value={0}>Select Rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} 
                  </option>
                ))}
              </select>

              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA200]"
                rows="4"
                placeholder="Share your thoughts about the book..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                minLength="10"
                maxLength="100"
              ></textarea>

              <button
                className="mt-3 px-4 py-2 bg-[#FFA200] text-white rounded hover:bg-[#e69300] transition"
                onClick={handleSubmitReview}
              >
                Submit Review
              </button>
            </div>
          )}

      </div>
)}

      </div>
    </div>
  );
}
