// src/components/Login.jsx
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import { GoogleButton } from "./GoogleButton"; // Assuming this component exists
import "bootstrap/dist/css/bootstrap.min.css";

function Login({ onAuthSuccess }) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "demo@resj.com",
		password: "DemoResJ",
	});
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false); // State for password visibility

	// Handles changes in form inputs (No changes needed here)
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		if (errors[name]) {
			setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
		}
	};

	// Validates the login form data (No changes needed here)
	const validateLoginForm = () => {
		let newErrors = {};
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}
		if (!formData.password) {
			newErrors.password = "Password is required";
		}
		// Basic password length check (optional, add if needed)
		else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}
		return newErrors;
	};

	// REMOVED Backend Call: Handles the standard email/password login API call
	const handleLogin = () => {
		// Removed async
		// Simulate successful login for frontend demonstration
		console.log("Attempting login with (Frontend Only):", formData);

		// Simulate success
		toast.success("Login successful! (Frontend Only)");
		onAuthSuccess(); // Call the success handler passed from AuthModal
	};

	// Handles form submission (No changes needed here, calls the modified handleLogin)
	const handleSubmit = (e) => {
		e.preventDefault();
		const formErrors = validateLoginForm();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}
		setErrors({});
		handleLogin(); // Calls the frontend-only login handler
	};

	// REMOVED Backend Call: Handles successful Google Sign-In
	const handleGoogleSignInSuccess = (tokenResponse) => {
		// Removed async
		// Simulate successful Google sign-in processing for frontend demonstration
		console.log("Google Sign-In Success (Frontend Only):", tokenResponse);

		// Simulate backend confirmation and navigation
		toast.success("Successfully signed in with Google! (Frontend Only)");
		onAuthSuccess(); // Call the success handler
	};

	// Handles Google Sign-In errors (No changes needed here)
	const handleGoogleSignInError = (error) => {
		console.error("Google sign-in error:", error);
		toast.error("Google Sign-In failed. Please try again.");
	};

	// Toggles password visibility (No changes needed here)
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	// --- JSX Rendering --- (No significant changes needed below)
	return (
		<div className="animate-fadeIn w-100">
			{" "}
			{/* Ensure w-100 or similar width class if needed */}
			<h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
				Login
			</h2>
			{/* Standard HTML form with Tailwind styling */}
			<form onSubmit={handleSubmit} noValidate className="space-y-5">
				{/* Email Input Group */}
				<div>
					<label
						htmlFor="loginEmail"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						Email address
					</label>
					<input
						type="email"
						id="loginEmail"
						name="email"
						placeholder="you@example.com"
						value={formData.email}
						onChange={handleChange}
						required
						className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
							errors.email
								? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:border-red-400 dark:text-red-400 dark:placeholder-red-500"
								: "border-gray-300 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-brand-400 dark:focus:border-brand-400"
						}`}
						aria-invalid={errors.email ? "true" : "false"}
						aria-describedby="email-error"
					/>
					{errors.email && (
						<p
							className="mt-2 text-sm text-red-600 dark:text-red-400"
							id="email-error"
						>
							{errors.email}
						</p>
					)}
				</div>

				{/* Password Input Group */}
				<div>
					<label
						htmlFor="loginPassword"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						Password
					</label>
					<div className="relative mt-1">
						<input
							type={showPassword ? "text" : "password"} // Dynamically change type
							id="loginPassword"
							name="password"
							placeholder="••••••••"
							value={formData.password}
							onChange={handleChange}
							required
							className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm pr-10 ${
								// Added pr-10 for icon space
								errors.password
									? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:border-red-400 dark:text-red-400 dark:placeholder-red-500"
									: "border-gray-300 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-brand-400 dark:focus:border-brand-400"
							}`}
							aria-invalid={errors.password ? "true" : "false"}
							aria-describedby="password-error"
						/>
						{/* Toggle Button */}
						<button
							type="button" // Important: prevent form submission
							onClick={togglePasswordVisibility}
							className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? (
								<FaEyeSlash className="h-5 w-5" />
							) : (
								<FaEye className="h-5 w-5" />
							)}
						</button>
					</div>
					{errors.password && (
						<p
							className="mt-2 text-sm text-red-600 dark:text-red-400"
							id="password-error"
						>
							{errors.password}
						</p>
					)}
				</div>

				{/* Login Button */}
				<div>
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brandGreen-500 hover:bg-brandGreen-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandGreen-500 transition duration-150 ease-in-out"
					>
						Login
					</button>
				</div>
			</form>
			{/* Divider */}
			<div className="my-6 flex items-center justify-center">
				<div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
				<span className="flex-shrink mx-4 text-sm text-gray-500 dark:text-gray-400">
					Or continue with
				</span>
				<div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
			</div>
			{/* Google Sign-In Button */}
			<div className="mt-4">
				<GoogleButton
					onSuccess={handleGoogleSignInSuccess} // Uses the frontend-only handler
					onError={handleGoogleSignInError}
					// Pass Tailwind classes if your GoogleButton accepts className
					// className="w-full ..."
				/>
			</div>
		</div>
	);
}

export default Login;
