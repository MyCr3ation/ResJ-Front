// src/components/insights/PhotosAddedSummaryCard.jsx
import React, { useMemo } from "react";
import InsightCard from "../Common/InsightCard.jsx";
import { FiImage } from "react-icons/fi";

const PhotosAddedSummaryCard = ({ filteredEntries, delay = 0 }) => {
	const photoCount = useMemo(() => {
		return filteredEntries.reduce((count, entry) => {
			if (entry.media && Array.isArray(entry.media)) {
				return count + entry.media.filter((m) => m.type === "image").length;
			}
			return count;
		}, 0);
	}, [filteredEntries]);

	return (
		<InsightCard title="Photos Added" icon={<FiImage />} elementDelay={delay}>
			<p className="text-3xl sm:text-4xl font-bold text-brandGreen-50">
				{photoCount}
			</p>
			<p className="text-sm text-brandGreen-200">Photos Logged</p>
		</InsightCard>
	);
};

export default PhotosAddedSummaryCard;
