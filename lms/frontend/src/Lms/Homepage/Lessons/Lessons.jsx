import React, { useEffect, useState } from "react";
import "./Lessons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Lessons() {
  const [module, setModule] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [hasPaid, setHasPaid] = useState(false); 
  const [showModal, setShowModal] = useState(false); 
  const [modalContent, setModalContent] = useState(null); 
  const { id } = useParams();
  
  

  const decodedId = id && id !== "undefined" ? atob(id) : "guest";
  
  
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}auth/protected`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/getmodule/1`)
      .then((res) => {
        setModule(res.data.modules);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated && decodedId !== "guest") {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}user/paymentstatus/${decodedId}`)
        .then((res) => {
          setHasPaid(res.data.hasPaid);
        })
        .catch((err) => {
          console.log(err);
          setHasPaid(false); // Default to false if there's an error
        });
    } else {
      setHasPaid(false); // Unauthenticated users or guest users haven't paid
    }
  }, [isAuthenticated, decodedId]);

  const handleShowModal = (module) => {
    setModalContent(module);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

 const handleLoginRedirect = () => {
  if (!isAuthenticated || decodedId === "guest") {
    navigate("/lmslogin");
  } else {
    navigate(`/user/${id}/payment`);
  }
  handleCloseModal();
};


  return (
    <div className="ml-5" id="lessons">
      {module.map((e) => (
        <div key={e.moduleId} className="row sm:ml-5 lessoncard w-full py-2 rounded-3 my-4">
          {/* If the user has paid, show all modules */}
          {hasPaid ? (
                  <Link
                  to={`/ken/1/${e.moduleId}/${id}`}
                  className="col-sm-12 lessonview  text-decoration-none"
                  style={{ color: "#001040" }}>
                  <div className="col-lg-4 d-flex flex-column justify-content-center items-center  gap-2">
                    <img
                      src={e.module_image}
                      alt="lesson"
                      className="rounded-3 lesson"
                      accept=".jpg,.jpeg,.png,.tiff,.tif"
                    />
                  </div>
                 <div className="col-lg-6 d-flex gap-2 flex-column justify-content-center  items-center text-center lg:items-start lg:text-left sm:mt-5 textpart">
                    <h5>Chapter {e.moduleId}</h5>
                    <h3>{e.modulename}</h3>
                    <p>{e.activities}</p>
                   </div>

                  <div className="flex items-center justify-center sm:mt-20 w-10 h-10 ml-auto mr-4 sm:mr-6">
                      <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </Link>

          ) : (
            <div>
              {e.moduleId === 1 ? (
                <Link
                  to={`/ken/1/${e.moduleId}/${id}`}
                  className="col-sm-12 lessonview  text-decoration-none"
                  style={{ color: "#001040" }}>
                  <div className="col-lg-4 d-flex flex-column justify-content-center items-center  gap-2">
                    <img
                      src={e.module_image}
                      alt="lesson"
                      className="rounded-3 lesson"
                      accept=".jpg,.jpeg,.png,.tiff,.tif"
                    />
                  </div>
                 <div className="col-lg-6 d-flex gap-2 flex-column justify-content-center  items-center text-center lg:items-start lg:text-left sm:mt-5 textpart">
                    <h5>Chapter {e.moduleId}</h5>
                    <h3>{e.modulename}</h3>
                    <p>{e.activities}</p>
                   </div>

                  <div className="flex items-center justify-center sm:mt-20 w-10 h-10 ml-auto mr-4 sm:mr-6">
                      <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </Link>
              ) : (
                // Other modules are locked
                <div
                  className=" lessonview locked flex flex-col space-y-3"
                  onClick={() => handleShowModal(e)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="col-lg-4 d-flex flex-column justify-content-center items-center ">
                    <img
                      src={e.module_image}
                      alt="lesson"
                      className="rounded-3 lesson locked-image"
                    />
                  </div>
                 <div className="col-lg-6  d-flex gap-2 flex-column justify-content-center items-center text-center lg:items-start lg:text-left sm:mt-5 textpart">
                    <h5>Chapter {e.moduleId}</h5>
                    <h3>{e.modulename}</h3>
                    <p>{e.activities}</p>
                   </div>
                  <div className="flex items-center justify-center w-10 sm:mt-20 h-10 ml-auto mr-4 sm:mr-6">
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                </div>
              )}
            </div>
            
          )}
        </div>
      ))}

      
    <Modal
  show={showModal}
  onHide={handleCloseModal}
  centered
  className="modeltext"
>
  <Modal.Header closeButton style={{ borderBottom: "none" }}>
    <Modal.Title style={{ color: "#291571" }}>
      {(!isAuthenticated || decodedId === "guest") ? "Login Required" : "Payment Required"}
    </Modal.Title>
  </Modal.Header>

  <Modal.Body style={{ borderBottom: "none", fontSize: "18px", textAlign: "start" }}>
    <p>
      <b>
        Please {(!isAuthenticated || decodedId === "guest") ? "log in" : "complete your payment"} to access this chapter.
      </b>
    </p>
  </Modal.Body>

  <Modal.Footer style={{ borderTop: "none", display: "flex", justifyContent: "space-between" }}>
    <Button className="logbutton" onClick={handleLoginRedirect}>
      {(!isAuthenticated || decodedId === "guest") ? "Login" : "Go to Payment"}
    </Button>
    <Button className="border-0 logbutton1" onClick={handleCloseModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


    </div>
  );
}

export default Lessons;
