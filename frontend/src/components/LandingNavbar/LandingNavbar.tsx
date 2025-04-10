import './LandingNavbar.css';

export const CineNicheLogo = () => {
  return (
    <a href="/" className="logo-link">
      <img
        src="/Cineniche.png"
        alt="CineNiche Logo"
        width={36}
        height={36}
        style={{ display: 'block' }}
      />
    </a>
  );
};

export default function LandingNavbar() {
  return (
    <nav className="hero-navbar">
      <div className="hero-navbar-brand">
        <CineNicheLogo />
        <a href="/" className="brand-name">CineNiche</a>
      </div>
      <div className="hero-navbar-actions">
        <a href="/register" className="hero-navbar-button">Sign Up</a>
        <a href="/login" className="hero-navbar-button">Login</a>
      </div>
    </nav>
  );
}
