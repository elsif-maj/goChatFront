import { useState, useEffect } from 'react'
import ChatInput from './ChatInput'
import ChatMsgDisplay from './ChatMsgDisplay'

function ChatFeed() {
  const [webSocket, setWebSocket] = useState(null)
  const [cont, setCont] = useState(["Could not load from DB"])

  useEffect(() => {
    console.log("useEffect triggered")

    const getContent = async () => {
      const response = await fetch("http://localhost:3001/api/msgs")
      const responseObj = await response.json()
      setCont(responseObj)
      console.log("async getContent completed with setCont to responseObj: ", responseObj)
    }
    getContent()

    // Web Sockets

    const socket = new WebSocket("ws://localhost:3001/ws")

    socket.onmessage = (event) => {
      console.log("received to WS: ", event.data)
      setCont((cont) => [...cont, { Msg: event.data }])
      console.log("socket.onmessage triggered with setCont to update cont array with new message")
    }

    socket.onopen = (event) => {
      console.log("opened WS: ", socket)
    }

    setWebSocket(socket)
    console.log("webSocket state variable set with setWebSocket to: ", socket)

    // return () => {
    //   console.log("closed WS: ", socket)
    //   socket.close();
    // }
  }, [])

  console.log("Rendering ChatFeed with: ", cont)
  return (
    <div>
      <ChatMsgDisplay cont={cont} />
      <ChatInput webSocket={webSocket} />
      {/* <div>
        {
          cont.map((msg, idx) => (
            // <p key={idx}>{msg.Msg}</p>
            <p key={idx}>{msg.Msg}</p>
          ))
        }
      </div> */}
    </div>
  )
}

export default ChatFeed