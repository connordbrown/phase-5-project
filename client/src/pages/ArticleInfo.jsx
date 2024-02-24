import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { setSelectedArticle } from "../slices/articleSelectSlice";
import { deleteArticle } from "../slices/articlesSlice";
import '../components/styling/ArticleList.css';
import ArticleUpdateForm from "../components/ArticleUpdateForm";
import '../components/styling/ArticleInfo.css';


function ArticleInfo() {
  // access Redux store
  const articlesLoaded = useSelector((state) => state.articlesLoaded.value);
  const articles = useSelector((state) => state.articles.value);
  const currentUser = useSelector((state) => state.currentUser.value);
  const dispatch = useDispatch();
  // for programmatic naviagation
  const navigate = useNavigate();

  // for updating article
  const [updatingArticle, setUpdatingArticle] = useState(false);

  // get specific endpoint - useParams() returns string
  const params = useParams();

  const displayArticle = articles.find(article => {
    return article.id === parseInt(params.id);
  });

  useEffect(() => {
    dispatch(setSelectedArticle(displayArticle));
  }, [])

  function handleArticleDelete(articleID) {
    fetch(`/api/articles/${articleID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        dispatch(deleteArticle(articleID));
        navigate('/');
      } else {
        response.json().then(err => console.log(err.error));
      }
    })
  }

  if (!articlesLoaded) {
    return <h1>Loading articles...</h1>;
  }

  return (
    <div>
      <div className='display-article'>
        <h2>{displayArticle.title} - [category: {displayArticle.category.title}]</h2>
        <span>by {displayArticle.user.username} - {displayArticle.timestamp}</span>
        <p>{displayArticle.content}</p>
      </div>
      {currentUser && currentUser.username === displayArticle.user.username ? 
        <div>
          <button className='edit' onClick={() => setUpdatingArticle(!updatingArticle)}>{updatingArticle ? "Hide form" : "Edit article"}</button>
          <button className='delete' onClick={() => handleArticleDelete(displayArticle.id)}>Delete article</button>
        </div>
      : null }
      {updatingArticle ? <ArticleUpdateForm /> : null}
    </div>

  )
}

export default ArticleInfo;