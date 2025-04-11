import { useLocation } from 'react-router-dom';
import Logout from '../Logout';
import LogoutIcon from '@mui/icons-material/Logout';
import './MainNavbar.css';


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

export default function MainNavbar() {
  const location = useLocation();

  return (
    <nav className="hero-navbar">
      {/* Left: Brand Logo */}
      <div className="hero-navbar-brand">
        <CineNicheLogo />
        <a href="/" className="brand-name">CineNiche</a>
      </div>

      {/* Right: Links */}
      <div className="hero-navbar-links">
        <a href="/home" className={location.pathname === '/home' ? 'nav-tab active-tab' : 'nav-tab'}>Home</a>
        <a href="/catalog" className={location.pathname === '/catalog' ? 'nav-tab active-tab' : 'nav-tab'}>Catalog</a>
        <a href="/member" className={location.pathname === '/member' ? 'nav-tab active-tab' : 'nav-tab'}>Profile</a>
        <a href="/admin" className={location.pathname === '/admin' ? 'nav-tab active-tab' : 'nav-tab'}>Admin</a>
        <Logout>
          <LogoutIcon /> Sign out
        </Logout>
      </div>
    </nav>
  );
}
