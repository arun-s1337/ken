import React from "react";
import DrKen from "../../../assets/face.png";
import "./Instructor.css";
import cert1 from "../../../assets/boardcert.jpg";
import cert2 from "../../../assets/Rotatingspine.gif";
import cert3 from "../../../assets/HSS.jpg";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function Instructors() {
  // Optimized animation variants
  const slideRight = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  const slideLeft = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  };

  // motionVariants.js
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

 const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};


  // Optimized transition settings
  const smoothTransition = {
    duration: 0.4,
    ease: [0.25, 0.1, 0.25, 1]
  };

  const quickTransition = {
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1]
  };

  return (
    <div className="container overflow-hidden certparts">
      <div className="row">
        <h1 className="authortext my-5 text-center">Author Introduction</h1>
        
        <motion.div 
          className="col-sm-12 col-lg-6"
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={smoothTransition}
        >
          <img src={DrKen} alt="About Dr.Ken Hansraj,M.D" className="drimg" />
        </motion.div>

        <motion.div 
          className="col-sm-12 col-lg-6 aboutDr mt-5"
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={smoothTransition}
        >
          <h2 className="Drtext my-4">Dr.Ken Hansraj,M.D</h2>
          <p className="abtken">
            For more than 20 years, Dr. Ken Hansraj has dedicated his life to
            eradicating spinal problems. With an in-depth knowledge of and a
            vast experience in spine care, he has discovered andsimplified the
            core factors and strategies that can be applied to improve the
            quality of spinal health. His work helps people to understand spine
            wellness, spinal conditions, and to augment people's physical,
            mental and emotional well-being through the spine.
          </p>
          <p className="abtken my-4">
            Dr. Ken's work has influenced people in every country to feel better
            and to do more. His studies on spine care costs, text neck and
            backpack forces have influenced global positions, and global trends
          </p>
        </motion.div>
      </div>

      <div className="row my-5 abtken secondpara">
        <p>
          Kenneth K. Hansraj, M.D. is a spinal and orthopedic surgeon
          specializing in cervical, thoracic and lumbar procedures. He performs
          knifeless surgery, bloodless spine surgery, minimally invasive
          approaches when possible, advanced bone grafting, techniques using
          spinal navigation to assess instrumentation placement, modern
          operating tables, spinal cord and nerve monitoring during spine
          surgery and uses stem cells in spine surgery
        </p>
        <p>
          Dr. Ken believes in whole body wellness, preventative care, and that
          the spine is a principal indicator of general health impacted by
          "human software and hardware."
        </p>
      </div>

      <div className="row">
  {/* Left Certificate Card */}
  <motion.div
    className="col-sm-12 col-lg-6"
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <motion.div
      className="certificatecards rounded-4"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="row px-0 px-md-2 py-4">
        <div className="col flex flex-col items-center text-center">
          <h3 className="certifiedheading my-2">Professional Training</h3>
          <motion.img
            src={cert3}
            className="imparts"
            variants={scaleIn}
            loading="lazy"
          />
        </div>
      </div>

      <div className="text-start mx-4">
        <ul>
          <li><b>Fellowship in Scoliosis and Spinal Surgery</b></li>
          <p>
            <FontAwesomeIcon icon={faLocationDot} className="text-danger beating-icon mx-1" />
            The Hospital for Special Surgery, New York, New York
          </p>
          <li><b>Fellowship in Minimally Invasive Spinal Surgery</b></li>
          <p>
            <FontAwesomeIcon icon={faLocationDot} className="text-danger beating-icon mx-1" />
            California Center for Minimally Invasive Spine Surgery, Thousand Oaks, California
          </p>
          <li><b>Orthopaedic Surgery Residency Training</b></li>
          <p>
            <FontAwesomeIcon icon={faLocationDot} className="text-danger beating-icon mx-1" />
            King/Drew Medical Center, Los Angeles, California
          </p>
          <li><b>General Surgery Training</b></li>
          <p>
            <FontAwesomeIcon icon={faLocationDot} className="text-danger beating-icon mx-1" />
            Mount Sinai Hospital, New York, New York
          </p>
          <li><b>Fellowship in Orthopedic Biomechanics</b></li>
          <p className="pb-5">
            <FontAwesomeIcon icon={faLocationDot} className="text-danger beating-icon mx-1" />
            The Hospital for Special Surgery, New York, New York
          </p>
        </ul>
      </div>
    </motion.div>
  </motion.div>

  {/* Right Certificate Column */}
  <motion.div
    className="col-sm-12 col-lg-6"
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Board Certifications Card */}
    <motion.div
      className="rounded-4 certificatecards"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="row rounded-3 px-2 py-2">
        <div className="col flex flex-col items-center text-center">
          <h3 className="certifiedheading mt-4">Board Certifications</h3>
          <motion.img
            src={cert1}
            className="imparts mt-2"
            variants={scaleIn}
            loading="lazy"
          />
        </div>
      </div>
      <div className="text-start px-5">
        <ul>
          <li>American Board of Orthopedic Surgeons</li>
          <li>American Board of Minimally Invasive Spinal Medicine and Surgery</li>
          <li>National Board of Medical Examiners</li>
        </ul>
      </div>
    </motion.div>

    {/* Professional Affiliations Card */}
    <motion.div
      className="rounded-4 certificatecards my-4"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="row rounded-3 px-4">
        <h3 className="certifiedheading mt-3 py-0 py-md-1">Professional Affiliations</h3>
        <div className="col-sm-8 text-start my-0 my-md-3 order-2 order-lg-1">
          <ul>
            <li><b>Attending Orthopaedic Spine Surgeon</b></li>
            <p>
              <FontAwesomeIcon icon={faLocationDot} className="text-danger beating-icon mx-1" />
              Westchester Medical Center Valhalla, New York
            </p>
            <li><b>Attending Orthopaedic Spine Surgeon</b></li>
            <p>
              <FontAwesomeIcon icon={faLocationDot} className="text-danger beating-icon mx-1" />
              Mid-Hudson Regional Hospital of Westchester Medical Center
            </p>
          </ul>
        </div>
        <div className="col-sm-4 order-1 order-lg-2 d-flex justify-content-center">
          <motion.img
            src={cert2}
            className="sm-mt-0 md-mt-5 imparts1 imp1"
            variants={fadeIn}
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  </motion.div>
</div>

    </div>
  );
}

export default React.memo(Instructors);