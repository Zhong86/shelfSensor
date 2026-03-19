import { useState } from 'react'; 
import { Link, useLocation } from 'react-router-dom';

export default function Header({ isLoggedIn = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'General' }, 
    { href: '/personal', label: 'Personal' }, 
    { href: '/scanner', label: 'Scanner' }
  ];

  const isActive = (path) => location.pathname === path;
  
  return (
    <header style={{ backgroundColor: '#8B7355' }}>
      <nav className='navbar py-3 navbar-expand-md navbar-cozy sticky-top'>
        <div 
          className='d-flex w-100 px-4 m-auto justify-content-between align-items-center'
        >
          <Link
            to='/'
            className='text-decoration-none d-flex align-items-center gap-2'
            style={{ color: 'white' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <span className="fw-semibold fs-5">ShelfSensor</span>
          </Link>

          { /* Desktop */ }
          <div className='d-none d-md-flex align-items-center gap-2'>
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                to={link.href}
                className='text-decoration-none px-3 py-2 rounded'
                style={{
                  color: 'white', 
                  backgroundColor: isActive(link.href)  ? 'rgba(255,255,255,0.2)' : 'transparent',
                  fontWeight: isActive(link.href) ? 600 : 400,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="btn btn-sm ms-2 px-3 py-2"
              style={{
                backgroundColor: 'white',
                color: '#6B5344',
                fontWeight: 500,
              }}
            >
              {isLoggedIn ? 'Profile' : 'Login'}
            </Link>
          </div>

          { /* Mobile */ }
          <button
            className="d-md-none btn p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: 'white', border: 'none', background: 'transparent' }}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="d-md-none mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="d-flex flex-column gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-decoration-none px-3 py-2 rounded"
                  style={{
                    color: 'white',
                    backgroundColor: isActive(link.href) ? 'rgba(255,255,255,0.2)' : 'transparent',
                    fontWeight: isActive(link.href) ? 600 : 400,
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                className="btn mt-2 px-3 py-2"
                style={{
                  backgroundColor: 'white',
                  color: '#6B5344',
                  fontWeight: 500,
                }}
                onClick={() => setMenuOpen(false)}
              >
                {isLoggedIn ? 'Profile' : 'Login'}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
