// src/components/ui/LoadingPlaceholder.jsx
import React from "react";

// A placeholder specifically styled for the Full Journal View loading state
const LoadingPlaceholder = () => {
	return (
		<div className="bg-brandGreen-50 shadow-2xl overflow-hidden w-full p-6 md:p-10">
			{/* Header */}
			<div className="flex items-center justify-between mb-6 border-b border-brandGreen-200 pb-4">
				<div className="w-3/4 h-10 bg-gray-300 rounded-md"></div>
				<div className="w-12 h-12 bg-gray-300 rounded-full"></div>
			</div>

			{/* Date */}
			<div className="w-1/2 h-6 bg-gray-300 rounded-md mb-8"></div>

			{/* Main Journal Body */}
			<div className="mb-8 space-y-2">
				<div className="h-6 bg-gray-300 rounded-md"></div>
				<div className="h-6 bg-gray-300 rounded-md"></div>
				<div className="h-6 bg-gray-300 rounded-md"></div>
				<div className="h-6 bg-gray-300 rounded-md"></div>
				<div className="h-6 w-1/2 bg-gray-300 rounded-md"></div>
			</div>

			{/* Sections (Goal, Affirmation, etc.) */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{[1, 2, 3, 4].map((index) => (
					<div
						key={index}
						className="bg-brandGreen-100 p-5 rounded-xl shadow-md"
					>
						<div className="flex items-center mb-3">
							<div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
							<div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
						</div>
						<div className="h-4 bg-gray-300 rounded-md mt-2"></div>
					</div>
				))}
			</div>

			{/* Weather and Quote (Side-by-Side) */}
			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="bg-brandGreen-100 p-5 rounded-xl shadow-md">
					<div className="flex items-center mb-3">
						<div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
						<div className="w-1/4 h-6 bg-gray-300 rounded-md"></div>
					</div>
					<div className="h-4 bg-gray-300 rounded-md mb-2"></div>
					<div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
				</div>
				<div className="bg-brandGreen-100 p-5 rounded-xl shadow-md">
					<div className="flex items-center mb-3">
						<div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
						<div className="w-1/4 h-6 bg-gray-300 rounded-md"></div>
					</div>
					<div className="h-4 bg-gray-300 rounded-md mb-2"></div>
					<div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
				</div>
			</div>

			{/* Media */}
			<div className="mt-8">
				{/* Slightly less prominent heading during loading */}
				<div className="w-1/4 h-7 bg-gray-300 rounded-md mb-4"></div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{[1, 2, 3, 4, 5].map((index) => (
						<div key={index} className="relative group">
							<div className="w-full h-40 bg-gray-300 rounded-lg"></div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default LoadingPlaceholder;
