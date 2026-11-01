// Données en dur pour la démo (pas de backend).
const USER_NAME = "Alex";

const JOBS = [
  {
    id: 1, company: "Figma", title: "Product Design Intern",
    location: "San Francisco, CA", type: "Internship", mode: "On-site",
    tags: ["Design", "Product", "On-site"], posted: "2d ago", days: 2, match: 85,
    about: "Work with a cross-functional team to design and build features used by millions of people around the world.",
    dates: "Jun – Aug 2027", schedule: "Full-time", audience: "Open to students", requirement: "Design portfolio required",
    reasons: ["Relevant skills", "Strong experience fit", "Great company match"]
  },
  {
    id: 2, company: "Spotify", title: "UI/UX Intern",
    location: "New York, NY", type: "Internship", mode: "Hybrid",
    tags: ["Design", "UX", "Hybrid"], posted: "1d ago", days: 1, match: 78,
    about: "Help shape how listeners discover music and podcasts by prototyping and testing new interface ideas with the product team.",
    dates: "Jun – Aug 2027", schedule: "Full-time", audience: "Open to students", requirement: "Portfolio required",
    reasons: ["Relevant skills", "Good experience fit", "Great company match"]
  },
  {
    id: 3, company: "Notion", title: "Product Design Intern",
    location: "Remote", type: "Internship", mode: "Remote",
    tags: ["Product", "Design", "Remote"], posted: "5d ago", days: 5, match: 81,
    about: "Join a small design team and ship improvements to the editor, from first sketch to release.",
    dates: "Jul – Sep 2027", schedule: "Full-time", audience: "Open to students", requirement: "Design portfolio required",
    reasons: ["Relevant skills", "Strong experience fit", "Great company match"]
  },
  {
    id: 4, company: "Revolut", title: "Design Intern",
    location: "London, UK", type: "Internship", mode: "Hybrid",
    tags: ["Design", "Fintech", "Hybrid"], posted: "6d ago", days: 6, match: 72,
    about: "Design clear, simple money experiences for customers across Europe, working next to product managers and engineers.",
    dates: "Jun – Aug 2027", schedule: "Full-time", audience: "Open to students", requirement: "Portfolio required",
    reasons: ["Relevant skills", "Fair experience fit", "Good company match"]
  },
  {
    id: 5, company: "Alan", title: "Front-end Developer (Apprenticeship)",
    location: "Paris, FR", type: "Apprenticeship", mode: "Hybrid",
    tags: ["Dev", "React", "Hybrid"], posted: "3d ago", days: 3, match: 76,
    about: "Build and improve the web app used by members every day, with React and TypeScript, alongside a senior developer.",
    dates: "Sep 2027 – Aug 2029", schedule: "Work-study", audience: "Open to students", requirement: "GitHub profile appreciated",
    reasons: ["Relevant skills", "Good experience fit", "Great company match"]
  },
  {
    id: 6, company: "Doctolib", title: "Web Developer (Apprenticeship)",
    location: "Lyon, FR", type: "Apprenticeship", mode: "On-site",
    tags: ["Dev", "Web", "On-site"], posted: "4d ago", days: 4, match: 74,
    about: "Join a product team and take part in building features for patients and health professionals, from code review to release.",
    dates: "Sep 2027 – Aug 2029", schedule: "Work-study", audience: "Open to students", requirement: "CV required",
    reasons: ["Relevant skills", "Good experience fit", "Good company match"]
  }
];

const APPLICATIONS = [
  { id: 101, company: "Notion", role: "UX Research Intern", status: "Applied", date: "Today" },
  { id: 102, company: "Spotify", role: "Product Intern", status: "In review", date: "Yesterday" },
  { id: 103, jobId: 1, company: "Figma", role: "Product Design Intern", status: "Interview", date: "Oct 24" },
  { id: 104, company: "Revolut", role: "Design Intern", status: "Interview", date: "Oct 23" },
  { id: 105, company: "Linear", role: "Visual Design Intern", status: "Offer", date: "Oct 20" },
  { id: 106, company: "Loom", role: "Design Intern", status: "Rejected", date: "Oct 18" }
];

const UPCOMING = {
  company: "Figma", role: "Product Design Intern",
  when: "Tomorrow · 2:00 PM", mode: "Video call"
};

const PREP = {
  cv: {
    title: "CV feedback", score: 68,
    summaryTitle: "Overall score", summary: "Good foundation, with room to improve.",
    rows: [
      { label: "Relevant skills", value: "Strong", level: "good" },
      { label: "Experience", value: "Strong", level: "good" },
      { label: "Impact & results", value: "Partial", level: "mid" },
      { label: "Role alignment", value: "Gap", level: "bad" }
    ],
    recos: [
      { title: "Add more project outcomes", sub: "Show measurable results where possible.", level: "good" },
      { title: "Highlight product design skills", sub: "Include relevant tools and methodologies.", level: "mid" },
      { title: "Tailor to the role", sub: "Align your experience with the job description.", level: "bad" }
    ]
  },
  letter: {
    title: "Cover letter feedback", score: 74,
    summaryTitle: "Overall score", summary: "Clear tone, but needs sharper examples.",
    rows: [
      { label: "Opening hook", value: "Strong", level: "good" },
      { label: "Tone", value: "Strong", level: "good" },
      { label: "Specific examples", value: "Partial", level: "mid" },
      { label: "Closing", value: "Gap", level: "bad" }
    ],
    recos: [
      { title: "Name one concrete result", sub: "Back up your claims with a number or an outcome.", level: "good" },
      { title: "Mention the company's product", sub: "Show you know what the team builds.", level: "mid" },
      { title: "End with a clear next step", sub: "Invite the recruiter to talk with you.", level: "bad" }
    ]
  }
};
