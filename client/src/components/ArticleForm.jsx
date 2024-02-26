
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addArticle } from '../slices/articlesSlice';
// for form creation
import { useFormik } from 'formik';
import * as yup from 'yup';
// styling
import './styling/ArticleForm.css';

// allows logged in user to create an article
function ArticleForm() {
    // access Redux store
    const categories = useSelector((state) => state.categories.value);
    const allTags = useSelector((state) => state.tags.value);
    const dispatch = useDispatch();
    
    // for programmatic navigation
    const navigate = useNavigate();
    
    // articleError state
    const [articleError, setArticleError] = useState("");

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title").max(50),
        content: yup.string().required("Must enter content"),
        category: yup.string().required("Must select category"),
        tags: yup.array().of(yup.string()).test('has-tags',"Must select tags", (value) => value && value.length > 0),
    })

    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            category: "",
            tag: "",
            tags: [],
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("/api/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    title: values.title,
                    content: values.content,
                    category_id: values.category,
                    tags: values.tags
                }, null, 2)
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(article => {
                    dispatch(addArticle(article));
                    setArticleError("");
                    navigate(`/articles/${article.id}`)
                })
                } else {
                    response.json().then(err => {
                        console.error(err.error);
                        setArticleError(err.error);
                    });
                }
            })
            resetForm();    
        }   
    })

    // for display on form
    const tagIds = formik.values.tags.map(tag => parseInt(tag));
    const selectedTags = allTags.filter(tag => tagIds.includes(tag.id));

    return (
        <div>
            {articleError ? <p style={{'color' : 'red'}}>{articleError}</p> : null}
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
                        <p className='error'>{formik.errors.title}</p>
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
                        <p className='error'>{formik.errors.content}</p>
                    </div>
                    <div className='form-inputs'>
                        <br />
                        <select id='category' name='category' value={formik.values.category} onChange={formik.handleChange}>
                            <option value=''>Select a category</option>
                            {categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
                        </select>
                        <p className='error'>{formik.errors.category}</p>
                    </div>
                    <div className='form-inputs'>
                        <select id='tag' name='tag' value={formik.values.tag} onChange={formik.handleChange}>
                            <option value=''>Select a tag</option>
                            {allTags.map(tag => <option key={tag.id} value={tag.id}>{tag.title}</option>)}
                        </select>
                        <button type='button' onClick={() => {
                            formik.values.tags = [...formik.values.tags, formik.values.tag];
                            formik.setFieldValue('tag', "");
                            if (formik.errors.tags) {
                                formik.setFieldError('tags', ""); // reset tags field error message
                            } 
                            }}>Add</button>
                        <p className='error'>{formik.errors.tags}</p>           
                    </div>
                    <div id='tag-list'>
                        <ul>
                            {selectedTags ? selectedTags.map(tag => <li key={tag.id}>{tag.title}</li>) : null}
                        </ul>
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