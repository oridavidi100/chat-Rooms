import { Link } from 'react-router-dom';
import React, { useRef } from 'react';

function Login() {
  const username = useRef();
  const password = useRef();
  const login = () => {
    console.log(username.current.value, password.current.value);
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
      </form>
    </div>
  );
}

export default Login;
