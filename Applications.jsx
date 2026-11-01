// Onglet "Applications" : toutes les candidatures, avec filtre par statut
const STATUSES = ["All", "Applied", "In review", "Interview", "Offer", "Rejected"];

function Applications({ applications }) {
  const [status, setStatus] = useState("All");
  const list = status === "All" ? applications : applications.filter((a) => a.status === status);

  return (
    <div className="screen">
      <header className="topbar topbar-top">
        <div>
          <h1 className="page-title-lg">Applications <span className="count">{applications.length}</span></h1>
          <p className="muted">Every opportunity, all in one place.</p>
        </div>
      </header>

      <div className="filters">
        {STATUSES.map((s) => (
          <button key={s} className={"chip" + (status === s ? " on" : "")} onClick={() => setStatus(s)}>{s}</button>
        ))}
      </div>

      <div className="list list-spaced">
        {list.length === 0 && <p className="empty">Nothing here yet.</p>}
        {list.map((a) => <ApplicationRow application={a} key={a.id} />)}
      </div>
    </div>
  );
}
