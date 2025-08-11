import React, { useState, useEffect } from 'react';
import './Feedbackpage.css';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


function Feedbackpage() {
    const nav = useNavigate();
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState({ first_name: "", last_name: "", profile_image: "", completion_percentage: 0, email: "", modeules_completed: 0 });

    const [feedback, setFeedback] = useState({ name: "", content: "", stars: 0 });
    const [feedbackList, setFeedbackList] = useState([]);

    const decodedId = atob(id);

    useEffect(() => {
        // Get user details first
        axios
            .get(`${import.meta.env.VITE_REACT_APP_API_URL}user/user/${decodedId}`)
            .then((res) => {
                const userData = res.data;
                setUser({ 
                    first_name: userData.first_name.trim(), 
                    last_name: userData.last_name?.trim() || "", 
                    profile_image: userData.profile_image?.trim() || "", 
                    role: userData.profession || "Student", 
                    email: userData.email, 
                    modeules_completed: userData.modules?.filter((module) => module.completed === true).length || 0 
                });

                setFeedback((prev) => ({
                    ...prev,
                    name: `${userData.first_name.trim()}`
                }));

            })
            .catch((err) => {
                console.error("Error fetching user data", err);
            });

             fetchAllFeedbacks();
    }, [id, decodedId]);

    const handleFeedbackChange = (e) => {
        setFeedback({ 
            ...feedback, 
            [e.target.name]: e.target.value 
        });
    };

    const submitFeedback = async (e) => {
        e.preventDefault();

        // Validation
        if (rating === 0) {
            toast.error("Please select a rating.");
            return;
        }
        if (rating <= 3 && !feedback.content.trim()) {
            toast.error("Please provide details about your experience.");
            return;
        }
        if (rating > 3 && !feedback.content.trim()) {
            toast.error("Please share your suggestions.");
            return;
        }

        try {
            // Submit to backend
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}user/feedback`,
                {
                    name: feedback.name,
                    content: feedback.content.trim(), 
                    stars: rating,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        // If you have authentication, you can add Auth here
                        // Authorization: `Bearer ${your_token}`
                    }
                }
            );

            if (response.status === 201) {
                toast.success("Thank you for your feedback!");
                setShowModal(true);
                setRating(0);
                setFeedback((prev) => ({
                    ...prev,
                    content: ""
                }));

                 fetchAllFeedbacks();

            }
        } catch (error) {
            console.error("Error submitting feedback.", error);
            toast.error("Failed to submit feedback.");
        }
    };

    const fetchAllFeedbacks = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_REACT_APP_API_URL}user/feedback`
            );
            setFeedbackList(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container feedbackpage h-screen">
            <h2 className="text-center my-3">Feedback Page</h2>
            <div className='d-flex flex-column justify-content-center  align-items-center'>
                <div className="card p-4 feedbox mx-0 ov mx-lg-5 my-3">
                    <form onSubmit={submitFeedback}>
                        {/* Star Rating */}
                        <div className="my-3 text-center">
                            <h4 className="pb-3">Rate Your Experience with Our Website</h4>
                            <div>
                                {[...Array(5)].map((_, index) => {
                                  	const ratingValue = index + 1;
                                  	return (
                                      <label key={index}>
                                         <input
                                             type="radio"
                                             name="stars"
                                             value={ratingValue}
                                             style={{ display: 'none' }}
                                             onClick={() => setRating(ratingValue)}
                                         />
                                         <FaStar
                                             size={40}
                                             color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                                             onMouseEnter={() => setHover(ratingValue)}
                                             onMouseLeave={() => setHover(null)}
                                             className="star cursor-pointer"
                                         />
                                      </label>
                                  	);
                                })}
                            </div>
                        </div>

                        {/* Feedback Textarea */}
                        {rating > 0 && (
                            <div className='w-full flex flex-col justify-center'>
                                <label className="py-2">
                                   {rating <= 3 ? "What difficulties did you face?" : "Kindly share your suggestions"}
                                </label>
                                <textarea
                                   className="p-4 border border-black rounded-xl"
                                   placeholder={rating <= 3 ? "Describe your experience…" : "Share your suggestions here"}
                                   name="content"
                                   value={feedback.content}
                                   onChange={handleFeedbackChange}
                                   required
                                   rows={5}
                                ></textarea>
                            </div>
                        )}

                        <div className="d-flex justify-content-center my-3">
                            <button
                                type="submit"
                                className="updatebtn"
                                disabled={!rating ||
                                         !feedback.content.trim()
                                }
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
           
            {/* Thank You Modal */}
            {showModal && (
                <div className="modal-container">
                    <div className="modal-content bg-light rounded-3">
                        <h4>Thank you for your valuable feedback!</h4>
                        <p>Your response helps us improve.</p>
                        <button
                            className="close-btn updatebtn"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Feedbackpage;

