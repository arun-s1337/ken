

import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import { PayPalScriptProvider,PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

// const stripePromise = loadStripe(
//   "pk_test_51OT2FaSHtllxmCJSGKaAzZmIfYDedAkOkUhZqLs8GAvPlEQsasgY7zKxH0iDm4E1Nu11OEyVv7kCPppv K7P85i00ecnTPLf9"
// );

const initalOptions = {
  clientId : import.meta.env.VITE_PAYPAL_CLIENT_ID,

}

export default function LicensePurchase() {
  const itemName = "License";
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [spocname, setSpocname] = useState("");
  const [companyMail, setCompanyMail] = useState("");
  const[totalPrice,setTotalPrice] = useState(20)
  const PRICE_PER_ITEM = 20;

 

  const { id } = useParams();
  const nav = useNavigate();

  const decodedId = atob(id);

  const increment = () => {
    setQuantity((prev) => {
      const nextQuantity = prev + 1
      setTotalPrice(nextQuantity * PRICE_PER_ITEM)
      return nextQuantity
    });

  };

  useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}admin/getspocname/${decodedId}`)
        .then((res) => {
          console.log(res);
          setSpocname(res.data.spoc_name);
          setCompanyMail(res.data.company_email);
        });
    }, [id]);

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        const previousQuantity = prev - 1;
        setTotalPrice(previousQuantity * PRICE_PER_ITEM)
        return previousQuantity
      });
      
    }
  };

  // Redirect based on selected payment method
  function handleCheck() {
    window.location.assign(`/admindashboard/${id}/check/${quantity}`);
  }

  function handleNeft() {
    window.location.assign(`/admindashboard/${id}/neft/${quantity}`);
  }

  // // Checkout function for online payment
  // function checkout(itemPrice, quantity) {
  //   fetch(
  //     `${import.meta.env.VITE_REACT_APP_API_URL}admin/create-checkout-session/${id}`,
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       mode: "cors",
  //       body: JSON.stringify({
  //         id: decodedId,
  //         quantity,
  //         items: [{ id: 1, quantity, price: itemPrice, name: itemName }]
  //   })
  //     }
  //   )
  //     .then((res) =>
  //       res.ok ? res.json() : res.json().then((json) => Promise.reject(json))
  //     )
  //     .then(({ url }) => {
  //       window.location = url;
  //     })
  //     .catch((e) => {
  //       console.log(e.error);
  //     });
  // }

  const paypalCheckout = async({ transaction_id,customer_email,customer_name,amount,description,quantity}) => {

    const paymentData = {
        transaction_id: transaction_id,
        customer_email: customer_email,
        customer_name: customer_name,
        amount: amount,
        description: description,
        quantity: quantity,
      };

      try{
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}admin/paypalPayment`,{
          method : "POST",
          headers: { "Content-Type": "application/json" },
          body : JSON.stringify(paymentData)
        })

        
        console.log((response).status)

        if(response.status === 200){
          toast.success("Payment processed successfully!");
        }else{
          toast.error("Payment saved, but server returned an error.");
        }
          }catch(error){
            console.error("Error sending PayPal data to server:", error);
            toast.error("Error processing PayPal payment.");
          }
  }



  return (
    <div className="bg-gray-100 py-10">
      <ToastContainer/>
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
          
          <button
            onClick={() => setIsOpen(true)}
              style={{
              borderRadius : "10px",
              
            }}
            className="bg-neutral-800 mb-2 w-full text-gray-50 px-5 py-2 rounded-lg hover:bg-gray-600 transition ease-in-out duration-300">
            Offline Payment
          </button>
        
          <PayPalScriptProvider options={initalOptions}>
              <PayPalButtons
              key={totalPrice}
                 fundingSource="card"
                 style={{ layout: "horizontal" }}
                 createOrder={(data, actions) => {
                  
                 return actions.order.create({
                    purchase_units: [
                        {
                          amount: {
                              value: "1.00"
                            }
                              }
                               ]
                             });
                           }}
                onApprove={(_,actions) => {
                  return actions.order.capture().then((details) =>{

                    

                    const payer = details.payer
                    

                    console.log(details)

                    paypalCheckout({
                      customer_email : payer.email_address,
                      transaction_id : details.id,
                      customer_name : payer.name.given_name,
                      amount : 1.00,
                      description : itemName,
                      quantity : quantity
                    })
                  })
                  // paypalCheckout({
                  //   customer_email : "velayuthamsiva55@gmail.com",
                  //   customer_name : "velayuthamsiva55@gmail.com",
                  //   transaction_id : 1,
                  //   amount: totalPrice,
                  //   description: itemName,
                  //   quantity: quantity

                  // })
                }}  
                onCancel={() => {
                        toast("Payment Process has been cancelled!Please Try again")
                  }}
                onError={() => {
                        toast.error("There is a problem with the payment system currently,Please Try again")
                  }}
                  />
          </PayPalScriptProvider>
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
