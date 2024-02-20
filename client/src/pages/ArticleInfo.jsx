import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import '../components/styling/ArticleList.css';

function ArticleInfo() {
  // access Redux store
  const articlesLoaded = useSelector((state) => state.articlesLoaded.value);
  const articles = useSelector((state) => state.articles.value);

  // get specific endpoint - useParams() returns string
  const params = useParams();

  const displayArticle = articles.find(article => {
    return article.id === parseInt(params.id);
  });

  if (!articlesLoaded) {
    return <h1>Loading articles...</h1>;
  }

  return (
    <div className='display-article'>
      <h2>{displayArticle.title}</h2>
      <span>by {displayArticle.user.username} - {displayArticle.timestamp}</span>
      <p>{displayArticle.content}</p>
    </div>
  )
}

export default ArticleInfo;