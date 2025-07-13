import "./degree.css";

export default function DegreeOverview() {
  return (
    <div className="degree-overview-page">
      <header className="degree-header">
        <h1>B.Sc. in Computer Science and Engineering</h1>
        <p className="degree-subtitle">Undergraduate Program</p>
      </header>
      <section className="degree-summary-row">
        <div className="programs-summary-card">
          <div className="programs-summary-icon">
            <span className="programs-summary-svg">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 13l8-4 8 4-8 4-8-4zm0 2.5l8 4 8-4M8 16.5v3l8 4 8-4v-3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <div>
            <div className="programs-summary-label">DEGREE</div>
            <div className="programs-summary-value">B.Sc. in CSE</div>
          </div>
        </div>
        <div className="programs-summary-card">
          <div className="programs-summary-icon">
            <span className="programs-summary-svg">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 10a4 4 0 110 8 4 4 0 010-8zm0 10c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>
          <div>
            <div className="programs-summary-label">FACULTY</div>
            <div className="programs-summary-value">
              Engineering and Technology
            </div>
          </div>
        </div>
        <div className="programs-summary-card">
          <div className="programs-summary-icon">
            <span className="programs-summary-svg">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zm0 3a3 3 0 100 6 3 3 0 000-6z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>
          <div>
            <div className="programs-summary-label">DURATION</div>
            <div className="programs-summary-value">4 YEARS</div>
          </div>
        </div>
        <div className="programs-summary-card">
          <div className="programs-summary-icon">
            <span className="programs-summary-svg">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <text
                  x="16"
                  y="21"
                  textAnchor="middle"
                  fontSize="14"
                  fill="currentColor"
                >
                  160
                </text>
              </svg>
            </span>
          </div>
          <div>
            <div className="programs-summary-label">TOTAL CREDITS</div>
            <div className="programs-summary-value">160</div>
          </div>
        </div>
      </section>
      <section className="degree-description-card">
        <h2>Program Overview</h2>
        <p>
          The B.Sc. in Computer Science and Engineering program is designed to
          provide students with a strong foundation in computer science,
          software engineering, and information technology. The curriculum
          blends theoretical knowledge with hands-on experience, preparing
          graduates for successful careers in industry, research, and academia.
        </p>
      </section>
      <section className="degree-features-card">
        <h2>Key Features</h2>
        <ul className="degree-features-list">
          <li>Industry-relevant curriculum</li>
          <li>Research opportunities with faculty</li>
          <li>Modern computer labs and facilities</li>
          <li>Internship and career support</li>
          <li>Capstone project in final year</li>
          <li>Active student clubs and competitions</li>
        </ul>
      </section>
    </div>
  );
}
