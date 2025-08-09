import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Approve.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Approve() {
  const [checktransation, setChecktransation] = useState([]);
  const [checkapproved, setCheckapproved] = useState([]);
  const [nefttransation, setnefttransation] = useState([]);
  const [neftapproved, setneftapproved] = useState([]);

  const [activeTable, setActiveTable] = useState(1);
  const [activeTable2, setActiveTable2] = useState(1);

  const [chequeInputs, setChequeInputs] = useState({});

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

    Promise.all([
      fetch(`${baseUrl}superadmin/getcheck`).then((res) => res.json()),
      fetch(`${baseUrl}superadmin/checkapproved`).then((res) => res.json()),
      fetch(`${baseUrl}superadmin/getneft`).then((res) => res.json()),
      fetch(`${baseUrl}superadmin/neftapproved`).then((res) => res.json()),
    ])
      .then(([checkData, approvedCheck, neftData, approvedNeft]) => {
        setChecktransation(checkData);
        setCheckapproved(approvedCheck);
        setnefttransation(neftData);
        setneftapproved(approvedNeft);
      })
      .catch((err) => {
        toast.error("Error fetching data");
        console.error(err);
      });
  }, []);

  const handleChequeInputChange = (id, value) => {
    setChequeInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateCheque = (item) => {
    const transactionId = chequeInputs[item.id]?.trim();
    if (!transactionId) {
      toast.warning("plz fill the transation id");
      return;
    }

    const payload = {
      transationid: transactionId,
      id: item.id,
      email: item.email,
      quantity: item.quantity,
      amount: item.amount,
    };

    axios
      .put(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/checkupdate`, payload)
      .then((res) => {
        if (res.data.status === "updated") {
          toast.success("Approved");
          window.location.reload();
        }
      })
      .catch(() => toast.error("Approval failed"));
  };

  const handleUpdateNeft = (item) => {
    if (!item.transaction_id) {
      toast.warning("plz fill the transation id");
      return;
    }

    const payload = {
      transationid: item.transaction_id,
      id: item.id,
      email: item.email,
      quantity: item.quantity,
      amount: item.amount,
    };

    axios
      .put(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/neftupdate`, payload)
      .then((res) => {
        if (res.data.status === "updated") {
          toast.success("Approved");
          window.location.reload();
        }
      })
      .catch(() => toast.error("Approval failed"));
  };

  return (
    <div>
      <ToastContainer />
      <div className="row py-3">
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

      <div className="row">
        {/* Cheque Transaction Table */}
        <div className="rounded-2 p-3 shadow border  mb-5 w-100">
          <div className="d-flex justify-content-between  my-3">
            <h5 className="mb-0 pointer mr-2">Cheque Transaction</h5>
            {activeTable === 1 ? (
              <button
                className="flex items-center px-4 py-2 mr-2   bg-green-500 text-gray-50 font-semibold hover:bg-green-600 transition ease-in-out duration-300"
                onClick={() => setActiveTable(2)}
              >
                Approved
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="ml-2">
                  <path fill="currentColor" d="M10.95 15.55L16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1l-1.425 1.425zM12 22q-3.475-.875-5.737-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22" />
                </svg>
              </button>
            ) : (
              <h5 className="mb-0 pointer btn btn-primary" onClick={() => setActiveTable(1)}>
                Waiting for Approval
              </h5>
            )}
          </div>
          <div className="table-responsive overflow-auto">
            <table className="w-100 table table-hover table-nowrap">
              <thead className="text-light">
                <tr className="tw">
                  <th className="text-light">Id</th>
                  <th className="text-light">email</th>
                  <th className="text-light">Cheque Number</th>
                  <th className="text-light">Transaction Id</th>
                  <th className="text-light">quantity</th>
                  <th className="text-light">Amount</th>
                  <th className="text-light">Action</th>
                </tr>
              </thead>
              <tbody>
                {activeTable === 1
                  ? checktransation.map((item) => (
                      <tr className="bg-white" key={item.id}>
                        <td>
                          <a className="text-heading font-bold text-decoration-none" href="#">
                            {item.id}
                          </a>
                        </td>
                        <td>{item.email}</td>
                        <td>{item.checkno}</td>
                        <td>
                          <input
                            className="border border-gray-500 rounded-xl p-2"
                            type="text"
                            placeholder="Enter the Transation Id"
                            value={chequeInputs[item.id] || ""}
                            onChange={(e) => handleChequeInputChange(item.id, e.target.value)}
                          />
                        </td>
                        <td>{item.quantity}</td>
                        <td>{item.amount}</td>
                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleUpdateCheque(item)}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="green"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-check-icon lucide-check cursor-pointer"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </td>
                      </tr>
                    ))
                  : checkapproved.map((value) => (
                      <tr key={value.id} className="text-[#001040]">
                        <td>
                          <a className="text-heading font-semibold" href="#">
                            {value.id}
                          </a>
                        </td>
                        <td>{value.email}</td>
                        <td>{value.checkno}</td>
                        <td>{value.transaction_id}</td>
                        <td>{value.quantity}</td>
                        <td>{value.amount}</td>
                        <td>
                          <p className="text-success">Approved</p>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NEFT Transaction Table */}
        <div className="shadow border rounded-lg mb-7 p-3">
          <div className="card-header d-flex justify-content-between my-3 p-0">
            <h5 className="mb-0 pointer mr-2">NEFT Transaction</h5>
            {activeTable2 === 1 ? (
              <button
                className="flex items-center px-4 py-2 mr-2 rounded-md bg-green-500 text-gray-50 font-semibold hover:bg-green-600 transition ease-in-out duration-300"
                onClick={() => setActiveTable2(2)}
              >
                Approved
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="ml-2">
                  <path fill="currentColor" d="M10.95 15.55L16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1l-1.425 1.425zM12 22q-3.475-.875-5.737-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22" />
                </svg>
              </button>
            ) : (
              <h5 className="mb-0 pointer btn btn-primary" onClick={() => setActiveTable2(1)}>
                Waiting for Approval
              </h5>
            )}
          </div>
          <div className="table-responsive overflow-auto">
            <table className="w-100 table table-hover table-nowrap">
              <thead className="text-light">
                <tr>
                  <th className="text-light">Id</th>
                  <th className="text-light">email</th>
                  <th className="text-light">Transaction Id</th>
                  <th className="text-light">quantity</th>
                  <th className="text-light">Amount</th>
                  <th className="text-light">Action</th>
                </tr>
              </thead>
              <tbody>
                {activeTable2 === 1
                  ? nefttransation.map((item) => (
                      <tr className="bg-white text-[#001040]" key={item.id}>
                        <td>
                          <a className="text-heading font-bold text-decoration-none" href="#">
                            {item.id}
                          </a>
                        </td>
                        <td className="text-[#001040]">{item.email}</td>
                        <td>{item.transaction_id}</td>
                        <td>{item.quantity}</td>
                        <td>{item.amount}</td>
                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleUpdateNeft(item)}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="green"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-check-icon lucide-check cursor-pointer"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </td>
                      </tr>
                    ))
                  : neftapproved.map((value) => (
                      <tr key={value.id} className="text-white">
                        <td>
                          <a className="text-heading font-semibold" href="#">
                            {value.id}
                          </a>
                        </td>
                        <td className="text-[#001040]">{value.email}</td>
                        <td className="text-[#001040]">{value.transaction_id}</td>
                        <td className="text-[#001040]">{value.quantity}</td>
                        <td className="text-[#001040]">{value.amount}</td>
                        <td>
                          <p className="text-success">Approved</p>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
