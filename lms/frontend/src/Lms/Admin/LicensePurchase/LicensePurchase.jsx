// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import "./LicensePurchase.css";


// const stripePromise = loadStripe(
//     "pk_test_51OT2FaSHtllxmCJSGKaAzZmIfYDedAkOkUhZqLs8GAvPlEQsasgY7zKxH0iDm4E1Nu11OEyVv7kCPp3MhvK7P85i00ecnTPLf9"
// );

// export default function LicensePurchase() {
//   const itemName = "License";
//   const [quantity, setQuantity] = useState(1);
//   const { id } = useParams();
//   const nav = useNavigate();

//   const decodedId = atob(id)

//   const increment = () => {
//     setQuantity(quantity + 1);
//   };

//   const decrement = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   // Redirect based on selected payment method
//   function handlecheck() {
//     window.location.assign(`/admindashboard/${id}/check/${quantity}`);
//   }

//   function handleneft() {
//     window.location.assign(`/admindashboard/${id}/neft/${quantity}`);
//   }

//   // Checkout function for online payment
//   function checkout(itemPrice, quantity) {
//     fetch(`${import.meta.env.VITE_REACT_APP_API_URL}admin/create-checkout-session/${decodedId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       mode: "cors",
//       body: JSON.stringify({
//         items: [
//           { id: 1, quantity: quantity, price: itemPrice, name: itemName },
//         ],
//       }),
//     })
//       .then((res) =>
//         res.ok ? res.json() : res.json().then((json) => Promise.reject(json))
//       )
//       .then(({ url }) => {
//         window.location = url;
//       })
//       .catch((e) => {
//         console.log(e.error);
//       });
//   }

//   return (
//     <div className="license-container">
//     <div className="lpart">
//       <div className="p-3">
//         <h3 className="text-center">We Provide Best Catalogue</h3>
//       </div>
    
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12 col-md-12 mb-4 ">
//               <div className="card  shadow-lg">
//                 <div className="card-body">
//                   <div className="text-center p-3">
//                     <span className="h2">$20</span>/License
//                     <br />
//                     <br />
//                     <h4>
//                       <button onClick={increment} className="btn neftbtn1  px-3">
//                         +
//                       </button>
//                       <span className="btquantity py-2 px-3 rounded-5">{quantity}</span>
                      
                      
//                       <button onClick={decrement} className="btn neftbtn1  px-3 rounded-2">
//                         -
//                       </button>
//                     </h4>
//                     <br />
//                   </div>
//                   <p className="card-text">
//                     For most businesses that want to optimize web queries
//                   </p>
//                 </div>
//                 <ul className="list-group list-group-flush">
//                   <li className="list-group-item">
//                     <i className="bi bi-check"></i> Access catalog of 5,800+
//                     from top universities and companies
//                   </li>
//                   <li className="list-group-item">
//                     <i className="bi bi-check"></i> Co-branded experience with
//                     learner priority technical support
//                   </li>
//                   <li className="list-group-item">
//                     <i className="bi bi-check"></i> Skills platform for insights
//                     and analytics
//                   </li>
//                 </ul>
//                 <div className="card-body text-center">
//                   <button
//                     className="btn neftbtn btn-lg mx-2"
//                     onClick={() => {
//                       checkout(20, quantity);
//                     }}
//                     style={{ borderRadius: "30px" }}
//                   >
//                     Online Payment
//                   </button>
//                   <button
//                     className="btn neftbtn btn-lg mx-2"
//                     data-bs-toggle="modal"
//                     data-bs-target="#exampleModal"
//                     style={{ borderRadius: "30px" }} >
//                     Offline Payment
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Modal for Offline Payment Selection */}
//             <div
//               className="modal fade"
//               id="exampleModal"
//               tabIndex="-1"
//               aria-labelledby="exampleModalLabel"
//               aria-hidden="true">
//               <div className="modal-dialog modal-dialog-centered">
//                 <div className="modal-content">
//                   <div className="modal-header modleborderbottom">
//                     <h5 className="modal-title" id="exampleModalLabel">
//                       Payment Mode
//                     </h5>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     ></button>
//                   </div>
//                   <div className="modal-body p-5">
//                     <h5>Choose the payment method types.</h5>
//                     <div className="d-flex justify-content-between py-2">
//                       <button
//                         type="button"
//                         className="btn neftbtn"
//                         onClick={handleneft}>
//                         NEFT
//                       </button>
//                       <button
//                         type="button"
//                         className="btn neftbtn"
//                         onClick={handlecheck}
//                       >
//                         Cheque
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
// </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51OT2FaSHtllxmCJSGKaAzZmIfYDedAkOkUhZqLs8GAvPlEQsasgY7zKxH0iDm4E1Nu11OEyVv7kCPppv K7P85i00ecnTPLf9"
);

