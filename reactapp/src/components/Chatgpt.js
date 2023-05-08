import "./Chatgpt.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Chatgpt() {
	const bottomRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [userInput, setUserInput] = useState("");
	const [gptReply, setGptReply] = useState("");
	const [messageHistory, setMessageHistory] = useState([]);

	const testHistory = [
		{
			id: crypto.randomUUID(),
			role: "user",
			content: "This is User msg.",
			timeStamp: "11:26:14",
		},
		{
			id: crypto.randomUUID(),
			role: "assistant",
			content: "This is CHATGPT msg.",
			timeStamp: "11:26:45",
		},
	];

	//Update message history with gpt reply.
	useEffect(() => {
		//console.log("useEffect Called");
		var today = new Date();
		if (gptReply.length >= 1) {
			messageHistory.push({
				id: crypto.randomUUID(),
				role: "assistant",
				content: gptReply,
				timeStamp:
					today.getHours() +
					":" +
					today.getMinutes() +
					":" +
					today.getSeconds(),
			});
		}
		setGptReply("");
		setIsLoading(false);
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [gptReply]);

	//Call Api
	const submitUserInput = () => {
		var today = new Date();
		let message = {
			id: crypto.randomUUID(),
			role: "user",
			content: userInput,
			timeStamp:
				today.getHours() +
				":" +
				today.getMinutes() +
				":" +
				today.getSeconds(),
		};
		messageHistory.push(message);
		setIsLoading(true);
		axios
			.post(`https://localhost:7290/ChatApi/ChatGpt?userMsg=${userInput}`)
			.then((res) => setGptReply(res.data))
			.catch((error) => console.log(error));
		setUserInput("");
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="ChatGPT">
			<div className="title">
				<h1>ChatGPT</h1>
			</div>
			<ul className="msgHistory">
				{messageHistory?.map((msg) => (
					<li
						className={
							msg.role === "user" ? "msg-user" : "msg-chatgpt"
						}
						key={msg.id}
					>
						{msg.content}
						<div className="timeStamp">
							{msg.role === "user" ? "You" : "ChatGPT"},{" "}
							{msg.timeStamp}
						</div>
					</li>
				))}
				<div ref={bottomRef} />
			</ul>
			<div className="input-section">
				{isLoading && (
					<div className="load-container">
						<div className="load-msg">ChatGPT is typing</div>
						<div className="load-animation">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				)}
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Type Here"
						aria-label="User Input"
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
					/>
					<button
						className="btn btn-primary"
						type="button"
						id="submit"
						onClick={submitUserInput}
					>
						Enter
					</button>
				</div>
			</div>
		</div>
	);
}
