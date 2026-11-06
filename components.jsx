// Composants réutilisables par toutes les pages.
const { useState } = React;

// Icônes (SVG intégrés, rien à installer)
const ICONS = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>,
  sparkle: <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" /></>,
  bookmark: <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />,
  back: <path d="m15 18-6-6 6-6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  check: <path d="m5 12 5 5 9-10" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  trophy: <><path d="M8 4h8v6a4 4 0 0 1-8 0z" /><path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 14v4M8 21h8" /></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3z" /></>,
  pin: <><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  building: <><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  cap: <path d="M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />,
  leaf: <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19c3-5 6-8 10-10" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  chevronDown: <path d="m6 9 6 6 6-6" />
};

function Icon({ name, size = 20, fill = "none" }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill={fill}
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

function Ring({ value, size = 84, stroke = 8, from = "#34d399", to = "#a7f3d0" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const id = "ring-" + size + "-" + value;
  const mid = size / 2;
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={"0 0 " + size + " " + size}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <circle cx={mid} cy={mid} r={r} fill="none" stroke="rgba(255,255,255,.09)" strokeWidth={stroke} />
        <circle cx={mid} cy={mid} r={r} fill="none" stroke={"url(#" + id + ")"} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)}
          transform={"rotate(-90 " + mid + " " + mid + ")"} />
      </svg>
      <span className="ring-value" style={{ fontSize: size * 0.28 }}>{value}%</span>
    </div>
  );
}

const BRAND_COLORS = { Alan: "#3b5bff", Doctolib: "#107aca", Linear: "#5e6ad2", Loom: "#625df5" };

function Logo({ company, size = 44 }) {
  const box = { width: size, height: size };
  if (company === "Figma") {
    return (
      <div className="logo logo-dark" style={box}>
        <svg viewBox="0 0 24 36" width={size * 0.4} height={size * 0.6}>
          <path d="M6 0h6v12H6a6 6 0 0 1 0-12z" fill="#F24E1E" />
          <path d="M12 0h6a6 6 0 0 1 0 12h-6z" fill="#FF7262" />
          <path d="M6 12h6v12H6a6 6 0 0 1 0-12z" fill="#A259FF" />
          <circle cx="18" cy="18" r="6" fill="#1ABCFE" />
          <path d="M6 24h6v6a6 6 0 1 1-6-6z" fill="#0ACF83" />
        </svg>
      </div>
    );
  }
  if (company === "Spotify") {
    return (
      <div className="logo logo-round" style={{ ...box, background: "#1ed760" }}>
        <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill="none" stroke="#07100c" strokeWidth="2.4" strokeLinecap="round">
          <path d="M4 9c5-1.5 11-1 16 2" /><path d="M5 13c4.2-1.1 9-.7 13 1.7" /><path d="M6 17c3.4-.8 7-.5 10 1.2" />
        </svg>
      </div>
    );
  }
  if (company === "Notion" || company === "Revolut") {
    return (
      <div className="logo logo-light" style={box}>
        <b style={{ fontSize: size * 0.5 }}>{company === "Notion" ? "N" : "R"}</b>
      </div>
    );
  }
  return (
    <div className="logo" style={{ ...box, background: BRAND_COLORS[company] || "#24352d" }}>
      <b style={{ fontSize: size * 0.42 }}>{company.slice(0, 1)}</b>
    </div>
  );
}

function StatusPill({ status }) {
  return <span className={"pill pill-" + status.toLowerCase().replace(" ", "-")}>{status}</span>;
}

// onOpen est optionnel : sans lui (ex. page Home), la ligne n'est pas cliquable.
function ApplicationRow({ application, onOpen }) {
  const clickable = Boolean(onOpen);
  return (
    <div
      className={"row" + (clickable ? " clickable" : "")}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? () => onOpen(application.id) : undefined}
      onKeyDown={clickable ? (e) => { if (e.key === "Enter") onOpen(application.id); } : undefined}
    >
      <Logo company={application.company} size={46} />
      <div className="row-main">
        <strong>{application.role}</strong>
        <span>{application.company}</span>
      </div>
      <div className="row-end">
        <StatusPill status={application.status} />
        <span className="row-date">{application.date}</span>
      </div>
    </div>
  );
}

function JobCard({ job, saved, onToggleSave, onOpen }) {
  return (
    <article className="job-card" onClick={() => onOpen(job.id)}>
      <Logo company={job.company} size={52} />
      <div className="job-main">
        <strong>{job.title}</strong>
        <span className="job-company">{job.company}</span>
        <div className="tags">
          {job.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <div className="job-foot">
          <span className="job-loc"><Icon name="pin" size={13} />{job.location}</span>
          <span>{job.posted}</span>
        </div>
      </div>
      <button
        className={"bookmark" + (saved ? " saved" : "")}
        aria-label={saved ? "Remove from saved" : "Save"}
        onClick={(event) => { event.stopPropagation(); onToggleSave(job.id); }}
      >
        <Icon name="bookmark" size={19} fill={saved ? "currentColor" : "none"} />
      </button>
    </article>
  );
}

const TABS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "discover", label: "Discover", icon: "search" },
  { id: "applications", label: "Applications", icon: "file" },
  { id: "prep", label: "Prep", icon: "sparkle" }
];

function TabBar({ screen, onChange }) {
  return (
    <nav className="tabbar">
      {TABS.map((tab) => (
        <button key={tab.id} className={screen === tab.id ? "active" : ""} onClick={() => onChange(tab.id)}>
          <Icon name={tab.icon} size={22} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
