import { useEffect, useRef } from 'react';
import '../styles/ChatMsgDisplay.css' 

function ChatMsgDisplay({ cont }) {
  const chatLogRef = useRef(null)

  useEffect(() => {
    chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
  });

  console.log("CHATMSGDISPLAY rerendered: ", cont)
  
  return (
    <div className="chat-log-container" ref={chatLogRef}>
    {
      cont.map((msg, idx) => (
        <p className="chat-message" key={idx}>{msg.Msg}</p>
      ))
    }
    </div> 
  )
}

export default ChatMsgDisplay