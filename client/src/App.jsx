import React from 'react';
import { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';


function App() {
  // access Redux store
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/login')
    }
  }, [isLoggedIn])

  return (
    <div>
      {/* <header>
        <NavBar />
      </header> */}
      <Outlet />
    </div>
  )
}

export default App;
