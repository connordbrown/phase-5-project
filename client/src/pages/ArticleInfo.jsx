import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

function ArticleInfo() {

  // get specific endpoint - useParams() returns string
  const params = useParams();

  // access Redux store
  const articles = useSelector((state) => state.articles.value);

  const displayArticle = articles.find(article => {
    return article.id === parseInt(params.id);
  });

  return (
    <div>
    <h2>{displayArticle.title}</h2>
    <span>by {displayArticle.user.username} - {displayArticle.timestamp}</span>
    <p>{displayArticle.content}</p>
    </div>
  )
}

export default ArticleInfo;