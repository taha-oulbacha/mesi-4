// Page : détail d'une candidature (statut, étapes, prochaine étape, documents)
const DETAIL_STEPS = ["Saved", "Applied", "Interview", "Offer"];
const DETAIL_STATUSES = ["Saved", "Applied", "In review", "Interview", "Offer", "Rejected"];

// Jusqu'où la candidature est avancée dans la frise (In review et Rejected = après "Applied")
function reachedStep(status) {
  if (status === "In review" || status === "Rejected") return DETAIL_STEPS.indexOf("Applied");
  return DETAIL_STEPS.indexOf(status);
}

function ApplicationDetail({ application, onBack, onChangeStatus }) {
  const a = application;
  const job = JOBS.find((j) => j.id === a.jobId);
  const reached = reachedStep(a.status);
  const dates = a.timeline || {};
  const documents = a.documents || [];

  return (
    <div className="screen">
      <div className="topbar topbar-center">
        <button className="icon-btn" onClick={onBack} aria-label="Back"><Icon name="back" size={20} /></button>
        <div className="topbar-actions">
          <button className="icon-btn" aria-label="Save"><Icon name="bookmark" size={20} /></button>
          <button className="icon-btn" aria-label="More"><span className="dots">•••</span></button>
        </div>
      </div>

      <div className="app-head">
        <Logo company={a.company} size={76} />
        <div className="app-head-main">
          <h1 className="detail-title">{a.role}</h1>
          <p className="muted">{a.company}</p>
          {job && (
            <div className="detail-meta">
              <span><Icon name="pin" size={15} /> {job.location}</span>
              <span><Icon name="building" size={15} /> {job.type}</span>
              <span><Icon name="building" size={15} /> {job.mode}</span>
            </div>
          )}
        </div>
      </div>

      <section className="status-card">
        <div className="status-card-top">
          <strong>Application status</strong>
          <label className="status-select">
            <select value={a.status} onChange={(e) => onChangeStatus(a.id, e.target.value)} aria-label="Change status">
              {DETAIL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <Icon name="chevronDown" size={14} />
          </label>
        </div>
        <p className="muted status-next">
          <Icon name="calendar" size={15} />
          {a.next ? "Next step: " + a.next.title + " · " + a.next.when : "No next step yet."}
        </p>
      </section>

      <h3 className="section-title">Application timeline</h3>
      <ol className="timeline">
        {DETAIL_STEPS.map((step, i) => {
          const done = i <= reached;
          return (
            <li key={step} className={(done ? "done" : "") + (i === reached ? " current" : "")}>
              <span className={"timeline-dot" + (done ? " on" : "")}>{done && <Icon name="check" size={12} />}</span>
              <div className="timeline-main">
                <strong>{step}</strong>
                {step === "Interview" && a.next && <span className="muted">Interview scheduled for {a.next.when}</span>}
              </div>
              {dates[step] && <span className="muted timeline-date">{dates[step]}</span>}
            </li>
          );
        })}
      </ol>

      {a.next && (
        <section className="panel next-card">
          <div className="next-icon"><Icon name="calendar" size={20} /></div>
          <div className="next-main">
            <span className="muted">Next step</span>
            <span className="muted">{a.next.when}</span>
            <strong>{a.next.title}</strong>
            <span className="muted">{a.next.note}</span>
          </div>
        </section>
      )}

      <h3 className="section-title">Documents</h3>
      <div className="list">
        {documents.length === 0 && <p className="empty">No document attached to this application.</p>}
        {documents.map((d) => (
          <div className="row" key={d.file}>
            <div className="doc-icon"><Icon name="file" size={20} /></div>
            <div className="row-main">
              <strong>{d.name}</strong>
              <span>{d.file}</span>
            </div>
            <button className="icon-btn" aria-label="More"><span className="dots">•••</span></button>
          </div>
        ))}
      </div>
    </div>
  );
}
