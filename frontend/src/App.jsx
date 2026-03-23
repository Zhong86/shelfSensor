import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { useApp } from './context/AppContext';
import GeneralPage from './pages/GeneralPage';
import AuthPage from './pages/AuthPage';
import CollectionPage from './pages/CollectionPage';
import './App.css';

function App() {
  const { user } = useApp();

  return (
    <>
      <Header isLoggedIn={user} />
      <Routes>
        <Route path="/" element={<GeneralPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/collections" element={<CollectionPage />} />
      </Routes>
    </>
  )
}

export default App;
