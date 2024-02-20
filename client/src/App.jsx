import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from './slices/currentUserSlice';
import { setIsLoggedIn } from './slices/isLoggedInSlice';
import { setUsers } from './slices/usersSlice';
import { useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  // access Redux store
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  const currentUser = useSelector((state) => state.currentUser.value);
  const dispatch = useDispatch();

  // enable programmatic navigation
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/users")
    .then(response => {
      if (response.ok) {
        response.json().then(users => dispatch(setUsers(users)));
      } else {
        response.json().then(err => console.error(err.error));
      }
    })
  }, [])

  useEffect(() => {
    fetch("/api/check_session")
    .then(response => {
      if (response.ok) {
        response.json().then(user => {
          dispatch(setCurrentUser(user));
          dispatch(setIsLoggedIn(true));
        })
      } else {
        response.json().then(err => console.error(err.error));
      }
    })
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [isLoggedIn])

  return (
    <div className='app'>
      <header>
        {isLoggedIn ? <NavBar /> : null}
      </header>
        {isLoggedIn ? <h2>Welcome, {currentUser.username}!</h2> : null}
      <Outlet />
    </div>
  )
}

export default App;
