
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// for form creation
import { useFormik } from 'formik';
import * as yup from 'yup';
// styling
import './styling/ArticleForm.css';

// allows logged in user to create a post
function ArticleForm( { onPost }) {
    // access Redux store
    const categories = useSelector((state) => state.categories.value);
    
    // postError state
    const [postError, setPostError] = useState("");

    // error message in response disappears after time interval
    setTimeout(() => {
        setPostError("");
    }, 5000);

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title").max(50),
        content: yup.string().required("Must enter content"),
        category: yup.string().required("Must select category"),
    })

    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            category: "",
            tags: [],
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("/api/categories/<int:category_id>/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(post => onPost(post));
                } else {
                    response.json().then(err => setPostError(err.error));
                }
            })
            resetForm();    
        }   
    })

    // title = request.json.get('title')
    // content = request.json.get('content')
    // # id from logged in user
    // user_id = session.get('user_id')
    // # ensure correct category_id value by reassigning to current view_arg
    // category_id = request.view_args.get('category_id')
    // # list of tags
    // tags = session.get('tags')

    return (
        <div>
            {postError ? <p style={{'color' : 'red'}}>{postError}</p> : null}
            <div className='form-container'>
                <form id='article-form' onSubmit={formik.handleSubmit}>
                <label htmlFor='title'>Create an Article:</label>
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
                        <input
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
                    <div className='form-inputs'>
                        <br />
                        <select
                            id='category'
                            name='category'
                            value={formik.values.category}
                            onChange={formik.handleChange}
                        >
                            <option value=''>Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                        <p>{formik.errors.category}</p>
                    </div>
                    <div id='button'>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ArticleForm;