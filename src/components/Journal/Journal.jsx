// src/components/journal/JournalCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { defaultMoodImages } from "../../data/sampleJournalData.js"; // Import mood images mapping

const JournalCard = ({ entry }) => {
	// Determine Image Source
	let imageUrl = defaultMoodImages.default; // Fallback default
	if (entry.media && entry.media.length > 0) {
		const imageMedia = entry.media.find((m) =>
			m.mediatype?.startsWith("image/")
		);
		if (imageMedia) {
			imageUrl = imageMedia.mediaurl;
		} else {
			imageUrl = defaultMoodImages[entry.mood] || defaultMoodImages.default;
		}
	} else {
		imageUrl = defaultMoodImages[entry.mood] || defaultMoodImages.default;
	}

	const formattedDate = entry.date
		? new Date(entry.date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
				timeZone: "UTC", // Assume UTC if dates are just YYYY-MM-DD
		  })
		: "No Date";

	return (
		<Link
			to={`/journal/view/${entry.id}`} // Link to a detail page (even if it doesn't exist yet)
			className="relative bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden border border-gray-200 block group transition-transform duration-300 ease-in-out hover:scale-[1.03]"
			style={{ aspectRatio: "9/16" }} // Maintain card aspect ratio
		>
			<img
				src={imageUrl}
				alt={entry.title || "Journal Entry"}
				className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
				loading="lazy"
				onError={(e) => {
					e.target.onerror = null; // Prevent infinite loop
					e.target.src = defaultMoodImages.default; // Fallback on error
				}}
			/>
			{/* Gradient Overlay */}
			<div
				className="absolute inset-x-0 bottom-0"
				style={{
					top: "60%",
					background:
						"linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.85))",
					pointerEvents: "none",
				}}
			/>
			{/* Text Content */}
			<div
				className="absolute inset-0 p-3 flex flex-col justify-end"
				style={{ top: "60%" }}
			>
				<div className="flex justify-between items-start mb-1">
					<h2 className="text-lg font-semibold text-white drop-shadow-sm leading-tight line-clamp-2">
						{entry.title || "Untitled Entry"}
					</h2>
					{entry.mood && (
						<span
							className="text-3xl ml-2 flex-shrink-0"
							style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.5))" }}
							aria-label={`Mood: ${entry.mood}`}
						>
							{entry.mood}
						</span>
					)}
				</div>
				{entry.body && (
					<p className="text-xs text-gray-100 line-clamp-2 overflow-hidden mb-2 drop-shadow-sm">
						{entry.body}
					</p>
				)}
				<div className="flex justify-end mt-auto">
					<p className="text-xs text-gray-200 drop-shadow-sm">
						{formattedDate}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default JournalCard;
