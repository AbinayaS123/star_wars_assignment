import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './components/CharacterList/CharacterList';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/"  element={<CharacterList/>} />
        <Route path="/characters/:index" element={<CharacterDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
