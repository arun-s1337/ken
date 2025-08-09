import React, { useState, useEffect } from "react";
import "./Drkenhome.css";
import { Link, useLocation } from "react-router-dom";
import Overview from "../Overview/Overview";
import Lessons from "../Lessons/Lessons";
import icon1 from "../../../assets/tabler_book1.png";
import icon3 from "../../../assets/gravity-ui_person.png";
import icon2 from "../../../assets/mingcute_time-line.png";
import frontgif from "../../../assets/looping3.gif";
import axios from "axios";
import Instructors from "../Instructors/Instructors";
import { useSearchParams } from "react-router-dom";

function Drkenhome() {
  const location = useLocation();
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState("overview");
  const [count, setCount] = useState({
    moduleCount: "",
    enrolleCount: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/moduleandenrollcount`)
      .then((res) => {
        setCount({
          moduleCount: res.data.moduleCount,
          enrolleCount: res.data.enrollmentCount,
        });
      });
  }, []);

  useEffect(() => {
  const tab = searchParams.get("tab");
  if (tab === "lessons" || tab === "Instructor" || tab === "overview") {
    setActiveTab(tab);
  } else {
    setActiveTab("overview");
  }
}, [location.search]);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "Instructor":
        return <Instructors />;
      case "lessons":
        return <Lessons />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="mt-10 pt-[100px] pl-4">
      {/* Video Section */}
      <div className="content-container">
        <div className={activeTab === "lessons" ? "video-wrapper my-2" : "video-wrapper1 my-2"}>
          {activeTab === "lessons" ? (
            <iframe
              src="https://player.vimeo.com/video/984701898?autoplay=1&muted=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Lessons Video"
            />
          ) : (
            <img src={frontgif} alt="Loading animation" className="rounded-5 lg:ml-15" />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="content-container w-full">
        <div className="content-wrapper">
          <h5 className="my-5 text-center" style={{ fontWeight: "600" }}>
            Introduction of My Spine Coach
          </h5>

          <div className="row storypart mx-1">
            <div className="flex flex-wrap items-center justify-between border rounded-xl  px-4 py-2 w-full text-xs sm:text-sm lg:text-5xl text-[#001040]">
              <div className="flex items-center text-center py-2">
                <img src={icon1} alt="Lessons" className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium lg:font-bold lg:text-5xl xl:text-xl">
                  {count.moduleCount} Lessons
                </span>
              </div>
              <div className="flex items-center text-center py-2">
                <img src={icon2} alt="Hours" className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium lg:font-bold lg:text-5xl xl:text-xl">
                  15 Hours
                </span>
              </div>
              <div className="flex items-center text-center py-2">
                <img src={icon3} alt="Enrolled" className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium lg:font-bold lg:text-5xl xl:text-xl">
                  {count.enrolleCount} Enrolled
                </span>
              </div>
            </div>

            <div className="row my-3 py-3 ">
              <div className="d-flex justify-content-between text-center flex-wrap px-5 py-3 space-y-3">
                <div className="col-auto">
                  <Link
                    to="?tab=overview"
                    className={activeTab === "overview" ? "active-link text-white " : "font-bold"}
                    style={{ textDecoration: "none", color: "#001040" }}
                  >
                    Overview
                  </Link>
                </div>

                <div className="col-auto">
                  <Link
                    to="?tab=Instructor"
                    className={activeTab === "Instructor" ? "active-link text-white" : "font-bold"}
                    style={{ textDecoration: "none", color: "#001040" }}
                  >
                    About Instructor
                  </Link>
                </div>

                <div className="col-auto">
                  <Link
                     to="?tab=lessons"
                    className={activeTab === "lessons" ? "active-link text-white" : "font-bold"}
                    style={{ textDecoration: "none", color: "#001040" }}
                  >
                    Lessons
                  </Link>
                </div>
              </div>
            </div>
            <hr />
              <div className="content-area">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drkenhome;