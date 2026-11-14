import Image from "next/image";
export default function Header() {
  return (
    <header className="header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <a href="#top" className="brand" aria-label="Perllynn home">
        <Image
          src="/brand/perllynn-logo.jpg"
          width={104}
          height={104}
          priority
          alt="Perllynn"
        />
      </a>
      <nav aria-label="Main navigation">
        <a href="#perspective">Our perspective</a>
        <a href="#network">The network</a>
        <a href="#contact" className="nav-contact">
          Start a conversation <span aria-hidden="true">+</span>
        </a>
      </nav>
    </header>
  );
}
