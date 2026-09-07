import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown, ArrowRight, Boxes, Building2, Check, Clock3, Compass,
  Handshake, MapPin, Menu, Send, ShieldCheck, X,
} from 'lucide-react'
import './App.css'

const images = {
  hero: '/images/hero.jpg',
  residential: '/images/residential.jpg',
  commercial: '/images/commercial.jpg',
  land: '/images/land.jpg',
}

const officeAddress = '3, Middle Road, Hastings, Kolkata, West Bengal, India 700022'
const officeCoordinates = { lat: 22.5487543, lng: 88.3283314 }
const mapsEmbedSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d900!2d${officeCoordinates.lng}!3d${officeCoordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(officeAddress)}!5e0!3m2!1sen!2sin`
const mapsLink = `https://www.google.com/maps?q=${officeCoordinates.lat},${officeCoordinates.lng}+(${encodeURIComponent('Chity Properties Private Limited, 3, Middle Road, Hastings')})`

const navItems = [
  ['Home', '#home'], ['About', '#about'], ['Properties', '#properties'],
  ['Why Chity', '#why-chity'], ['Contact', '#contact'],
]
const highlights = [
  ['01', 'Strategic Approach', 'Thoughtful evaluation of real-estate opportunities'],
  ['02', 'Quality Assets', 'A focus on property quality and long-term value'],
  ['03', 'Trusted Relationships', 'Professional relationships built for the long term'],
  ['04', 'Kolkata Based', 'Strategically located in Hastings, Kolkata'],
]
const properties = [
  ['Residential Properties', 'Thoughtfully selected residential opportunities with a focus on location, quality and lasting value.', images.residential, 'Contemporary premium residential architecture'],
  ['Commercial Properties', 'Commercial real estate opportunities positioned around strategic locations and practical value.', images.commercial, 'Modern commercial property exterior'],
  ['Land & Development', 'Land and development opportunities evaluated with a long-term perspective.', images.land, 'Open land viewed in warm evening light'],
]
const principles = [
  ['Thoughtful', 'Every property opportunity deserves careful consideration.', Compass],
  ['Professional', 'A straightforward and professional approach to real estate.', ShieldCheck],
  ['Long-Term', 'Focused on sustainable value rather than short-term decisions.', Clock3],
  ['Relationship Driven', 'Strong relationships are central to how we work.', Handshake],
]
const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }

// Startup India wordmark. Replace the markup here with the official artwork
// file once approved brand assets are available.
function StartupIndiaMark({ instanceId }: { instanceId: string }) {
  const gradientId = `startupIndiaOrange-${instanceId}`
  return (
    <svg className="startup-india-mark" viewBox="0 18 578 122" role="img" aria-label="Startup India">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F04E23" />
          <stop offset="1" stopColor="#F7941D" />
        </linearGradient>
      </defs>
      <text x="4" y="104" textLength="466" lengthAdjust="spacingAndGlyphs"
        fontSize="104" fontWeight="800" fill={`url(#${gradientId})`}>#startupindia</text>
      <polyline points="418,126 468,126 468,102 516,102 516,76 564,76 564,46"
        fill="none" stroke="#3AB54A" strokeWidth="13" />
    </svg>
  )
}

function StartupIndiaBadge({ instanceId, note }: { instanceId: string; note: string }) {
  return (
    <div className="recognition-badge">
      <span className="recognition-chip"><StartupIndiaMark instanceId={instanceId} /></span>
      <p>{note}</p>
    </div>
  )
}

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className={`wordmark ${light ? 'wordmark-light' : ''}`} aria-label="Chity Properties home">
      <span>CHITY PROPERTIES</span><small>PRIVATE LIMITED</small>
    </a>
  )
}

