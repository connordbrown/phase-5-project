import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styling/UserProfile.css';

function UserProfile() {

  const currentUser = useSelector((state) => state.currentUser.value);
  const articles = useSelector((state) => state.articles.value);
  const articlesLoaded = useSelector((state) => state.articlesLoaded.value);

  const userArticles = articles.filter(article => {
    return article.user_id === currentUser.id;
  })

  if (!articlesLoaded) {
    return <h2>Loading...</h2>;
  }

  return(
    <div>
      <h2>User Profile</h2>
      <div className='user-info'>
        <h3>{currentUser.username}</h3>
        <p>Email: {currentUser.email}</p>
        <p>Age: {currentUser.age}</p>
      </div>
      <hr />
      <div className='article-list'>
        <h3>My articles</h3>
        <ul>
          {userArticles.map(article => {
            return (
              <div key={article.id}>
                <Link to={`/articles/${article.id}`} className='article-link'>
                  <li key={article.id} className='article'>{article.title}</li>
                </Link>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;