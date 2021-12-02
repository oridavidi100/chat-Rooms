import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { React } from 'react';
import Login from './components/login';
import Chat from './components/chat';
import Home from './components/Home';
import './App.css';
function app(props) {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default app;
