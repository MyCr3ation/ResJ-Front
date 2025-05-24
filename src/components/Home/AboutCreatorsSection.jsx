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
import Mustafa from "../../assets/Mustafa.PNG";
import Gemin from "../../assets/Gemin.PNG";

// ================================================
// MODERN ABOUT CREATORS SECTION
// ================================================
const AboutCreatorsSection = () => {
	const creators = [
		{
			name: "Gemin Khatri",
			age: 20,
			email: "www.geminkhatri@gmail.com",
			thoughts:
				"Passionate about turning daily reflections into actionable career insights.",
			avatar: Gemin, // Placeholder - consider replacing with brandGreen-300 as background?
		},
		{
			name: "Mustafa Dholkawala",
			age: 20,
			email: "www.work.mustafa@gmail.com",
			thoughts:
				"Believing in the power of journaling to shape compelling resumes.",
			avatar: Mustafa, // Make sure this image exists in your public folder
		},
	];

	return (
		// Use standard light gray background
		<div className="w-full bg-gray-50 py-24 md:py-32 px-4 sm:px-6 lg:px-8">
			<div className="max-w-5xl mx-auto">
				{/* Use brandGreen-600 for heading */}
				<h2 className="text-4xl font-bold text-brandGreen-600 text-center mb-16 md:mb-20">
					Meet the Creators
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{creators.map((creator, index) => (
						<div
							key={index}
							// Use brandGreen-200 for hover border
							className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 border border-transparent hover:border-brandGreen-200"
						>
							<img
								src={creator.avatar}
								alt={`${creator.name}'s avatar`}
								className="w-28 h-28 rounded-full mb-5 object-cover border-4 border-gray-200 shadow-md" // Standard gray border for avatar
							/>
							{/* Use standard darker gray for name */}
							<h3 className="text-2xl font-semibold text-gray-700 mb-1">
								{creator.name}
							</h3>
							{/* Standard medium gray for age */}
							<p className="text-sm text-gray-500 mb-2">Age: {creator.age}</p>
							{/* Use brand color for email, brandGreen-600 for hover */}
							<a
								href={`mailto:${creator.email}`}
								className="text-sm text-brand hover:text-brandGreen-600 transition-colors break-all font-medium hover:underline"
							>
								{creator.email}
							</a>
							{/* Use standard darker gray for thoughts, brandGreen-200 for border */}
							<p className="text-gray-700 mt-5 text-base italic leading-relaxed border-l-4 border-brandGreen-200 pl-4 text-left">
								"{creator.thoughts}"
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AboutCreatorsSection;
