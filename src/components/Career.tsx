import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Manager – GRC</h4>
                <h5>Dexian Pvt. Ltd</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Built and scaled global GRC & cybersecurity advisory services.
              Led programs across ISO 27001, SOC 2, SOX, HITRUST, HIPAA, GDPR,
              DPDP, and NIST frameworks. Serving as vCISO for enterprise clients.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Risk & Compliance Lead</h4>
                <h5>Accenture · Chennai/Canada</h5>
              </div>
              <h3>2018–23</h3>
            </div>
            <p>
              Directed cross-functional audit teams for 1st and 2nd party audits,
              supply chain audits, and ITGC validations. Enhanced audit frameworks
              with walkthroughs, evidence matrices, and continuous improvement
              metrics. Supported SOX compliance attestations.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Sr. Representative</h4>
                <h5>SRK Aviacom (Indian Air Force)</h5>
              </div>
              <h3>2017–18</h3>
            </div>
            <p>
              Interfaced with Air Force stakeholders to align aircraft maintenance
              and documentation to safety and airworthiness norms. Led internal
              audits, client walkthroughs, and incident investigations.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Quality Engineer</h4>
                <h5>Vision Group of Aviation</h5>
              </div>
              <h3>2016–17</h3>
            </div>
            <p>
              Quality maintenance engineering for aviation operations in
              Phnom Penh, Cambodia — ensuring regulatory compliance and
              airworthiness standards across fleet operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
