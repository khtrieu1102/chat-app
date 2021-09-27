import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = ({ location }) => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const ENDPOINT = "localhost:5000";

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);

		socket = io(ENDPOINT);

		setName(name);
		setRoom(room);

		socket.emit("join", { name, room }, ({ error }) => {
			console.log(error);
			if (error) {
				alert(error);
			}
		});

		return () => {
			socket.on("disconnect");
			socket.off();
		};
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages((messages) => [...messages, message]);
		});
	}, []);

	useEffect(() => {
		// socket.on("message", (message) => {
		// 	setMessages([...messages, message]);
		// });
		// socket.on("roomData", ({ room, users }) => {
		// 	console.log(`users in this room '${room}: ${users}`);
		// });
		socket.on("roomData", ({ room, users }) => {
			setUsers([...users]);
		});
	}, [users]);

	const sendMessage = (event) => {
		// event.prevenDefault();
		if (message) {
			console.log(`message is sending from: ${name}..`);
			socket.emit("sendMessage", message, () => setMessage(""));
		}
	};

	console.log(message, messages, users, typeof messages, typeof users);

	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</div>
			<TextContainer users={users} />
		</div>
	);
};

export default Chat;
