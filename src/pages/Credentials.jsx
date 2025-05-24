// Credentials.jsx
import React, { useState, useEffect } from "react"; // Keep useState for the toggle, useEffect for the check
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Keep axios for the check
import { Container, Row, Col, Button } from "react-bootstrap"; // Keep only necessary Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css"; // Keep Bootstrap CSS

// Import your actual Login and Signup components
// Ensure these components handle their own form state, validation, API calls, and toasts
import Login from "../components/Credentials/Login";
import Signup from "../components/Credentials/Signup";

// Removed unused imports: toast, styled-components, Form, InputGroup, Alert

function Credentials() {
	const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup view

	return (
		<div className="">
			<div className="d-flex justify-content-center bg-brandGreen-100 pt-5">
				{/* Example styling for centering */}
				<div class="w-full md:w-1/2 lg:w-5/12 xl:w-1/3 px-2">
					{/* Adjusted column size for typical forms */}
					<div className="d-flex mb-4">
						<Button
							variant={isLogin ? "success" : "outline-success"}
							onClick={() => setIsLogin(true)}
							className="me-2 flex-grow-1" // Added flex-grow-1 for equal width
						>
							Login
						</Button>
						<Button
							variant={!isLogin ? "success" : "outline-success"}
							onClick={() => setIsLogin(false)}
							className="flex-grow-1" // Added flex-grow-1 for equal width
						>
							Sign Up
						</Button>
					</div>
					{isLogin ? (
						<Login /> // Login component handles login form and logic
					) : (
						<Signup /> // Signup component handles signup form and logic
					)}
				</div>
			</div>
		</div>
	);
}

export default Credentials;
