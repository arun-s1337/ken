import React from 'react';

function Bookdetails() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg space-y-5">
        <h2 className="text-2xl font-bold text-center text-[#001040] mb-4">Book Details</h2>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Book Name</label>
          <input
            type="text"
            placeholder="Enter Book Name"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Book Author</label>
          <input
            type="text"
            placeholder="Enter Book Author"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Quantity</label>
          <input
            type="number"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Book Description</label>
          <textarea
            placeholder="Enter Book Description"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Book Price</label>
          <input
            type="text"
            placeholder="Enter Book Price"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Book Images</label>
          <input
            type="file"
            multiple
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <p className="text-sm text-gray-500 mt-1">You can upload multiple images.</p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#001040] text-white font-semibold py-2 rounded transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Bookdetails;
