// Page : offres enregistrées (recherche + tri par match ou par date limite)
function matchColors(value) {
  if (value >= 80) return { from: "#34d399", to: "#a7f3d0" };
  if (value >= 65) return { from: "#facc15", to: "#fde68a" };
  return { from: "#f87171", to: "#fca5a5" };
}

function SavedJobs({ saved, onToggleSave, onOpen, onBack }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("match");

  const q = query.trim().toLowerCase();
  const list = JOBS
    .filter((job) => saved.includes(job.id))
    .filter((job) => (job.title + " " + job.company).toLowerCase().includes(q))
    .sort((a, b) => (sortBy === "match" ? b.match - a.match : a.deadline - b.deadline));

  return (
    <div className="screen">
      <div className="topbar topbar-center">
        <button className="icon-btn" onClick={onBack} aria-label="Back"><Icon name="back" size={20} /></button>
        <span className="topbar-spacer" />
      </div>
      <h1 className="page-title-lg">Saved jobs</h1>
      <p className="muted">Opportunities you want to keep track of.</p>

      <label className="search">
        <Icon name="search" size={20} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search saved jobs..." />
      </label>

      <div className="list-meta">
        <span>{list.length} saved {list.length === 1 ? "job" : "jobs"}</span>
        <button className="link-btn muted-btn" onClick={() => setSortBy(sortBy === "match" ? "deadline" : "match")}>
          Sort: {sortBy === "match" ? "Best match" : "Deadline"}
        </button>
      </div>

      <div className="list">
        {list.length === 0 && <p className="empty">No saved job. Tap the bookmark on a job in Discover to keep it here.</p>}
        {list.map((job) => {
          const colors = matchColors(job.match);
          return (
            <article className="job-card saved-card" key={job.id} onClick={() => onOpen(job.id)}>
              <Logo company={job.company} size={52} />
              <div className="job-main">
                <strong>{job.title}</strong>
                <span className="job-company">{job.company}</span>
                <span className={"deadline" + (job.deadline <= 5 ? " urgent" : "")}>
                  <Icon name="calendar" size={13} /> Deadline in {job.deadline} days
                </span>
              </div>
              <Ring value={job.match} size={50} stroke={5} from={colors.from} to={colors.to} />
              <button className="bookmark saved" aria-label="Remove from saved" onClick={(e) => { e.stopPropagation(); onToggleSave(job.id); }}>
                <Icon name="bookmark" size={19} fill="currentColor" />
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
