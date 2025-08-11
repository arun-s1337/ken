import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { Bar } from "react-chartjs-2";
import pattern from "patternomaly";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function SuperDashboard({ isSidebarOpen }) { 
  const [company, setCompany] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [activeuser, setActiveuser] = useState([]);
  const [monthly, setmonthly] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [companyCount, setCompanyCount] = useState();
  const [subscribersCount, setSubscribersCount] = useState();
  const [companyEnrollment, setCompanyEnrollment] = useState(0);
  const [selfEnrollment, setSelfEnrollment] = useState(0);
  const [activeUserCount, setActiveUserCount] = useState({
    selfActiveUser: "",
    companyActiveUser: "",
  });
  const[displayTotal,setDisplayTotal] = useState(0)

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    // Company Count
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/companycount`)
      .then((res) => res.json())
      .then((data) => {
        setCompanyCount(data.totalCompanies);
      });

    // Company Indepth Details
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/companydetails`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCompany(data);
      });

    // Company enroll count
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/enrollcount`)
      .then((res) => res.json())
      .then((data) => setSubscribersCount(data.subscribedUsers));

    // subscribers data
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/subscribersdata`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSubscribers(data);
      });

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/activeusersdata`)
      .then((res) => res.json())
      .then((data) => {
        setActiveuser(data);
      });

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/revenuedata`)
      .then((res) => res.json())
      .then((data) => {
        setRevenue(data[0]);
      });

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/monthlyprogress`)
      .then((res) => res.json())
      .then((data) => setmonthly(data));

    fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}superadmin/enrollmentcountcomandself`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSelfEnrollment(data.self_enrollment_count);
        setCompanyEnrollment(data.company_enrollment_count);
      });

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/activeforseperate`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setActiveUserCount({
          selfActiveUser: data.self_active_users,
          companyActiveUser: data.company_active_users,
        });
      });
  }, []);

  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedValue = monthly[clickedIndex].monthly_revenue;
      setDisplayTotal(clickedValue);
    } else {
      // If clicked outside bars, show the grand total
      // Convert strings to numbers before summing
setDisplayTotal(monthly.reduce((sum, data) => sum + Number(data.monthly_revenue), 0));
    }
  };

  return (
    <>
      <main className={`py-7 w-[calc(100vw-16px)]'}`}>
        <div className="mb-10 p-4">
          <div className="row">
            <div className="col-sm-10 mb-4 mb-sm-0">
              <h1 className="h2 mb-0 ls-tight">
                Hi, <span style={{ color: "#DC3545" }}> Dr.Ken</span>
              </h1>
            </div>
            <div className="col-sm-2 mb-4 mb-sm-0">
              <Link to="/business_register" className="subbtn1 rounded-2 my-2 text-decoration-none">
                Register
              </Link>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          {/* <!-- Card stats --> */}
          
         <div className="row g-6 mb-6">
      <div className="col-xl-3 col-sm-6 col-12 my-2">
        <div 
        className="card border h-60 shadow-md "
        style={{ borderColor: "#D3D3D3" }}
    >
      <div className="card-body ">
        <div className="row">
          <div className="col">
            <span className="h6 font-semibold text-muted text-sm d-block mb-2">
              Organization
            </span>
            <span className="h3 font-bold mb-0">{companyCount}</span>
          </div>
          <div className="col-auto">
            <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
              <i className="bi bi-credit-card"></i>
            </div>
          </div>
        </div>
        <hr style={{ color : "#D3D3D3" }} />
      </div>
    </div>
  </div>
   <div className="col-xl-3 col-sm-6 col-12 my-2">
    <div className="card border shadow-md  h-60" style={{ borderColor: "#D3D3D3" }}>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <span className="h6 font-semibold text-muted text-sm d-block mb-2">
              Subscribers
            </span>
            <span className="h3 font-bold mb-0">{subscribersCount}</span>
          </div>
          <div className="col-auto">
            <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
              <i className="bi bi-people"></i>
            </div>
          </div>
        </div>
        <hr  style={{ color : "#D3D3D3" }} />
        <div>
          <span>Company: {companyEnrollment}</span>
          <br />
          <span>Self: {selfEnrollment}</span>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-sm-6 col-12 my-2">
    <div className="card border shadow-md  h-60" style={{ borderColor: "#D3D3D3" }}>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <span className="h6 font-semibold text-muted text-sm d-block mb-2">
              Revenue
            </span>
            <span className="h3 font-bold mb-0">${revenue.total_amount}</span>
          </div>
          <div className="col-auto">
            <div className="icon icon-shape bg-warning text-white text-lg rounded-circle">
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
                className="lucide lucide-dollar-sign-icon lucide-dollar-sign"
              >
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </div>
        </div>
        <hr  style={{ color : "#D3D3D3" }} />
        <div className="d-flex">
          <span>Company ${revenue.business_registration_amount}</span>
          <span className="ml-2">Self-User ${revenue.self_registration_amount}</span>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-sm-6 col-12 my-2 ">
    <div className="card border shadow-md  h-60" style={{ borderColor: "#D3D3D3" }}>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <span className="h6 font-semibold text-muted text-sm d-block mb-2">
              Active User
            </span>
            <span className="h3 font-bold mb-0">{activeuser.length}</span>
          </div>
          <div className="col-auto">
            <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
              <i className="bi bi-people"></i>
            </div>
          </div>
        </div>
        <hr  style={{ color : "#D3D3D3" }} />
        <div className="">
          <span>Company: {activeUserCount.companyActiveUser}</span>
          <br />
          <span>Self: {activeUserCount.selfActiveUser}</span>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
        <h3 className="p-3">Organization</h3>
        <br />
        <div>
          <div className="row">
            <div className="col-lg-6">
              <div className="table-responsive lg:mt-10 mb-5    border-none  w-full overflow-x-auto">
                <table className="table table-hover border border-black table-nowrap ">
                  <thead className="bg-white text-light  ">
                    <tr>
                      <th className="text-light" scope="col">
                        Company Name
                      </th>
                      <th className="text-light" scope="col">
                        Email
                      </th>
                      <th className="text-light" scope="col">
                        Phone Number
                      </th>
                      <th className="text-light" scope="col">
                        Purchased Licence
                      </th>
                      <th className="text-light" scope="col">
                        Used Licence
                      </th>
                      <th className="text-light" scope="col">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.map((value, index) => (
                      <tr className="bg-white" key={index}>
                        <td>
                          <a
                            className="text-heading font-semibold text-decoration-none"
                            href="#"
                          >
                            {value.company_name}
                          </a>
                        </td>
                        <td>{value.spoc_email_id}</td>
                        <td>{value.spoc_phone_number}</td>
                        <td>{value.total_licences}</td>
                        <td>{`${value.total_licences - value.license}`}</td>
                        <td>{value.total_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
          <div className="col-lg-6 p-4 bg-white rounded-xl shadow-sm">
           <div>
            <h1 className="text-sm text-center">Total :  ${displayTotal.toLocaleString()} </h1>
           </div>
           <div className="h-[300px] ">
                    <Bar
              data={{
                labels,
                datasets: [
                  {
                    label: "Total Revenue / Per Month",
                    data: monthly.map((data) => data.monthly_revenue),
                    borderRadius: 6,
                    backgroundColor: "#001040",
                    borderColor: "rgba(0, 40, 100, 1)",
                    borderWidth: 2,
                    hoverBackgroundColor: "#001040",
                    hoverBorderWidth: 0,
                  },
                ],
              }}
              options={{
                onClick : handleBarClick,
                animation: {
                  duration: 1000,
                  easing: "easeOutQuart",
                },
                plugins: {
                  legend: {
                    display: true,
                  },
                  tooltip: {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    padding: 12,
                    cornerRadius: 8,
                    usePointStyle: true,
                    callbacks: {
                      label: function(context) {
                        return ` $${context.parsed.y.toLocaleString()}`;
                      }
                    }
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawBorder: false,
                      color: "rgba(0, 0, 0, 0.05)",
                    },
                    ticks: {
                      padding: 8,
                      color: "rgba(0, 0, 0, 0.6)",
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      color: "rgba(0, 0, 0, 0.6)",
                    },
                  },
                },
                maintainAspectRatio: false,
              }}
            />
           </div>
            
        </div>
          </div>
        </div>
        <br />
        <h3 className="p-3">Subscribers</h3>
        <br />
        <div className="table-responsive mx-2 overflow-auto">
          <table className="table table-hover table-nowrap ">
            <thead className="bg-gray-100">
              <tr >
                <th 
                scope="col" 
                className="text-light"
                style={{ width: "300px", minWidth: "300px" }}
                >
                  Name
                </th>
                <th scope="col" className="text-light">
                  Enrollment Date
                </th>
                <th scope="col" className="text-light">
                  Module Completed
                </th>
                <th scope="col" className="text-light ">
                  Completion %
                </th>
              </tr>
            </thead>
             <tbody>
              {subscribers.map((value, index) => (
                <tr className="bg-white" key={index}>
                  <td>
                    <img
                      alt="..."
                      src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                      className="avatar avatar-sm rounded-circle me-2"
                    />
                    <a
                      className="text-heading  font-semibold text-decoration-none"
                      href="#"
                    >
                      {value.first_name}
                    </a>
                  </td>
                  <td>
                    {new Date(value.enrollment_date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td>{value.completed_modules}</td>
                  <td>
                    <ProgressBar
                      completed={Math.round(value.completion_percentage)}
                      bgColor="#001040"
                      animateOnRender="true"
                      transitionDuration="1s"
                      labelClassName="text-xs text-white"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <h3 className="p-3">Active user</h3>
        <br />
        <div className="table-responsive mx-2  overflow-auto ">
          <table className="table table-hover table-nowrap ">
            <thead className="bg-white">
              <tr>
                <th 
                scope="col" 
                className="text-light"
                style={{ width: "300px", minWidth: "300px" }}
                >
                  Name
                </th>
                <th scope="col" className="text-light">
                  Enrollment_date
                </th>
                <th scope="col" className="text-light">
                  No. of modlule completed
                </th>
                <th scope="col" className="text-light">
                  Completed percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {activeuser.map((value, index) => (
                <tr className="bg-white " key={index}>
                  <td>
                    <img
                      alt="..."
                      src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                      className="avatar avatar-sm rounded-circle me-2"
                    />
                    <a
                      className="text-heading font-semibold text-decoration-none"
                      href="#"
                    >
                      {value.first_name}
                    </a>
                  </td>
                  <td>
                    {new Date(value.enrollment_date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td>{value.completed_modules}</td>
                  <td>
                    <ProgressBar
                      completed={Math.round(value.completion_percentage)}
                      bgColor="#001040"
                      animateOnRender="true"
                      transitionDuration="1s"
                      labelClassName="text-xs text-white"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}