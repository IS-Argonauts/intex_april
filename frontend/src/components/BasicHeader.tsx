import { CineNicheLogo } from './LandingNavbar/LandingNavbar'; // still reuse logo component

const BasicHeader = () => {
  return (
    <nav className="hero-navbar">
      <div className="hero-navbar-brand">
        <CineNicheLogo />
        <a href="/" className="brand-name">
          CineNiche
        </a>
      </div>
    </nav>
  );
};

export default BasicHeader;
