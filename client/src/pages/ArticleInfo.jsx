import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

function ArticleInfo() {
  // access Redux store
  const articlesLoaded = useSelector((state) => state.articlesLoaded.value);

  // get specific endpoint - useParams() returns string
  const params = useParams();

  // access Redux store
  const articles = useSelector((state) => state.articles.value);

  const displayArticle = articles.find(article => {
    return article.id === parseInt(params.id);
  });

  if (!articlesLoaded) {
    return <h1>Loading articles...</h1>;
  }

  return (
    <div>
    <h2>{displayArticle.title}</h2>
    <span>by {displayArticle.user.username} - {displayArticle.timestamp}</span>
    <p>{displayArticle.content}</p>
    </div>
  )
}

export default ArticleInfo;