import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from './slices/usersSlice';
import { setCurrentUser } from './slices/currentUserSlice';
import { setIsLoggedIn } from './slices/isLoggedInSlice';
import { setArticles } from './slices/articlesSlice';
import { setArticlesLoaded } from './slices/articlesLoadedSlice';
import { setCategories } from './slices/categoriesSlice';
import { setTags } from './slices/tagsSlice';
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

  useEffect(() => {
    fetch("/api/articles")
    .then(response => {
      if (response.ok) {
        response.json().then(articles => {
          dispatch(setArticles(articles));
          dispatch(setArticlesLoaded(true));
        });
      } else {
        response.json().then(err => console.err(err.error));
      }
    })
  }, [])

  useEffect(() => {
    fetch("/api/categories")
    .then(response => {
      if (response.ok) {
        response.json().then(categories => dispatch(setCategories(categories)));
      } else {
        response.json().then(err => console.error(err.error));
      }
    })
  }, [])

  useEffect(() => {
    fetch("/api/tags")
    .then(response => {
      if (response.ok) {
        response.json().then(tags => dispatch(setTags(tags)));
      } else {
        response.json().then(err => console.error(err.error));
      }
    })
  }, [])

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
