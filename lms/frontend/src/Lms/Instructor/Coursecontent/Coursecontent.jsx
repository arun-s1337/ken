import React, { useState, useRef, useEffect } from "react";
import { Input } from "reactstrap";
import JoditEditor from "jodit-react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Coursecontent = () => {
  const editor = useRef(null);
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [description, setDescription] = useState("");
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [selectedCourseDetails, setSelectedCourseDetails] = useState({
    courseId: "",
    course_category_id: "",
  });
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [completionCriteria, setCompletionCriteria] = useState("");
  const [groupMode, setGroupMode] = useState("");
  const [restrictionAccess, setRestrictionAccess] = useState("");
  const [videoDuration, setVideoDuration] = useState(""); // State to store video duration
  const navigate = useNavigate();


  const { id } = useParams();


  // Fetch courses on component mount
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/getcourse`)
      .then((res) => {
        setCourses(res.data.result);
      })
      .catch((error) => {
        console.error("Failed to fetch courses:", error);
      });
  }, []);


  // Fetch modules when the selected course changes
  useEffect(() => {
    if (selectedCourse) {
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_API_URL}course/getmodules/${selectedCourse}`
        )
        .then((res) => {
          setModules(res.data || []);
        })
        .catch((error) => {
          console.error("Failed to fetch modules:", error);
          setModules([]);
        });
    } else {
      setModules([]);
    }
  }, [selectedCourse]);


  // Handle course change
  const handleCourseChange = (e) => {
    const selectedCourseId = e.target.value;
    const selectedCourse = courses.find(
      (course) => course.courseid.toString() === selectedCourseId
    );
    if (selectedCourse) {
      setSelectedCourse(selectedCourseId);
      setSelectedCourseDetails({
        courseId: selectedCourse.courseid,
        course_category_id: selectedCourse.course_category_id,
      });
      setSelectedModule("");
    }
  };


  // Handle module change
  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
  };


  // Handle description change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  // Handle editor change
  const handleEditorChange = (content) => {
    setPost((prevPost) => ({
      ...prevPost,
      content,
    }));


    // Extract video URL and fetch duration if a video is detected
    const videoUrl = extractVideoUrl(content);
    if (videoUrl) {
      const platform = determinePlatform(videoUrl);
      if (platform === "YouTube") {
        getYouTubeVideoDuration(videoUrl).then((duration) => {
          setVideoDuration(duration);
        });
      } else if (platform === "Vimeo") {
        getVimeoVideoDuration(videoUrl).then((duration) => {
          setVideoDuration(duration);
        });
      } else {
        // Handle other platforms if needed
        setVideoDuration("");
      }
    }
  };


  // Function to extract video URL from content
  const extractVideoUrl = (content) => {
    const urlRegex =
      /https?:\/\/(?:www\.)?(youtube\.com\/watch\?v=|vimeo\.com\/|youtu\.be\/)([\w-]+)/;
    const match = content.match(urlRegex);
    return match ? match[0] : null;
  };


  // Function to determine the platform from the video URL
  const determinePlatform = (url) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "YouTube";
    } else if (url.includes("vimeo.com")) {
      return "Vimeo";
    }
    // Add more conditions if needed
    return "Other";
  };


  // Function to fetch YouTube video duration using YouTube Data API
  const getYouTubeVideoDuration = async (videoUrl) => {
    const videoId = new URL(videoUrl).searchParams.get("v");
    const apiKey = "YOUR_YOUTUBE_API_KEY"; // Replace with your YouTube API key


    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`
      );
      const duration = response.data.items[0]?.contentDetails?.duration || "";
      return duration;
    } catch (error) {
      console.error("Error fetching YouTube video duration:", error);
      return "";
    }
  };


  // Function to fetch Vimeo video duration using Vimeo API
  const getVimeoVideoDuration = async (videoUrl) => {
    const videoId = videoUrl.split("/").pop();
    const token = "YOUR_VIMEO_ACCESS_TOKEN"; // Replace with your Vimeo access token


    try {
      const response = await axios.get(
        `https://api.vimeo.com/videos/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const duration = response.data.duration || "";
      return duration;
    } catch (error) {
      console.error("Error fetching Vimeo video duration:", error);
      return "";
    }
  };


  // Handle restriction access change
  const handleRestrictionAccessChange = (e) => {
    setRestrictionAccess(e.target.value);
  };


  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("courseId", selectedCourseDetails.courseId);
    formData.append(
      "course_category_id",
      selectedCourseDetails.course_category_id
    );
    formData.append("moduleId", selectedModule);
    formData.append("description", description);
    formData.append("content", post.content);
    formData.append("availableFrom", availableFrom);
    formData.append("availableUntil", availableUntil);
    formData.append("completionCriteria", completionCriteria);
    formData.append("groupMode", groupMode);
    formData.append("restrictionAccess", restrictionAccess);
    formData.append("videoDuration", videoDuration); // Append video duration


    console.log(formData);


    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}course/submitcon`, formData)
      .then((response) => {
        if (
          response.data.message === "Content submitted and updated successfully"
        ) {
          toast.success("Content submitted successfully");
          window.location.reload();
         
        } else if (response.data.error) {
          toast.error(response.data.error || "Failed to submit content");
        }
      })
      .catch((error) => {
        toast.error("Backend returned an error:", error);
      });
  };


  // Ritch Text Editior
  const [content, setContent] = useState("");


  // Function to handle file upload
  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("video", file);


      // Upload the video
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}upload-video`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );


      // Get the video URL from the response
      const videoUrl = response.data.url;


      // Insert video into the editor
      const editor = document.querySelector(".jodit-wysiwyg");
      const videoEmbed = (
        <video width="600" controls>
          <source src="${videoUrl}" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
      editor.innerHTML += videoEmbed;
      setContent(editor.innerHTML);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };


  const config = {
    buttons: ["upload", "source"], // Add more buttons as needed
    uploader: {
      url: (file) => uploadFile(file),
    },
    // Other configuration options if needed
  };


  return (
    <div className="courselist-container min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 rounded-3xl">
       <div className="max-w-4xl mx-auto" >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
       <div className="px-6 py-5 bg-[#001040]">
            <h2 className="text-2xl font-bold text-white">Page Content</h2>
            <p className="text-blue-100 mt-1">Create and organize your course content</p>
          </div>
   
      <ToastContainer />
      <div className="course-cards-container p-3">
        <form onSubmit={handleSubmit}>
          <div className="form-group my-1">
            <div className="form-group-inner">
              <label className="labelcourse">Course Name</label>
              <Input
                type="select"
                id="courseSelect"
                value={selectedCourse}
                onChange={handleCourseChange}
                className="rounded-0 fc1"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option
                    key={course.courseid}
                    value={course.courseid.toString()}
                  >
                    {course.coursename}
                  </option>
                ))}
              </Input>
            </div>
          </div>


          <div className="form-group my-1">
            <div className="form-group-inner">
              <label className="labelcourse">Module Name</label>


              <Input
                type="select"
                id="moduleSelect"
                value={selectedModule}
                onChange={handleModuleChange}
                className="rounded-0 fc1 w-100"
              >
                <option value="">Select Module</option>
                {modules.map((module) => (
                  <option
                    key={module.moduleid}
                    value={module.moduleid.toString()}
                  >
                    {module.modulename}
                  </option>
                ))}
              </Input>
            </div>
          </div>


          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Description</label>
              <Input
                type="textarea"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                className="rounded-0 fc1"
                placeholder="Description"
              />
            </div>
          </div>


          <div className="my-3">
            <div className="d-flex justify-content-between py-3">
              <label for="content" className="labelcourse">
                Page Content
              </label>
              <Link to={`/instructordashboard/${id}/updatepagecontent`}>
               <button
  type="submit"
  className="mt-6 px-6 py-3 bg-[#001040] text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-2"
