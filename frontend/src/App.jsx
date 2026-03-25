import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { useApp } from './context/AppContext';
import GeneralPage from './pages/GeneralPage';
import AuthPage from './pages/AuthPage';
import CollectionPage from './pages/CollectionPage';
import ScannerPage from './pages/ScannerPage';
import './App.css';

function App() {
  const { user, logout } = useApp();

  return (
    <>
      <Header isLoggedIn={user} logout={logout} />
      <Routes>
        <Route path="/" element={<GeneralPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path='/scanner' element={<ScannerPage />} />
        <Route path="/collections" element={<CollectionPage />} />
      </Routes>
    </>
  )
}

export default App;
