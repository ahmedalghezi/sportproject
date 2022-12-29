import React from "react";
import "./uploadFile";
import { NavLinksC } from "./navLinks";

function VideoNavC() {
  return (
    <div>
     <h3>Videos verwalten</h3>
        <div className="nav">
          <ul className="navlist">
            {NavLinksC.map((val, key) => {
              return (
                <li
                  key={key}
                  className="row"
                  id={window.location.pathname == val.link ? "active" : ""}
                  onClick={() => {
                    window.location.pathname = val.link;
                  }}
                >
                  {" "}
                  <div id="title">{val.title}</div>
                </li>
              );
            })}
          </ul>
        </div>
      
    </div>
  );
}

export default VideoNavC;
