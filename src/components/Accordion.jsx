import { useEffect, useRef } from "react";
import { faqs } from "../data/Accordion";
import { Plus } from "lucide-react";

function Accordion() {
  const parent = useRef(null);
  useEffect(() => {
    const closeOthers = (clickedFaq) => {
      parent.current.querySelectorAll(".faq.active").forEach((faq) => {
        if (faq !== clickedFaq) {
          faq.classList.remove("active");
        }
      });
    };
    const handleClick = (e) => {
      const clickedFaq = e.target.closest(".faq");
      if (!clickedFaq) return;
      closeOthers(clickedFaq);
      clickedFaq.classList.toggle("active");
    };
    const el = parent.current;
    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, []);
  return (
    <div ref={parent} className="accordion flex flex-col gap-4 md:gap-8">
      {faqs.map((faq) => (
        <div
          key={faq.questionNo}
          className="faq group glass-card cursor-pointer rounded-2xl overflow-hidden [&.active_.answer]:grid-rows-[1fr] [&.active_.answer]:opacity-100 [&.active_.question]:bg-white/5 [&.active_.answer]:p-4 md:[&.active_.answer]:p-8 [&.active_.toggle-btn]:rotate-45 [&.active]:border-azure-blue-500/50 [&.active]:shadow-azure-blue-500/10 select-none transition-all duration-300"
        >
          {/* Header */}
          <div className="question flex items-center justify-between p-3 md:p-6 hover:bg-bright-snow-50/5 transition-colors duration-200">
            <h3
              className="text-base md:text-xl font-semibold text-bright-snow-100 pr-2
             md:pr-8"
            >
              {faq.question}
            </h3>
            <button className="toggle-btn p-2 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 cursor-pointer group-hover:scale-110">
              <Plus
                strokeWidth={2.5}
                className="w-5 h-5 md:w-6 md:h-6 text-azure-blue-400"
              />
            </button>
          </div>
          {/* Answer */}
          <div className="answer px-2 grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out">
            <p className="overflow-hidden text-carbon-black-300">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;
