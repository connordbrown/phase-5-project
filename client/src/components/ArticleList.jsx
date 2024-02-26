import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styling/ArticleList.css';

function ArticleList() {

  const [searchItem, setSearchItem] = useState("");
  const articles = useSelector((state) => state.articles.value)

  const articlesToView = articles.filter(article => {
    return article.tags.some(tag => tag.title.includes(searchItem));
  })

  return (
    <div>
      <div id='search-form'>
        <label htmlFor='search'>Filter by tags:</label>
        <form>
          <input
            id='search'
            name='search'
            type='text'
            placeholder='Search by tags'
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}></input>
        </form>
      </div>
      <ul>
        {articlesToView.map(article => (
          <Link to={`/articles/${article.id}`} key={article.id} className='article-link'>
            <li className='article' key={article.id}>
              <span>
                {article.title} - <em>{article.user['username']}</em>
                <span className='tags'>
                  Tags: {article.tags.map(tag => (
                    <span key={tag.id}>| {tag.title} |</span>
                  ))}
                </span>
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