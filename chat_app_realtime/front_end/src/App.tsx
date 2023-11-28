import { useEffect, useState } from 'react'
import './App.css'
import io, { Socket } from 'socket.io-client'
import Messages_Input from './Messages_Input'
import Messages from './Messages'
function App() {
	const [socket, setSocket] = useState<Socket>()
	const [messages, setMessages] = useState<string[]>([])
	const send = (value: string) => {
		socket?.emit('text-chat', {
			nickname: 'Pham Ngoc Phong',
			message: value,
		})
	}
	useEffect(() => {
		const newSocket = io('http://localhost:5001')
		setSocket(newSocket)
	}, [setSocket])
	const messageListener = (message: string) => {
		setMessages([...messages, message])
	}
	useEffect(() => {
		socket?.on('text-chat', messageListener)
		return () => {
			socket?.off('text-chat', messageListener)
		}
	}, [messageListener])
	return (
		<>
			<Messages_Input send={send} />
			<Messages messages={messages} />
		</>
	)
}

export default App
