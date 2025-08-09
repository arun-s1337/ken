import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ViewBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get the first available format with price > 0
  const getFirstAvailablePrice = (book) => {
    const formats = [
      { type: "kindle", price: book?.kindle },
      { type: "hardcover", price: book?.hardcover },
      { type: "audible", price: book?.audible },
      { type: "audio_cd", price: book?.audio_cd },
    ];
    const validFormat = formats.find(
      (format) => format.price && !isNaN(parseFloat(format.price)) && parseFloat(format.price) > 0
    );
    return validFormat ? parseFloat(validFormat.price).toFixed(2) : "0.00";
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getBooks`);
        if (res.status !== 200) throw new Error("Failed to fetch books");
        setBooks(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/deleteBook/${id}`);
      if (res.status === 200) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        toast.success("Deleted Book Successfully");
      } else {
        toast.error("Failed to delete book");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the book");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading books...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <>
      <div className="container  my-4">
        <div className="d-flex justify-content-between">
          <h3 className="keynotespeakerhead">Book Updation</h3>
          <button
            onClick={() => navigate("/admin/book")}
            className="btn btn-warning text-white px-4" 
          >
            ADD BOOK
          </button>
        </div>
        <div className="row mb-4"></div>

        <div className="row g-4  ">
          {books.map((book) => (
            <div className="col-12 col-md-6 col-lg-4 " key={book.id}>
              <div className="card  shadow-sm">
                <div onClick={() => navigate(`/book/${btoa(book.id)}`)} style={{ cursor: "pointer" }}>
                  <img
                    src={
                      book.images?.[0]
                        ? `${import.meta.env.VITE_BACKEND_URL}/${book.images[0].replace(/\\/g, "/")}`
                        : "https://via.placeholder.com/400x600"
                    }
                    className="card-img-top p-3"
                    alt={book.title}
                    style={{ objectFit: "contain", maxHeight: "250px" }}
                  />
                </div>

                <div className="card-body  d-flex flex-column">
                  <h5 className="card-title text-truncate" title={book.title}>
                    {book.title}
                  </h5>
                  <div className="d-flex justify-content-between">
                    <p className="text-warning fw-bold">${getFirstAvailablePrice(book)}</p>
                    <p className="text-warning">{"★".repeat(book.stars)}</p>
                  </div>
                  <div className="mt-auto d-flex flex-wrap justify-content-between gap-2">
  <button
    onClick={() => navigate(`/bookupdate/${btoa(book.id)}`)}
    className="btn btn-sm btn-secondary flex-grow-1"
    style={{ minWidth: "100px" }}
  >
    UPDATE
  </button>
  <button
    onClick={() => navigate(`/book/${btoa(book.id)}`)}
    className="btn btn-sm btn-warning text-white flex-grow-1"
    style={{ minWidth: "100px" }}
  >
    View Details
  </button>
  <button
    onClick={() => handleDelete(book.id)}
    className="btn btn-sm btn-secondary flex-grow-1"
    style={{ minWidth: "100px" }}
  >
    Delete
  </button>
</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}