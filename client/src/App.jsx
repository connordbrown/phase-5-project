import React from 'react';
import { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from './slices/currentUserSlice';
import { setIsLoggedIn } from './slices/isLoggedInSlice';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  // access Redux store
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  const dispatch = useDispatch();

  // enable programmatic navigation
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/check_session")
    .then(response => {
      if (response.ok) {
        response.json().then(user => {
          dispatch(setCurrentUser(user));
          dispatch(setIsLoggedIn(true))
        })
      } else {
        response.json().then(err => console.error(err.error))
      }
    })
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/login')
    }
  }, [isLoggedIn])

  return (
    <div className='app'>
      <Outlet />
    </div>
  )
}

export default App;
