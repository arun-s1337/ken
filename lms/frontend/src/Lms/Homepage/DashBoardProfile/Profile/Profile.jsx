import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Link, useParams } from "react-router-dom";
import pattern from "patternomaly";
import ProgressBar from "@ramonak/react-progress-bar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons"; // You can replace with faEdit if needed
import profile from "../../../../assets/Profile1.png"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


function capitalize(name) {
  if (!name) return ""; // Ensure the name exists
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
export function Indiviualdashboardmain() {
  const { id } = useParams();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    profile_image: "" ,
    completion_percentage: 0,
    email : "",
    modeules_completed : 0
  });
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [assessmentLogs, setAssessmentLogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({ title: "", date: "" });
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const decodedId = atob(id)

  const getWeekDays = (startDate) => {
    const startOfWeek = moment(startDate).startOf("week");
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push({
        day: startOfWeek.format("ddd"),
        date: startOfWeek.format("YYYY-MM-DD"),
      });
      startOfWeek.add(1, "day");
    }
    return daysOfWeek;
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}user/user/${decodedId}`)
      .then((res) => {
        const userData = res.data;

        console.log("the image",userData.profile_image)
        setUser({
          first_name: userData.first_name.trim(),
          // last_name: userData.last_name.trim(),
          completion_percentage: parseFloat(userData.completion_percentage),
          profile_image: userData.profile_image?.trim() ? userData.profile_image : profile, // Use default image if profile_image is not provided
          role: userData.profession || "Student", // Default to "Student" if role is not provided
          email : userData.email,
          modeules_completed : userData.modules.filter((module) => module.completed === true).length
        });
      })
      .catch((err) => {
        console.log("Error fetching user data", err);
      });
  }, [id]);

    

 useEffect(() => {
  const weekDays = getWeekDays(selectedDate);
  axios
    .get(
      `${import.meta.env.VITE_REACT_APP_API_URL}user/userworkhour/${decodedId}?weekStart=${weekDays[0].date}&weekEnd=${weekDays[6].date}`
    )
    .then((res) => {
      const workData = res.data;
      setChartData({
        data: weekDays.map((day) => {
          const dayData = workData.find((item) => item.date === day.date);
          return {
            name: day.day,
            value: dayData ? dayData.hours : 0,
          };
        }),
      });
    })
    .catch((err) => {
      console.log("Error fetching work hours data", err);
    });
}, [id, selectedDate]);


  console.log(chartData);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}user/assessment-logs/${decodedId}`)
      .then((res) => {
        const logs = res.data.logs;
        setAssessmentLogs(logs);
        const eventsData = logs
          .map((log) => {
            const eventList = [];
            if (log.pre_assessment) {
              eventList.push({ title: log.pre_assessment, date: log.date });
            }
            if (log.post_assessment) {
              eventList.push({ title: log.post_assessment, date: log.date });
            }
            return eventList;
          })
          .flat();
        setEvents(eventsData);
      })
      .catch((err) => {
        console.log("Error fetching assessment logs", err);
      });
  }, [id]);

  const handleEventClick = (info) => {
    setSelectedEvent({ title: info.event.title, date: info.event.startStr });
    setModalOpen(true); // Open modal
  };

  return (
    <>
      <div className=" flex-grow-1 overflow-y-auto">
        <header className=" mb-2 lg:w-[1000px] border pt-6 rounded-2xl g-4 m-3 bg-[#001040]  rounded-t-xl">
          <div className="container-fluid">
            <div className="mb-npx">
              <div className="row align-items-center">
                <div className="col-sm-6 col-lg-12 mb-md-4 mb-sm-0">
                  <h1 className="h2 mb-0 text-white">
                    Hi,{" "}
                    <span style={{ color: "#ffff" }}>
                    {capitalize(user.first_name)}  {user.last_name}

                    Welcome To My Spine Coach
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="row g-4 m-3">
          <div className="col-sm-12 col-lg-6 " >
            <div className="bg-white shadow p-4 rounded-4">
              <div className="text-center mb-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="form-control custom-date-picker mx-auto rounded-2xl" // Use custom class
                />
              </div>

            <div className="w-full p-4">
  
              <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={chartData.data}
                    margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      vertical={false} 
                      stroke="#e0e0e0" 
                    />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        background: '#ffffff'
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#3b82f6" 
                      radius={[6, 6, 0, 0]}
                      barSize={32}
                    >
                      {/* Optional: Add subtle animation */}
                      <animate 
                        attributeName="height" 
                        from="0" 
                        to="100%" 
                        dur="0.5s" 
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
            </div>
            </div>
          </div>

        <div className="col-12 col-lg-5">
          <div
            className="card rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm bg-white"
            style={{ minHeight: "350px", height: "auto" }}
          >
            {/* Settings Icon */}
            <Link
              to={`/user/${id}/editprofile`}
              className="absolute top-3 right-3 md:top-4 md:right-4 text-black  transition-colors"
            >
              <FontAwesomeIcon icon={faCog} className="text-sm md:text-base" />
            </Link>

            {/* Profile Content */}
            <div className="flex flex-col h-full justify-between">
              {/* Profile Header */}
              <div className="flex flex-col items-center gap-3 md:gap-4">
                <div className="relative">
                  <img
                    src={user.profile_image || profile}
                    alt="Profile"
                    className="rounded-full w-14 h-14 md:w-16 md:h-16 object-cover border-2 border-white shadow-sm"
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">
                    {capitalize(user.first_name)} {user.last_name}
                  </h3>
                  <p className="text-xs md:text-sm text-blue-500 font-medium">{user.role}</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-2 md:space-y-3 mt-3 md:mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-500">Email</span>
                  <span className="text-xs md:text-sm font-medium text-gray-700 truncate pl-2">
                    {user.email}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-500">Modules Completed</span>
                  <span className="text-xs md:text-sm font-medium text-gray-700">
                    {user.modeules_completed}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 md:mt-6">
                <div className="flex justify-between mb-1">
                  <span className="text-xs md:text-sm font-medium text-gray-700">Course Completion</span>
                  <span className="text-xs md:text-sm font-medium text-blue-500">
                    {user.completion_percentage.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 md:h-2">
                  <div 
                    className="bg-blue-500 h-1.5 md:h-2 rounded-full" 
                    style={{ width: `${user.completion_percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="col-span-12 ">
            <div className="rounded-xl shadow-sm border-none overflow-hidden p-2 sm:p-4 ">
              <FullCalendar
            
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
                headerToolbar={{
                  left: "prev,next",
                  center: "title",
                  right: ""
                }}
                height="auto"
                aspectRatio={1.35} 
                windowResize={(arg) => {
                  const calendar = arg.view.calendar;
                  if (window.innerWidth <= 768) {
                    calendar.setOption("dayHeaderFormat", { weekday: "narrow" });
                    calendar.setOption("dayMaxEventRows", 2); 
                  } else {
                    calendar.setOption("dayHeaderFormat", { weekday: "short" });
                    calendar.setOption("dayMaxEventRows", false);
                  }
                }}
                themeSystem="standard"
                
                dayCellClassNames=" text-xs sm:text-sm"

                dayHeaderClassNames="text-black font-medium text-xs sm:text-sm "
                eventClassNames=" border-none !text-blue-500 rounded-md px-1 py-0.5 text-xs sm:text-sm"
                buttonText={{
                  today: 'Today',
                  month: 'Month',
                }}
                buttonIcons={{
                  prev: 'chevron-left',
                  next: 'chevron-right',
                }}
                
                viewClassNames="border-none"
                headerToolbarClassNames="border-none mb-1 sm:mb-2"
                titleFormat={{ year: 'numeric', month: 'short' }}
                titleClassNames="text-gray-800 font-semibold text-sm sm:text-base"
                navLinkClassNames="text-blue-500 hover:text-blue-700"
                nowIndicatorClassNames="bg-blue-500"
                // Mobile optimizations
                dayMaxEvents={3} // Limit events shown per day on small screens
                moreLinkClassNames="text-xs text-black" // Style for "+x more" links
                handleWindowResize={true} // Better resize handling
              />
            </div>
          </div>
        </div>
      </div>

   
{modalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
    <div className="w-full max-w-sm rounded-xl bg-white shadow-xl">
      {/* Modal Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
        <button 
          onClick={() => setModalOpen(false)}
          className="text-gray-400 hover:text-gray-500 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/>
          </svg>
        </button>
      </div>
      
      {/* Modal Body */}
      <div className="p-6">
        <h4 className="text-xl font-medium text-gray-800 mb-4">{selectedEvent.title}</h4>
        
        <div className="flex items-center gap-3 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zm7-6q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18"/>
          </svg>
          <span className="font-medium">{selectedEvent.date}</span>
        </div>
      </div>

      {/* Modal Footer (optional) */}
      <div className="flex justify-end gap-3 p-4 border-t border-gray-100">
        <button
          onClick={() => setModalOpen(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

     
    </>
  );
}
