import React from 'react'
export default function Messages({ messages }: { messages: any }) {
	return (
		<div>
			{messages.map((mess: any, index: any) => (
				<div key={index}>
					<p>{mess.nickname}</p>
					<p>{mess.message}</p>
					<p>{mess.time}</p>
				</div>
			))}
		</div>
	)
}
