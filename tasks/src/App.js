import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { MoviePage } from './pages/MoviePage';






function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
