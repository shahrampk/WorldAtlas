import React, { useState } from "react";
import Slider from "../../Slider";
import Heading from "../../Heading";
function Monuments() {
  return (
    <div className="flex flex-col gap-10 ">
      <Heading title="Some pupular Monuments" subtitle="of the world" />
      <Slider />
    </div>
  );
}

export default Monuments;
