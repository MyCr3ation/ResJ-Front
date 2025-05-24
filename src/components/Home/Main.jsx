import React from "react";
import {
	FaArrowRight,
	// Removed unused icons: FaRegEdit, FaRegListAlt, FaChartLine, FaFileAlt, FaFeatherAlt, FaUsers, FaCode
} from "react-icons/fa";
import Button from "../Button"; // Assuming Button.jsx is in the same folder
import BG from "../../assets/bgmain.jpg";

// ================================================
// MODERN MAIN HERO COMPONENT
// ================================================

/**
 * Main Hero section component for the ResJ application homepage.
 * Displays the main headline, tagline, description, and a call-to-action button.
 * Features a background gradient and image overlay.
 */
const Main = ({ onAuthRequired }) => {
	const handleAuthLinkClick = (e) => {
		e.preventDefault(); // Prevent default if it's somehow still a link
		onAuthRequired(); // Call the function passed from App.jsx
	};

	return (
		// Use React.Fragment shorthand
		<>
			{/* Hero Section Container */}
			{/* Sets up the background gradient, padding, centering, and overflow behavior */}
			<div className="relative w-full bg-gradient-to-br from-brandGreen-50 via-brandGreen-100 to-brandGreen-200 py-32 md:py-40 flex justify-center items-center overflow-hidden">
				{/* Background Overlay Group */}
				{/* Positioned absolutely to cover the entire parent container */}
				<div className="absolute inset-0" aria-hidden="true">
					{" "}
					{/* Hiding decorative elements from screen readers */}
					{/* Background Image */}
					{/* Consider optimizing this image (e.g., using next/image or responsive formats) */}
					<img
						src={BG}
						// More descriptive alt text, or empty if purely decorative and hidden by aria-hidden
						alt="Abstract green flowing background pattern"
						className="w-full h-full object-cover opacity-30"
						// Add loading="lazy" for potential performance improvement if image is below the fold (though likely not for a hero)
						// loading="lazy"
					/>
					{/* Gradient Overlay */}
					{/* Adds a color overlay on top of the image, matching the main gradient */}
					<div className="absolute inset-0 bg-gradient-to-b from-brandGreen-50 via-brandGreen-100 to-brandGreen-200 opacity-40"></div>
				</div>

				{/* Content Container */}
				{/* Positioned relatively with z-index to appear above the background */}
				{/* Constrains width, adds padding, centers text, and arranges children vertically */}
				<div className="relative z-10 max-w-5xl w-full px-6 text-center flex flex-col items-center gap-6">
					{/* Main Headline */}
					{/* Uses brand colors, large responsive font size, bold weight, and a subtle pulse animation */}
					<h1 className="text-5xl md:text-7xl font-extrabold text-brand bg-clip-text text-transparent bg-gradient-to-r from-brandGreen-600 via-brand to-brandGreen-600 pb-2 animate-pulse">
						Resume & Journal (ResJ)
					</h1>

					{/* Tagline */}
					{/* Slightly smaller than headline, medium weight, using a brand green shade */}
					<p className="text-2xl md:text-3xl font-medium text-brandGreen-700">
						{" "}
						{/* Adjusted color slightly for potentially better contrast */}
						Where Your Daily Journal Builds Your Resume.
					</p>

					{/* Description */}
					{/* Standard text size, explains the value proposition, constrained width */}
					<p className="max-w-3xl text-lg md:text-xl text-gray-800 leading-relaxed">
						{" "}
						{/* Using a standard dark gray for readability */}
						Effortlessly capture your growth and craft a compelling resume. ResJ
						bridges daily journaling with professional presentation. Intuitive,
						free, no sign-up needed, and ready to export.
					</p>

					{/* Call to Action (CTA) Section */}
					{/* Spaced from the description, allows buttons to wrap on small screens */}
					<div className="mt-8 flex flex-col sm:flex-row gap-4">
						<Button
							onClick={handleAuthLinkClick} // Or your specific "Get Started" path
							ariaLabel="Get started with ResJ"
							IconComponent={FaArrowRight} // Pass the icon component
							iconPosition="right" // Explicitly set icon position
							className="sm:inline-flex" // Hide button on very small screens if needed
						>
							Get Started
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Main;
