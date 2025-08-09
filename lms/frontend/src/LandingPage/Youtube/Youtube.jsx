import { ACHIEVEMENTS } from "../../utils/Links";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Youtube() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section className="container mb-10 mt-10 px-4 sm:px-6 lg:px-8">
      {/* YouTube Video Container */}
      <div className="w-full max-w-[1307px] mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
        <div className="relative w-full h-full">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/ozWx4OdWW-0?autoplay=1&loop=1&playlist=ozWx4OdWW-0&mute=1"
            title="My Spine Surgery Philosophy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      
      <div
      ref={ref}
      className="font-helvetica flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-6 sm:mt-8 md:mt-10 w-full max-w-6xl mx-auto px-2 sm:px-4"
    >
        {ACHIEVEMENTS.map((data) => (
          <div
            key={data.id}
            className="w-[calc(50%-0.375rem)] sm:w-[calc(25%-0.75rem)] h-30 md:w-[calc(25%-1.125rem)] lg:w-[calc(25%-1.5rem)] rounded-xl shadow-md shadow-[#8787836B] flex flex-col justify-center items-center space-y-1 sm:space-y-2 md:space-y-3 p-3 sm:p-4 md:p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h1 
              className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl" 
              style={{color:"#001040"}}
            >
              {inView ? <CountUp start={0} end={data.count} duration={2} separator="" /> : 0}
            </h1>
            <p className="text-[#FFA200] text-xs sm:text-sm md:text-base lg:text-lg font-bold text-center">
              {data.name}
            </p>
          </div>
        ))}
    </div>
    </section>
  );
}