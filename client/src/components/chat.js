import { React, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import moment from 'moment';
const axios = require('axios');

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [connect, setconnect] = useState([]);
  //messages
  useEffect(() => {
    let eventSource = new EventSource('http://localhost:8080/getMessage');
    eventSource.onmessage = (e) =>
      setMessages((prevMessages) => {
        const messages = JSON.parse(e.data);
        return messages.length ? messages : [...prevMessages, messages];
      });
  }, []);

  function checkWhoSend(user) {
    if (user === props.user) {
      return 'You';
    } else {
      return user;
    }
  }

  //users
  useEffect(() => {
    let eventSource = new EventSource('http://localhost:8080/getusers');
    eventSource.onmessage = (e) =>
      setconnect((prevusers) => {
        const users = JSON.parse(e.data);
        return users.length ? users : [...prevusers, users];
      });
    const connectedArr = connect.filter(function (user) {
      return user.connec <= 1000;
    });
    setconnect(connectedArr);

    console.log(connect);
  });

  const inputChat = useRef();
  const postMessage = async () => {
    let response = await axios.post('http://localhost:8080/newmessage', {
      username: props.user,
      message: inputChat.current.value,
    });
    inputChat.current.value = '';
  };
  const logout = async () => {
    console.log(props.user);
    const response = await axios.get(`http://localhost:8080/logout/${props.user}`);
    console.log(response);
    Cookies.remove('accessToken');
    props.setUser('');
  };
  return (
    <div className='chat-page'>
      <div className='input-message'>
        <input ref={inputChat} type='text' className='input-chat'></input>
        <button type='button' onClick={postMessage}>
          <span>&#10145;&#65039;</span>
        </button>
      </div>
      <div className='contact-list'>
        {connect.map((user) => {
          return <p key={user}>{user.username}</p>;
        })}
      </div>
      <div className='chat' id='chat'>
        {messages.map((message) => {
          return (
            <p key={message}>
              {checkWhoSend(message.username)}:{message.message}
              {moment(message.createdAt).calendar()}
            </p>
          );
        })}
      </div>
      <Link to='/login'>
        <button onClick={logout} type='button'>
          logout
        </button>
      </Link>
    </div>
  );
}

export default Chat;
