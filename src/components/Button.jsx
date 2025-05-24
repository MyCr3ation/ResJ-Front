import React from "react";

// Define the props the Button component accepts
const Button = ({
	href,
	children,
	IconComponent,
	iconPosition = "right", // Default icon position
	ariaLabel,
	className = "", // Default empty string for className
	moveDisabled = false, // Default to false
	...props // Capture rest of the props
}) => {
	// Base classes for the button styling - ADDED no-underline HERE
	const baseClasses =
		"group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold shadow-lg transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 no-underline"; // <-- Added no-underline

	// Specific style classes (can be customized or passed via props)
	const styleClasses =
		"bg-brand text-white hover:scale-105 hover:bg-brandGreen-600 focus:ring-brandGreen-500";

	// Icon animation class
	const iconAnimationClass =
		IconComponent && !moveDisabled
			? iconPosition === "right"
				? "transition-transform duration-300 ease-in-out group-hover:translate-x-1"
				: "transition-transform duration-300 ease-in-out group-hover:-translate-x-1"
			: "";

	// If href is provided, render as an anchor tag (link)
	if (href) {
		return (
			<a
				href={href}
				// Combine base, style, and custom classes.
				className={`${baseClasses} ${styleClasses} ${className}`}
				aria-label={ariaLabel || (typeof children === "string" ? children : "")} // Use text content as fallback aria-label if it's a string
				{...props} // Spread remaining props
			>
				{/* Render Icon on the left if specified */}
				{IconComponent && iconPosition === "left" && (
					<IconComponent className={`h-4 w-4 ${iconAnimationClass}`} /> // Added size example
				)}

				{/* Render button text/content */}
				<span>{children}</span>

				{/* Render Icon on the right if specified (default) */}
				{IconComponent && iconPosition === "right" && (
					<IconComponent className={`h-4 w-4 ${iconAnimationClass}`} /> // Added size example
				)}
			</a>
		);
	}

	// --- ADDED: Fallback for rendering as a <button> if no href ---
	// If no href is provided, render as a standard button
	// This is useful if the button triggers an onClick action instead of navigating
	return (
		<button
			type="button" // Default to type="button" unless overridden via props
			className={`${baseClasses} ${styleClasses} ${className}`}
			aria-label={ariaLabel || (typeof children === "string" ? children : "")}
			{...props} // Spread remaining props (like onClick, disabled, etc.)
		>
			{/* Render Icon on the left if specified */}
			{IconComponent && iconPosition === "left" && (
				<IconComponent className={`h-4 w-4 ${iconAnimationClass}`} /> // Added size example
			)}

			{/* Render button text/content */}
			<span>{children}</span>

			{/* Render Icon on the right if specified (default) */}
			{IconComponent && iconPosition === "right" && (
				<IconComponent className={`h-4 w-4 ${iconAnimationClass}`} /> // Added size example
			)}
		</button>
	);
};

export default Button;
