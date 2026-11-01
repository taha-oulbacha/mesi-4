// Page 3 : détail d'une offre
function JobDetail({ job, saved, applied, onBack, onToggleSave, onApply }) {
  return (
    <>
      <div className="screen screen-flush">
        <div className="detail-hero">
          <div className="topbar">
            <button className="icon-btn" onClick={onBack} aria-label="Back"><Icon name="back" size={20} /></button>
            <div className="topbar-actions">
              <button className={"icon-btn" + (saved ? " on" : "")} onClick={() => onToggleSave(job.id)} aria-label="Save">
                <Icon name="bookmark" size={20} fill={saved ? "currentColor" : "none"} />
              </button>
              <button className="icon-btn" aria-label="More"><span className="dots">•••</span></button>
            </div>
          </div>
          <Logo company={job.company} size={76} />
        </div>

        <div className="detail-body">
          <p className="muted detail-company">{job.company}</p>
          <h1 className="detail-title">{job.title}</h1>
          <div className="detail-meta">
            <span><Icon name="pin" size={15} /> {job.location}</span>
            <span><Icon name="building" size={15} /> {job.type}</span>
            <span><Icon name="building" size={15} /> {job.mode}</span>
          </div>

          <section className="panel match">
            <div className="match-head">
              <strong>Match with your profile</strong>
              <span className="muted">Why?</span>
            </div>
            <div className="match-body">
              <Ring value={job.match} size={92} stroke={9} />
              <ul className="reasons">
                {job.reasons.map((r) => (
                  <li key={r}><span className="dot good"><Icon name="check" size={12} /></span>{r}</li>
                ))}
              </ul>
            </div>
          </section>

          <h3>About the role</h3>
          <p className="muted body-text">{job.about}</p>

          <h3>Key details</h3>
          <div className="details-grid">
            <span><Icon name="calendar" size={18} />{job.dates}</span>
            <span><Icon name="clock" size={18} />{job.schedule}</span>
            <span><Icon name="cap" size={18} />{job.audience}</span>
            <span><Icon name="folder" size={18} />{job.requirement}</span>
          </div>
        </div>
      </div>

      <div className="cta-bar">
        <button className={"primary-btn" + (applied ? " done" : "")} onClick={() => !applied && onApply(job)}>
          {applied ? <><Icon name="check" size={20} /> Applied</> : <>Apply now <Icon name="arrowRight" size={20} /></>}
        </button>
      </div>
    </>
  );
}
