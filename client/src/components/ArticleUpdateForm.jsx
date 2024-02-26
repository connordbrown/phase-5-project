
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateArticle } from '../slices/articlesSlice';
// for form creation
import { useFormik } from 'formik';
import * as yup from 'yup';
// styling
import './styling/ArticleUpdateForm.css';

// allow logged in user to update an article
function ArticleUpdateForm() {
    // access Redux store
    const selectedArticle = useSelector((state) => state.selectedArticle.value);
    const dispatch = useDispatch();

    // articleError state
    const [updateError, setUpdateError] = useState("");

    // form validation
    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title").max(50),
        content: yup.string().required("Must enter content"),
    })

    // handle article update and update state
    const formik = useFormik({
        initialValues: {
            title: selectedArticle.title,
            content: selectedArticle.content,
        },
        enableReinitialize: true, // clear form when props change
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch(`/api/articles/${selectedArticle.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    title: values.title,
                    content: values.content,
                }, null, 2)
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(article => dispatch(updateArticle(article)));
                    setUpdateError("");
                } else {
                    response.json().then(err => {
                        console.error(err.error);
                        setUpdateError(err.error);
                    });
                }
            })
            resetForm();    
        }   
    })

    return (
        <div>
            {updateError ? <p style={{'color' : 'red'}}>{updateError}</p> : null}
            <div className='form-container'>
                <form id='article-form' onSubmit={formik.handleSubmit}>
                <label htmlFor='title'>Update an Article:</label>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='title'
                            name='title'
                            type='text'
                            placeholder='title'
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            autoComplete='on'
                        />
                        <p>{formik.errors.title}</p>
                    </div>
                    <div className='form-inputs'>
                        <br />
                        <textarea
                            id='content'
                            name='content'
                            type='text'
                            placeholder='content'
                            onChange={formik.handleChange}
                            value={formik.values.content}
                            autoComplete='off'
                        />
                        <p>{formik.errors.content}</p>
                    </div>
                    <div id='button'>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ArticleUpdateForm;