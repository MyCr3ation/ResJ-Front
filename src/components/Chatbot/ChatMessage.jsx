// src/components/Chatbot/ChatMessage.jsx
import React from "react";

const ChatMessage = ({ message }) => {
	const { text, sender } = message;
	const isUser = sender === "user";

	// Define base and sender-specific styles
	const baseBubbleStyles =
		"py-2.5 px-4 max-w-[75%] md:max-w-[70%] break-words shadow-sm"; // Added break-words and common padding
	const userBubbleStyles = "bg-brand text-white rounded-t-xl rounded-bl-xl"; // Rounded top, bottom-left (tail on bottom-right)
	const botBubbleStyles =
		"bg-brandGreen-100 text-brandGreen-800 rounded-t-xl rounded-br-xl"; // Rounded top, bottom-right (tail on bottom-left)

	return (
		<div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
			<div
				className={`${baseBubbleStyles} ${
					isUser ? userBubbleStyles : botBubbleStyles
				}`}
			>
				{/* A simple way to render text with line breaks */}
				{text.split("\n").map((line, index) => (
					<span key={index}>
						{line}
						{index < text.split("\n").length - 1 && <br />}
					</span>
				))}
			</div>
		</div>
	);
};

export default ChatMessage;
