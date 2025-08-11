import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link, useParams,useNavigate, NavLink } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate()
  const [totallicense, setTotallicense] = useState("");
  const [learnerinvited, setLearnerinvited] = useState("");
  const [learnerjoiner, setLearnerjoiner] = useState("");
  var calculate = (learnerinvited / totallicense) * 100;
  var calculatejoiner = (learnerjoiner / learnerinvited) * 100;
  var { id } = useParams();
  const [learnerinvitedpercentage, setLearnerinvitedpercentage] =
    useState(calculate);
  const [learnerjoinerpercentage, setLearnerjoinerpercentage] =
    useState(calculatejoiner);
  const [spocname, setSpocname] = useState("");
  const [companyMail, setCompanyMail] = useState("");
  const [progress, setProgress] = useState([]);
  const [active, setActive] = useState([]);
  const [inactive, setInactive] = useState([]);
  const [complete, setComplete] = useState([]);


  const decodedId = atob(id)


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}admin/getspocname/${decodedId}`)
      .then((res) => {
        console.log(res);
        setSpocname(res.data.spoc_name);
        setCompanyMail(res.data.company_email);
      });
  }, [id]);


  function handleInvite(event) {
    event.preventDefault();


    // Split the email list by commas and trim whitespace
    const emailArray = emailList.split(",").map((email) => email.trim());
    const key = {
      emails: emailList,
    };


    console.log(emailList);


    // Extract company domain from the companyEmail
    const companyDomain = companyMail.split("@")[1];


    // Check if the email list is empty
    if (emailArray.length === 0 || emailList === "") {
      toast("Please provide email addresses");
      return;
    }


    // Check if the number of emails exceeds the available licenses
    if (emailArray.length > totallicense) {
      toast(
        `Your available license is only ${totallicense}. You are trying to invite more than that. Please add more licenses.`
      );
      return;
    }


    // Check if each invited email ends with the company domain
    const invalidEmails = emailArray.filter(
      (email) => !email.endsWith(`@${companyDomain}`)
    );


    if (invalidEmails.length > 0) {
      toast(`All emails must end with @${companyDomain}`);
      return;
    }


    // Send the invitation request to the server
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}admin/invite_learners/${id}`, key)
      .then((res) => {
        console.log(res);
        if (
          res.data.message ===
          "Learners invited, licenses updated, and emails sent successfully"
        ) {
          toast("Mail sent successfully");
          window.location.reload();
        } else if (res.data.message === "All emails are already invited") {
          toast("Invite sent already for these emails");
        } else {
          toast("Failed to send mail");
        }
      })
      .catch((error) => {
        console.error("There was an error sending the invite:", error);
        toast("An error occurred. Please try again.");
      });
  }


  const [enrolledCount, setEnrolledCount] = useState(0);
  const [invitedUser, setInvitedUser] = useState(0);


  // Modal states for toggling
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailList, setEmailList] = useState(""); // For collecting email input


  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}admin/licensecount/${decodedId}`)
      .then((res) => {
        setTotallicense(res.data.data.license);
      });


    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}admin/invitecount/${decodedId}`)
      .then((res) => {
        // console.log(res.data);
        setInvitedUser(res.data.invite_count);
      });


    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}admin/enrolledcount/${decodedId}`)
      .then((res) => {
        console.log(res.data);
        setEnrolledCount(res.data.matchingCount);
      });
  }, []);


  const [activeTable, setActiveTable] = useState(1);
  const changeTable = (tableNumber) => {
    setActiveTable(tableNumber);
  };


  const [activeData, setActiveData] = useState([]);
  const [inactiveData, setInactiveData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [leaderBoardData, setLeaderBoardData] = useState([]);


  useEffect(() => {
    const fetchUserStates = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}admin/userstates/${decodedId}`
        );
        console.log(res.data);


        // setPaidUserCount(res.data.paidUsersCount);
        setActiveData(res.data.activeData);
        setInactiveData(res.data.inactiveData);
        setCompletedData(res.data.completedData);
        setLeaderBoardData(res.data.leaderBoardData);
      } catch (error) {
        console.error("Error fetching user states:", error);
      }
    };


    fetchUserStates();
  }, []);


  const renderTableData = () => {
    let dataToRender = [];


    switch (activeTable) {
      case 1:
        dataToRender = leaderBoardData;
        break;
      case 2:
        dataToRender = activeData;
        break;
      case 3:
        dataToRender = inactiveData;
        break;
      case 4:
        dataToRender = completedData;
        break;
      default:
        dataToRender = [];
    }


    return dataToRender.map((item, index) => (
      <tr key={index} className="bg-white ">
        <td>{item.name.trim()}</td> {/* Use trim to remove any extra spaces */}
        <td>{item.date ? new Date(item.date).toLocaleString() : "N/A"}</td>{" "}
        <td>{item.modules}</td>
        <td>{item.percent}</td>
      </tr>
    ));
  };


  return (
    <>
      <div>
        <ToastContainer/>
        <header class="bg-surface-primary border-bottom ">
          <div class="container-fluid">
            <div class="mb-npx p-5">
              <div class="row align-items-center">
                <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                  <h1 class="h2 mb-0 ls-tight">
                    Hi,{" "}
                    <span
                      style={{ color: "#DC3545", textTransform: "capitalize" }}
                    >
                      {spocname}
                    </span>
                  </h1>
                </div>
                {/* <!-- Actions --> */}
              </div>
            </div>
          </div>
        </header>
        {/* <!-- Main --> */}
        <main class="py-6 bg-surface-secondary">
          <div class="container-fluid">
            {/* <!-- Card stats --> */}
            <div class="row g-6 mb-6  ">
              <div class="col-xl-4 col-sm-6 col-12">
                <div 
                class="card shadow-md border h-60 lg:h-60"
                style={{ borderColor: "#D3D3D3" }}
                >
             
                  <div class="card-body  rounded-2xl">
                    <div class="row ">
                      <div class="col">
                        <span class="h6 font-semibold text-muted text-sm d-block mb-2 ">
                          Total License
                        </span>
                        <span class="h3 font-bold mb-0">{totallicense}</span>
                      </div>
                      <div class="col-auto">
                        <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                          <i class="bi bi-credit-card"></i>
                        </div>
                      </div>
                    </div>
                    <hr style={{ color: "#D3D3D3" }} />
                    <div class="mt-2 mb-0 text-sm">
                      <span class="badge badge-pill bg-soft-success text-success me-2">
                        {/* <i class="bi bi-arrow-up me-1"></i>13% */}
                      </span>
                      <Link to={`/admindashboard/${id}/purchaselicense`}>
                          <span className="flex items-center gap-2 text-blue-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-copy-plus"
                            >
                              <line x1="15" x2="15" y1="12" y2="18" />
                              <line x1="12" x2="18" y1="15" y2="15" />
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                            Add More License
                          </span>
                        </Link>


                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-sm-6  col-12">
                <div class="card shadow-md border h-60 lg:h-60" style={{ borderColor: "#D3D3D3" }}>
             
                  <div class="card-body  rounded-xl  ">
                    <div class="row">
                      <div class="col">
                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">
                          Learners Invited
                        </span>
                        <span class="h3 font-bold mb-0">{invitedUser}</span>
                      </div>
                      <div class="col-auto">
                       
                        <div class="icon icon-shape bg-primary text-white text-lg rounded-circle">
                          <i class="bi bi-people"></i>
                        </div>
                      </div>
                    </div>
                    <hr style={{ color: "#D3D3D3" }} />
                    <div class="mt-2 mb-0 text-sm">
                      <span class="badge badge-pill bg-primary text-white me-2 p-2">
                        Active: {activeData.length}
                      </span>
                      <span class="badge badge-pill bg-danger text-white me-2  p-2">
                        Inactive: {inactiveData.length}
                      </span>
                      <span class="badge badge-pill bg-soft-success text-success mt-2 sm:mt-2 me-2 p-2">
                        completed: {completedData.length}
                      </span>
                      {totallicense ===  0 ? (
                        <Link  to={`/admindashboard/${id}/purchaselicense`} className="flex my-2 text-green-600">
                          <span className="flex items-center gap-2 text-green-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-copy-plus"
                            >
                              <line x1="15" x2="15" y1="12" y2="18" />
                              <line x1="12" x2="18" y1="15" y2="15" />
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                            Add License
                          </span>
                          
                        </Link>
                       
                      ) : (
                       
                        <Link onClick={handleModalOpen} className="border">
                              <span
                                className={`flex items-center text-green-600 my-2 gap-2 ${
                                  totallicense === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-mail-plus"
                                >
                                  <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                  <path d="M19 16v6" />
                                  <path d="M16 19h6" />
                                </svg>
                                Invite Learners
                              </span>
                          </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-sm-6  col-12">
                <div class="card shadow-md border h-60 lg:h-60" style={{ borderColor: "#D3D3D3" }}> 
             
                  <div class="card-body  rounded-xl">
                    <div class="row">
                      <div class="col">
                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">
                          Learners Enrolled
                        </span>
                        <span class="h3 font-bold mb-0">{enrolledCount}</span>
                      </div>
                      <div class="col-auto">
                        <div class="icon icon-shape bg-info text-white text-lg rounded-circle">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-check-icon lucide-user-check"><path d="m16 11 2 2 4-4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                        </div>
                      </div>
                    </div>
                    <hr style={{ color: "#D3D3D3" }} />
                    <div class="mt-2 mb-0 text-sm">
                     
                     
                     <Link to={`/admindashboard/${id}/notenroll`}>
                    <span className="flex items-center text-red-500 p-2 space-x-2 ">
                      <span>Not Enrolled</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-arrow-right"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="m12 16 4-4-4-4" />
                      </svg>
                      </span>
                  </Link> 
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="h-screen  flex-grow-1 overflow-y-auto">
            <main className="py-6 bg-surface-secondary">
            <div>
              <div className="card shadow border-0 mb-7">
                
                <div className="card-header">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0">
                    <div className="flex space-x-2 sm:space-x-4 min-w-max">
                      <button
                        onClick={() => changeTable(1)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTable === 1 
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Leader Board
                      </button>
                      <button
                        onClick={() => changeTable(2)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTable === 2
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => changeTable(3)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTable === 3
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Inactive
                      </button>
                      <button
                        onClick={() => changeTable(4)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTable === 4
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                </div>

                {/* Improved Table with Horizontal Scrolling */}
                <div className="relative overflow-x-auto shadow-sm  ">
                  <div className="inline-block min-w-full align-middle rounded-0">
                    <div className="overflow-hidden">
                      <table 
                      className="w-full divide-y divide-gray-200 ">
                        <thead
                         style={{
                          borderRadius : "0px"
                        }} 
                        className="bg-blue-700 ">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                              Enrollment Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                              Modules Completed
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                              Completion %
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 hover:bg-neutral-400">
                          {renderTableData()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </main>
      </div>
          </div>
        </main>
        {isModalOpen && (
          <div className="modal fade show d-block " tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content ">
                <div className="modal-header">
                  <h5 className="modal-title">Invite Learners</h5>
                  <button
                    type="button"
                    className="btn-close text-red-500"
                    onClick={handleModalClose}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleInvite}>
                    <textarea
                      className="form-control"
                      value={emailList}
                      onChange={(e) => setEmailList(e.target.value)}
                      placeholder="Enter email addresses separated by commas"
                      rows="3"
                    />
                    <p className="mt-2">
                      You may specify multiple email addresses by separating
                      them with commas.
                    </p>
                    <div className="modal-footer">
                     
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Invite
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}



