import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import Search from './pages/Search';
import MangaDetail from './pages/MangaDetail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <FavoritesProvider>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            <Navigation />
            <ThemeToggle />
            <div className="flex-1 bg-white dark:bg-gray-900">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/manga/:id" element={<MangaDetail />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </div>
          </div>
        </FavoritesProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
