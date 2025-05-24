import React from "react";

const LoadingCard = () => (
	<div
		className="relative bg-gray-200 rounded-xl shadow-md overflow-hidden border border-gray-300 block animate-pulse"
		style={{ aspectRatio: "9/16" }} // Maintain aspect ratio for consistent height
	>
		<div className="w-full h-full bg-gray-300"></div>
	</div>
);

const SkeletonGrid = (
	{ count = 10 } // Default to 10 skeletons
) => (
	<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
		{[...Array(count)].map((_, index) => (
			<LoadingCard key={`load-${index}`} />
		))}
	</div>
);

export default SkeletonGrid;
