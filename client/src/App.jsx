import React from 'react';
import { useState } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <Outlet />
    </div>
  )
}

export default App;
