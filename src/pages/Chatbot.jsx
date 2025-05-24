// src/components/Chatbot/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
// Assuming ChatMessage is now correctly pathed from ./ChatMessage not ../components/Chatbot/ChatMessage
import ChatMessage from "../components/Chatbot/ChatMessage.jsx";

// Simple X icon for closing
const CloseIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={2}
		stroke="currentColor"
		className="w-5 h-5"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
);

// Simple Send icon
const SendIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		className="w-5 h-5"
	>
		<path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
	</svg>
);

const Chatbot = ({ onClose, chatMessages, onSendMessage }) => {
	const [input, setInput] = useState("");
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(scrollToBottom, [chatMessages]);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input.trim()) {
			onSendMessage(input.trim());
			setInput("");
			inputRef.current?.focus();
		}
	};

	return (
		// Added shadow-lg for better visual separation
		<div className="flex flex-col h-full bg-gray-50 text-gray-800 border-l border-gray-200 shadow-lg">
			{/* Header */}
			<div className="p-3.5 md:p-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
				{/* Made title slightly more prominent and consistent color */}
				<h2 className="text-lg font-semibold text-brandGreen-800">
					Atlas Insight
				</h2>
				<button
					onClick={onClose}
					// Ensured focus ring uses brand colors
					className="p-1.5 rounded-full text-brandGreen-800 hover:bg-brandGreen-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandGreen-500"
					aria-label="Close chat panel"
				>
					<CloseIcon />
				</button>
			</div>

			{/* Messages Area */}
			<div className="flex-grow p-3 md:p-4 overflow-y-auto">
				{chatMessages.map((msg) => (
					<ChatMessage key={msg.id} message={msg} />
				))}
				<div ref={messagesEndRef} />
			</div>

			{/* Input Area */}
			<form
				onSubmit={handleSubmit}
				className="p-2.5 md:p-3 border-t border-gray-200 bg-gray-100 sticky bottom-0"
			>
				<div className="flex items-center space-x-2">
					<input
						ref={inputRef}
						type="text"
						value={input}
						onChange={handleInputChange}
						placeholder="Message Atlas Insight..."
						// Increased vertical padding, rounded-lg, and brand focus ring
						className="flex-grow py-2.5 px-3.5 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGreen-500 focus:border-transparent placeholder-gray-400"
						aria-label="Chat message input"
					/>
					<button
						type="submit"
						disabled={!input.trim()}
						// Changed to brand colors for consistency, slightly larger padding for send button
						className="bg-brand hover:bg-brandGreen-600 text-white p-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brandGreen-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
						aria-label="Send message"
					>
						<SendIcon />
					</button>
				</div>
			</form>
		</div>
	);
};

export default Chatbot;
