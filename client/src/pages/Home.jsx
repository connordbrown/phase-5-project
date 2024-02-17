import React from 'react';
import { useSelector } from 'react-redux';
import Logout from '../components/Logout';


function Home() {

  const currentUser = useSelector((state) => state.currentUser.value);

  return (
    <div>
      {currentUser ? <h2>Welcome home, {currentUser.username}!</h2> : null}
      <Logout />
    </div>
  )
}
  
export default Home;