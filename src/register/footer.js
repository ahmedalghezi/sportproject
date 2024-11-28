import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Footer extends Component {
  render() {
    const styles = {
      footer: {
        backgroundColor: "black",
        color: "white",
        padding: "20px 0",
      },
      icon: {
        color: "white",
        fontSize: "25px",
        margin: "0 10px",
      },
      sponsorImage: {
        maxWidth: "100px",
        maxHeight: "90px",
      },
    };

    return (
      <footer style={styles.footer}>
        <div className="container">
          <div className="row align-items-center text-center text-md-left">
            {/* Logo Section */}
            <div className="col-12 col-md-3 mb-3 mb-md-0">
              <a href="https://www.inprove.info/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.inprove.info/wp-content/uploads/2022/03/inprove_logo_weiss-200x52.png"
                  alt="Logo"
                  className="img-fluid"
                />
              </a>
            </div>

            {/* Links Section */}
            <div className="col-12 col-md-6 mb-3 mb-md-0">
              <p>
                © <span className="numbers">2024</span> in:prove
                <br />
                <a href="https://www.inprove.info/datenschutz/" className="text-white">
                  Datenschutz
                </a>{" "}
                |{" "}
                <a href="https://www.inprove.info/impressum/" className="text-white">
                  Impressum
                </a>
              </p>
            </div>

            {/* Social Media & Sponsor Section */}
            <div className="col-12 col-md-3 d-flex justify-content-between align-items-center">
              {/* Social Media Icons */}
              <div className="d-flex">
                <a
                  href="https://twitter.com/inprove_info"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.icon}
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://www.instagram.com/inprove.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.icon}
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/inprove-info"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.icon}
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>

              {/* Sponsor Image */}
              <div className="ml-3" style={{ backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>
                <a href="https://www.bisp.de" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://www.inprove.info/wp-content/uploads/2022/04/Gefoerdert_durch_BISp_rgb.png"
                    alt="BISP Sponsor"
                    style={styles.sponsorImage}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;














// import React, { Component } from "react";

// class Footer extends Component {
//   state = {};
//   render() {
//     return (
//       <div className="footer">
//         <div id="beside">
//           <div className="ldi">
//             <a href="https://www.inprove.info/" target="_blank">
//               {" "}
//               <img src="https://www.inprove.info/wp-content/uploads/2022/03/inprove_logo_weiss-200x52.png" />
//             </a>
//           </div>{" "}
//           <div className="ldi">
//             <p>
//               © <span className="numbers">2024</span>&nbsp;in:prove
//               <br />
//               <a href="https://www.inprove.info/datenschutz/">
//                 Daten­schutz
//               </a> | <a href="https://www.inprove.info/impressum/">Impressum</a> {/* | <a href="https://inprove-sport.info/mxTexyr/deletYourAccount/">Lösche Deine Daten</a>*/}
//             </p>
//           </div>
//           <div className="icondiv">
//             <link
//               rel="stylesheet"
//               href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
//               integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
//               crossOrigin="anonymous"
//               referrerPolicy="no-referrer"
//             />






//             <div className="container">
//               <p>
//                 <a
//                   className="icon"
//                   href="https://twitter.com/inprove_info"
//                   target="_blank"
//                 >
//                   <i className="fab fa-twitter"></i>
//                 </a>
//                 <a
//                   className="icon"
//                   href="https://www.instagram.com/inprove.info/"
//                   target="_blank"
//                 >
//                   <i className="fab fa-instagram"></i>
//                 </a>
//                 <a
//                   className="icon"
//                   href="https://www.linkedin.com/company/inprove-info"
//                   target="_blank"
//                 >
//                   <i className="fab fa-linkedin"></i>
//                 </a>
//               </p>
//             </div>{" "}
//           </div>
//           <div className="bisp">
//             <a
//               href="https://www.bisp.de"
//               target="_blank"
//               aria-label="Gefoerdert_durch_BISp_rgb"
//               rel="noopener noreferrer"
//             >
//               <img
//                 width="100"
//                 height="90"
//                 src="https://www.inprove.info/wp-content/uploads/2022/04/Gefoerdert_durch_BISp_rgb.png"
//                 data-orig-src="https://www.inprove.info/wp-content/uploads/2022/04/Gefoerdert_durch_BISp_rgb.png"
//                 alt=""
//               />
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Footer;

// //###############################################################################
// /*   */


