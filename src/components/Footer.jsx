import './Footer.css'

const NAVIGATION = [
  'The Scent',
  'The Architecture',
  'The Aura',
  'Private Allocations',
]

const CONCIERGE = [
  'Client Relations',
  'Compliance',
  'Legal Notices',
  'Bespoke Access',
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* Column 1 — Brand anchor */}
        <div className="footer__col footer__col--brand">
          <h2 className="footer__brand">AURELIA</h2>
          <p className="footer__tagline">
            The architecture of raw olfactory art.
          </p>
        </div>

        {/* Column 2 — Navigation */}
        <nav className="footer__col footer__col--links" aria-label="Footer navigation">
          <ul className="footer__list">
            {NAVIGATION.map((label) => (
              <li key={label} className="footer__item">
                <a className="footer__link" href="#">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3 — Concierge */}
        <nav className="footer__col footer__col--links" aria-label="Concierge">
          <ul className="footer__list">
            {CONCIERGE.map((label) => (
              <li key={label} className="footer__item">
                <a className="footer__link" href="#">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Technical grounding line */}
      <div className="footer__base">
        <span className="footer__meta">
          AURELIA © 2026. ALL RIGHTS RESERVED.
        </span>
        <span className="footer__meta">
          EXTRAIT DE PARFUM / HIGH-END INTERACTIVE DISPLAY.
        </span>
      </div>
    </footer>
  )
}
