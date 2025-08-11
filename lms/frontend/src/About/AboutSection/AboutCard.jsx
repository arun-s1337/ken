import { cn } from "../../utils/utils";

export default function AboutCard({ title, items, className }) {
  return (
    <div
      className={cn(
        "rounded-xl shadow-lg p-5 md:p-9  flex flex-col",
        className
      )} style={{
        background:
          "linear-gradient(180deg, #D9FBFF 0%, #EEFDFF 53%, #FFFFFF 100%)",
 }}>
      <h2 className="text-2xl md:text-[32px] lg:text-[48px] mb-4 font-bold" style={{color:"#001040"}}>
        {title}
      </h2>
      <ul className="space-y-6 md:space-y-10">
        {items.map((item, index) => (
          <li key={index} className="relative pl-5 flex flex-col">
            <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#FEB331] lg:mt-4 mt-10"></div>
            <h3 className="text-base md:text-[20px] text-black mb-2 md:mb-3">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-sm md:text-base text-black font-medium">
                {item.subtitle}
              </p>
            )}
            {item.location && (
              <p className="text-sm md:text-base text-black font-medium">
                {item.location}
              </p>
            )}
            {item.dateRange && (
              <p className="text-sm md:text-base text-black font-medium">
                {item.dateRange}
              </p>
            )}
            {item.recertified && (
              <p className="text-sm md:text-base text-black font-medium">
                <span className="font-medium">Recertified: </span>
                {item.recertified}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
