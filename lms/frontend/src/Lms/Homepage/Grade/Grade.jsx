import React, { useEffect, useState } from "react";
import "./Grade.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function Grade() {
  const navigate = useNavigate(); // Correctly use useNavigate
  const { id } = useParams();


  const decodedId = atob(id)




  const [grade, setGrade] = useState([]);


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}user/grade/${decodedId}`)
      .then((res) => {
        console.log(res.data);
        setGrade(res.data);
      });
  }, [id]);


  const handleNavigate = () => {
    navigate("/"); // Replace with the actual path you want to navigate to
  };


  return (
    <div className="container mx-auto px-2 mt-6 max-w-screen-lg pt-[100px] pl-4 mb-10">
  <div className="overflow-x-auto rounded-md shadow-sm  border">
    <table className="min-w-full text-xs text-left text-gray-700  bg-white border border-gray-200">
      <thead className="uppercase text-white bg-[#001040]">
        <tr className="text-center">
          <th className="px-3 py-3 text-sm">Lessons</th>
          <th className="px-3 py-3 text-sm">Completion</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {grade.map((module) => (
          <tr key={module.moduleid} className="hover:bg-gray-50 transition-all">
            <td className="px-3 py-2 whitespace-nowrap">
              {module.moduleid}. {module.modulename}
            </td>    
            <td className="px-3 py-2 text-center text-green-700 font-medium">
              {module.completion_percentage}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


   
  );
}


export default Grade;



