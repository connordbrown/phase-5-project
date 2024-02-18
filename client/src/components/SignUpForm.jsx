import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../slices/usersSlice';
// for form creation
import { useFormik } from 'formik';
import * as yup from 'yup';
// styling
import './styling/SignUpForm.css';

// allows user to sign up for app (create new user)
function SignUpForm() {
    // userSuccess state
    const [userSuccess, setUserSuccess] = useState("");
    // userError state
    const [userError, setUserError] = useState("");
    
    // access Redux store
    const users = useSelector((state) => state.users.value)
    const dispatch = useDispatch();

    // success message in response disappears after time interval
    setTimeout(() => {
        setUserSuccess("");
    }, 5000);

    // error message in response disappears after time interval
    setTimeout(() => {
        setUserError("");
    }, 5000);

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username").max(15)
        .test("username-exists", "Username already exists", value => {
            return !users.some(user => user.username === value);
        }),
        age: yup.number().positive().integer().required("Must enter an age").typeError("Please enter an integer").max(125),
        email: yup.string().email("Invalid email").required("Must enter an email"),
        password: yup.string().required("Must enter a password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            age: "",
            email: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(newUser => {
                        dispatch(addUser(newUser));
                        setUserSuccess("201: Signup successful")
                    });
                } else {
                    response.json().then(err => console.error(err.error));
                }
            })
            resetForm();
        }   
    })

    return (
        <div>
            <h2>Sign In</h2>
            {userSuccess ? <p style={{'color' : 'green'}}>{userSuccess}</p> : null}
            {userError ? <p style={{'color' : 'red'}}>{userError}</p> : null}
            <div className='form-container'>
                <form id='signup-form' onSubmit={formik.handleSubmit}>
                <label htmlFor='username'>New User Sign Up:</label>
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
                            id='age'
                            name='age'
                            type='text'
                            placeholder='user age'
                            onChange={formik.handleChange}
                            value={formik.values.age}
                            autoComplete='on'
                        />
                        <p>{formik.errors.age}</p>
                    </div>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='email'
                            name='email'
                            type='text'
                            placeholder='user email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            autoComplete='on'
                        />
                        <p>{formik.errors.email}</p>
                    </div>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='password'
                            name='password'
                            type='password'
                            placeholder='user password'
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

export default SignUpForm;