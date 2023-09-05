import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

function App() {
  return (
    <Routes>
      <Route path='signup' element={<SignUp />} />;
      <Route path='login' element={<Login />} />;
      <Route path='/' element={<Home />} />;
    </Routes>
  );
}

export default App;
