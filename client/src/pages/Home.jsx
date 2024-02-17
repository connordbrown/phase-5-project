import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';


function Home() {

  const currentUser = useSelector((state) => state.currentUser.value);

  return (
    <div>
      <header>
        <NavBar />
      </header>
      {currentUser ? <h2>Welcome home, {currentUser.username}!</h2> : null}
      <Outlet />
    </div>
  )
}
  
export default Home;