// Onglet "Applications" : toutes les candidatures, avec recherche, filtre par statut et tri
const STATUSES = ["All", "Saved", "Applied", "In review", "Interview", "Offer", "Rejected"];
const STATUS_RANK = { Offer: 0, Interview: 1, "In review": 2, Applied: 3, Saved: 4, Rejected: 5 };

function Applications({ applications, savedCount, onOpen, onAdd, onOpenSaved }) {
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const q = query.trim().toLowerCase();
  const list = applications
    .filter((a) => status === "All" || a.status === status)
    .filter((a) => (a.role + " " + a.company).toLowerCase().includes(q))
    .sort((a, b) => (sortBy === "status" ? STATUS_RANK[a.status] - STATUS_RANK[b.status] : 0));

  return (
    <div className="screen">
      <header className="topbar topbar-top">
        <div>
          <h1 className="page-title-lg">Applications</h1>
          <p className="muted">Track your progress and stay on top of every opportunity.</p>
        </div>
        <div className="topbar-actions">
          <button className="icon-btn" aria-label="Add external application" onClick={onAdd}><Icon name="plus" size={20} /></button>
          <button className="icon-btn" aria-label="Notifications"><Icon name="bell" size={20} /></button>
        </div>
      </header>

      <label className="search">
        <Icon name="search" size={20} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search applications..." />
      </label>

      <div className="filters">
        {STATUSES.map((s) => (
          <button key={s} className={"chip" + (status === s ? " on" : "")} onClick={() => setStatus(s)}>{s}</button>
        ))}
      </div>

      <button className="row clickable saved-link" onClick={onOpenSaved}>
        <Icon name="bookmark" size={20} />
        <div className="row-main">
          <strong>Saved jobs</strong>
          <span>{savedCount} {savedCount === 1 ? "job" : "jobs"} you want to keep track of</span>
        </div>
        <Icon name="chevron" size={18} />
      </button>

      <div className="list-meta">
        <span>{list.length} {list.length === 1 ? "application" : "applications"}</span>
        <button className="link-btn muted-btn" onClick={() => setSortBy(sortBy === "newest" ? "status" : "newest")}>
          Sort: {sortBy === "newest" ? "Newest" : "Status"}
        </button>
      </div>

      <div className="list">
        {list.length === 0 && <p className="empty">Nothing here yet. Try another filter or add an application.</p>}
        {list.map((a) => <ApplicationRow application={a} key={a.id} onOpen={onOpen} />)}
      </div>
    </div>
  );
}
