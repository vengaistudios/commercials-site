import { FormEvent, useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, Menu, Play, Send, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Project = {
  title: string;
  category: string;
  number: string;
  tone: string;
  detail: string;
};

const projects: Project[] = [
  { title: 'Time, Reframed', category: 'Watches', number: '01', tone: 'watch', detail: 'Luxury timepiece' },
  { title: 'The Weight of Light', category: 'Jewelry', number: '02', tone: 'jewelry', detail: 'Fine jewelry' },
  { title: 'After Hours', category: 'Fashion', number: '03', tone: 'fashion', detail: 'Evening collection' },
  { title: 'A Table in Motion', category: 'Restaurants', number: '04', tone: 'restaurant', detail: 'Culinary experience' },
];

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.14 },
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError('');
    const form = new FormData(event.currentTarget);
    const inquiry = {
      name: String(form.get('name') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      project_type: String(form.get('project_type') ?? '').trim(),
      message: String(form.get('message') ?? '').trim(),
    };

    const { error: insertError } = await supabase.from('contact_inquiries').insert(inquiry);
    if (insertError) {
      setError('Something went quiet on our end. Please email hello@vengaistudios.com instead.');
      setSending(false);
      return;
    }
    setSent(true);
    setSending(false);
    event.currentTarget.reset();
  }

  return (
    <main>
      <nav className="site-nav sticky top-0 z-50">
        <a className="nav-brand" href="#top" aria-label="Vengai Studios home">
          <img src="/assets/images/Vengai_Studios_Logo_Icon.png" alt="" />
          <span>VENGAI</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Start a project <ArrowUpRight size={14} /></a>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <section id="top" className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-logo"><img src="/assets/images/Vengai_Studios_Full_White_BG_Logo_Vertical.png" alt="Vengai Studios — Some brands ask for attention. We hunt it." /></div>
        </div>
        
        
      </section>

      <section id="work" className="work-section section-shell">
        <div className="section-heading reveal">
          <div><p className="section-kicker">Selected work <span>///</span></p><h2>Made to be <i>felt.</i></h2></div>
          <p className="section-note">Commercial films for brands<br />with a point of view.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
        </div>
      </section>

     
      <section className="founder-section section-shell">
        <div className="founder-layout">
          <figure className="founder-portrait reveal">
            <img src="/assets/images/Vengai_Studios_Shashinth_Madhurshaan.png" alt="Shashinth Madhurshaan Sri Logeswaran, founder of Vengai Studios" />
            <figcaption>Shashinth Madhurshaan Sri Logeswaran — Founder, Creative Director &amp; Chief Editor</figcaption>
          </figure>
          <div className="founder-copy reveal">
          <p className="section-kicker">The Studio <span>///</span></p> 
            <h2>Founder, Creative Director &amp; Chief Editor</h2>
            <p>Commercials Vengai Studios is led by Shashinth Madhurshaan Sri Logeswaran — Founder, Creative Director, and Chief Editor. A self-taught film student, he's built his understanding of the craft from the ground up, studying how film theory shapes the way an audience psychologically responds to what they're watching. That understanding drives every project: shots aren't chosen for how they look, but for how they're sequenced to carry emotion and story. The result isn't stylized footage for its own sake. It's imagery engineered to make a viewer feel something before they've consciously registered why.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section section-shell">
        <div className="contact-heading reveal"><p className="section-kicker">Make something <span>///</span></p><h2>Worth<br /><i>watching.</i></h2><p>Have a product, a feeling, or a world in mind? Tell us where to begin.</p></div>
        <div className="contact-form-wrap reveal">
          {sent ? <div className="success-panel"><div className="success-icon"><Check size={20} /></div><p className="section-kicker">Message received <span>///</span></p><h3>We’ll be in touch.</h3><p>Thanks for reaching out. We’ll get back to you shortly.</p><button className="text-link" onClick={() => setSent(false)}>Send another <ArrowUpRight size={16} /></button></div> : <form onSubmit={handleSubmit}>
            <div className="form-row"><label><span>Your name</span><input name="name" type="text" placeholder="Jane Smith" required /></label><label><span>Email address</span><input name="email" type="email" placeholder="jane@brand.com" required /></label></div>
            <label><span>Project type</span><select name="project_type" defaultValue="" required><option value="" disabled>Select a direction</option><option>Commercial film</option><option>Product launch</option><option>Brand world</option><option>Something else</option></select></label>
            <label><span>Tell us a little more</span><textarea name="message" rows={4} placeholder="The idea currently living in your head..." required /></label>
            {error && <p className="form-error">{error}</p>}
            <button className="submit-button" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send inquiry'} <Send size={16} /></button>
          </form>}
          <p className="fallback">Prefer email? <a href="mailto:hello@vengaistudios.com">hello@vengaistudios.com</a></p>
        </div>
      </section>

      <footer className="site-footer"><a className="footer-brand" href="#top"><img src="/assets/images/Vengai_Studios_Logo_Icon.png" alt="" /><span>VENGAI<br /><small>STUDIOS</small></span></a><p>Commercials for the culture-forward.</p><p>© 2025 Vengai Studios</p></footer>
    </main>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className={`project-card reveal delay-${index + 1}`}><div className={`project-frame ${project.tone}`}><div className="frame-grain" /><div className="frame-meta"><span>{project.number}</span><span>{project.detail}</span></div><button className="play-button" aria-label={`Play ${project.title}`}><Play size={16} fill="currentColor" /></button><div className="frame-word">{project.category === 'Watches' ? '00:12:48' : project.category === 'Jewelry' ? 'LUMEN' : project.category === 'Fashion' ? 'NOCTURNE' : 'SERVE'}</div></div><div className="project-info"><div><h3>{project.title}</h3><p>{project.category}</p></div><ArrowUpRight className="project-arrow" size={18} /></div></article>;
}

export default App;
