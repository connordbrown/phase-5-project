import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
//import NavBar from '../components/NavBar';


function Home() {

  const currentUser = useSelector((state) => state.currentUser.value);

  return (
    <div>
      {currentUser ? <h2>Welcome home, {currentUser.username}!</h2> : null}
      <Outlet />
    </div>
  )
}
  
export default Home;