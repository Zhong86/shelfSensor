import './App.css'
import Header from './components/Header';
import { useApp } from './context/AppContext';
import GeneralPage from './pages/GeneralPage';

function App() {
  const { user } = useApp();

  return (
    <>
      <Header isLoggedIn={user} />
      <GeneralPage />
    </>
  )
}

export default App;
