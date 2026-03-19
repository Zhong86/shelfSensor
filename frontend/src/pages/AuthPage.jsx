import { useState } from 'react'; 
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const { login } = useApp();
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password, isLogin ? null : name);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setEmail('')
    setPassword('')
    setName('')
  }

  return ( 
    <div className="login-bg ">
      <div className="login-card m-auto">
        <div className="text-center mb-4">
          ...
          <h2 className="h4 mb-1">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-muted small">
            {isLogin ? 'Log in to access your collection' : 'Start tracking your books'}
          </p>
        </div>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Only show on register */}
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label small">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label small">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label small">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-cozy w-100 mb-3">
            {isLogin ? 'Log In' : 'Register'}
          </button>
        </form>

        <p className="text-center small text-muted mb-0">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            className="btn btn-link btn-sm p-0 text-decoration-none"
            style={{ color: 'var(--cozy-brown)' }}
            onClick={toggleMode}
          >
            {isLogin ? 'Register' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}
