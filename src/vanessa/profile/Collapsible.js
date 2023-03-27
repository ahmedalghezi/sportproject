import React, { useState, useRef } from "react";

function Collapsible(props) {
  const [isOpen, setIsOpen] = useState(false);
const parentRef = useRef();



return (
  <div className="collapsible">
  <button className="collapsbutton" onClick={() => setIsOpen(!isOpen)}>{props.label}</button>
  <div className="content-parent" 
  ref={parentRef} 
  style={isOpen ? {height: parentRef.current.scrollHeight + "px",} 
  : {height: "0px",}}>
    <div className="collapcontent">
      {props.children}

    </div>

  </div>
</div>
);
}
export default Collapsible;
