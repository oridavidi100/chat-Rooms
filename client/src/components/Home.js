import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='homePage'>
      <p>Home</p>
      <h2>wellcome to chat app</h2>
      <Link to='/chat'>to chat</Link>
    </div>
  );
}

export default Home;
