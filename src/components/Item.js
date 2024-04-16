import React, { useState } from "react";

function Item({ data }) {
  const [showPunchline, setShowPunchline] = useState(false);
  return (
    <div
      onClick={() => setShowPunchline(!showPunchline)}
      className="flip shadow-md bg-white text-center"
    >
      <div className={showPunchline ? "flip-content" : ""}>
        <p className="flip-front text-2xl p-10">{data.setup}</p>
        <p className=" flip-back text-2xl p-10">{data.punchline}</p>
      </div>
    </div>
  );
}

export default Item;
