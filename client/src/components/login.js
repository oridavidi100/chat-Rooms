import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import Cookies from 'js-cookie';
const axios = require('axios');

require('dotenv').config();

function Login(props) {
  const [error, seterror] = useState('');
  const username = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const login = async () => {
    try {
      props.setUser(username.current.value);
      console.log(password.current.value, username.current.value);
      let response = await axios.get(`http://localhost:8080/login/${password.current.value}/${username.current.value}`);
      if ((response.data.ans = 'yes')) {
        Cookies.set('accessToken', response.data.accessToken);
        console.log(response.data);
        navigate('/chat');
      }
    } catch (err) {
      console.log(err.response.data);
      seterror(err.response.data.error);
    }
  };
  return (
    <div id='id01' className='login'>
      <form className='modal-content animate' action='/action_page.php' method='post'>
        <div className='imgcontainer'></div>
        <div className='container'>
          <label htmlFor='uname'>
            <b>Username</b>
          </label>
          <input type='text' ref={username} placeholder='Enter Username' name='uname' required />
          <label htmlFor='psw'>
            <b>Password</b>
          </label>
          <input type='password' ref={password} placeholder='Enter Password' name='psw' required />
          {/* <Link to='/'> */}
          <button type='button' onClick={login}>
            Login
          </button>
          {/* </Link> */}
        </div>
        <div className='container' style={{ backgroundColor: '#f1f1f1' }}></div>
        <p className='need-To-Sign-Up'>
          need to <Link to='/register'>sign up </Link>?
        </p>
        <p>{error}</p>
      </form>
    </div>
  );
}

export default Login;
