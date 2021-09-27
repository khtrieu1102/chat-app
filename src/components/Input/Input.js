import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => (
	// <form className="form">
	<form>
		<input
			className="input"
			type="text"
			placeholder="Type a message..."
			value={message}
			onChange={(event) => setMessage(event.target.value)}
			onKeyPress={(event) => {
				if (event.key === "Enter") {
					event.preventDefault();
					sendMessage(event);
				}
			}}
		/>
		<button
			type="button"
			className="sendButton"
			onClick={(event) => {
				event.preventDefault();
				sendMessage(event);
			}}
		>
			Send
		</button>
	</form>
	// </form>
);

export default Input;
