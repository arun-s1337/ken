

import React from 'react';
import { Link, useNavigate } from "react-router-dom";
export default function Course() {
  const navigate = useNavigate();

  // const aboutpagepart = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  //   setTimeout(() => navigate("/https://bit.ly/drkenlms"), 100);
  // };
  return (
    <section className="container py-10">
      <div className="row align-items-center justify-content-center">      
        {/* Image + Button */}
        <div className="col-sm-12 col-md-7 text-center mb-4 mb-md-0">
          <img src="./Course-lap.png" alt="Course Laptop" className="img-fluid mb-3 " />
          <button className="contactbtn px-4 py-2 font-bold" >
            <Link to='/myspinecoach' className='text-light'>Enroll Now</Link>   
          </button>
        </div>
        {/* Text Content */}
        <div className="col-sm-12 col-md-5 text-center mt-16 text-md-start ps-md-5">
          <h1 className="fw-bold mb-3 headingarea">Enroll in the Course</h1>
          <h3 className="text-danger fw-bold mb-3" style={{ fontSize: '2.3rem' }}>
            My Spine Coach.
          </h3>
          <p className="text-dark mb-3 text-[16px] md:text-[18px] ">
            Transform your spinal health with Dr. Ken Hansraj’s My Spine Coach course. Backed by over 20 years of expertise in spine care, this program offers proven strategies to improve your physical, mental, and emotional well-being through the power of spine wellness.
          </p>
          <p className="text-dark text-[16px] md:text-[18px] ">
            Join now to access cutting-edge insights and personalized guidance from the globally renowned spinal surgeon who has impacted lives worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}
