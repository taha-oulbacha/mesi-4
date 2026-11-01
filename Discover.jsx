// Page 2 : Discover (recherche + filtres qui fonctionnent vraiment)
const FILTERS = [
  { label: "Internship", test: (job) => job.type === "Internship" },
  { label: "Apprenticeship", test: (job) => job.type === "Apprenticeship" },
  { label: "Design", test: (job) => job.tags.includes("Design") },
  { label: "Remote", test: (job) => job.mode === "Remote" }
];
const TYPE_LABELS = ["Internship", "Apprenticeship"];

function Discover({ saved, onToggleSave, onOpen }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  function toggleFilter(label) {
    let next = active.filter((l) => l !== label);
    if (!active.includes(label)) {
      if (TYPE_LABELS.includes(label)) next = next.filter((l) => !TYPE_LABELS.includes(l));
      next.push(label);
    }
    setActive(next);
  }

  const q = query.trim().toLowerCase();
  const results = JOBS
    .filter((job) => {
      const text = [job.title, job.company, ...job.tags].join(" ").toLowerCase();
      const matchesFilters = FILTERS.filter((f) => active.includes(f.label)).every((f) => f.test(job));
      return text.includes(q) && matchesFilters && (!savedOnly || saved.includes(job.id));
    })
    .sort((a, b) => (sortBy === "match" ? b.match - a.match : a.days - b.days));

  return (
    <div className="screen">
      <header className="topbar topbar-top">
        <div>
          <h1 className="page-title-lg">Discover</h1>
          <p className="muted">Find internships and apprenticeships that match your goals.</p>
        </div>
        <button className={"icon-btn" + (savedOnly ? " on" : "")} aria-label="Show saved only" onClick={() => setSavedOnly(!savedOnly)}>
          <Icon name="bookmark" size={20} fill={savedOnly ? "currentColor" : "none"} />
        </button>
      </header>

      <label className="search">
        <Icon name="search" size={20} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search roles, companies, skills..." />
      </label>

      <div className="filters">
        {FILTERS.map((f) => (
          <button key={f.label} className={"chip" + (active.includes(f.label) ? " on" : "")} onClick={() => toggleFilter(f.label)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="list-meta">
        <span>{results.length} {results.length === 1 ? "opportunity" : "opportunities"}</span>
        <button className="link-btn muted-btn" onClick={() => setSortBy(sortBy === "newest" ? "match" : "newest")}>
          Sort: {sortBy === "newest" ? "Newest" : "Best match"}
        </button>
      </div>

      <div className="list">
        {results.length === 0 && (
          <p className="empty">No result. Try another keyword or remove a filter.</p>
        )}
        {results.map((job) => (
          <JobCard key={job.id} job={job} saved={saved.includes(job.id)} onToggleSave={onToggleSave} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}
