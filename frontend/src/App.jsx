import './App.css'

function App() {
  return (
    <main className="welcome-screen">
      {/* STATUS BAR */}
      <div className="status-bar">
        <span>9:41</span>
        <span>••• 5G ▰</span>
      </div>

      {/* APPLY BRAND */}
      <header className="brand">
        <div className="brand-icon" aria-hidden="true">
          A
        </div>

        <span className="brand-name">Apply</span>
      </header>

      {/* WELCOME MESSAGE */}
      <section className="welcome-copy">
        <p className="eyebrow">YOUR NEXT CHAPTER</p>

        <h1>
          Your next <span>opportunity</span> starts here.
        </h1>

        <p className="welcome-description">
          Find internships, part-time roles, and graduate opportunities
          built for students.
        </p>
      </section>

      {/* DECORATIVE JOB PREVIEW */}
      <section className="hero-visual" aria-label="Example job opportunity">
        <div className="glow glow-large" aria-hidden="true"></div>
        <div className="glow glow-small" aria-hidden="true"></div>

        <div className="opportunity-card">
          <div>
            <p className="card-label">A GREAT PLACE TO START</p>
            <h2>Product Design Intern</h2>
            <p className="company-name">Figma · San Francisco</p>
          </div>

          <div className="match-badge">85% match</div>
        </div>

        <div className="app-icon" aria-hidden="true">
          A
        </div>
      </section>

      {/* GET STARTED */}
      <button className="primary-button" type="button">
        Get started <span aria-hidden="true">→</span>
      </button>

      {/* SIGN IN */}
      <p className="sign-in-prompt">
        Already have an account? <button type="button">Sign in</button>
      </p>
    </main>
  )
}

export default App