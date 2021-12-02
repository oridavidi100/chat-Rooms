import { React, useRef } from 'react';

function Chat() {
  const inputChat = useRef();
  return (
    <div className='chat-page'>
      <div className='input-message'>
        <input ref={inputChat} type='text' className='input-chat'></input>
        <button
          type='button'
          onClick={() => {
            console.log(inputChat.current.value);
            inputChat.current.value = '';
          }}
        >
          <span>&#10145;&#65039;</span>
        </button>
      </div>
      <div className='contact-list'></div>
      <div className='chat'></div>
    </div>
  );
}

export default Chat;
