import React, { useState } from "react";
import Slider from "../../Slider";
import Heading from "../../Heading";
function Monuments() {
  return (
    <section id="monuments" className="flex flex-col gap-5 ">
      <Heading title="Popular Monuments of Earth" />
      <Slider />
    </section>
  );
}

export default Monuments;
