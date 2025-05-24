// src/components/insights/WordCloudCard.jsx
import React, { useMemo } from "react";
import InsightCard from "../Common/InsightCard.jsx";
import { TagCloud } from "react-tagcloud";
import { stopWords } from "../../data/sampleJournalData.js"; // Assuming this path is correct
import { getWordFrequency } from "../../utils/insightsUtils.jsx"; // Assuming this path is correct
import { FiMessageSquare } from "react-icons/fi";

// Updated color palette inspired by the image
const tagColors = [
	"#3A4B0A", // Dark Olive/Brown (like 'knowledge')
	"#5A7D2A", // Medium Green (like 'education', 'development')
	"#8A8A38", // Lighter Olive/Tan (like 'wisdom', 'school')
	"#90A959", // Brighter Green (like 'student', 'comprehension')
	"#6B7C3D", // Distinct Brown (like 'value', 'motivation')
	"#A69852", // Lighter Tan (for smaller/medium words)
	"#B0A68E", // Greyish Tan (for smaller words)
	"#4F4A3A", // Dark Desaturated Brown/Green
	"#728C54", // Muted Green
	"#C8BCA0", // Very Light Beige/Grey
];

const WordCloudCard = ({ filteredEntries, periodLabel, delay = 0 }) => {
	const wordsForTagCloud = useMemo(() => {
		if (!filteredEntries || filteredEntries.length === 0) {
			return [];
		}
		const texts = filteredEntries.map((e) => e.body);
		const wordFrequencies = getWordFrequency(texts, stopWords);

		return wordFrequencies.map((item) => ({
			value: item.text,
			count: item.value,
		}));
	}, [filteredEntries]);

	const title =
		periodLabel === "All-time"
			? "Your Word Cloud"
			: `Word Cloud for ${periodLabel}`;

	if (!wordsForTagCloud || wordsForTagCloud.length === 0) {
		return (
			<InsightCard
				title={title}
				icon={<FiMessageSquare />}
				elementDelay={delay}
			>
				<p className="text-neutral-500 dark:text-neutral-400 text-center py-10">
					{" "}
					{/* Adjusted text color for better theme compatibility */}
					Not enough text to generate a word cloud for this period.
				</p>
			</InsightCard>
		);
	}

	// Custom renderer to apply Tailwind classes, our color palette, and dynamic font weight
	const customRenderer = (tag, size) => {
		// Cycle through our predefined colors randomly for each tag
		const colorIndex = Math.floor(Math.random() * tagColors.length);

		// Determine font weight based on size (approximating the image's style)
		let fontWeight = "normal";
		if (size >= 40) {
			// Adjust thresholds based on your maxSize and desired effect
			fontWeight = "bold"; // 700
		} else if (size >= 28) {
			fontWeight = "600"; // semibold
		} else if (size >= 20) {
			fontWeight = "500"; // medium
		}

		return (
			<span
				key={tag.value}
				style={{
					fontSize: `${size}px`,
					color: tagColors[colorIndex],
					margin: "3px 6px", // Adjusted margin for potentially denser packing
					padding: "2px 4px",
					display: "inline-block",
					fontWeight: fontWeight, // Apply dynamic font weight
					animation: "fadeIn 0.5s ease-out",
					animationDelay: `${Math.random() * 0.5}s`,
					cursor: "default",
					lineHeight: "1", // Helps with tighter vertical spacing within the cloud
				}}
				className="transition-transform duration-200 hover:scale-110"
			>
				{tag.value}
			</span>
		);
	};

	return (
		<InsightCard
			title={title}
			icon={<FiMessageSquare />}
			elementDelay={delay}
			className="min-h-[300px] sm:min-h-[350px] md:min-h-[400px]" // Slightly increased min-height for larger clouds
		>
			<div className="w-full h-full flex justify-center items-center p-3 sm:p-4 text-center">
				<TagCloud
					minSize={14} // Increased minSize for better readability of smaller words
					maxSize={80} // Increased maxSize for more dominant frequent words
					tags={wordsForTagCloud}
					renderer={customRenderer}
					shuffle={true} // Ensures layout changes on reload
					className="flex flex-wrap justify-center items-center" // Helps center the cloud content
				/>
			</div>
		</InsightCard>
	);
};

export default WordCloudCard;
