// import { useNavigate } from "react-router-dom";

// function Aboutpage() {
// const navigate=useNavigate();
//   const aboutpagepart = () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
//   setTimeout(() => navigate("/about"), 100);
// };
//   return (
//     <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl py-20"> 
//       <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto items-start">
        
       
//         <div className="w-full md:w-1/2 text-center text-md-start">
//           <h2 className="headingarea mb-6">
//             About me<span className="text-[#F99420]">.</span>
//           </h2>
//           <p className=" text-[16px] md:text-[18px] leading-7 md:leading-8">
//            For more than 20 years, Dr. Ken Hansraj has dedicated his life to eradicating spinal problems. With in-depth knowledge and vast experience in spine care, he has discovered and simplified the core factors and strategies that can be applied to improve spinal health. His work helps people understand spine wellness and spinal conditions, and enhances their physical, mental, and emotional well-being through the spine. 
//           </p>
//           <p className=" text-[16px] md:text-[18px] leading-7 md:leading-8 my-2">
//             Dr. Ken’s work has influenced people in every country to feel better and do more. His studies on spine care costs, text neck, and backpack forces have shaped global positions and trends.
//           </p>
//         </div>

        
//         <div className="w-full md:w-1/2 flex justify-center items-start md:mt-10">
//           <div className="relative bg-[#001040] text-white rounded-xl p-6 sm:p-8 w-full max-w-sm shadow-lg">
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#fda101] mb-4">
//               Dr. Ken Hansraj
//             </h1>

//             <ul className="list-disc list-inside text-white text-sm sm:text-base space-y-2 font-normal">
//               <li>International Best-Selling Author.</li>
//               <li>Global Health Consultant.</li>
//               <li>U.S. Spine Surgeon</li>
//             </ul>

//             <div className="mt-6">
//               <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white">
//                 <img src="./arrow.png" alt="Arrow" className="w-4 h-4"  onClick={aboutpagepart}/>
//               </button>
//             </div>
        
//             <div className="absolute -bottom-10 -right-3 md:-bottom-20 md:-right-4">
//               <div className="w-[150px] h-[150px] md:w-[206px] md:h-[206px] rounded-full bg-gradient-to-tr from-orange-400 to-yellow-300 shadow-lg flex items-center justify-center border-4 border-white">
//                 <img src="./spine.png" alt="Dr. Ken Hansraj - highlighting 20+ years of spinal care expertise" title="Dr. Ken Hansraj, global spine surgeon and author, with 20+ years of expertise treating back pain, text neck, and vertebrae issues—highlighted beside his credentials and spine illustration." className="w-[80px] h-[140px] md:w-[106px] md:h-[182px] object-contain" />
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Aboutpage;

import { useNavigate } from "react-router-dom";


function Aboutpage() {
  const navigate = useNavigate()

  return (
    <div className="container py-15">
     
      <div className="row align-items-start gx-4 gy-5">

        {/* Left Text Section */}
        <div className="col-md-6 text-center text-md-start">
          <h2 className="mb-4 headingarea">
            About me<span style={{ color: "#F99420" }}>.</span>
          </h2>
          <p className="text-dark text-[16px] md:text-[18px]">
            For more than 20 years, Dr. Ken Hansraj has dedicated his life to eradicating spinal problems. With in-depth knowledge and vast experience in spine care, he has discovered and simplified the core factors and strategies that can be applied to improve spinal health. His work helps people understand spine wellness and spinal conditions, and enhances their physical, mental, and emotional well-being through the spine.
          </p>
          <p className="text-dark mt-3 text-[16px] md:text-[18px]">
            Dr. Ken’s work has influenced people in every country to feel better and do more. His studies on spine care costs, text neck, and backpack forces have shaped global positions and trends.
          </p>
        </div>

        {/* Right Card Section */}
        <div className="col-md-6 mb-10 mt-12 lg:mt-10 md:mt-8  d-flex justify-content-center">
          <div className="position-relative  text-white rounded p-5 shadow" style={{ maxWidth: "480px",backgroundColor:"#001040" }}>
            <h1 className=" mb-3 fs-2" style={{color:"#ffa200"}}>Dr. Ken Hansraj</h1>
            <ul className="list-unstyled">
              <li> International Best-Selling Author.</li>
              <li> Global Health Consultant.</li>
              <li> U.S. Spine Surgeon</li>
            </ul>

            <div className="mt-4">
              <button 
              onClick={() =>{
                  navigate('/about')
                }}
              className="btn btn-light rounded-circle p-2" 
              >
                <img src="./arrow.png" alt="Arrow" style={{ width: "16px", height: "16px" }} />
              </button>
            </div>

            {/* Floating Spine Image */}
            <div className="position-absolute " style={{ bottom: "-60px", right: "-10px" }}>
              <div
                
                className="rounded-circle bg-warning d-flex justify-content-center align-items-center shadow"
                style={{
                  width: "150px",
                  height: "150px",
                  border: "4px solid white",
                  background: "linear-gradient(to top right, #FFA500, #FFD700)"
                }}
              >
                <img
                  src="./spine.png"
                  alt="Dr. Ken Hansraj - highlighting 20+ years of spinal care expertise"
                  title="Dr. Ken Hansraj, global spine surgeon and author..."
                  style={{ width: "80px", height: "140px", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Aboutpage;
