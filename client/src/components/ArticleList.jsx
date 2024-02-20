import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styling/ArticleList.css';

function ArticleList() {

  const articles = useSelector((state) => state.articles.value)

  return (
    <div>
      <ul>
        {articles.map(article => (
          <Link to={`/articles/${article.id}`} key={article.id} className='article-link'>
            <li className='article' key={article.id}>
              <span>
                {article.title} - <em>{article.user['username']}</em>
              </span>
            </li>
          </Link>
        ))} 
      </ul>
    </div>
  )
}
  
export default ArticleList;