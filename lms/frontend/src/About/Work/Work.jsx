// import { useNavigate } from "react-router-dom";

// export default function Work() {
//   const navigate=useNavigate();
//    const contactarea = () => {
//      window.scrollTo({ top: 0, behavior: "smooth" });
//   setTimeout(() => navigate("/contact"), 100);
//   };
//   return (
//     <section className="py-20  px-4">
//       <div className="flex flex-col justify-center items-center space-y-6 text-center">
        
        
//         <h1 className="text-[28px] sm:text-[32px] text-[#001040] max-w-[600px] leading-tight">
//           <span className="block sm:inline">Want to Work With a Trusted Spinal</span>{' '}
//           <span className="block sm:inline">Surgeon?</span>
//         </h1>

        
//         <p className="text-black font-medium text-[15px] sm:text-[16px] max-w-[850px] tracking-wide leading-7">
//           Dr. Ken Hansraj helps populations by improving their physical health, emotional life, and even mental well-being. His keynote strategies are life-changing. He will speak to your audience about achieving optimal spinal and overall vibrant health in order to <strong>feel better and do more!</strong>
//         </p>

       
//         <button className="bg-[#FFB200] text-white font-semibold py-3 px-6 rounded-full w-max shadow hover:bg-[#e5a200] transition" onClick={contactarea}>
//           Contact Us
//         </button>
//       </div>
//     </section>
//   );
// }




import { useNavigate } from "react-router-dom";

export default function Work() {
  const navigate=useNavigate();
   const contactarea = () => {
     window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => navigate("/contact"), 100);
  };
  return (
    <section className="container py-10">
      <div className="flex flex-col justify-center items-center space-y-6 text-center">
        
        
        <h1 className="text-[28px] sm:text-[32px]  max-w-[600px] leading-tight " style={{color:"#001040"}}>
          <span className="block sm:inline ">Want to Work With a Trusted Spinal</span>{' '}
          <span className="block sm:inline">Surgeon?</span>
        </h1>

        
        <p className="text-black my-4  text-[15px] sm:text-[16px] max-w-[850px] tracking-wide leading-7">
          Dr. Ken Hansraj helps populations by improving their physical health, emotional life, and even mental well-being. His keynote strategies are life-changing. He will speak to your audience about achieving optimal spinal and overall vibrant health in order to <strong>feel better and do more!</strong>
        </p>

       
        <button className="px-3 contactbtn" onClick={contactarea} style={{fontSize:"20px",fontWeight:"500"}}>
          Contact Us
        </button>
      </div>
    </section>
  );
}

