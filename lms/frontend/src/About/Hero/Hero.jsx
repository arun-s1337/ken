

import { Helmet } from "react-helmet";


export default function Hero() {
  return (
    <section className="pt-[100px] pl-4 relative w-full">
      <Helmet>
        <title>About Dr. Ken Hansraj – Spine Surgeon & Global Health Consultant</title>
        <meta name="description" content="Learn about Dr. Ken Hansraj's mission to eradicate spinal problems through research, education, and patient care." />
        <meta name="keywords" content="Spine surgeon, global health consultant, spinal wellness, author biography" />
        <link rel="canonical" href="https://drken.us/about" />
      </Helmet>


      {/* Background Image */}
      <div
          className="w-full h-[700px] sm:h-[600px] md:h-[700px] lg:h-[800px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('./surgery.png')" }}
      >



      {/* Content block overlayed after background image */}
      <div className="relative px-7 sm:px-7 md:px-8 lg:px-10  lg:w-2xl  z-10 t-5">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 max-w-full md:max-w-[650px] lg:max-w-[700px] p-4 sm:p-5 md:p-6 lg:p-8 ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-semibold text-[#001040] my-2 sm:my-3">
            Dr. Kenneth Hansraj,
          </h1>


          <div className="text-lg sm:text-xl md:text-2xl  space-y-2">
            <p className="text-[#001040] font-medium">New York Based</p>
            <p className="text-[#ffa200] font-medium">Spinal & Orthopedic Surgeon</p>
          </div>


          <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] leading-relaxed text-gray-800 mt-2 sm:mt-3 pe-3 sm:pe-0 md:pe-10 lg:pe-20">
             <span className="font-bold">Kenneth Hansraj, M.D.</span> is a spinal and orthopedic surgeon specializing in cervical, thoracic, and lumbar procedures. He performs knifeless surgery, bloodless spine surgery, and minimally invasive approaches when possible. He also utilizes advanced bone grafting techniques, spinal navigation to assess instrumentation placement, modern operating tables, and spinal cord and nerve monitoring during spine surgery. Additionally, he uses stem cells in spine surgery.
           </p>
         
           <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] leading-relaxed text-gray-800 mt-2 sm:mt-3 pe-3 sm:pe-0 md:pe-10 lg:pe-20">
             Dr. Ken believes in whole-body wellness, preventative care, and that the spine is a principal indicator of general health—impacted by both "human software and hardware."
           </p>
        </div>
      </div>
      </div>
    </section>
  );
}



