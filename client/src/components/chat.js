import { React, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies, { get } from 'js-cookie';
import '../App.css';
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
    const users = async () => {
      let response = await axios.get('http://localhost:8080/getusers');
      // if (response.data.length > connect.length) {
      //   for (let user of response.data) {
      //     if (!connect.includes(user) && user.username !== props.user) {
      //       return alert(user.username + 'is connected ');
      //     }
      //   }
      // }
      setconnect(response.data);
      console.log(response);
    };
    users();
  });

  const inputChat = useRef();
  const postMessage = async () => {
    try {
      console.log(Cookies.get('accessToken'));
      let response = await axios.post('http://localhost:8080/newmessage', {
        token: Cookies.get('accessToken'),
        message: inputChat.current.value,
      });
      console.log(response);
      inputChat.current.value = '';
    } catch (err) {
      console.log(err.response.data.error);
    }
  };
  const logout = async () => {
    console.log(props.user);
    const name = props.user;
    props.setUser('');
    const response = await axios.get(`http://localhost:8080/logout/${name}`);
    console.log(response);
    Cookies.remove('accessToken');
  };
  return (
    <div className='chat-page'>
      <div className='input-message'>
        <input ref={inputChat} type='text' className='input-chat'></input>
        <button className='send' type='button' onClick={postMessage}>
          <span>&#10145;&#65039;</span>
        </button>
      </div>
      <div className='contact-list'>
        participants:
        {connect.map((user) => {
          return <p key={user.username + Math.random()}>{user.username}</p>;
        })}
      </div>
      <div className='chat' id='chat'>
        {messages.map((message) => {
          return (
            <div className='chatContainer' key={message.message + Math.random()}>
              <p className={message.username === props.user ? 'myMessage' : 'message'}>
                {checkWhoSend(message.username)} : <br /> {message.message}
              </p>
              <p className='time'>{moment(message.createdAt).calendar()}</p>
            </div>
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
