// Page : ajouter une candidature trouvée en dehors de l'app
const SOURCES = [
  { id: "LinkedIn", label: "LinkedIn", mark: "in" },
  { id: "Indeed", label: "Indeed", mark: "i" },
  { id: "Company website", label: "Company website", mark: null }
];
const ADD_STATUSES = ["Saved", "Applied", "In review", "Interview", "Offer", "Rejected"];

function AddApplication({ onBack, onSubmit }) {
  const today = new Date().toISOString().slice(0, 10);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("LinkedIn");
  const [status, setStatus] = useState("Saved");
  const [date, setDate] = useState(today);
  const [cv, setCv] = useState("");
  const [error, setError] = useState("");

  function save() {
    if (!title.trim() || !company.trim()) {
      setError("Add a job title and a company to save this application.");
      return;
    }
    const shown = date
      ? new Date(date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : "Today";
    onSubmit({
      id: Date.now(), company: company.trim(), role: title.trim(), status, date: shown, source,
      timeline: status === "Saved" ? { Saved: shown } : { Applied: shown },
      documents: cv ? [{ name: "CV", file: cv }] : []
    });
  }

  return (
    <>
      <div className="screen">
        <div className="topbar topbar-center">
          <button className="icon-btn" onClick={onBack} aria-label="Back"><Icon name="back" size={20} /></button>
          <span className="topbar-spacer" />
        </div>
        <h1 className="page-title-lg">Add external application</h1>
        <p className="muted">Track opportunities you found outside of Apply.</p>

        <section className="panel form">
          <label className="field">
            <span>Job title *</span>
            <input className={"input" + (error && !title.trim() ? " invalid" : "")} value={title}
              onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Product Design Intern" />
          </label>

          <label className="field">
            <span>Company *</span>
            <input className={"input" + (error && !company.trim() ? " invalid" : "")} value={company}
              onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Airbnb" />
          </label>

          <div className="field">
            <span>Source *</span>
            <div className="sources">
              {SOURCES.map((s) => (
                <button key={s.id} type="button" className={"source" + (source === s.id ? " on" : "")} onClick={() => setSource(s.id)}>
                  {s.mark ? <b className="source-mark">{s.mark}</b> : <Icon name="link" size={20} />}
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <label className="field">
            <span>Application status *</span>
            <div className="select-wrap">
              <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
                {ADD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <Icon name="chevronDown" size={16} />
            </div>
          </label>

          <label className="field">
            <span>Date applied</span>
            <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>

          <label className="field">
            <span>Attach CV (optional)</span>
            <span className="file-pick">
              <Icon name="file" size={20} />
              <span className="file-name">{cv || "Select file"}</span>
              <Icon name="chevron" size={16} />
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCv(e.target.files[0] ? e.target.files[0].name : "")} />
            </span>
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}
        </section>
      </div>

      <div className="cta-bar">
        <button className="primary-btn" onClick={save}>Save application</button>
      </div>
    </>
  );
}
