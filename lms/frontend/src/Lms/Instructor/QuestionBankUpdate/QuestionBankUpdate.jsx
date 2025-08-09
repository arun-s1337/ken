import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function QuestionBankUpdate() {
  const [module, setModule] = useState([]);
  const [moduleid, setModuleId] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Fetch all modules
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/getmodule`)
      .then((res) => setModule(res.data.result))
      .catch((err) => console.error("Error fetching modules:", err));
  }, []);

  // Fetch questions when module ID changes
  useEffect(() => {
    if (moduleid) {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}quiz/updatequestionbank/${moduleid}`)
        .then((res) => setSelectedQuestions(res.data.questions))
        .catch((err) => console.error("Error fetching selected questions:", err));

      axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}quiz/getoldquestions/${moduleid}`)
        .then((res) => setAllQuestions(res.data.questions))
        .catch((err) => console.error("Error fetching all questions:", err));
    }
  }, [moduleid]);

  const handleRemoveQuestion = (id) => {
    setSelectedQuestions(selectedQuestions.filter(question => question.id !== id));
  };

  const handleAddQuestion = (id) => {
    const questionToAdd = allQuestions.find(question => question.id === id);
    if (questionToAdd && !selectedQuestions.some(q => q.id === id)) {
      setSelectedQuestions([...selectedQuestions, questionToAdd]);
    }
  };

  const handleSubmit = () => {
    const updatedQuestionIds = selectedQuestions.map(q => q.id);

    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}quiz/updatequestionids`, {
        moduleid,
        questionIds: updatedQuestionIds,
      })
      .then((res) => {
        if (res.data.error === "No records found for the given moduleid.") {
          toast("No records found for the given module");
        } else if (res.data.error === "Failed to update records.") {
          toast("try again");
        } else if (res.data.message === "Question IDs updated successfully.") {
          toast("Questions updated successfully!");
        }
      })
      .catch((err) => {
        console.error("Error submitting updated questions:", err);
        toast("Failed to update questions. Please try again.");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">

      {/* Header */}
      <div className="bg-[#001040] rounded-t-xl px-6 py-5">
        <h2 className="text-2xl font-bold text-white">Question Bank Update</h2>    
      </div>
      <ToastContainer/>
      
      {/* Main Content */}
      <div className="bg-white shadow-md rounded-b-xl p-6">
        {/* Module Selection */}
        <div className="mb-8">
          <label htmlFor="module-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Module
          </label>
          <select
            id="module-select"
            value={moduleid}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setModuleId(e.target.value)}
          >
            <option value="">Select a Module</option>
            {module.map((mod) => (
              <option key={mod.moduleid} value={mod.moduleid}>
                {mod.modulename}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Questions Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Questions</h3>
          {selectedQuestions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead >
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quiz ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-neutral-300 border divide-y divide-gray-200">
                  {selectedQuestions.map((question) => (
                    <tr key={question.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {question.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div dangerouslySetInnerHTML={{ __html: question.text }} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleRemoveQuestion(question.id)}
                          className="text-white hover:text-red-900 border p-3 bg-red-600 rounded-lg"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No questions selected.</p>
          )}
        </div>

        {/* Available Questions Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Questions</h3>
          {allQuestions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y  divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quiz ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-neutral-300 border divide-y divide-gray-600">
                  {allQuestions.map((question) => (
                    <tr key={question.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {question.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div dangerouslySetInnerHTML={{ __html: question.text }} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleAddQuestion(question.id)}
                          disabled={selectedQuestions.some(q => q.id === question.id)}
                          className={`${selectedQuestions.some(q => q.id === question.id) 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-green-600 hover:text-green-900'}`}
                        >
                          {selectedQuestions.some(q => q.id === question.id) ? 'Added' : 'Add'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No available questions.</p>
          )}
        </div>

        {/* Submit Button */}
        {moduleid && (
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={selectedQuestions.length === 0}
              className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white 
                ${selectedQuestions.length === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Submit Updates
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionBankUpdate;