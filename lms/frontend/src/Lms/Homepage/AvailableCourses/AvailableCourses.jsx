import React, { useEffect, useState } from "react";

import "./Availablecourses.css";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";

function Availablecourses() {
  const { id } = useParams();
  const decodedId = id && id !== "undefined" ? atob(id) : "guest";

  const [Course, setCourse] = useState({});
  const [user, setUser] = useState({
    first_name: "",
    completion_percentage: 0,
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/getallcourse`)
      .then((res) => {
        setCourse(res.data[0] || {});
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    if (decodedId !== "guest") {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}user/user/${decodedId}`)
        .then((res) => {
          const userData = res.data;
          setUser({
            first_name: userData.first_name?.trim() || "",
            completion_percentage: parseFloat(userData.completion_percentage) || 0,
          });
        })
        .catch((err) => {
          console.log("Error fetching user data", err);
        });
    }
  }, [decodedId]);

  return (
    <div className="container bgfullpath mb-5">
      <div className="container card mt-3 bgpurplecard border-0">
        <h3 className="text-start p-4">Enrolled Courses</h3>
        <hr />
        <div className="row">
          <div className="col-sm-12 col-md-4 mb-3 ">
            <div className="card">
              <img
                src={Course.course_image || "placeholder-image.jpg"}
                className="card-img-top"
                alt="Course"
              />
              <div className="card-body">
                <h5 className="card-title">{Course.coursename || "Course Name"}</h5>
                <div className="progress-container">
                  <ProgressBar
                    now={user.completion_percentage}
                    className="modern-progress-bar"
                  />
                  <span className="progress-label">
                    {user.completion_percentage.toFixed(0)}%
                  </span>
                </div>
                <div className="my-4">
                  <Link
                    to={`/user/${id || "undefined"}?tab=lessons`}
                    className="coursebutton text-decoration-none p-2 rounded-3"
                  >
                    Go to course
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Availablecourses;