>
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
    className="lucide lucide-pencil-icon"
  >
    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    <path d="m15 5 4 4" />
  </svg>
  Update Content
</button>


              </Link>
            </div>
            <JoditEditor
              ref={editor}
              value={post.content}
              onBlur={(newContent) => handleEditorChange(newContent)}
              className="rounded-0 fc1"
              // config={{
              //   uploader: {
              //     insertImageAsBase64URI: true,
              //     url: handleFileUpload, // Custom file upload handler
              //   },
              // }}
            />
          </div>


          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Available From</label>
              <Input
                type="date"
                id="availableFrom"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                className="rounded-0 fc1"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Available Until</label>
              <Input
                type="date"
                id="availableUntil"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
                className="rounded-0 fc1"
                required
              />
            </div>
          </div>
          {/* <div className="row">
            <div className="my-2 col-sm-12 col-md-5 float-start">
            <button type="submit" className="updatebtn rounded-2 mx-2"> Submit Content</button>
             
              </div>
<div className="col-sm-12 col-md-6 my-2 float-end">


<Link to={`/instructordashboard/${id}/updatepagecontent`} >
<button type="submit" className="updatebtn rounded-2 mx-2">Update Content</button></Link>
  </div>
            </div> */}


          <div className="row">
            <div className="col-sm-12 d-flex justify-content-between my-2">
              <div className="col-sm-12 col-md-5">
                <button type="submit" className="mt-6 px-6 py-3 bg-gradient-to-r bg-[#001040] text-white font-medium rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                  Submit Content
                </button>
              </div>


              {/* <div className="col-sm-12 col-md-5">
      <Link to={`/instructordashboard/${id}/updatepagecontent`}>
        <button type="submit" className="updatebtn rounded-2 mx-2">
          Update Content
        </button>
      </Link>
    </div> */}
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
};


export default Coursecontent;