export default function LicensePurchase() {
  const itemName = "License";
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  
  const { id } = useParams();
  const nav = useNavigate();

  const decodedId = atob(id);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Redirect based on selected payment method
  function handleCheck() {
    window.location.assign(`/admindashboard/${id}/check/${quantity}`);
  }

  function handleNeft() {
    window.location.assign(`/admindashboard/${id}/neft/${quantity}`);
  }

  // Checkout function for online payment
  function checkout(itemPrice, quantity) {
    fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}admin/create-checkout-session/${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
          id: decodedId,
          quantity,
          items: [{ id: 1, quantity, price: itemPrice, name: itemName }]
    })
      }
    )
      .then((res) =>
        res.ok ? res.json() : res.json().then((json) => Promise.reject(json))
      )
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.log(e.error);
      });
  }

  return (
    <div className="bg-gray-100 py-10">
      <div className="text-center mb-5">
        <h3>We Provide Best Catalogue</h3>
      </div>

      <div className="max-w-md px-4 py-6  bg-gray-50 rounded-lg border shadow-md m-auto">
        <div className="text-center p-3">
          <span className="text-2xl font-semibold">$20</span> / License
          <br /><br />

          <h4 className="flex items-center justify-center gap-4">
            <button
              onClick={increment}
              className="bg-[#001040] text-gray-50 px-3 py-1 rounded-lg  transition ease-in-out duration-300">
              +
            </button>

            <span className="bg-gray-200 px-4 py-2 rounded-full">
              {quantity}
            </span>

            <button
              onClick={decrement}
              className="bg-[#001040] text-gray-50 px-3 py-1 rounded-lg transition ease-in-out duration-300">
              -
            </button>
          </h4>

          <br />

          <p>For most businesses that want to optimize web queries</p>
        </div>

        <ul className="bg-gray-50 px-4 py-2 rounded-md">
          <li>Access catalog of 5,800+ from top universities and companies</li>
          <li>Co-branded experience with learner priority technical support</li>
          <li>Skills platform for insights and analytics</li>
        </ul>

        <div className=" flex gap-5 text-center mt-5">
          <button
            onClick={() => checkout(20, quantity)}
            style={{
              borderRadius : "10px"
            }}
            className="bg-[#001040] text-gray-50 px-5 py-2 rounded-lg mr-2  transition ease-in-out duration-300">
            Online Payment
          </button>

          <button
            onClick={() => setIsOpen(true)}
              style={{
              borderRadius : "10px",
              
            }}
            className="bg-neutral-800 text-gray-50 px-5 py-2 rounded-lg hover:bg-gray-600 transition ease-in-out duration-300">
            Offline Payment
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-md relative">
            <h5 className="text-lg font-semibold">Payment Mode</h5>

            <button
              aria-label="Close"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900">
              &times;
            </button>

            <div className="p-5">
              <h5>Choose the payment method.</h5>

              <div className="flex justify-around py-2">
                <button
                    onClick={handleNeft}
                    className="bg-[#001040] text-gray-50 px-4 py-2 rounded-md  transition ease-in-out duration-300">
                    NEFT
                </button>

                <button
                    onClick={handleCheck}
                    className="bg-[#001040] text-gray-50 px-4 py-2 rounded-md  transition ease-in-out duration-300">
                    Cheque
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
