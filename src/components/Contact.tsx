import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="mailto:santhoshkapalavai@gmail.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                santhoshkapalavai@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>
              PGDM (Supply Chain) – Prin. L. N. Welingkar Institute of Management, 2018–2020
            </p>
            <p>
              B.Tech Aircraft Engines & Power Plant – National Aerospace University, KHAI, Ukraine
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://www.linkedin.com/in/santhoshkapalavai/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <h4>Certifications</h4>
            <p>CISA · CISM · CCISO · GRCP · GRCA</p>
            <p>ISO 27001 LA · HITRUST CCSFP · PMP</p>
            <p>GDPR Expert · ITIL V4 · Six Sigma GB</p>
          </div>
          <div className="contact-box">
            <h2>
              GRC & Cybersecurity <br /> by <span>Santhosh Kapalavai</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
