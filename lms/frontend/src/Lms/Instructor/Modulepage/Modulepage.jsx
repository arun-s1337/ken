import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Modulepage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";


function Modulepage() {
  const [textareas, setTextareas] = useState([""]);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);


  const { id } = useParams();


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/getcourse`)
      .then((res) => {
        console.log(res.data.result);
        setCourses(res.data.result);
      })
      .catch((error) => {
        console.error("Failed to fetch courses:", error);
      });
  }, []);


  const addTextarea = () => {
    setTextareas([...textareas, ""]);
  };


  const handleTextareaChange = (index, value) => {
    const newTextareas = [...textareas];
    newTextareas[index] = value;
    setTextareas(newTextareas);
  };


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    const moduleNames = textareas.filter((name) => name.trim() !== "");


    if (moduleNames.length === 0) {
      toast("Please enter at least one module name.");
      return;
    }


    if (!selectedCourseId) {
      toast("Please select a course.");
      return;
    }


    const formData = new FormData();
    formData.append("moduleNames", JSON.stringify(moduleNames));
    formData.append("selectedModuleId", selectedCourseId);
    formData.append("parentModule", selectedCourseId)
    formData.append("path", selectedCourseId)
    if (selectedFile) {
      formData.append("moduleImage", selectedFile); // Append the file to the formData
    }


    // Uncomment this to make the API call
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}course/addmodule`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log(res.data.message);
        if (res.data.message === "modules added successfully") {
          toast.success("Modules added successfully");
          setTextareas([""]);
          setSelectedFile(null); // Clear the selected file after successful submission
        } else if (res.data.message === "db_error") {
          toast.error("Database error occurred!");
        }
      })
      .catch((error) => {
        toast.error("There was an error creating the modules!");
        console.error(error);
      });
  };


  return (
    <div className="courselist-container min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 rounded-3xl">
      <ToastContainer/>
       <div className="max-w-4xl mx-auto" >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
       <div className="px-6 py-5 bg-[#001040]">
            <h2 className="text-2xl font-bold text-white">Add Module</h2>
            <p className="text-blue-100 mt-1">Create new Modules</p>
          </div>
        <div className=" course-cards-container p-3">
        <form onSubmit={handleSubmit}>
          <div className="form-group ">
            <div className="form-group-inner ">
              <label className="labelcourse">Select the Course</label>


             
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCourseId} // The current state storing the selected course ID
                onChange={(e) => {
                  const selectedId = e.target.value; // Get the selected course ID
                  setSelectedCourseId(selectedId); // Update state with the selected course ID
                  console.log("Selected Course ID:", selectedId); // Log the selected ID
                }}
              >
                <option value="" disabled>
                  Select a course...
                </option>
                {courses.map((course) => (
                  <option key={course.courseid} value={course.courseid}>
                    {course.coursename}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Add New Module</label>
              {textareas.map((textarea, index) => (
                <div
                  key={index}
                  className="my-2 d-flex align-items-center w-full"
                >
                  <input
                    type="text"
                    value={textarea}
                    onChange={(e) =>
                      handleTextareaChange(index, e.target.value)
                    }
                     className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={`Enter Module Name ${index + 1}`}
                  />
                  <Link className="ml-2" to={`/instructordashboard/${id}/updatemodule`}>
                  <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none"  stroke="#001040" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil mx-1"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                   
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="moduleImage" className="labelcourse">
                Module Image
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-50 file:text-[#001040] hover:file:bg-blue-100"
                id="moduleImage"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit"  className="mt-6 px-6 py-3 bg-[#001040] text-white font-medium rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-2"
>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
       </div>
    </div>
  );
}


export default Modulepage;








