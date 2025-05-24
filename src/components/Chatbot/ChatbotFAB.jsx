// src/components/ChatbotFAB.jsx
import React from "react";
import { TbPencilStar } from "react-icons/tb";

const ChatbotFAB = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className="absolute bottom-2 right-2 md:bottom-8 md:right-8 z-50 p-3 bg-brand hover:bg-brandGreen-600 text-white rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out"
			aria-label="Toggle Atlas Insight Chatbot"
		>
			<TbPencilStar size={28} /> {/* Slightly larger icon */}
		</button>
	);
};

export default ChatbotFAB;
