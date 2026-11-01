// Le chef d'orchestre : garde les données et choisit la page affichée.
function App() {
  const [screen, setScreen] = useState("home");
  const [backTo, setBackTo] = useState("discover");
  const [jobId, setJobId] = useState(null);
  const [saved, setSaved] = useState([1, 3]);
  const [applications, setApplications] = useState(APPLICATIONS);

  function openJob(id) {
    setBackTo(screen);
    setJobId(id);
    setScreen("detail");
  }

  function toggleSave(id) {
    setSaved(saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id]);
  }

  function applyTo(job) {
    const newApplication = {
      id: Date.now(), jobId: job.id, company: job.company,
      role: job.title, status: "Applied", date: "Today"
    };
    setApplications([newApplication, ...applications]);
  }

  const job = JOBS.find((j) => j.id === jobId);

  return (
    <div className="phone">
      {screen === "home" && <Home applications={applications} onNav={setScreen} />}

      {/* Discover reste monté (juste caché) pour garder la recherche et les filtres */}
      <div style={{ display: screen === "discover" ? "contents" : "none" }}>
        <Discover saved={saved} onToggleSave={toggleSave} onOpen={openJob} />
      </div>

      {screen === "applications" && <Applications applications={applications} />}
      {screen === "prep" && <Prep onBack={() => setScreen("home")} />}

      {screen === "detail" && job && (
        <JobDetail
          job={job}
          saved={saved.includes(job.id)}
          applied={applications.some((a) => a.jobId === job.id)}
          onBack={() => setScreen(backTo)}
          onToggleSave={toggleSave}
          onApply={applyTo}
        />
      )}

      {screen !== "detail" && <TabBar screen={screen} onChange={setScreen} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