function SectionIntro({ eyebrow, title, description, light = false }: {
  eyebrow: string; title: string; description?: string; light?: boolean
}) {
  return (
    <motion.div className={`section-intro ${light ? 'section-intro-light' : ''}`}
      variants={reveal} initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
      <span className="eyebrow">{eyebrow}</span><h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const sections = navItems.map(([, href]) => document.querySelector(href)).filter(Boolean) as Element[]
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActiveSection(entry.target.id)
    }), { rootMargin: '-35% 0px -55% 0px' })
    sections.forEach(section => observer.observe(section))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!event.currentTarget.checkValidity()) return event.currentTarget.reportValidity()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
        <div className="nav-inner">
          <Wordmark light />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className={activeSection === href.slice(1) ? 'active' : ''}>{label}</a>
            ))}
          </nav>
          <a className="nav-cta" href="#contact">Enquire Now <ArrowRight size={15} /></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu" aria-expanded={menuOpen}><Menu size={24} /></button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mobile-menu-top"><Wordmark light />
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu"><X /></button>
            </div>
            <nav aria-label="Mobile navigation">
              {navItems.map(([label, href], index) => (
                <motion.a key={href} href={href} onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}><small>0{index + 1}</small>{label}</motion.a>
              ))}
            </nav>
            <p>Real Estate • Property • Opportunity</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="hero-section" aria-label="Chity Properties introduction">
          <img className="hero-image" src={images.hero} alt="Contemporary high-rise architecture against a clear sky" />
          <div className="hero-overlay" /><div className="hero-grid" aria-hidden="true" />
          <motion.div className="hero-content container" initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
            <span className="hero-eyebrow">Real Estate <i /> Property <i /> Opportunity</span>
            <h1>Building Value Through <em>Exceptional</em> Real Estate</h1>
            <p>Chity Properties Private Limited is engaged in the real estate and property sector, with a focus on quality assets, enduring value and trusted relationships.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#about">Explore Our Approach <ArrowRight size={17} /></a>
              <a className="button button-ghost" href="#contact">Get in Touch</a>
            </div>
            <div className="hero-recognition">
              <span className="recognition-chip"><StartupIndiaMark instanceId="hero" /></span>
              <p>
                <strong>Recognised under the Startup India initiative.</strong>
                Participant in the Blockchain India Challenge, currently at MVP stage.
              </p>
            </div>
          </motion.div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span>Discover</span><ArrowDown size={16} /></a>
        </section>

        <section id="about" className="about-section section">
          <div className="container">
            <div className="about-grid">
              <motion.div className="about-statement" variants={reveal} initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}>
                <span className="eyebrow">Our Perspective</span>
                <h2>Property.<br />Perspective.<br /><em>Possibility.</em></h2>
              </motion.div>
              <motion.div className="about-copy" variants={reveal} initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, delay: 0.12 }}>
                <span className="eyebrow">About Chity Properties</span>
                <p className="lead">Chity Properties Private Limited is a real estate and property company based in Kolkata, West Bengal.</p>
                <p>We focus on identifying, managing and creating value through real estate opportunities while maintaining a long-term perspective and a commitment to professionalism.</p>
                <p>With our presence in Hastings, Kolkata, we operate with an appreciation for the importance of location, asset quality and lasting relationships.</p>
                <p>Chity Properties is recognised under the Startup India initiative and is a participant in the Blockchain India Challenge, currently in the advanced MVP stage of the programme.</p>
              </motion.div>
            </div>
            <div className="highlights-grid">
              {highlights.map(([number, title, description], index) => (
                <motion.article key={number} className="highlight-card" variants={reveal} initial="hidden"
                  whileInView="visible" viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}>
                  <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div>
                </motion.article>
              ))}
            </div>

            <div className="recognition-block">
              <motion.div variants={reveal} initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
                <span className="eyebrow">Recognition</span>
                <h3 className="recognition-heading">National programmes we are part of</h3>
              </motion.div>
              <div className="recognition-grid">
                <motion.article className="recognition-card" variants={reveal} initial="hidden"
                  whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }}>
                  <span className="recognition-chip recognition-chip-lg"><StartupIndiaMark instanceId="about" /></span>
                  <p className="recognition-kicker">Recognised under Startup India</p>
                  <p>Chity Properties Private Limited is recognised under the Startup India initiative of the Government of India.</p>
                </motion.article>
                <motion.article className="recognition-card" variants={reveal} initial="hidden"
                  whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: 0.08 }}>
                  <div className="challenge-lockup" aria-hidden="true">
                    <Boxes size={22} strokeWidth={1.4} />
                    <span>Blockchain India Challenge</span>
                  </div>
                  <p className="recognition-kicker">Participant · Advanced stage · MVP</p>
                  <p>The company has participated in the Blockchain India Challenge and is in the advanced stages of the programme, currently at the MVP (Minimum Viable Product) stage.</p>
                </motion.article>
              </div>
            </div>
          </div>
        </section>

        <section id="properties" className="properties-section section">
          <div className="container">
            <SectionIntro eyebrow="Property Perspective" title="Our Real Estate Focus"
              description="Opportunities grounded in location, quality and long-term value." />
            <div className="property-grid">
              {properties.map(([title, description, image, alt], index) => (
                <motion.article className="property-card" key={title} variants={reveal} initial="hidden"
                  whileInView="visible" viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}>
                  <div className="property-image-wrap"><img src={image} alt={alt} loading="lazy" /><span>0{index + 1}</span></div>
                  <div className="property-card-copy"><h3>{title}</h3><p>{description}</p><div className="property-line" /></div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="editorial-section">
          <motion.div className="editorial-image" initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }}>
            <img src={images.hero} alt="Geometric detail of premium modern architecture" loading="lazy" />
            <div className="image-caption">Architecture / Value / Place</div>
          </motion.div>
          <motion.div className="editorial-copy" variants={reveal} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.65 }}>
            <span className="eyebrow">Enduring Value</span><h2>Real Estate With A Long-Term Perspective</h2>
            <div className="gold-rule" />
            <p>Real estate is more than a physical asset. Location, timing, quality and thoughtful decision-making determine the value created over time.</p>
            <p>At Chity Properties, our approach is centered around identifying meaningful opportunities and building enduring value through property.</p>
          </motion.div>
        </section>

        <section id="why-chity" className="why-section section">
          <div className="why-texture" aria-hidden="true" />
          <div className="container">
            <SectionIntro eyebrow="How We Work" title="Why Chity Properties"
              description="A considered approach to property, grounded in sound judgement and lasting relationships." light />
            <div className="principles-grid">
              {principles.map(([title, description, Icon], index) => (
                <motion.article className="principle-card" key={title as string} variants={reveal} initial="hidden"
                  whileInView="visible" viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}>
                  <div className="principle-icon"><Icon size={24} strokeWidth={1.4} /></div>
                  <span>0{index + 1}</span><h3>{title as string}</h3><p>{description as string}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="location-section section">
          <div className="container location-grid">
            <motion.div className="location-copy" variants={reveal} initial="hidden" whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
              <span className="eyebrow">Our Place</span><h2>Rooted in <em>Kolkata</em></h2>
              <p>Our office is located in Hastings, one of Kolkata&apos;s established and strategically positioned neighbourhoods.</p>
              <div className="address-block"><MapPin size={24} strokeWidth={1.5} aria-hidden="true" />
                <address><strong>Chity Properties Private Limited</strong><span>3, Middle Road, Hastings</span><span>Kolkata, West Bengal, India – 700022</span></address>
              </div>
            </motion.div>
            <motion.div className="map-card" initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}>
              <iframe
                title="Google Map showing Chity Properties Private Limited at 3, Middle Road, Hastings, Kolkata"
                src={mapsEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a className="map-open" href={mapsLink} target="_blank" rel="noreferrer">
                Open in Google Maps
              </a>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="contact-section section">
          <div className="container">
            <div className="contact-heading"><SectionIntro eyebrow="Begin A Conversation" title="Let’s Talk Property"
              description="Whether you are exploring a property opportunity, looking to discuss an asset or simply want to connect with us, we would be pleased to hear from you." /></div>
            <div className="contact-grid">
              <motion.form className="contact-form" onSubmit={submitForm} variants={reveal} initial="hidden"
                whileInView="visible" viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6 }}>
                <div className="form-row">
                  <label><span>Full Name *</span><input name="name" type="text" autoComplete="name" required minLength={2} placeholder="Your full name" /></label>
                  <label><span>Email Address *</span><input name="email" type="email" autoComplete="email" required placeholder="Your email address" /></label>
                </div>
                <div className="form-row">
                  <label><span>Phone Number</span><input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" /></label>
                  <label><span>Subject / Enquiry Type *</span><select name="subject" required defaultValue="">
                    <option value="" disabled>Select an enquiry type</option><option>Property Opportunity</option>
                    <option>Asset Discussion</option><option>Business Partnership</option><option>General Enquiry</option>
                  </select></label>
                </div>
                <label><span>Message *</span><textarea name="message" required minLength={10} rows={5} placeholder="Tell us how we may assist you" /></label>
                <button className="button button-dark" type="submit">Send Enquiry <Send size={16} /></button>
                <p className="form-note">This enquiry form is currently in preview mode and is not connected to an email service.</p>
                <AnimatePresence>{submitted && (
                  <motion.div className="success-message" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
                    <Check size={18} /><span>Your enquiry details were validated successfully. Sending will be available once an email service is configured.</span>
                    <button type="button" onClick={() => setSubmitted(false)} aria-label="Dismiss message"><X size={16} /></button>
                  </motion.div>
                )}</AnimatePresence>
              </motion.form>
              <motion.aside className="contact-details" variants={reveal} initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, delay: 0.12 }}>
                <span className="eyebrow">Visit Us</span><div className="contact-icon"><Building2 size={27} strokeWidth={1.4} /></div>
                <h3>Chity Properties<br />Private Limited</h3>
                <address>3, Middle Road, Hastings<br />Kolkata, West Bengal<br />India – 700022</address>
                <div className="contact-detail-rule" /><p>Property conversations begin with perspective. We welcome the opportunity to connect.</p>
              </motion.aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container">
        <div className="footer-main">
          <div>
            <Wordmark light /><p className="footer-tagline">Real Estate <i /> Property <i /> Opportunity</p>
            <StartupIndiaBadge instanceId="footer" note="Recognised under the Startup India initiative" />
          </div>
          <address>3, Middle Road, Hastings<br />Kolkata, West Bengal, India – 700022</address>
          <nav aria-label="Footer navigation">{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        </div>
        <div className="footer-bottom"><p>© 2026 Chity Properties Private Limited. All Rights Reserved.</p>
          <div><a href="#privacy">Privacy Policy</a><span>|</span><a href="#terms">Terms</a></div>
        </div>
      </div></footer>
    </div>
  )
}

export default App
