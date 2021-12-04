import axios from 'axios';
import { React, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [err, seterr] = useState();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const register = async () => {
    if (!username.current.value || !email.current.value || !password.current.value) {
      return seterr('you missed somthing');
    }
    try {
      const response = await axios.post('http://localhost:8080/newuser', {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err.response.data.error);
      seterr(err.response.data.error);
    }
  };

  return (
    <form className='sign-Up'>
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
      <p className='error'>{<span>{err}</span>}</p>
    </form>
  );
}

export default Register;
