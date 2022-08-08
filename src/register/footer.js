import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="footer">
        <div id="beside">
          <div className="ldi">
            <a href="https://www.inprove.info/" target="_blank">
              {" "}
              <img src="https://www.inprove.info/wp-content/uploads/2022/03/inprove_logo_weiss-200x52.png" />
            </a>
          </div>{" "}
          <div className="ldi">
            <p>
              © <span className="numbers">2022</span>&nbsp;in:prove
              <br />
              <a href="https://www.inprove.info/datenschutz/">
                Daten­schutz
              </a> | <a href="https://www.inprove.info/impressum/">Impressum</a>
            </p>
          </div>
          <div className="icondiv">
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
              integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            <div className="container">
              <p>
                <a
                  className="icon"
                  href="https://twitter.com/inprove_info"
                  target="_blank"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="icon"
                  href="https://www.instagram.com/inprove.info/"
                  target="_blank"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  className="icon"
                  href="https://www.linkedin.com/company/inprove-info"
                  target="_blank"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </p>
            </div>{" "}
          </div>
          <div className="bisp">
            <a
              href="https://www.bisp.de"
              target="_blank"
              aria-label="Gefoerdert_durch_BISp_rgb"
              rel="noopener noreferrer"
            >
              <img
                width="100"
                height="90"
                src="https://www.inprove.info/wp-content/uploads/2022/04/Gefoerdert_durch_BISp_rgb.png"
                data-orig-src="https://www.inprove.info/wp-content/uploads/2022/04/Gefoerdert_durch_BISp_rgb.png"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;

//###############################################################################
/*   */
