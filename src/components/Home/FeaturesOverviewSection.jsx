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

// ================================================
// MODERN FEATURES OVERVIEW SECTION
// ================================================
const FeaturesOverviewSection = () => {
	const features = [
		{
			icon: FaRegEdit,
			title: "Daily Logging",
			description:
				"Easily capture daily tasks, achievements, and reflections in a structured journal.",
		},
		{
			icon: FaFileAlt,
			title: "Automated Resume",
			description:
				"Relevant journal entries automatically suggested and formatted for your resume.",
		},
		{
			icon: FaRegListAlt,
			title: "Modern Templates",
			description:
				"Choose from professional resume templates designed for various industries.",
		},
		{
			icon: FaChartLine,
			title: "Growth Analytics",
			description:
				"Visualize your progress, skills development, and activity over time.",
		},
		{
			icon: FaArrowRight, // Reusing FaArrowRight here, consider a different icon if needed
			title: "Easy Export",
			description:
				"Download your polished resume in standard formats like PDF anytime.",
		},
		{
			icon: FaCode, // Using FaCode for Goal Tracking
			title: "Goal Tracking",
			description:
				"Set personal & professional goals and link journal entries to track progress.",
		},
	];

	return (
		<div
			id="features"
			// Use slightly different brandGreen shades for variation in gradient background
			className="w-full bg-gradient-to-br from-brandGreen-100 to-brandGreen-200 py-24 md:py-32 px-4 sm:px-6 lg:px-8"
		>
			<div className="max-w-6xl mx-auto">
				{/* Use brandGreen-600 for heading */}
				<h2 className="text-4xl font-bold text-brandGreen-600 text-center mb-16 md:mb-20">
					How ResJ Empowers You
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
						>
							{/* Use brandGreen-50 for icon bg, brand for icon color */}
							<div className="mb-4 p-3 rounded-full bg-brandGreen-50 inline-block">
								<feature.icon className="text-3xl text-brand" />
							</div>
							{/* Use brandGreen-600 for feature title */}
							<h3 className="text-xl font-semibold text-brandGreen-600 mb-2">
								{feature.title}
							</h3>
							{/* Use standard darker gray for description */}
							<p className="text-gray-700 text-sm leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FeaturesOverviewSection;
