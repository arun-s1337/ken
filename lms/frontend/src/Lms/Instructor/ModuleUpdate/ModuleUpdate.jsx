
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ModuleUpdate.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ModuleUpdate() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [updatedModuleName, setUpdatedModuleName] = useState("");


  useEffect(() => {
    // Fetch the list of modules from the backend and log the result
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/getmodule`)
      .then((res) => {
        setModules(res.data.result); // Store fetched modules in state
        console.log("Modules fetched from API:", res.data.result); // Debug log to ensure modules are received
      })
      .catch((err) => {
        console.error("Error fetching modules:", err);
      });
  }, []);


  const handleUpdateModule = () => {
    // Ensure a module is selected and a new name is provided
    if (!selectedModuleId || !updatedModuleName) {
      toast.error("Please select a module and enter a new name.");
      return;
    }
    console.log("hello");


    const formData = new FormData();
    formData.append("moduleImage", moduleImage);
    formData.append("moduleid", selectedModuleId);
    formData.append("modulename", updatedModuleName);


    console.log(formData);


    // Send the updated module name to the backend
    axios
      .put(`${import.meta.env.VITE_REACT_APP_API_URL}course/updatemodule`, formData)
      .then((res) => {
        if (res.data.message === "Module updated successfully") {
          toast.success("Module updated successfully!");
          setUpdatedModuleName(""); // Clear the input field
          setSelectedModuleId(""); // Clear the dropdown
        } else {
          console.log(res.data);
          toast.error("Failed to update module");
        }
      })
      .catch((err) => {
        console.error("Error updating module:", err);
        toast.error("Failed to update module.");
      });
  };


  // Handle dropdown change and set the module name in the input box
  const handleModuleSelection = (e) => {
    const selectedId = e.target.value;
    setSelectedModuleId(selectedId);


    // Log the selected module ID for debugging
    console.log("Selected Module ID:", selectedId);


    // Find the selected module by its id and set its name into the input box
    const selectedModule = modules.find(
      (module) => module.moduleid == selectedId
    ); // Use == for string/number comparisons
    if (selectedModule) {
      setUpdatedModuleName(selectedModule.modulename); // Display selected module name in the input
      console.log("Selected module:", selectedModule); // Debug log the module object
    } else {
      setUpdatedModuleName(""); // Clear the input if no module is selected
      console.log("No matching module found."); // Log if no module was found
    }
  };


  const [selectedImageModuleId, setSelectedImageModuleId] = useState("");
  const [moduleImage, setModuleImage] = useState(null);


  const handleImageModuleSelection = (e) => {
    setSelectedImageModuleId(e.target.value);
  };


  const handleUpdateModuleImage = async () => {
    if (!selectedImageModuleId || !moduleImage) {
      toast("Please select a module and an image file.");
      return;
    }


    const formData = new FormData();
    formData.append("moduleImage", moduleImage);


    // console.log(formData);


    try {
      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API_URL}course/${selectedImageModuleId}/image`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          if (res.data.message === "Module image updated successfully") {
            toast.success("Module image updated successfully");
          } else if (res.data.message === "Server error") {
            toast.error("Server error");
          } else if (res.data.message === "Module not found") {
            toast.error("Module not found");
          }
        });
    } catch (error) {
      console.error("Error updating module image:", error);
    }
  };


  return (
    <div className="courselist-container min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 rounded-3xl">
      <div className="max-w-4xl mx-auto" >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
       <div className="px-6 py-5 bg-[#001040]">
            <h2 className="text-2xl font-bold text-white">Update Module</h2>
            <p className="text-blue-100 mt-1">Update Existing Modules</p>
          </div>
   
      <ToastContainer />
      <div className="course-cards-container p-3">
        <form>
          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Select Module</label>
              <select
                value={selectedModuleId}
                onChange={handleModuleSelection}
                className="selectbox fc1"
              >
                <option value="">Select Module</option>
                {modules.map((module) => (
                  <option key={module.moduleid} value={module.moduleid}>
                    {module.modulename}
                  </option>
                ))}
              </select>
            </div>
          </div>


          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">New Module Name</label>
              <input
                type="text"
                value={updatedModuleName}
                onChange={(e) => setUpdatedModuleName(e.target.value)} // Allow editing the input value
                className="inp1 fc1"
                placeholder="Enter Module Name"
              />
            </div>
          </div>


          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">New Module Image</label>
              <input
                type="file"
                onChange={(e) => setModuleImage(e.target.files[0])}
                className="form-control file-input fc1"
                accept=".jpeg,.jpg,.png,.tiff"/>    
            </div>
          </div>
        </form>


        <div className="d-flex justify-content-end">
          <button onClick={handleUpdateModule} className="mt-6 px-6 py-3 bg-gradient-to-r bg-[#001040] text-white font-medium rounded-lg shadow-md hover:bg-[#001040] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-2">
            Update Module
          </button>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}


export default ModuleUpdate;




