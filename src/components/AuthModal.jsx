// src/components/AuthModal.jsx
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Login from "./Credentials/Login.jsx"; // Adjust path if needed
import Signup from "./Credentials/Signup.jsx"; // Adjust path if needed
import Button from "./Button.jsx"; // Assuming Button component exists and can be styled simply

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
	const [isLoginView, setIsLoginView] = useState(true); // Default to Login view

	if (!isOpen) {
		return null; // Don't render anything if the modal is closed
	}

	// Function to handle successful login/signup simulation
	const handleAuthSuccess = () => {
		onLoginSuccess(); // Update the global logged-in state in App.jsx
		onClose(); // Close the modal
	};

	return (
		// Overlay
		<div
			className="fixed inset-0 bg-black/60 z-10 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out"
			onClick={onClose} // Close modal when clicking overlay
		>
			{/* Modal Content */}
			<div
				className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fadeIn" // Added dark mode bg
				onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside content
			>
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
					aria-label="Close authentication modal"
				>
					<FaTimes className="h-5 w-5" />
				</button>

				{/* Toggle Buttons */}
				<div className="flex mb-5 border-b border-gray-200">
					<button
						onClick={() => setIsLoginView(true)}
						className={`flex-1 py-3 text-center text-sm font-medium transition-colors duration-200 ${
							isLoginView
								? "border-b-2 border-brandGreen-500 text-brandGreen-600"
								: "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
						}`}
					>
						Login
					</button>
					<button
						onClick={() => setIsLoginView(false)}
						className={`flex-1 py-3 text-center text-sm font-medium transition-colors duration-200 ${
							!isLoginView
								? "border-b-2 border-brandGreen-500 text-brandGreen-600"
								: "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
						}`}
					>
						Sign Up
					</button>
				</div>

				{/* Render Login or Signup Component */}
				{isLoginView ? (
					<Login onAuthSuccess={handleAuthSuccess} /> // Pass success handler
				) : (
					<Signup onAuthSuccess={handleAuthSuccess} /> // Pass success handler
				)}
			</div>
		</div>
	);
}

export default AuthModal;
