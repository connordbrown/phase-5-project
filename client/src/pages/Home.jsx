import React from 'react';
import ArticleList from '../components/ArticleList';

// allow user to view articles list
function Home() {

  return (
    <div>
      <h2>Articles</h2>
      <ArticleList />
    </div>
  )
}
  
export default Home;