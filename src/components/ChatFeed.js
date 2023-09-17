import { useState, useEffect } from 'react'
import ChatInput from './ChatInput'

function ChatFeed() {
  const [cont, setCont] = useState(["one", "two", "three"])
  // const [socket, setSocket] = useState(new WebSocket("ws://localhost:3001/ws"))
  const [sendMsg, setSendMsg] = useState('')

  useEffect(() => {
    console.log("useEffect triggered")
    const socket = new WebSocket("ws://localhost:3001/ws")

    socket.onmessage = (event) => {
      let newCont = cont.concat(event.data)
      setCont(newCont)
      setSendMsg('')
    }

    socket.onopen = (event) => {
      console.log("opened WS: ", socket)
      if (sendMsg) {
        console.log("something to send")
        socket.send(sendMsg)
      }
    }

    return () => {
      console.log("closed WS: ", socket)
      socket.close();
    }
  }, [cont, sendMsg])

  return (
    <div>
      <ChatInput setSendMsg={setSendMsg} />
      {cont.map((msg, idx) => (
        <p key={idx}>{msg}</p>
      ))}
    </div>
  )
}

export default ChatFeed