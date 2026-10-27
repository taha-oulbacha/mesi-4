const { useState } = React;

// This component shows one job application.
function ApplicationCard({ application }) {
  const initials = application.company.slice(0, 2).toUpperCase();
  const statusClass = application.status.toLowerCase();

  return (
    <article className="application-card">
      <div className="company-icon">{initials}</div>

      <div className="application-details">
        <strong>{application.role}</strong>
        <span>{application.company} · {application.source}</span>
      </div>

      <div className="application-status">
        <span className={`status-badge ${statusClass}`}>{application.status}</span>
        <span className="application-date">{application.date}</span>
      </div>
    </article>
  );
}

// This is the first screen people see.
function HomeScreen({ applications, onSeeAll }) {
  const interviews = applications.filter((job) => job.status === "Interview").length;
  const inProgress = applications.filter((job) => job.status === "Applied" || job.status === "Interview").length;

  return (
    <>
      <section className="welcome-section">
        <p className="eyebrow">YOUR SEARCH, AT A GLANCE</p>
        <h1>Good morning,<br /><span>Alex.</span></h1>
        <p className="welcome-copy">Every application is a step closer to the right opportunity.</p>
      </section>

      <section className="streak-card">
        <div className="streak-heading">
          <span>✳ &nbsp;YOUR STREAK</span>
          <span className="streak-label">ON A ROLL</span>
        </div>

        <div className="streak-number">
          <strong>4</strong>
          <span>days<br />in a row</span>
          <b>✳</b>
        </div>

        <div className="week-row">
          <div className="week-day"><span>M</span><i></i></div>
          <div className="week-day"><span>T</span><i></i></div>
          <div className="week-day"><span>W</span><i className="done">✓</i></div>
          <div className="week-day"><span>T</span><i className="done">✓</i></div>
          <div className="week-day"><span>F</span><i className="done">✓</i></div>
          <div className="week-day"><span>S</span><i></i></div>
          <div className="week-day"><span>S</span><i className="today">•</i></div>
        </div>

        <div className="streak-caption">
          <span>You’re building a great habit.</span>
          <strong>4 day streak</strong>
        </div>
      </section>

      <div className="section-heading">
        <div>
          <p className="eyebrow">THE BIG PICTURE</p>
          <h2>Your search</h2>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card"><strong>{applications.length}</strong><span>Applications</span></div>
        <div className="stat-card"><strong>{inProgress}</strong><span>In progress</span></div>
        <div className="stat-card"><strong>{interviews}</strong><span>Interviews</span></div>
      </div>

      <div className="section-heading recent-heading">
        <div>
          <p className="eyebrow">FRESH OFF THE PRESS</p>
          <h2>Recent applications</h2>
        </div>
        <button className="text-button" onClick={onSeeAll}>See all →</button>
      </div>

      <div className="application-list">
        {applications.slice(0, 3).map((application) => (
          <ApplicationCard application={application} key={application.id} />
        ))}
      </div>
    </>
  );
}

// This screen shows every application.
function ApplicationsScreen({ applications }) {
  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">YOUR OPPORTUNITIES</p>
        <h1>Applications <span>{applications.length}</span></h1>
        <p>Every opportunity, all in one place.</p>
      </section>

      <div className="application-list">
        {applications.map((application) => (
          <ApplicationCard application={application} key={application.id} />
        ))}
      </div>
    </>
  );
}

// This form adds one new job to the list.
function AddApplicationForm({ onClose, onAdd }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newApplication = {
      id: Date.now(),
      role: formData.get("role"),
      company: formData.get("company"),
      source: formData.get("source"),
      status: "Applied",
      date: "Today"
    };

    onAdd(newApplication);
  }

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <form className="add-form" onSubmit={handleSubmit}>
        <button className="close-button" type="button" onClick={onClose}>×</button>
        <p className="eyebrow">ONE MORE STEP FORWARD</p>
        <h2>Add an application</h2>

        <label>Job title<input name="role" placeholder="Product Designer" required /></label>
        <label>Company<input name="company" placeholder="Company name" required /></label>
        <label>
          Found on
          <select name="source">
            <option>LinkedIn</option>
            <option>Indeed</option>
            <option>HelloWork</option>
            <option>Company website</option>
            <option>Referral</option>
          </select>
        </label>

        <button className="save-button" type="submit">Save application</button>
      </form>
    </div>
  );
}

// This component holds the app data and changes between screens.
function App() {
  const [applications, setApplications] = useState(window.jobApplications);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [showForm, setShowForm] = useState(false);

  function addApplication(newApplication) {
    setApplications([newApplication, ...applications]);
    setShowForm(false);
    setCurrentScreen("applications");
  }

  return (
    <main className="phone-frame">
      <header className="app-header">
        <div className="brand"><span className="brand-mark">✳</span>apply<span className="brand-dot">.</span></div>
        <button className="avatar-button">A</button>
      </header>

      <div className="screen-content">
        {currentScreen === "home" ? (
          <HomeScreen
            applications={applications}
            onSeeAll={() => setCurrentScreen("applications")}
          />
        ) : (
          <ApplicationsScreen applications={applications} />
        )}
      </div>

      <nav className="bottom-navigation">
        <button className={currentScreen === "home" ? "active" : ""} onClick={() => setCurrentScreen("home")}>
          <span>⌂</span>Home
        </button>
        <button className={currentScreen === "applications" ? "active" : ""} onClick={() => setCurrentScreen("applications")}>
          <span>▤</span>Applications
        </button>
        <button className="add-button" onClick={() => setShowForm(true)}>＋</button>
      </nav>

      {showForm && <AddApplicationForm onClose={() => setShowForm(false)} onAdd={addApplication} />}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
