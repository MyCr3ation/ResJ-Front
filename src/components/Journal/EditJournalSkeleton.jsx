// src/components/pages/EditJournalLoadingSkeleton.jsx
import React from "react";
import ShimmerDiv from "../Common/ShimmerDiv.jsx";

const EditJournalLoadingSkeleton = () => {
	return (
		<div className="bg-gradient-to-br from-brandGreen-50 to-brandGreen-100 rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
			{/* Header */}
			<div className="h-8 w-1/2 mx-auto mb-6 rounded bg-gray-200"></div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Left Column */}
				<div className="md:col-span-1 space-y-6">
					{/* Date */}
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100 space-y-2">
						<ShimmerDiv width="1/3" height="3" />
						<ShimmerDiv width="full" height="8" />
					</div>
					{/* Mood */}
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100 space-y-2">
						<ShimmerDiv width="1/4" height="3" />
						<div className="flex justify-around items-center py-2">
							{[...Array(5)].map((_, i) => (
								<div key={i} className="w-8 h-8 rounded-full bg-gray-200" />
							))}
						</div>
					</div>
					{/* Weather */}
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100 space-y-2">
						<ShimmerDiv width="1/2" height="3" />
						<ShimmerDiv width="5/6" height="3" />
						<ShimmerDiv width="4/6" height="3" />
						<ShimmerDiv width="3/6" height="3" />
					</div>
					{/* Quote */}
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100 space-y-2">
						<ShimmerDiv width="1/2" height="3" />
						<ShimmerDiv width="full" height="3" />
						<ShimmerDiv width="5/6" height="3" />
						<ShimmerDiv width="1/4" height="2" />
					</div>
				</div>

				{/* Right Column */}
				<div className="md:col-span-2 space-y-6">
					{/* Title */}
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100 space-y-2">
						<ShimmerDiv width="1/4" height="3" />
						<ShimmerDiv width="full" height="6" />
					</div>
					{/* Body */}
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100 space-y-2">
						<ShimmerDiv width="1/4" height="3" />
						<ShimmerDiv width="full" height="24" /> {/* Taller for textarea */}
					</div>
					{/* Goal */}
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100 space-y-2">
						<ShimmerDiv width="1/4" height="3" />
						<ShimmerDiv width="full" height="6" />
					</div>
					{/* Personal Growth */}
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100 space-y-4">
						<div className="h-6 w-1/3 mx-auto md:mx-0 mb-4 rounded bg-gray-200"></div>
						{/* Affirmation */}
						<div className="space-y-2">
							<ShimmerDiv width="1/3" height="3" />
							<ShimmerDiv width="full" height="6" />
						</div>
						{/* Reflection */}
						<div className="space-y-2">
							<ShimmerDiv width="1/4" height="3" />
							<div className="bg-gray-100 rounded-lg p-3 mb-3 border border-gray-200">
								<ShimmerDiv width="5/6" height="3" />
							</div>
							<ShimmerDiv width="full" height="16" />{" "}
							{/* Taller for textarea */}
						</div>
					</div>
					{/* Media placeholder */}
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100 space-y-2">
						<ShimmerDiv width="full" height="32" />
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
				<div className="h-10 w-24 rounded bg-gray-200"></div>
				<div className="h-10 w-32 rounded bg-gray-300"></div>
			</div>
		</div>
	);
};

export default EditJournalLoadingSkeleton;
