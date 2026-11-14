import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChicagoCarousel from "@/components/ChicagoCarousel";
import ContactForm from "@/components/ContactForm";

const principles = [
  {
    title: "Independent by design.",
    text: "Impartial advice, free from internal pressures and competing interests. Our experts focus on what makes sense for you.",
  },
  {
    title: "Expertise, carefully chosen.",
    text: "A network of professionals selected for their specialized knowledge and depth of experience. The right perspective for the question at hand.",
  },
  {
    title: "Your situation. Your advice.",
    text: "No two decisions are the same. We bring thoughtful, tailored guidance to your particular circumstances, priorities, and ambitions.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <section
          className="perspective section-pad"
          id="perspective"
          aria-labelledby="perspective-title"
        >
          <div className="section-heading">
            <span className="eyebrow">A different perspective</span>
            <span className="small-note">
              Clarity starts with independence.
            </span>
          </div>
          <div className="perspective-grid">
            <h2 id="perspective-title">
              The best advice
              <br />
              has one interest.
              <br />
              <em>Yours.</em>
            </h2>
            <div className="perspective-copy">
              <span className="gold-rule" />
              <p className="lead">Good decisions deserve a clear view.</p>
              <p>
                Perllynn brings together independent experts from around the
                world to provide unbiased advice, focused solely on what serves
                you best.
              </p>
              <p>
                Free from client or industry obligations that could compromise
                their objectivity, our experts bring fresh thinking to the
                decisions that matter to you.
              </p>
              <a className="text-link" href="#approach">
                Discover our approach <span aria-hidden="true">+</span>
              </a>
            </div>
          </div>
          <div className="principles" id="approach">
            {principles.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="network section-pad"
          id="network"
          aria-labelledby="network-title"
        >
          <div className="section-heading">
            <span className="eyebrow">The Perllynn network</span>
            <span className="small-note">
              Different backgrounds. Shared conviction.
            </span>
          </div>
          <div className="network-grid">
            <div>
              <h2 id="network-title">
                A world of expertise.
                <br />
                <em>
                  A personal point
                  <br className="desktop-break" /> of view.
                </em>
              </h2>
            </div>
            <div className="network-copy">
              <p className="lead">
                The right minds change
                <br />
                how you see the possibilities.
              </p>
              <p>
                Our network spans disciplines and geographies. Each professional
                is carefully selected for the expertise they bring and the
                experience behind it.
              </p>
              <p>
                That breadth of perspective lets us look beyond the obvious,
                understand your unique situation, and offer advice that fits.
              </p>
              <a href="#contact" className="button button-light">
                Let’s talk <span aria-hidden="true">+</span>
              </a>
            </div>
          </div>
          <div className="network-note">
            <span className="status-dot" /> Independent experts. Connected
            thinking.
          </div>
        </section>
        <ChicagoCarousel />
        <section
          className="contact section-pad"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="section-heading">
            <span className="eyebrow">Start a conversation</span>
            <span className="small-note">
              Every perspective starts with listening.
            </span>
          </div>
          <div className="contact-grid">
            <div>
              <h2 id="contact-title">
                What’s on
                <br />
                <em>your mind?</em>
              </h2>
              <p className="contact-intro">
                Tell us where you are, what you’re considering, and what comes
                next. We’ll start there.
              </p>
              <div className="contact-details">
                <span>Perllynn</span>
                <span>Business Consulting and Services</span>
                <span>Chicago, Illinois</span>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="footer">
        <a
          href="#top"
          className="footer-wordmark"
          aria-label="Perllynn, back to top"
        >
          PERLLYNN
        </a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Perllynn</span>
          <span>Privately held. Independently minded.</span>
          <a href="#top">
            Back to top <span aria-hidden="true">+</span>
          </a>
        </div>
      </footer>
    </>
  );
}
