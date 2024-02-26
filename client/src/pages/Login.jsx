import React, { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import './styling/Login.css';


function Login() {
  const [newSignUp, setNewSignUp] = useState(false);

  function switchFunction() {
    setNewSignUp(!newSignUp);
  }

  return (
    <div>
      {newSignUp ? <h1>Sign Up</h1> : <h1>Log In</h1>}
      {newSignUp ? <SignUpForm /> : <LoginForm />}
      {newSignUp ? <p onClick={() => switchFunction()}>Return to login</p> 
                 : <p onClick={() => switchFunction()}>Not a user? Click here to sign up!</p>}
    </div>
  )
}
  
export default Login;