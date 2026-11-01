// Page 4 : Application prep (CV / lettre de motivation)
function Prep({ onBack }) {
  const [tab, setTab] = useState("cv");
  const data = PREP[tab];
  const ringColors = data.score >= 70 ? ["#34d399", "#a7f3d0"] : ["#facc15", "#fb923c"];

  return (
    <div className="screen">
      <header className="topbar topbar-center">
        <button className="icon-btn" onClick={onBack} aria-label="Back"><Icon name="back" size={20} /></button>
        <h1 className="page-title">Application prep</h1>
        <span className="topbar-spacer" />
      </header>

      <div className="seg">
        <button className={tab === "cv" ? "on" : ""} onClick={() => setTab("cv")}>CV</button>
        <button className={tab === "letter" ? "on" : ""} onClick={() => setTab("letter")}>Cover letter</button>
      </div>

      <section className="panel">
        <h2 className="panel-title">{data.title}</h2>
        <div className="score-row">
          <Ring value={data.score} size={98} stroke={10} from={ringColors[0]} to={ringColors[1]} />
          <div>
            <strong>{data.summaryTitle}</strong>
            <p className="muted">{data.summary}</p>
          </div>
        </div>
        <div className="fb-list">
          {data.rows.map((row) => (
            <div className="fb-row" key={row.label}>
              <span className="fb-label">
                <span className={"dot " + row.level}>{row.level === "good" && <Icon name="check" size={12} />}</span>
                {row.label}
              </span>
              <span className={"fb-value " + row.level}>{row.value} <Icon name="chevron" size={15} /></span>
            </div>
          ))}
        </div>
      </section>

      <div className="section-head"><h2>Recommendations</h2></div>
      <div className="list">
        {data.recos.map((reco) => (
          <div className="reco" key={reco.title}>
            <span className={"reco-icon " + reco.level}><Icon name="arrowUp" size={18} /></span>
            <div className="row-main">
              <strong>{reco.title}</strong>
              <span>{reco.sub}</span>
            </div>
            <Icon name="chevron" size={16} />
          </div>
        ))}
      </div>
    </div>
  );
}
