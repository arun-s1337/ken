import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBoxOpen,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

function Userprofile() {
  const username = 'John Doe';
  const navigate = useNavigate();
  const [showOrders, setShowOrders] = useState(false); // Toggle for orders
  const[token,setToken] = useState("")
  const[currentUser,setCurrentUser] = useState({})

  const toggleOrders = () => {
    setShowOrders(!showOrders);
  };

 
    console.log(token)

    useEffect(() =>{
        const userToken = localStorage.getItem("user-token")
        setToken(userToken)
    },[])
  

 useEffect(() => {
  if (!token) return; 

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setCurrentUser(response.data)
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  fetchUser();
}, [token]); 


  return (
   <div className="container-fluid bg-light min-vh-100  pt-[100px] pl-4 mt-5">

          <div className="row flex-column flex-md-row">
      {/* Sidebar */}
      <div className="col-md-3 mb-3 mb-md-0  ">
        <div className="bg-white p-3 shadow-sm rounded h-100">
          <h5 className="mb-4">Hello, {currentUser.first_name}</h5>
          <ul className="list-group list-group-flush">
            <li
              className="list-group-item d-flex align-items-center"
              onClick={toggleOrders}
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
              My Orders
            </li>
            <li
              className="list-group-item d-flex align-items-center text-danger"
              onClick={() => {
                localStorage.removeItem("user-token");
                navigate("/login");
              }}
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              Logout
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-md-9">
        <div className="bg-white p-4 shadow-sm rounded">
          <h4>Your Profile</h4>
          <hr />
          <div className="row">
            <div className="col-sm-12 col-md-6 mb-3">
              <p><strong>Name:</strong> {currentUser.first_name}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Phone:</strong> {currentUser.phone}</p>
            </div>
          </div>
        </div>

        {showOrders && (
          <div className="bg-white p-4 mt-4 shadow-sm rounded">
            <h5>Your Recent Orders</h5>
            <p>No recent orders</p>
          </div>
        )}
      </div>
    </div>

    </div>
  );
}

export default Userprofile;
