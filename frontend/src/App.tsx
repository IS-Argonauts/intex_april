import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CookieConsentBanner from './components/CookieConsentBanner';
import LandingPage from './pages/LandingPage';
import MemberInfo from './pages/MemberInfo';
import MovieCatalog from './pages/MovieCatalog';
import MovieDetailsPage from './pages/MovieDetailsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
// import AdminPage from './pages/AdminPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/catalog" element={<MovieCatalog />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
          <Route path="/member" element={<MemberInfo />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
      <CookieConsentBanner />
    </>
  );
}

export default App;
