import './Architecture.css'

// Placeholder image paths — replace with the real assets once provided.
// Filename convention: `note-<id>-raw.jpg` for raw material, `note-<id>-fluid.jpg` for viscous fluid.
const NOTES = [
  {
    id: 'pepper-bergamot',
    name: 'Black Pepper & Bergamot',
    desc: 'The volatile spark. An effervescent citrus opening grounded by the sharp, immediate bite of crushed dry spice.',
    raw: '/assets/note-1.png',
    fluid: '/assets/note-1-refined.png',
  },
  {
    id: 'turkish-rose',
    name: 'Turkish Rose Absolute',
    desc: 'The dense, beating heart. A highly concentrated floral absolute that sheds its lightness for a dark, velvety resonance.',
    raw: '/assets/note-2-glass.png',
    fluid: '/assets/note-2-refined.png',
    glass: true,
  },
  {
    id: 'olibanum',
    name: 'Olibanum',
    desc: 'The ancient core. Sacred, smoke-cured resin that provides a dry, architectural backbone to the heavy oil concentration.',
    raw: '/assets/note-3.png',
    fluid: '/assets/note-3-refined.png',
  },
  {
    id: 'ambergris-musk',
    name: 'Ambergris & Dark Musk',
    desc: 'The permanent anchor. Profound depth and low warmth that binds the sillage intimately to the skin for 24 hours.',
    raw: '/assets/note-4-glass.png',
    fluid: '/assets/note-4-refined.png',
    glass: true,
  },
]

export default function Architecture() {
  return (
    <section className="architecture">
      {/* Faint ambient glow — heavily blurred + darkened image bg */}
      <div className="architecture__glow" aria-hidden="true" />

      {/* Top gradient mask — melts the boundary with the section above */}
      <div className="architecture__seam-mask" aria-hidden="true" />

      {/* SVG filter for the liquid ripple displacement on hover */}
      <svg
        className="architecture__svg-defs"
        width="0"
        height="0"
        aria-hidden="true"
      >
        <defs>
          <filter id="liquidRipple" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.025"
              numOctaves="2"
              seed="3"
              result="turb"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turb"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <header className="architecture__header">
        <h2 className="architecture__title">The Olfactory Architecture</h2>
        <p className="architecture__subtitle">The anatomy of the Extrait.</p>
      </header>

      <div className="architecture__grid">
        {NOTES.map((note, i) => (
          <article
            className={`card${note.glass ? ' card--glass' : ''}`}
            key={note.id}
          >
            <div className="card__media">
              <img
                className="card__img card__img--raw"
                src={note.raw}
                alt={`${note.name} raw material`}
                loading="lazy"
              />
              <img
                className="card__img card__img--fluid"
                src={note.fluid}
                alt={`${note.name} extracted essence`}
                loading="lazy"
              />
              <div className="card__overlay" aria-hidden="true" />
            </div>

            <div className="card__text">
              <span className="card__index">0{i + 1}</span>
              <h3 className="card__name">{note.name}</h3>
              <p className="card__desc">{note.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
