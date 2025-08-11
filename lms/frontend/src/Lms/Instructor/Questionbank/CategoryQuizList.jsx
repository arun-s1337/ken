import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import "./CategoryQuizList.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, Link } from "react-router-dom";

const CategoryQuizList = () => {
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedQuizzes, setSelectedQuizzes] = useState({});
  const [addedQuizzes, setAddedQuizzes] = useState([]);
  const [marks, setMarks] = useState({});
  const [headerMarks, setHeaderMarks] = useState("");
  const [maxRandomValue, setMaxRandomValue] = useState(0);
  const [viewType, setViewType] = useState("Sequential");
  const [randomQuizzes, setRandomQuizzes] = useState([]);
  const [shuffledQuizzes, setShuffledQuizzes] = useState([]);
  const [selectedQuizType, setSelectedQuizType] = useState("");
  const [quizTypes, setQuizTypes] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    // Fetch categories from API
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/getmodule`)
      .then((res) => {
        const { data } = res;
        setCategories(data.result);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}quiz/getquiztype`)
      .then((res) => {
        setQuizTypes(res.data.result);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedCourseId) {
      // Fetch quizzes based on selected courseId and moduleId
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_API_URL}quiz/questions/${selectedCourseId}/${selectedCategory}`
        )
        .then((res) => {
          console.log(res.data);
          setQuizzes(res.data);
          // Update maxRandomValue to reflect the number of quizzes
          setMaxRandomValue(res.data.length);
        })
        .catch((error) => {
          console.error("Error fetching quizzes:", error);
        });
    }
  }, [selectedCategory, selectedCourseId]);

  const handleCategoryChange = (event) => {
    const selectedModuleId = event.target.value;
    const selectedModule = categories.find(
      (category) => category.moduleid === parseInt(selectedModuleId)
    );

    if (selectedModule) {
      setSelectedCategory(selectedModule.moduleid);
      setSelectedCourseId(selectedModule.courseid);
    }
  };

  const handleCheckboxChange = (quizId) => {
    setSelectedQuizzes((prev) => {
      const updated = { ...prev };
      if (updated[quizId]) {
        delete updated[quizId];
        setMarks((prevMarks) => {
          const updatedMarks = { ...prevMarks };
          delete updatedMarks[quizId];
          return updatedMarks;
        });
      } else {
        updated[quizId] = true;
        setMarks((prevMarks) => ({
          ...prevMarks,
          [quizId]: headerMarks,
        }));
      }
      return updated;
    });
  };

  const handleMarksChange = (quizId, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [quizId]: value,
    }));
  };

  const handleHeaderMarksChange = (event) => {
    const value = event.target.value;
    setHeaderMarks(value);
    setMarks((prevMarks) => {
      const updatedMarks = { ...prevMarks };
      Object.keys(selectedQuizzes).forEach((quizId) => {
        if (selectedQuizzes[quizId]) {
          updatedMarks[quizId] = value;
        }
      });
      return updatedMarks;
    });
  };

  const handleAddQuizzes = () => {
    let selectedQuizList;
    let sequence;

    if (viewType === "Sequential") {
      selectedQuizList = quizzes.filter((quiz) => selectedQuizzes[quiz.id]);
      sequence = 1; // Sequential view
    } else {
      selectedQuizList = randomQuizzes;
      sequence = 2; // Random view
    }

    const updatedQuizList = selectedQuizList.map((quiz) => ({
      ...quiz,
      Marks: marks[quiz.id] || "",
    }));

    setAddedQuizzes((prev) => [...prev, ...updatedQuizList]);
    setSelectedQuizzes({});
    setMarks({});

    const questionIds = selectedQuizList.map((quiz) => quiz.id);
    const marksForQuizzes = selectedQuizList.map(
      (quiz) => marks[quiz.id] || ""
    );

    // Send the data to the backend
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}quiz/createquiz`, {
        courseId: selectedCourseId,
        categoryId: selectedCategory,
        questionCount: selectedQuizList.length,
        questionIds: questionIds,
        marks: marksForQuizzes,
        sequence, // Send sequence value to the backend
        quizTypeId: selectedQuizType, // Send selected quiz type ID
      })
      .then((response) => {
        console.log(response.data);
        if (
          response.data.message === "Quiz and context created successfully."
        ) {
          toast.success("Quizzes submitted successfully.");
        } else if (response.data.message === "Invalid data received.") {
          toast.error("Invalid data received.");
        } else if (response.data.message === "Error saving quizzes.") {
          toast.error("Error saving quizzes.");
        }
      })
      .catch((error) => {
        toast.error("Error submitting quizzes:", error);
      });
  };

  const handleMaxRandomValueChange = (event) => {
    const value = Number(event.target.value);
    const numberOfQuizzes = quizzes.length; // Total number of quizzes
    if (value >= 0 && value <= numberOfQuizzes) {
      setMaxRandomValue(value);
      setRandomQuizzes(getRandomQuizzes(value)); // Update random quizzes based on selected value
    }
  };

  const handleViewTypeChange = (type) => {
    setViewType(type);
    if (type === "Random") {
      setRandomQuizzes(getRandomQuizzes(maxRandomValue));
    }
  };

  const getRandomQuizzes = (count) => {
    const shuffled = [...quizzes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count); // Return only the selected number of random quizzes
  };

  const shuffleSelectedQuizzes = () => {
    const selectedQuizIds = Object.keys(selectedQuizzes).filter(
      (id) => selectedQuizzes[id]
    );
    const selectedQuizList = quizzes.filter((quiz) =>
      selectedQuizIds.includes(quiz.id.toString())
    );
    const shuffled = selectedQuizList.sort(() => 0.5 - Math.random());
    setShuffledQuizzes(shuffled);
  };

  useEffect(() => {
    if (viewType === "Random") {
      setRandomQuizzes(getRandomQuizzes(maxRandomValue));
    }
  }, [maxRandomValue, quizzes, viewType]);

  return (
    <div className="courselist-container min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 rounded-3xl">
       <div className="max-w-4xl mx-auto" >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <ToastContainer />
     <div className="px-6 py-5 bg-[#001040]">
            <h2 className="text-2xl font-bold text-white">Questionbank</h2>
            
          </div>
      <div className="course-cards-container p-3">
        <div style={{ marginBottom: "20px" }}>
          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Module Name</label>
              <select
                className="fc1"
                value={selectedCategory}
                onChange={handleCategoryChange}
                style={{ width: "50%", padding: "10px" }} >
                <option value="">Select a Module</option>
                {categories.map((category) => (
                  <option key={category.moduleid} value={category.moduleid}>
                    {category.modulename}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse my-2">Quiz Type</label>
              <select
                className="fc1"
                value={selectedQuizType}
                onChange={(e) => setSelectedQuizType(e.target.value)}
                style={{ width: "50%", padding: "10px" }}
              >
                <option value="">Select a quiz type</option>
                {quizTypes.map((quizType) => (
                  <option
                    key={quizType.quiz_type_id}
                    value={quizType.quiz_type_id}>
                    {quizType.quiz_type_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <h5 className="my-2 py-2 labelcourse">Question View Type</h5>
            <label className="custom-radio mx-2">
              <input
                type="radio"
                name="viewType"
                checked={viewType === "Sequential"}
                onChange={() => handleViewTypeChange("Sequential")}
              />
              Sequential
            </label>
            <label className="custom-radio mx-2">
              <input
                type="radio"
                name="viewType"
                checked={viewType === "Random"}
                onChange={() => handleViewTypeChange("Random")}
              />
              Random
            </label>
            {viewType === "Random" && (
              <div className="max-random-container my-2">
                <label>
                  Max Random Value:
                  <input
                    type="number"
                    min="0"
                    max={quizzes.length}
                    value={maxRandomValue}
                    onChange={handleMaxRandomValueChange}
                  />
                </label>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-between my-3">
            <div>
              <h5 className="labelcourse">Marks</h5>
              <input
                type="number"
                placeholder="Enter Marks"
                value={headerMarks}
                onChange={handleHeaderMarksChange}
                className="border rounded px-2 py-2 border-black"
              />
            </div>
            {viewType === "Sequential" &&
              Object.keys(selectedQuizzes).length > 0 && (
                <button
                  className="btn btn-primary"
                  onClick={shuffleSelectedQuizzes}
                >
                  Shuffle Selected
                </button>
              )}
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl  shadow ">
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden ">
          <thead className="bg-[#001040] text-white ">
            <tr >
              <th className="px-4 py-2 text-left text-lg ">Select</th>
              <th className="px-4 py-2 text-left text-lg ">Quiz ID</th>
              <th className="px-4 py-2 text-left text-lg ">Question</th>
              <th className="px-4 py-2 text-left text-lg ">Image</th>
              <th className="px-4 py-2 text-left text-lg ">Marks</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-200 divide-y divide-black">
            {(viewType === "Sequential" ? quizzes : randomQuizzes).map((quiz) => (
              <tr key={quiz.id}>
                <td className="px-4 py-2">
                  {viewType === "Sequential" && (
                    <input
                      type="checkbox"
                      checked={!!selectedQuizzes[quiz.id]}
                      onChange={() => handleCheckboxChange(quiz.id)}
                    />
                  )}
                </td>
                <td className="px-4 py-2">{quiz.id}</td>
                <td className="px-4 py-2">{parse(quiz.text)}</td>
                <td className="px-4 py-2">N/A</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    value={marks[quiz.id] || 0}
                    onChange={(e) => handleMarksChange(quiz.id, e.target.value)}
                    className="border text-black border-black rounded px-2 py-1 w-20"
                   
                  />
                </td>
              </tr>
            ))}
          </tbody>
  </table>
</div>

        <div className="d-flex justify-content-between my-3">
          <button
           className="mt-6 px-6 py-3 bg-[#001040] text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-2"

           
            onClick={handleAddQuizzes}
          >
            Add
          </button>
          <Link to={`/instructordashboard/${id}/questionbankupdate`} className="mt-6 px-6 py-3 bg-[#001040] text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-2"
>
            Update
          </Link>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default CategoryQuizList;
