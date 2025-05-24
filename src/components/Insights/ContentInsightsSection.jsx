// src/components/insights/ContentInsightsSection.jsx
import React from "react";
import WordCloudCard from "./WordCloudCard.jsx";

const ContentInsightsSection = ({ filteredEntries, periodLabel }) => {
	return (
		<section>
			<h2
				className="text-2xl font-semibold text-brandGreen-500 mb-4 animate-fadeIn"
				style={{ animationDelay: "1.2s" }}
			>
				Content Insights
			</h2>
			<WordCloudCard
				filteredEntries={filteredEntries}
				periodLabel={periodLabel}
				delay={12}
			/>
		</section>
	);
};

export default ContentInsightsSection;
