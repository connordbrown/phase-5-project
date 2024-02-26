import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../slices/currentUserSlice';
import { setIsLoggedIn } from '../slices/isLoggedInSlice';
// for form creation
import { useFormik } from 'formik';
import * as yup from 'yup';
// styling
import './styling/LoginForm.css';

// allow user to log in
function LoginForm() {
    // access Redux store
    const users = useSelector((state) => state.users.value);
    const dispatch = useDispatch();
    
    // loginError state
    const [loginError, setLoginError] = useState("");

    // form validation
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username").max(15)
        .test("username-exists", "Invalid username", value => {
            return users.some(user => user.username === value);
        }),
        password: yup.string().required("Must enter a password")
    })

    // handle login and update state
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(user => {
                        dispatch(setCurrentUser(user));
                        dispatch(setIsLoggedIn(true));
                        setLoginError("");
                    });
                } else {
                    response.json().then(err => {
                        console.error(err.error);
                        setLoginError(err.error);
                    }) 
                }
            })
            resetForm();       
        }   
    })

    return (
        <div>
            {loginError ? <p style={{'color' : 'red'}}>{loginError}</p> : null}
            <div className='form-container'>
                <form id='login-form' onSubmit={formik.handleSubmit}>
                <label htmlFor='username'>User Login:</label>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='username'
                            name='username'
                            type='text'
                            placeholder='username'
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            autoComplete='on'
                        />
                        <p>{formik.errors.username}</p>
                    </div>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='password'
                            name='password'
                            type='password'
                            placeholder='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            autoComplete='off'
                        />
                        <p>{formik.errors.password}</p>
                    </div>
                    <div id='button'>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;