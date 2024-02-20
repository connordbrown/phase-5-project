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
                <ul className='tags'>
                  Tags: {article.tags.map(tag => (
                    <li key={tag.id}>{tag.title}</li>
                  ))}
                </ul>
              </span>
              <p>{article.content.slice(0, 100) + "..."}</p>
            </li>
          </Link>
        ))} 
      </ul>
    </div>
  )
}
  
export default ArticleList;