import { useState } from 'react';

function ChatInput({ setSendMsg }) {
  const [message, setMessage] = useState('')

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    setSendMsg(message)
    setMessage('');
  };

  return (
    <div>
      <input type="text" value={message} onChange={handleMessageChange} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ChatInput