import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { React, useState } from 'react';
import Login from './components/login';
import Chat from './components/chat';
import Home from './components/Home';
import './App.css';
import Register from './components/register';
function App(props) {
  const [user, setUser] = useState('');

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/chat' element={<Chat setUser={setUser} user={user} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
