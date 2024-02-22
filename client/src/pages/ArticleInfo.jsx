import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { setSelectedArticle } from "../slices/articleSelectSlice";
import '../components/styling/ArticleList.css';
import ArticleUpdateForm from "../components/ArticleUpdateForm";

function ArticleInfo() {
  // access Redux store
  const articlesLoaded = useSelector((state) => state.articlesLoaded.value);
  const articles = useSelector((state) => state.articles.value);
  const dispatch = useDispatch();

  // for updating article
  const [updatingArticle, setUpdatingArticle] = useState(false);

  // get specific endpoint - useParams() returns string
  const params = useParams();

  const displayArticle = articles.find(article => {
    return article.id === parseInt(params.id);
  });

  dispatch(setSelectedArticle(displayArticle));

  if (!articlesLoaded) {
    return <h1>Loading articles...</h1>;
  }

  return (
    <div>
      <div className='display-article'>
        <h2>{displayArticle.title}</h2>
        <span>by {displayArticle.user.username} - {displayArticle.timestamp}</span>
        <p>{displayArticle.content}</p>
      </div>
      <button onClick={() => setUpdatingArticle(!updatingArticle)}>{updatingArticle ? "Hide article" : "Edit article"}</button>
      {updatingArticle ? <ArticleUpdateForm /> : null}
    </div>

  )
}

export default ArticleInfo;