import React from "react";
import Heading from "./Heading";
import Accordion from "../../Accordion";

function FAQsSection() {
  return (
    <section id="faqs-section" className="max-w-6xl 3xl:max-w-[1400px] w-full mx-auto px-6 pb-20 flex flex-col gap-10 ">
      <Heading title="Frequently Asked Questions" subtitle="About us" />
      <Accordion />
    </section>
  );
}

export default FAQsSection;
