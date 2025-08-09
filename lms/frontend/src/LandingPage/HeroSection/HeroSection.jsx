// import { Helmet } from "react-helmet";
// import { useNavigate } from "react-router-dom";

// export default function HeroSection() {
//   const navigate = useNavigate();
//   const Bookspage = () => {
//     navigate("/book");
//   };
//   const Coursepage = () => {
//     navigate("/My-spine-coach");
//   };
  
//   return (
//     <>
//     <Helmet>

//     </Helmet>
//     <section className="p-4 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 overflow-hidden">
     
//       <div className="w-full md:w-1/2 flex justify-center">
//         <img src="./doctor.png" alt="Dr. Ken Hansraj – Expert Spine Surgeon for Back & Neck Pain" title=" Dr. Ken Hansraj, spine surgeon and author, expert in back pain, neck issues,
// and spinal wellness care" className="w-full max-w-md h-auto object-contain" />
//       </div>

//       <div className="w-full md:w-1/2 flex flex-col mt-10 items-center md:items-start text-center">
//         <div className="font-helvetica leading-tight">
//           <p className="text-[#001040] font-bold text-2xl sm:text-3xl md:text-4xl">International Best Selling Author.</p>
//           <p className="text-[#001040] font-bold text-2xl sm:text-3xl md:text-4xl">Global Health Consultant.</p>
//           <p className="text-[#001040] font-bold text-2xl sm:text-3xl md:text-4xl">US Spine Surgeon.</p>
//           <h4 className="text-[#001040] font-bold text-2xl sm:text-3xl md:text-2xl my-3">Buy Dr. Ken Hansraj’s Best-Selling Book:</h4>
//           <p className="font-bold text-[#E00000] text-xl sm:text-2xl md:text-3xl mt-6">Watch Your Back</p>
//           <p className="text-[#FDA101] text-lg sm:text-xl md:text-2xl mt-3 font-medium">Nine Proven Strategies to Reduce</p>
//           <p className="text-[#FDA101] text-lg sm:text-xl md:text-2xl font-medium">Your Neck and Back Pain Without Surgery</p>
//           <p className="font-bold text-[#E00000] text-xl sm:text-2xl md:text-3xl my-3">Lift</p>
//           <p className="text-[#FDA101] text-lg sm:text-xl md:text-2xl font-medium">Meditations To Boost Back Health</p>
       
          
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 mt-6">
//           <button className="bg-[#EE4A62] w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 rounded-lg"  onClick={Bookspage}>
//             <img src="./book (1).png" alt="Book Icon" className="w-6 h-6" />
//             <span className="text-white font-bold text-base sm:text-lg">Buy Now</span>
//           </button>
//           <button className="bg-[#FDA101] w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 rounded-lg" onClick={Coursepage}>
//             <img src="./play.png" alt="Play Icon" className="w-6 h-6" />
//             <span className="text-white font-bold text-base sm:text-lg">My Spine Coach</span>
//           </button>
//         </div>
//       </div>
//     </section>
//     </>
//   );
// }






import { Link, useNavigate } from "react-router-dom";
import bookplay from "../../assets/bookplay.png";
import "./HeroSection.css";
import { Helmet } from "react-helmet";



export default function HeroSection() {
  const navigate = useNavigate(); 
 


  const Bookspage = () => {
    navigate("/book"); 
     
  };



  return (
    <>
  <Helmet>
        <title>Dr. Ken Hansraj – Spine Surgeon, Author & Wellness Expert</title>
        <meta name="description" content="Discover Dr. Ken Hansraj's expertise in spine health. Explore his books, research, and strategies to alleviate neck and back pain without surgery." />
       
        <meta name="keywords" content="Dr. Ken Hansraj, Spine health, Neck and back pain, Spinal wellness, Author and speaker, Text neck, Backpack forces, Meditation for spine health, Self-care strategies" />
        <link rel="canonical" href="https://drken.us/" />
      
      </Helmet>
      
      <section className="pt-[100px] pl-4 flex flex-col lg:flex-row items-center md:items-start gap-6 md:gap-10 ">
        
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="./doctor.png"
            alt="Dr. Ken Hansraj – Expert Spine Surgeon for Back & Neck Pain"
            title="Dr. Ken Hansraj, spine surgeon and author, expert in back pain, neck issues, and spinal wellness care"
            className="w-full max-w-lg h-auto object-contain"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col mt-10 items-center md:items-start text-center lg:text-left">
          <div className="text-start mainsection">
            <p className="text-[#001040] font-bold text-2xl sm:text-3xl md:text-4xl ">International Best-Selling Author.</p>
            <p className="text-[#001040] font-bold text-2xl sm:text-3xl md:text-4xl">Global Health Consultant.</p>
            <p className="text-[#001040] font-bold text-2xl sm:text-3xl md:text-4xl">U.S. Spine Surgeon.</p>
            <p className="text-[#001040] font-bold subheadken my-3">Buy Dr. Ken Hansraj’s Best-Selling Book</p>
            <p className="font-bold text-[#E00000] text-xl sm:text-2xl md:text-2xl mt-6">Watch Your Back</p>
            <p className="mt-3 my-2 pt">Nine Proven Strategies to Reduce</p>
            <p className="pt">Your Neck and Back Pain Without Surgery</p>
            <p className="font-bold text-[#E00000] text-xl sm:text-2xl md:text-2xl my-3">Lift</p>
            <p className="pt">Meditations To Boost Back Health</p>
          </div>

          <div className="d-flex gap-2 p-2 md-gap-4 mt-4">
            <button
              className=" px-1 px-md-2 py-1 py-md-2 flex items-center justify-center gap-2 firstbtn mx-1 shadow-sm"
              onClick={Bookspage}
            >
              <img src={bookplay} alt="Book Icon" className="w-10 h-10" />
              <span className="text-white font-bold text-base sm:text-lg px-2">Buy Now</span>
            </button>
            <button
              className=" px-1 px-md-2 py-1 py-md-2 flex items-center justify-center gap-2 secondbtn shadow-sm"  
            >
              <Link
                to="/myspinecoach"
                rel="noopener noreferrer"
                className="px-1 px-md-2 py-1 py-md-2 flex items-center justify-center gap-2 secondbtn shadow-sm"
              >
                <img src="./play.png" alt="Play Icon" className="w-10 h-10" />
                <span className="text-white font-bold text-base sm:text-lg text-decoration-none" >My Spine Coach</span>
            </Link>        
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
