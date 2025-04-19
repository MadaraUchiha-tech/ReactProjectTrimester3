import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Search from './pages/Search';
import MangaDetail from './pages/MangaDetail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/manga/:id" element={<MangaDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
