import React, { useState } from "react";

const Backtotop = () => {
  const [isScroll, setIsScroll] = useState("btn-back-to-top");

  const scrolled = () => {
    if (window.pageYOffset > 85) {
      setIsScroll("btn-back-to-top active");
    } else {
      setIsScroll("btn-back-to-top");
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", scrolled);
  });

  return (
    <div className={isScroll} id="myBtn" onClick={() => window.scrollTo(0, 0)}>
      <span className="symbol-btn-back-to-top">
        <i className="zmdi zmdi-chevron-up"></i>
      </span>
    </div>
  );
};

export default Backtotop;
