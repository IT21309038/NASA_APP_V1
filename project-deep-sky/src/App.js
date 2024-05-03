import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import NaviBar from './navibar';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<NaviBar/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
