import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NeftPayment.css";
import { toast } from "react-toastify";



export default function NeftPayment() {
  const { quantity } = useParams();
  const amt = quantity * 20;
  const [amount, setAmount] = useState(amt);
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  const [transactionError, setTransactionError] = useState("");
  const transactionPattern = /^[A-Za-z0-9]{6,20}$/;


  const decodedId = atob(id)


  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}admin/bussuserdetails/${decodedId}`)
      .then((res) => res.json())
      .then((respon) => {
        console.log(respon);
        setEmail(respon[0].spoc_email_id);
      });
  }, [id]);


  function handleneftdetails(event) {
    event.preventDefault();


    const email = document.getElementById("email").value;
    const transactionId = document.getElementById("transactionid").value;
    const quantity = document.getElementById("quantity").value;
    const amount = document.getElementById("amount").value;


    // Validate transaction ID
    if (!transactionPattern.test(transactionId)) {
      setTransactionError("Enter a Valid Transaction ID .");
      return; // Prevent form submission
    } else {
      setTransactionError(""); // Clear error if validation passes
    }


    const key = {
      email,
      transactionid: transactionId,
      quantity,
      amount,
    };


    // Send request to server
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}admin/nefttransation/${decodedId}`, key)
      .then((res) => {
        if (res.data.status === "inserted") {
          toast.success("Thank you! Your license will update after Admin Approval");
          window.location.assign(`/admindashboard/${id}/purchaselicense`);
        } else {
          toast.error("Sorry, please refill the details");
          window.location.reload();
        }
      });
  }


  return (
     <div className=" min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 rounded-3xl">
   <div className="max-w-3xl mx-auto" >


  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
     <div className="px-6 py-5 bg-[#001040]">
            <h2 className="text-2xl font-bold text-white">Transactional Details</h2>
           
          </div>
       
        <div className="col-sm-12 login-form card p-3">
          <form onSubmit={handleneftdetails}>
            <div className="form-group">
              <label className="form-control-label text-start">Email Id</label>
              <input
                type="text"
                className="w-100"
                name="email"
                id="email"
                value={email}
                required
                placeholder="Email Id"
              />
            </div>


            <div className="form-group">
              <label className="form-control-label text-start">Transaction Id</label>
              <input
                type="text"
                className="form-control"
                name="transactionid"
                id="transactionid"
                required
                placeholder="Transaction Id"
              />
              {transactionError && (
                <p style={{ color: "red",fontSize:"12px" }}>{transactionError}</p>
              )}
            </div>


            <div className="form-group">
              <label className="form-control-label text-start">Quantity</label>
              <input
                type="text"
                className="form-control"
                name="quantity"
                id="quantity"
                value={quantity}
                required
                placeholder="Quantity"
              />
            </div>


            <div className="form-group">
              <label className="form-control-label text-start">Amount</label>
              <input
                type="text"
                className="form-control"
                name="amount"
                id="amount"
                value={amount}
                placeholder="Amount"
                readOnly/>
            </div>
<div className="flex justify-center">
            <button type="submit" className=" px-6 py-3 bg-[#001040] text-white font-medium rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-2">
              Sign Up
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
 
  );
}
