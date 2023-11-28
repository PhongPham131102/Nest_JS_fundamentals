import React, { useState } from 'react'
export default function Messages_Input({
	send,
}: {
	send: (val: string) => void
}) {
	const [value, setValue] = useState('')
	return (
		<>
			<input
				onChange={(e) => setValue(e.target.value)}
				placeholder="type your message..."
				value={value}
			/>
			<button
				onClick={() => {
					send(value)
				}}
			>
				Send
			</button>
		</>
	)
}
