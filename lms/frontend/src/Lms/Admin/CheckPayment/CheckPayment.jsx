import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function CheckPayment() {
  const { quantity } = useParams();
  const amt = quantity * 20;
  const [amount, setAmount] = useState(amt);
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  const [chequeNumberError, setChequeNumberError] = useState("");


  const decodedId = atob(id)


  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}admin/bussuserdetails/${decodedId}`)
      .then((res) => res.json())
      .then((respon) => {
        console.log(respon);
        setEmail(respon[0].spoc_email_id);
      });
  }, [id]);


  function handlecheckdetails(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const checkno = document.getElementById("checkno").value;
    const quantity = document.getElementById("quantity").value;
    const amount = document.getElementById("amount").value;


    // Cheque number regex pattern: between 6 to 9 digits
    const chequePattern = /^\d{6,15}$/;


    // Validate cheque number
    if (!chequePattern.test(checkno)) {
      setChequeNumberError("Cheque number must be between 6 and 9 digits.");
      return; // Do not proceed with form submission
    } else {
      setChequeNumberError(""); // Clear error if validation passes
    }


    if (checkno === "") {
      toast("Kindly fill the Check number");
      return; // Do not proceed if cheque number is empty
    }


    const key = {
      email: email,
      checkno: checkno,
      quantity: quantity,
      amount: amount,
    };


    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}admin/checktransation/${decodedId}`, key)
      .then((res) => {
        if (res.data.status === "inserted") {
          toast.success("Thank you! Your license will update after Admin Approval.");
          window.location.assign(`/admindashboard/${id}/purchaselicense`);
        } else {
          toast.error("Sorry, please refill the details.");
          window.location.reload();
        }
      });
  }


  return (
     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 rounded-3xl">
      <ToastContainer/>
    <div className="max-w-3xl mx-auto ">
 <div className="bg-white rounded-xl shadow-lg overflow-hidden">
       <div className="px-6 py-5 bg-[#001040]">
            <h2 className="text-2xl font-bold text-white">Transactional Details</h2>
           
          </div>
        <div className="col-sm-12 login-form card p-3">
          <form onSubmit={handlecheckdetails}>
            <div className="form-group">
              <label className="form-control-label text-start">Email Id</label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                value={email}
                readOnly
                placeholder="Email Id"
              />
            </div>


            <div className="form-group">
              <label className="form-control-label text-start">Cheque No</label>
              <input
                type="text"
                className="form-control"
                name="checkno"
                id="checkno"
                required
                placeholder="Cheque No"
              />
              {chequeNumberError && (
                <p style={{ color: "red" ,fontSize:"12px"}}>{chequeNumberError}</p>
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
                readOnly
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
                readOnly
                placeholder="Amount"
              />
            </div>
<div className="flex justify-center">
            <button type="submit" className=" px-6 py-3 bg-[#001040] text-white font-medium rounded-lg shadow-md hover:bg-blue-900 transition-all duration-200 flex items-center gap-2">
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
