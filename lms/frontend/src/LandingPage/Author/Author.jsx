import forbes from "../../assets/forbes.png";
import webmd from "../../assets/webmd.svg";
import msn from "../../assets/msn.svg";
import washingtonsvg from "../../assets/the-washington-post.svg";
import dailynews from "../../assets/daily-news.svg";
import menshealth from "../../assets/men-s-health.svg";
import esquire from "../../assets/esquire.svg";
import gq from "../../assets/gq.svg";
import glamour from "../../assets/glamour.svg";
import npr from "../../assets/npr.jpg";
import nyt from "../../assets/the-new-york-times.svg";
import times from "../../assets/the-times.png";
import cosmo from "../../assets/cosmos.png";


export default function Author() {
  const logos = [
    forbes,
    washingtonsvg,
    dailynews,
    webmd,
    msn,
    menshealth,
    esquire,
    gq,
    glamour,
    npr,
    nyt,
    times,
    cosmo,
  ];

  const firstRowLogos = logos.slice(0, 7);
  const secondRowLogos = logos.slice(7, 13);

  return (
    <section className="flex flex-col justify-center items-center py-10 px-4 space-y-10 overflow-hidden">
      <h1 className="headingarea text-center">
        Published Author <span className="text-[#F99420]">.</span>
      </h1>

      <div className="w-full">
        <div className="marquee-wrapper overflow-hidden">
          <div className="marquee-inner flex animate-marquee space-x-20">
            {[...firstRowLogos, ...firstRowLogos].map((logo, idx) => (
              <img
                key={`top-${idx}`}
                src={logo}
                alt={`Author ${idx + 1}`}
                className="object-contain w-[200px] h-[100px]"
              />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="marquee-wrapper overflow-hidden">
          <div className="marquee-inner flex animate-marquee-reverse space-x-20">
            {[...secondRowLogos, ...secondRowLogos].map((logo, idx) => (
              <img
                key={`bottom-${idx}`}
                src={logo}
                alt={`Author ${idx + 8}`}
                className="object-contain w-[200px] h-[100px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
