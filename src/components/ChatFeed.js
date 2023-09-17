import { useState, useEffect } from 'react'
import ChatInput from './ChatInput'

function ChatFeed() {
  const [cont, setCont] = useState(["one", "two", "three"])
  const [webSocket, setWebSocket] = useState(null)

  useEffect(() => {
    console.log("useEffect triggered")
    const socket = new WebSocket("ws://localhost:3001/ws")

    socket.onmessage = (event) => {
      console.log("received to WS: ", event.data)
      setCont((cont) => [...cont, event.data])
    }

    socket.onopen = (event) => {
      console.log("opened WS: ", socket)
    }

    setWebSocket(socket)

    return () => {
      console.log("closed WS: ", socket)
      socket.close();
    }
  }, [])

  return (
    <div>
      <ChatInput webSocket={webSocket} />
      {cont.map((msg, idx) => (
        <p key={idx}>{msg}</p>
      ))}
    </div>
  )
}

export default ChatFeed