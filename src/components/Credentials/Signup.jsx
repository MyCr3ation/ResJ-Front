// src/components/Signup.jsx
import { useState /* Removed useEffect */ } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import { GoogleButton } from "./GoogleButton.jsx"; // Assuming this component exists
// Removed: Bootstrap imports (Container, Row, Col, Form, Button, InputGroup, Alert)
// Removed: Bootstrap CSS import ('bootstrap/dist/css/bootstrap.min.css')
// Removed: axios import
// Removed: styled-components import if it was unused

function Signup({ onAuthSuccess }) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false); // State for password visibility
	const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

	// Removed: Separate loginData, loginErrors, isLogin states and related logic

	// Handles changes in form inputs
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		// Clear the specific error when the user starts typing again
		if (errors[name]) {
			setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
		}
	};

	// Validates the signup form data
	const validateSignupForm = () => {
		let newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}
		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}
		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Confirm Password is required";
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		return newErrors;
	};

	// REMOVED Backend Call: Handles the signup simulation
	const handleSignup = () => {
		// Removed async
		// Simulate successful signup for frontend demonstration
		console.log("Attempting signup with (Frontend Only):", formData);

		// Simulate success
		toast.success("Signup successful! Please check your email (Simulated).");
		onAuthSuccess(); // Call the success handler
	};

	// Handles form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		const formErrors = validateSignupForm(); // Use the signup-specific validator
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}
		setErrors({});
		handleSignup(); // Call the frontend-only signup handler
	};

	// REMOVED Backend Call: Handles successful Google Sign-In simulation
	const handleGoogleSignInSuccess = (tokenResponse) => {
		// Removed async
		// Simulate successful Google sign-in processing for frontend demonstration
		console.log("Google Sign-In Success (Frontend Only):", tokenResponse);
		// In a real app, you'd get user info, but here we just simulate success

		// Simulate backend confirmation and navigation
		toast.success("Successfully signed up/in with Google! (Frontend Only)");
		onAuthSuccess(); // Call the success handler
	};

	// Handles Google Sign-In errors (No changes needed here)
	const handleGoogleSignInError = (error) => {
		console.error("Google sign-in error:", error);
		toast.error("Google Sign-In failed. Please try again.");
	};

	// Toggles password visibility
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	// Toggles confirm password visibility
	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	// Removed: useEffect hook that checked for authentication cookie via backend call

	return (
		<div className="animate-fadeIn w-100">
			{" "}
			{/* Ensure width class if needed */}
			<h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
			{/* Standard HTML form with Tailwind styling */}
			<form onSubmit={handleSubmit} noValidate className="space-y-5">
				{/* Name Input Group */}
				<div>
					<label
						htmlFor="signupName"
						className="block text-sm font-medium text-gray-700"
					>
						Full Name
					</label>
					<input
						type="text"
						id="signupName"
						name="name"
						placeholder="John Doe"
						value={formData.name}
						onChange={handleChange}
						required
						className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
							errors.name
								? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
								: "border-gray-300 focus:ring-brand-500 focus:border-brand-500  "
						}`}
						aria-invalid={errors.name ? "true" : "false"}
						aria-describedby="name-error"
					/>
					{errors.name && (
						<p className="mt-2 text-sm text-red-600" id="name-error">
							{errors.name}
						</p>
					)}
				</div>

				{/* Email Input Group */}
				<div>
					<label
						htmlFor="signupEmail"
						className="block text-sm font-medium text-gray-700"
					>
						Email address
					</label>
					<input
						type="email"
						id="signupEmail"
						name="email"
						placeholder="you@example.com"
						value={formData.email}
						onChange={handleChange}
						required
						className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
							errors.email
								? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
								: "border-gray-300 focus:ring-brand-500 focus:border-brand-500  "
						}`}
						aria-invalid={errors.email ? "true" : "false"}
						aria-describedby="email-error"
					/>
					{errors.email && (
						<p className="mt-2 text-sm text-red-600" id="email-error">
							{errors.email}
						</p>
					)}
				</div>

				{/* Password Input Group */}
				<div>
					<label
						htmlFor="signupPassword"
						className="block text-sm font-medium text-gray-700"
					>
						Password
					</label>
					<div className="relative mt-1">
						<input
							type={showPassword ? "text" : "password"}
							id="signupPassword"
							name="password"
							placeholder="••••••••"
							value={formData.password}
							onChange={handleChange}
							required
							className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm pr-10 ${
								errors.password
									? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
									: "border-gray-300 focus:ring-brand-500 focus:border-brand-500  "
							}`}
							aria-invalid={errors.password ? "true" : "false"}
							aria-describedby="password-error"
						/>
						<button
							type="button"
							onClick={togglePasswordVisibility}
							className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
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
						<p className="mt-2 text-sm text-red-600" id="password-error">
							{errors.password}
						</p>
					)}
				</div>

				{/* Confirm Password Input Group */}
				<div>
					<label
						htmlFor="signupConfirmPassword"
						className="block text-sm font-medium text-gray-700"
					>
						Confirm Password
					</label>
					<div className="relative mt-1">
						<input
							type={showConfirmPassword ? "text" : "password"}
							id="signupConfirmPassword"
							name="confirmPassword"
							placeholder="••••••••"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
							className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm pr-10 ${
								errors.confirmPassword
									? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
									: "border-gray-300 focus:ring-brand-500 focus:border-brand-500  "
							}`}
							aria-invalid={errors.confirmPassword ? "true" : "false"}
							aria-describedby="confirm-password-error"
						/>
						<button
							type="button"
							onClick={toggleConfirmPasswordVisibility}
							className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
							aria-label={
								showConfirmPassword ? "Hide password" : "Show password"
							}
						>
							{showConfirmPassword ? (
								<FaEyeSlash className="h-5 w-5" />
							) : (
								<FaEye className="h-5 w-5" />
							)}
						</button>
					</div>
					{errors.confirmPassword && (
						<p
							className="mt-2 text-sm text-red-600"
							id="confirm-password-error"
						>
							{errors.confirmPassword}
						</p>
					)}
				</div>

				{/* Signup Button */}
				<div>
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brandGreen-500 hover:bg-brandGreen-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandGreen-500 transition duration-150 ease-in-out" // Use same styles as Login button
					>
						Sign Up
					</button>
				</div>
			</form>
			{/* Divider */}
			<div className="my-6 flex items-center justify-center">
				<div className="flex-grow border-t border-gray-300"></div>
				<span className="flex-shrink mx-4 text-sm text-gray-500">
					Or sign up with
				</span>
				<div className="flex-grow border-t border-gray-300"></div>
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

export default Signup;
