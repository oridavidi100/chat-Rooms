import { React, useRef } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

function Chat(props) {
  const inputChat = useRef();
  const postMassage = async () => {
    console.log(inputChat.current.value);
    let response = await axios.post('http://localhost:8080/newmessage', {
      username: props.user,
      message: inputChat.current.value,
    });
    inputChat.current.value = '';
    console.log(response.data);
  };
  return (
    <div className='chat-page'>
      <div className='input-message'>
        <input ref={inputChat} type='text' className='input-chat'></input>
        <button type='button' onClick={postMassage}>
          <span>&#10145;&#65039;</span>
        </button>
      </div>
      <div className='contact-list'></div>
      <div className='chat'></div>
      <Link to='/login'>
        <button
          onClick={() => {
            props.setUser('');
          }}
        >
          logout
        </button>
      </Link>
    </div>
  );
}

export default Chat;
