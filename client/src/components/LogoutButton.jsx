import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../slices/currentUserSlice';
import { setIsLoggedIn } from '../slices/isLoggedInSlice';
// styling
import './styling/Logout.css';

// allow user to log out
function LogoutButton() {
    // access Redux store
    const dispatch = useDispatch();

    // logoutError state
    const [logoutError, setLogoutError] = useState("");

    function submitLogoutRequest() {
        fetch("/api/logout", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                dispatch(setCurrentUser(null));
                dispatch(setIsLoggedIn(false));
                setLogoutError("");
            } else {
                response.json().then(err => setLogoutError(err.error));
            }
        })
    }

    return (
        <div>
            {logoutError ? <p style={{'color' : 'red'}}>{logoutError}</p> : null}
            <div className='button-container'>
                <label id='logout-label' htmlFor='logout'>User Logout:</label>
                <button id='logout' onClick={submitLogoutRequest}>Logout</button>
            </div>
        </div>
    )
}

export default LogoutButton;