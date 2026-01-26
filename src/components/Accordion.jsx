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
    <div ref={parent} className="accordion flex flex-col gap-8">
      {faqs.map((faq) => (
        <div
          key={faq.questionNo}
          className="faq bg-carbon-black-800 cursor-pointer rounded-2xl overflow-hidden [&.active_.answer]:grid-rows-[1fr] [&.active_.answer]:opacity-100 [&.active_.question]:bg-carbon-black-700/70 [&.active_.answer]:p-6 [&.active_.toggle-btn]:rotate-45 select-none"
        >
          {/* Header */}
          <div className="question flex items-center justify-between p-6  hover:bg-carbon-black-700/70 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-bright-snow-200">
              {faq.questionNo}. {faq.question}
            </h3>
            <button className="toggle-btn transition-transform duration-300 cursor-pointer">
              <Plus strokeWidth={3} className="w-6 h-6 text-bright-snow-400" />
            </button>
          </div>
          {/* Answer */}
          <div className="answer px-6 grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out">
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
