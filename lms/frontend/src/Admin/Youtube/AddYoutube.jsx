
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddYoutubeData() {
  const [title, setTitle] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("admin-token");

    if (!token) {
      toast.error("Admin token not found!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/addYoutubeVideo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          yotubelLink: youtubeLink,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("YouTube video added successfully!");
        setTitle("");
        setYoutubeLink("");
      } else {
        toast.error(data.message || "Failed to add video.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border  rounded mt-10">
    
      <h2 className="text-2xl font-bold mb-4 text-center text-[#001040]">Add YouTube Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-[#001040]">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Youtube Title"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="block font-medium text-[#001040]">YouTube Link</label>
          <input
            type="url"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            required
            placeholder="Youtube Embedded Link"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#001040] text-white py-2 rounded hover:bg-[#001060] transition duration-200"
        >
          {loading ? "Submitting..." : "Add Video"}
        </button>
         <NavLink to="/" className="flex flex-col items-center mt-2" >
                 <span className="text-blue-600 ">Move to Home</span>
        </NavLink>
      </form>
    </div>
  );
}
