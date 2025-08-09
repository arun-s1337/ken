import React, { useEffect, useState } from "react";
import "./AddCourse.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCourse() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Single category ID

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
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCategory("");
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "") return;

    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}category/addcategory`, {
        course_category_name: newCategory,
      })
      .then((response) => {
        if (response.data.message === "Category added successfully") {
          toast.success("Category added successfully");
          fetchCategories(); // Refresh the category list
        }
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const courseFullName = form.courseFullName.value;
    const courseShortName = form.courseShortName.value;
    const courseStartDate = form.courseStartDate.value;
    const courseEndDate = form.courseEndDate.value;
    const courseImage = form.courseImage.files[0];
    const courseDescription = form.courseDescription.value;

    // Validate required fields
    if (
      !courseFullName ||
      !courseShortName ||
      !courseStartDate ||
      !courseEndDate ||
      !courseImage ||
      !courseDescription ||
      !selectedCategoryId // Ensure a category is selected
    ) {
      toast("All fields are required.");
      return;
    }

    // Prepare form data for the API
    const formData = new FormData();
    formData.append("courseFullName", courseFullName);
    formData.append("courseShortName", courseShortName);
    formData.append("courseStartDate", courseStartDate);
    formData.append("courseEndDate", courseEndDate);
    formData.append("courseImage", courseImage); // Handle image upload in the backend
    formData.append("courseDescription", courseDescription);
    formData.append("courseCategoryId", selectedCategoryId); // Single ID for category

    console.log(formData);

    try {
      // Send the form data to the backend API
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}course/addcourse`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "Course and context added successfully") {
        toast.success("Course added successfully");

        // Reset form fields
        form.reset();
        setSelectedCategoryId(null);
        setNewCategory("");
      } else {
        toast.error(response.data.message || "Failed to add course");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <div className="courselist-container min-h-screen   py-8 px-4 sm:px-6  rounded-3xl">
      <ToastContainer />
       <div className="max-w-4xl mx-auto border " >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
       <div className="px-6 py-5 bg-[#001040]">
            <h2 className="text-2xl font-bold text-white">Course Creation</h2>
            <p className="text-blue-100 mt-1">Add new Courses</p>
          </div>
     
      <div className="course-cards-container">
        <form className="rounded-2 p-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseFullName" className="labelcourse">Course Full Name</label>
              <input
                id="courseFullName"
                name="courseFullName"
                type="text"
                className="form-control border"
                placeholder="Course Name"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseShortName" className="labelcourse">Course Short Name</label>
              <input
                id="courseShortName"
                name="courseShortName"
                type="text"
                className="form-control border"
                placeholder="Course Short Name"
              />
            </div>
          </div>


          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseCategory" className="labelcourse">Course Category</label>
              <select
                id="courseCategory"
                name="courseCategory"
                className="form-control border"
                onChange={(e) => setSelectedCategoryId(e.target.value)} // Set single ID
                value={selectedCategoryId || ""}
              >
                <option value="">Select the course category</option>
                {categories.map((category, i) => (
                  <option key={i} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="px-6 py-3  mx-1 bg-[#001040] text-white font-medium rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
             
                onClick={handleOpenModal}
              >
                +
              </button>
            </div>
          </div>


          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseStartDate" className="labelcourse">Course Start Date</label>
              <input
                id="courseStartDate"
                name="courseStartDate"
                type="date"
                className="form-control border"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseEndDate" className="labelcourse">Course End Date</label>
              <input
                id="courseEndDate"
                name="courseEndDate"
                type="date"
                className="form-control border"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseImage" className="labelcourse">Course Image</label>
              <input
                id="courseImage"
                name="courseImage"
                type="file"
                className="form-control border"
                accept=".jpg, .jpeg"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseDescription" className="labelcourse">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                className="form-control border"
                 placeholder="Course Description"
              ></textarea>
            </div>
          </div>
          <div className="d-flex justify-content-end">
          <input type="submit" value={"Submit"} className=" mt-6 px-6 py-3 bg-[#001040] text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              />
          </div>
       
        </form>
      </div>


     {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-auto p-6 animate-fade-in">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h5 className="text-lg font-semibold text-blue-800">Add New Category</h5>
        <button onClick={handleCloseModal} className="text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>


      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          className="w-full px-4 py-2 border border-blue-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>


      <div className="flex justify-end space-x-2">
       
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>
    </div>
  </div> 
)}
  </div>
  </div>
    </div>
  );

  
}

export default AddCourse;
