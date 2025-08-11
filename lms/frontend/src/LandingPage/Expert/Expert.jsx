import { EXPERTS } from "../../utils/Links";

export default function Expert() {
    return (
        <section className="py-10 px-4 font-helvetica font-bold space-y-10">
            <h1 className="headingarea text-center pb-5">
                Trusted Expert<span className="text-[#F99420]">.</span>
            </h1>

            <div className="marquee-wrapper w-full mt-5">
                <div className="marquee-inner space-x-4">
                    {[...EXPERTS, ...EXPERTS].map((expert, idx) => (
                        <div
                            key={`${expert.id}-${idx}`}
                            className="rounded-full border bg-[#FAFAFA] border-[#EBEAEA] w-[150px] h-[90px] sm:w-[160px] sm:h-[100px] md:w-[153px] md:h-[89px] flex items-center justify-center"
                        >
                            <img
                                src={expert.img}
                                alt={`Expert ${expert.id}`}
                                className="max-h-[60px] object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}