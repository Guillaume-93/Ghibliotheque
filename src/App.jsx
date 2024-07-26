import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import FilmDetail from './pages/FilmDetail';
import Films from './pages/Films';
import Home from './pages/Home';
import Locations from './pages/Locations';
import Peoples from './pages/Peoples';
import Species from './pages/Species';
import Vehicles from './pages/Vehicles';
import ScrollToTop from './components/ScrollToTop.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== '/';

  return (
    <>
    <ScrollToTop />
      <main>
        {showNavBar && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:id" element={<FilmDetail />} />
          <Route path="/peoples" element={<Peoples />} />
          <Route path="/species" element={<Species />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
