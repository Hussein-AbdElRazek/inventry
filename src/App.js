import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import AuthContext from './store/auth-context';
import Navbar from './components/navbar/Navbar';
import Profile from './pages/Profile/Profile';
function App()
{
  const authCtx = useContext(AuthContext);
  return (
    <>
      {authCtx.isLoggedIn && (
        <Navbar />
      )}
      <Routes>
        {authCtx.isLoggedIn && (
          <>
            <Route path='profile' element={<Profile />} />;
            <Route path='/*' element={<Home />} />;
          </>
        )}
        {!authCtx.isLoggedIn && (
          <>
            <Route path='signup' element={<SignUp />} />;
            <Route path='login' element={<Login />} />;
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
          </>
        )}

      </Routes>
    </>

  );
}

export default App;
