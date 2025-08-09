
import { useNavigate } from "react-router-dom";

export default function Lift() {

  
   const nav = useNavigate("")
   const handleBuyNow = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    nav("/book/MTI="); 
  };
  return (
    <section className="py-10 px-4 flex flex-col  md:flex-row items-center justify-center w-full space-y-10 md:space-y-0 md:space-x-20">
      <img
        src="./Lift-book.png"
        alt="Book cover of LIFT by Dr. Ken Hansraj, featuring meditations to enhance back health and spine wellness."
        title="LIFT by Dr. Ken Hansraj offers guided meditations and techniques to support spinal strength, boost back health, and promote holistic healing from a renowned spine expert"
        className="w-[250px] md:w-[333px] h-auto rounded-lg object-contain img-fluid  cursor-pointer transform transition-transform hover:scale-105"
         
      />

      <div className="font-bold flex flex-col gap-3 items-center sm:items-center md:items-center text-center md:text-left">
        <h1 className="headingarea">LIFT</h1>
        <p className="text-[#FF3A2D] text-xl text-center lg:text-[40px]">Meditations to Boost<br/> Back Health</p>
  
        <button className="contactbtn px-3" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>

      
    </section>
  );
}
