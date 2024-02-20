import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {

  const articles = useSelector((state) => state.articles.value)

  return (
    <div>
      <h2>Articles</h2>
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
  
export default Home;