import { useState } from 'react';

function ChatInput({ webSocket }) {
  const [message, setMessage] = useState('')

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    webSocket.send(message)
    setMessage('');
  };
  
  const handleKeyPress = (event) => {
    // Check if Enter key (key code 13) is pressed
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        onKeyPress={handleKeyPress} // Add this event listener
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ChatInput