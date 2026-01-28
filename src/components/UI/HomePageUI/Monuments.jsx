import React, { useState } from "react";
import Slider from "../../Slider";
import Heading from "./Heading";
function Monuments() {
  return (
    <section id="monuments" className="flex flex-col gap-10 ">
      <Heading title="Some popular Monuments" subtitle="of the world" />
      <Slider />
    </section>
  );
}

export default Monuments;
