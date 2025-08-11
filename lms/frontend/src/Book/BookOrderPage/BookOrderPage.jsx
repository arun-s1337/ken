import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import AdditionalDetail from '../AdditionalDetail/AdditionalDetail';

function BookPurchase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(1);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [showFull, setShowFull] = useState(false);
  const [bookReviews, setBookReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState('');

 

  const decodedId = atob(id)

  // Helper to get available formats with prices > 0
  const getAvailableFormats = (bookData) => {
    const formats = [
      { type: 'kindle', price: bookData?.kindle },
      { type: 'hardcover', price: bookData?.hardcover },
      { type: 'audible', price: bookData?.audible },
      { type: 'audio_cd', price: bookData?.audio_cd },
    ];
    return formats.filter(
      (format) => format.price && !isNaN(parseFloat(format.price)) && parseFloat(format.price) > 0
    );
  };

  const description = book?.book_description || 'No description available.';
  const words = description.trim().split(/\s+/);
  const wordCount = words.length;
  const shouldTruncate = wordCount > 500;
  const preview = words.slice(0, 400).join(' ');
  const remaining = words.slice(400).join(' ');
 

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getBookById/${decodedId}`)
      .then((res) => {
        if (res.data && res.data.book) {
          const bookData = res.data.book;
          setBook(bookData);

          // Handle images
          if (bookData.images && bookData.images.length > 0) {
            const imageArray = typeof bookData.images === 'string'
              ? JSON.parse(bookData.images)
              : bookData.images;
            setSelectedImage(imageArray[0]);
          }

          // Set first available format with price > 0
          const availableFormats = getAvailableFormats(bookData);
          if (availableFormats.length > 0) {
            setSelectedFormat({
              type: availableFormats[0].type,
              price: parseFloat(availableFormats[0].price),
            });
          }
        } else {
          setError('Book not found');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch book data:', err);
        setError('Failed to load book data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  

  useEffect(() => {
    const fetchBookReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/reviews/${decodedId}`
        );
        setBookReviews(response.data.reviews);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };
    fetchBookReviews();
  }, [id]);

  useEffect(() => {
    const userToken = localStorage.getItem('user-token');
    setToken(userToken);
  }, []);

  const increaseCount = () => {
    const maxQuantity = book?.quantity ?? 1;
    setProductCount((prev) => {
      if (prev < maxQuantity) {
        return prev + 1;
      } else {
        toast('Max Quantity reached');
        return prev;
      }
    });
  };

  const decreaseCount = () => {
    setProductCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleThumbnailClick = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const handleFormatSelection = (type, price) => {
    setSelectedFormat({ type, price: parseFloat(price) });
  };

  const handleAddToCart = () => {
    if (!selectedFormat) {
      toast('Please select a format before adding to cart.');
      return;
    }

    setShowModal(true);

    const cartItem = {
      bookId: id,
      id: book._id,
      title: book.title,
      image: selectedImage,
      quantity: productCount,
      format: selectedFormat.type,
      price: selectedFormat.price,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = existingCart.findIndex(
      (item) => item.bookId === cartItem.bookId && item.format === cartItem.format
    );

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      existingCart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  const images = typeof book?.images === 'string'
    ? JSON.parse(book.images)
    : book?.images || [];

  const normalizeImagePath = (path) => {
    return path.replace(/\\/g, '/');
  };

  if (loading) {
    return <div className="p-6 text-center">Loading book details...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!book) {
    return <div className="p-6 text-center">No book data available</div>;
  }

  const availableFormats = getAvailableFormats(book);

  return (
    <div className="max-w-7xl mx-auto pt-[100px] pl-4 my-5 bg-white text-[#001040]">
      {/* ... Other JSX (cart/profile buttons, images, etc.) remains unchanged ... */}
      <ToastContainer/>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          {/* Image section remains unchanged */}
          <div className="border border-[#BAB8B8] bg-[#F5F5F5] rounded-lg p-4 flex items-center justify-center">
            <img
              src={selectedImage ? `${import.meta.env.VITE_BACKEND_URL}/${normalizeImagePath(selectedImage)}` : 'https://via.placeholder.com/400x600'}
              alt={`${book.title} Cover`}
              className="rounded max-h-[500px] object-contain"
            />
          </div>
          {images.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={`${import.meta.env.VITE_BACKEND_URL}/${normalizeImagePath(img)}`}
                  className={`rounded w-20 h-20 object-cover cursor-pointer border-2 ${
                    selectedImage === img ? 'border-blue-500' : 'border-transparent'
                  }`}
                  alt={`${book.title} thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(img)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="my-4 text-md">by {book.author_detail || 'Unknown Author'}</p>
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < book.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2">{book.stars} out of 5</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-6 text-sm font-normal">
            <h5 className="text-md">Format:</h5>
            {availableFormats.length > 0 ? (
              availableFormats.map((format) => (
                <button
                  key={format.type}
                  className={`px-4 py-2 border rounded hover:bg-[#001040] hover:text-white ${
                    selectedFormat?.type === format.type ? 'bg-[#001040] text-white' : ''
                  }`}
                  onClick={() => handleFormatSelection(format.type, format.price)}
                >
                  {format.type.charAt(0).toUpperCase() + format.type.slice(1)} (${parseFloat(format.price).toFixed(2)})
                </button>
              ))
            ) : (
              <p>No formats available</p>
            )}
          </div>

          <div className="text-4xl font-bold mb-4">
            ${selectedFormat ? parseFloat(selectedFormat.price).toFixed(2) : '0.00'}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={() => {
                  if (book?.source_link) {
                    window.open(book?.source_link, '_blank'); //
                  } else {
                    toast.error("No source link provided.");
                  }
              }}
              className="bg-[#ffa200] text-white px-5 py-2 font-semibold border border-gray-400"
            >
              Buy Now
            </button>
            <button onClick={handleAddToCart}>
              <div className="shadow-box d-flex justify-content-center align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h11q.425 0 .713.288T19 16t-.288.713T18 17H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H2q-.425 0-.712-.288T1 3t.288-.712T2 2h1.625q.275 0 .525.15t.375.425z"
                  />
                </svg>
              </div>
            </button>
            <div className="flex items-center px-5 py-2 rounded-full border border-gray-600 bg-gray-100 text-black">
              <button className="px-2" onClick={decreaseCount}>-</button>
              <input type="text" className="w-12 text-center bg-transparent" value={productCount} readOnly />
              <button className="px-2" onClick={increaseCount}>+</button>
            </div>
          </div>

          <h2 className="font-semibold mb-2 text-black">Book Description</h2>
          <div>
            <p className="text-black mb-4 font-normal">
              {shouldTruncate ? (
                <>
                  {showFull ? description : `${preview}...`}
                </>
              ) : (
                description
              )}
            </p>
            {shouldTruncate && (
              <div
                className="mt-4 font-semibold cursor-pointer text-blue-600 hover:underline"
                onClick={() => setShowFull(!showFull)}
              >
                {showFull ? 'Show Less' : 'Read More'}
              </div>
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4">Added to Cart</h2>
              <p>
                {book.title} ({selectedFormat?.type}) has been added to your cart.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bluebutton">
                  Close
                </button>
                <button onClick={() => navigate('/checkout')} className="px-4 py-2 bluebutton">
                  Go to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <AdditionalDetail book={book} reviews={bookReviews} />
    </div>
  );
}

export default BookPurchase;