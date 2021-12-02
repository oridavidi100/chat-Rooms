import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
const axios = require('axios');

function Login(props) {
  const [error, seterror] = useState('');
  const username = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const login = async () => {
    try {
      props.setUser(username.current.value);
      console.log(password.current.value);
      let response = await axios.get(`http://localhost:8080/login/${password.current.value}/${username.current.value}`);
      if ((response.dataa = 'yes')) {
        navigate('/chat');
      }
    } catch (err) {
      console.log(err);
      seterror('user not found');
    }
  };
  return (
    <div id='id01' className='modal'>
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
        <p>{error}</p>
      </form>
    </div>
  );
}

export default Login;
