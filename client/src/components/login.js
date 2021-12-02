import { Link } from 'react-router-dom';
import React from 'react';

function Login() {
  return (
    <div id='id01' className='modal'>
      <form className='modal-content animate' action='/action_page.php' method='post'>
        <div className='imgcontainer'>
          {/* <span onclick="document.getElementById('id01').style.display='none'" className='close' title='Close Modal'>
            ×
          </span> */}
          {/* <img src='img_avatar2.png' alt='Avatar' className='avatar' /> */}
        </div>
        <div className='container'>
          <label htmlFor='uname'>
            <b>Username</b>
          </label>
          <input type='text' placeholder='Enter Username' name='uname' required />
          <label htmlFor='psw'>
            <b>Password</b>
          </label>
          <input type='password' placeholder='Enter Password' name='psw' required />
          <Link to='/'>
            <button type='submmit'>Login</button>
          </Link>
        </div>
        <div className='container' style={{ backgroundColor: '#f1f1f1' }}></div>
      </form>
    </div>
  );
}

export default Login;
