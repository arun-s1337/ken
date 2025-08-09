import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonialpart() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  async function getTestimonial() {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/testimonial`
      );

      if (response.status === 200 && response.data.testimonials) {
        setTestimonials(response.data.testimonials);
      } else {
        setError("No testimonials found");
      }
    } catch (err) {
      console.error("Request failed.", err);
      setError("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTestimonial();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container my-5 py-4">
      <div className="row align-items-center">
        {/* Carousel Section */}
        <div className="col-md-6 mb-4 order-2 order-md-1">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : testimonials.length === 1 ? (
            // <div className="alert alert-warning">{error}</div>
            <div>
              {testimonials.map((testimonial) => (
                  <div key={testimonial.id}>
                    <div className="card border-1 shadow-sm mx-3">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div
                            className="rounded-circle text-white d-flex justify-content-center align-items-center"
                            style={{
                              width: "48px",
                              height: "48px",
                              fontWeight: "bold",
                              fontSize: "1.25rem",
                              backgroundColor: "#001040",
                            }}
                          >
                            {testimonial.patient_name.charAt(0).toUpperCase()}
                          </div>
                          <h3
                            className="mb-0 ms-3"
                            style={{ fontSize: "1.25rem", color: "#001040" }}
                          >
                            {testimonial.patient_name}
                          </h3>
                        </div>
                        <h5
                          className="text-center mb-3"
                          style={{ color: "#FFA200" }}
                        >
                          Patient
                        </h5>
                        <p className="text-black mb-0">{testimonial.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )  : testimonials.length > 1 ? (
            <>
              <Slider ref={sliderRef} {...sliderSettings}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id}>
                    <div className="card border-0 shadow-sm mx-3">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div
                            className="rounded-circle text-white d-flex justify-content-center align-items-center"
                            style={{
                              width: "48px",
                              height: "48px",
                              fontWeight: "bold",
                              fontSize: "1.25rem",
                              backgroundColor: "#001040",
                            }}
                          >
                            {testimonial.patient_name.charAt(0).toUpperCase()}
                          </div>
                          <h3
                            className="mb-0 ms-3"
                            style={{ fontSize: "1.25rem", color: "#001040" }}
                          >
                            {testimonial.patient_name}
                          </h3>
                        </div>
                        <h5
                          className="text-center mb-3"
                          style={{ color: "#FFA200" }}
                        >
                          Patient
                        </h5>
                        <p className="text-black mb-0">{testimonial.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>

              
              <div className="d-flex justify-content-center  gap-3 mt-3">
                <button
                  className="bg-[#001040] text-white p-3 rounded-lg"
                  onClick={() => sliderRef.current?.slickPrev()}
                >
                  Prev
                </button>
                <button
                  className=" bg-[#001040] text-white p-3 rounded-lg"
                  onClick={() => sliderRef.current?.slickNext()}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-black fs-4">Currently no testimonials</p>
            </div>
          )}
        </div>

        {/* Text Section */}
        <div className="col-md-6 text-center order-1 order-md-2 py-5 py-md-0">
          <h1 className="fw-bold display-5" style={{ color: "#001040" }}>
            Words from our <br className="d-none d-sm-block" />
            Patients...
          </h1>
          <p className="lead mt-3" style={{ color: "#6c757d" }}>
            Hear what our patients have to say about their experiences
          </p>
        </div>
      </div>
    </div>
  );
}

export default Testimonialpart;
