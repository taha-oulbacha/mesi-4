// Le chef d'orchestre : garde les données et choisit la page affichée.
function App() {
  const [screen, setScreen] = useState("home");
  const [backTo, setBackTo] = useState("discover");
  const [jobId, setJobId] = useState(null);
  const [applicationId, setApplicationId] = useState(null);
  const [saved, setSaved] = useState([1, 3]);
  const [applications, setApplications] = useState(APPLICATIONS);

  function openJob(id) {
    setBackTo(screen);
    setJobId(id);
    setScreen("detail");
  }

  function openApplication(id) {
    setApplicationId(id);
    setScreen("applicationDetail");
  }

  function toggleSave(id) {
    setSaved(saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id]);
  }

  function applyTo(job) {
    const newApplication = {
      id: Date.now(), jobId: job.id, company: job.company,
      role: job.title, status: "Applied", date: "Today", timeline: { Applied: "Today" }
    };
    setApplications([newApplication, ...applications]);
  }

  function addExternal(application) {
    setApplications([application, ...applications]);
    setScreen("applications");
  }

  function changeStatus(id, status) {
    setApplications(applications.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  const job = JOBS.find((j) => j.id === jobId);
  const application = applications.find((a) => a.id === applicationId);
  // Ajout et offres enregistrées sont des sous-pages de l'onglet Applications
  const tabScreen = screen === "addApplication" || screen === "saved" ? "applications" : screen;
  const hideTabBar = screen === "detail" || screen === "applicationDetail";

  return (
    <div className="phone">
      {screen === "home" && <Home applications={applications} onNav={setScreen} />}

      {/* Discover reste monté (juste caché) pour garder la recherche et les filtres */}
      <div style={{ display: screen === "discover" ? "contents" : "none" }}>
        <Discover saved={saved} onToggleSave={toggleSave} onOpen={openJob} />
      </div>

      {screen === "applications" && (
        <Applications
          applications={applications}
          savedCount={saved.length}
          onOpen={openApplication}
          onAdd={() => setScreen("addApplication")}
          onOpenSaved={() => setScreen("saved")}
        />
      )}
      {screen === "prep" && <Prep onBack={() => setScreen("home")} />}

      {screen === "applicationDetail" && application && (
        <ApplicationDetail
          application={application}
          onBack={() => setScreen("applications")}
          onChangeStatus={changeStatus}
        />
      )}
      {screen === "addApplication" && (
        <AddApplication onBack={() => setScreen("applications")} onSubmit={addExternal} />
      )}
      {screen === "saved" && (
        <SavedJobs saved={saved} onToggleSave={toggleSave} onOpen={openJob} onBack={() => setScreen("applications")} />
      )}

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

      {!hideTabBar && <TabBar screen={tabScreen} onChange={setScreen} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
