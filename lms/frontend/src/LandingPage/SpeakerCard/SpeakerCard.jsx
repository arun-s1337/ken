// export default function SpeakerCard() {
//   return (
//     <section className="w-full flex justify-center items-center py-10  px-4">
//       <div className="w-full max-w-[911px] h-auto md:h-[425px] rounded-2xl bg-gradient-to-br from-[#e4f4f8] to-[#d3eff6] flex flex-col md:flex-row p-6 md:p-10 shadow-lg">
        
        
//         <div className="flex flex-col justify-center flex-1 mb-8 md:mb-0">
//           <h1 className="text-2xl md:text-3xl font-bold text-[#0A1F44] mb-4 md:mb-5 leading-snug">
//             Looking for a global <br className="hidden md:block" /> keynote speaker?
//           </h1>
//           <p className="font-medium text-black mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
//           Dr. Ken Hansraj helps the world by improving your physical, emotional, and even mental life.
// He’ll speak to your audience about achieving optimal spinal and overall vibrant health!
//           </p>
//           <button className="bg-[#FFB200] text-white font-semibold py-3 px-6 rounded-full w-max shadow hover:bg-[#e5a200] transition">
//             Contact Us
//           </button>
//         </div>

        
//         <div className="flex items-center justify-center md:ml-10">
//           <div className="w-full max-w-[400px] h-[320px] md:h-[320px] rounded-l-full rounded-r-xl overflow-hidden">
//             <img
//               src="./docter-2.png"
//               alt="Dr. Ken Hansraj offers keynote speaking on spinal wellness, emotional health and self-care strategies."
//               title="Dr. Ken Hansraj, author and speaker, promotes spine health, spinal wellness, and self-care strategies to reduce neck and back pain. Book him as a global keynote speaker for vibrant health insights"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



import { useNavigate } from "react-router-dom";

export default function SpeakerCard() {
  const nav=useNavigate();
  return (
    <section className="w-full flex justify-center items-center py-10  px-4">
      <div className="w-full max-w-[911px] h-auto md:h-[425px] rounded-2xl bg-gradient-to-br from-[#e4f4f8] to-[#d3eff6] flex flex-col md:flex-row p-6 md:p-10 shadow-lg">
        
        
        <div className="flex flex-col justify-center flex-1 mb-8 md:mb-0">
          <h1 className="mb-4 md-mb-5 keynotespeakerhead" >
            Looking for a global <br className="hidden md:block" /> keynote speaker?
          </h1>
          <p className="font-medium text-black mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
          Dr. Ken Hansraj helps the world by improving your physical, emotional, and even mental life.
He’ll speak to your audience about achieving optimal spinal and overall vibrant health!
          </p>
          <div>
          <button className=" px-2 contactbtn"  onClick={() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => nav("/contact"), 300); // slight delay for smooth scroll
  }}>
            Contact Us
          </button>
          </div>
        </div>

        
        <div className="flex items-center justify-center md:ml-10">
          <div className="w-full max-w-[400px] h-[320px] md:h-[320px] rounded-l-full rounded-r-xl overflow-hidden">
            <img
              src="./docter-2.png"
              alt="Dr. Ken Hansraj offers keynote speaking on spinal wellness, emotional health and self-care strategies."
              title="Dr. Ken Hansraj, author and speaker, promotes spine health, spinal wellness, and self-care strategies to reduce neck and back pain. Book him as a global keynote speaker for vibrant health insights"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
