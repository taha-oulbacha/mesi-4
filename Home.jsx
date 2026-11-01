// Page 1 : Home
function Home({ applications, onNav }) {
  const interviews = applications.filter((a) => a.status === "Interview").length;
  const offers = applications.filter((a) => a.status === "Offer").length;

  return (
    <div className="screen">
      <header className="topbar">
        <div className="brand"><Icon name="leaf" size={30} /> Apply</div>
        <button className="icon-btn" aria-label="Notifications"><Icon name="bell" size={20} /></button>
      </header>

      <section className="greeting">
        <p className="greet-small">Good morning,</p>
        <h1 className="greet-name">{USER_NAME}</h1>
        <p className="muted">Keep going. You're one step closer to your next opportunity.</p>
      </section>

      <section className="stats">
        <div className="stat">
          <div className="stat-top"><Icon name="file" size={22} /><strong>{applications.length}</strong></div>
          <span>Applications</span>
        </div>
        <div className="stat">
          <div className="stat-top"><Icon name="calendar" size={22} /><strong>{interviews}</strong></div>
          <span>Interviews</span>
        </div>
        <div className="stat">
          <div className="stat-top"><Icon name="trophy" size={22} /><strong>{offers}</strong></div>
          <span>Offer</span>
        </div>
      </section>

      <section className="hero-card">
        <div className="hero-card-top">
          <span className="hero-label"><Icon name="calendar" size={16} /> Upcoming interview</span>
          <button className="mini-btn" aria-label="Open" onClick={() => onNav("applications")}><Icon name="chevron" size={16} /></button>
        </div>
        <h2>{UPCOMING.role}</h2>
        <div className="hero-card-bottom">
          <Logo company={UPCOMING.company} size={48} />
          <div>
            <strong>{UPCOMING.company}</strong>
            <span>{UPCOMING.when}</span>
            <span className="hero-mode"><Icon name="video" size={14} /> {UPCOMING.mode}</span>
          </div>
        </div>
      </section>

      <div className="section-head">
        <h2>Recent applications</h2>
        <button className="link-btn" onClick={() => onNav("applications")}>See all <Icon name="chevron" size={14} /></button>
      </div>
      <div className="list">
        {applications.slice(0, 3).map((a) => <ApplicationRow application={a} key={a.id} />)}
      </div>
    </div>
  );
}
