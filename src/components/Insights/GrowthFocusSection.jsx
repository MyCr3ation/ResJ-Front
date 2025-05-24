// src/components/insights/GrowthFocusSection.jsx
import React from "react";
import GoalFocusCard from "./GoalFocusCard.jsx";

const GrowthFocusSection = ({ filteredEntries, periodLabel }) => {
	return (
		<section>
			<h2
				className="text-2xl font-semibold text-brandGreen-500 mb-4 animate-fadeIn"
				style={{ animationDelay: "1.3s" }}
			>
				Growth Focus
			</h2>
			<GoalFocusCard
				filteredEntries={filteredEntries}
				periodLabel={periodLabel}
				delay={13}
			/>
		</section>
	);
};

export default GrowthFocusSection;
