import React from "react";
import {
	FaArrowRight,
	FaRegEdit,
	FaRegListAlt,
	FaChartLine,
	FaFileAlt,
	FaFeatherAlt, // Note: FaFeatherAlt was imported but not used in the original features list
	FaUsers, // Note: FaUsers was imported but not used in the original features list
	FaCode,
} from "react-icons/fa";
import Growth from "../../assets/Growth.png"; // Ensure this path is correct

// ================================================
// MODERN ABOUT US SECTION
// ================================================
const AboutUsSection = () => {
	return (
		<div
			id="about-us"
			className="w-full bg-white py-24 md:py-32 px-4 sm:px-6 lg:px-8"
		>
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
				{/* Text Content */}
				<div className="order-2 md:order-1">
					{/* Use brandGreen-600 for heading */}
					<h2 className="text-4xl font-bold text-brandGreen-600 mb-6 leading-tight">
						Why ResJ? Bridging Reflection and Career Growth.
					</h2>
					{/* Use standard darker gray for paragraph text */}
					<p className="text-gray-700 text-lg leading-relaxed mb-5">
						We believe personal growth and career development are inextricably
						linked. Capturing daily thoughts, achievements, and challenges
						shouldn't just be for reflection – it should actively fuel your
						future success.
					</p>
					{/* Use standard darker gray for paragraph text */}
					<p className="text-gray-700 text-lg leading-relaxed">
						ResJ automates the connection between your everyday experiences and
						your professional narrative. We make it seamless to showcase your
						evolving skills and accomplishments without the usual
						resume-building hassle. Our mission is simple: empower you to{" "}
						{/* Use brandGreen-600 for highlighted text */}
						<span className="font-semibold text-brandGreen-600">
							reflect, grow, and advance
						</span>{" "}
						effortlessly.
					</p>
				</div>

				{/* Illustration */}
				<div className="order-1 md:order-2 flex justify-center items-center p-4 md:p-0">
					<img
						src={Growth} // Make sure this image exists in your public folder
						alt="Illustration showing growth and reflection"
						className="max-w-md w-full h-auto transform transition-transform duration-500 hover:scale-105"
					/>
				</div>
			</div>
		</div>
	);
};

export default AboutUsSection;
