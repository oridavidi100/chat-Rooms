import axios from 'axios';
import { React, useRef } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const username = useRef('');
  const email = useRef('');
  const password = useRef('');
  const register = async () => {
    const response = await axios.post('http://localhost:8080/newuser', {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    });
    console.log(response);
  };
  return (
    <form>
      <h3>Sign Up</h3>

      <div className='form-group'>
        <label>user name</label>
        <input type='text' className='form-control' placeholder='username' ref={username} />
      </div>

      <div className='form-group'>
        <label>Email address</label>
        <input type='email' className='form-control' placeholder='Enter email' ref={email} />
      </div>

      <div className='form-group'>
        <label>Password</label>
        <input type='password' className='form-control' placeholder='Enter password' ref={password} />
      </div>

      <button type='button' className='btn btn-primary btn-block' onClick={register}>
        Sign Up
      </button>
      <p className='forgot-password text-right'>
        Already registered <Link to='/login'>log in</Link>?
      </p>
    </form>
  );
}

export default Register;
