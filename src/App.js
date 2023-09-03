import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <Routes>
      <Route path='signup' element={<SignUp />} />;
    </Routes>
  );
}

export default App;
