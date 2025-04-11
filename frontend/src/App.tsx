import './App.css';
import { useEffect } from 'react';
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
 
function App() {
  // 🔐 Inactivity timeout - 4 minutes (240,000 ms)
  useEffect(() => {
    let timer: NodeJS.Timeout;
 
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(
        () => {
          alert('You were logged out due to inactivity.');
          window.location.href = '/login'; // or call logout logic
        },
        4 * 60 * 1000
      ); // 4 mins
    };
 
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer(); // kick off timer
 
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      clearTimeout(timer);
    };
  }, []);
 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/catalog"
            element={
              <ProtectedRoute>
                <MovieCatalog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <ProtectedRoute>
                <MovieDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/member"
            element={
              <ProtectedRoute>
                <MemberInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
 
      <CookieConsentBanner />
    </>
  );
}
 
export default App;