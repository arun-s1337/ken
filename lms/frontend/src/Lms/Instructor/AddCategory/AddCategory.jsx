

import React, { useState, useEffect } from "react";
import "./AddCategory.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [inputFields, setInputFields] = useState([{ id: 1, value: "" }]);
  useEffect(() => {
    fetchCategories();
  }, []);


  const fetchCategories = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}category/getcategory`)
      .then((res) => {
        const fetchedCategories = res.data.result.map((category) => ({
          name: category.course_category_name,
          id: category.course_category_id,
        }));
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      });
  };


  const handleAddCategory = () => {
    inputFields.forEach(input => {
      if (input.value.trim()) {
        axios
          .post(`${import.meta.env.VITE_REACT_APP_API_URL}category/addcategory`, {
            course_category_name: input.value,
          })
          .then((response) => {
            if (
              response.status === 201
            ) {
              toast.success("Category added successfully");
              fetchCategories();
            }
          })
          .catch((error) => {
            console.error("Error adding new category:", error);
            toast.error("Error adding new category");
          });
      }
    });
  };


  const handleAddInputField = () => {
    setInputFields([...inputFields, { id: inputFields.length + 1, value: "" }]);
  };


  const handleInputChange = (id, newValue) => {
    setInputFields(
      inputFields.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };


  return (
    <div className="courselist-container">
      <ToastContainer />
      <h4 className=" text-blue-500 text-center py-2">Course Category Creation</h4>
      <div className=" course-cards-container">
      <div className=" m-3 card d-flex p-1 p-lg-5">
        <div>
          {inputFields.map((input) => (
            <div key={input.id} className="d-flex align-items-center mb-2">
              <input
                type="text"
                className="fc1 form-control"
                placeholder="Enter Category name"
                value={input.value}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
              />
              <button
                className="ms-2 plusbtn text-white bg-[#001040] px-2"
                onClick={handleAddInputField}
              >
                +
              </button>
            </div>
          ))}
          <button
           className="w-full mt-6 px-6 py-3 bg-[#001040] text-white font-medium rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"  
            onClick={handleAddCategory}
          >
            Submit
          </button>
        </div>


        <div>
          <div className="px-0">
            <h4 className="mb-4 mt-4 mt-md-5 categorytitle">Added Category List</h4>
            <div className="flex flex-col  space-y-3">
              {categories.map((category) => (
               <div
                key={category.id}
                className="card p-2 fc1 bg-blue-800 text-white rounded-lg shadow-md flex w-fit max-w-xs mx-2  "
                >
                <p className="m-0 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-album-icon "
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <polyline points="11 3 11 11 14 8 17 11 17 3" />
                  </svg>
                  {category.name}
                </p>
            </div>


              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}


export default AddCategory;



