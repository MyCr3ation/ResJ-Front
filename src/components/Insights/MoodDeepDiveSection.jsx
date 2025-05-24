// src/components/insights/MoodDeepDiveSection.jsx
import React from "react";
import MoodPaletteCard from "./MoodPaletteCard";
import FrequentMoodCard from "./FrequentMoodCard";

const MoodDeepDiveSection = ({ entries }) => {
	return (
		<section>
			<h2
				className="text-2xl font-semibold text-brandGreen-500 mb-4 animate-fadeIn"
				style={{ animationDelay: "1.0s" }}
			>
				Mood Deep Dive
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
				<MoodPaletteCard entries={entries} delay={10} />
				<FrequentMoodCard entries={entries} delay={11} />
			</div>
		</section>
	);
};

export default MoodDeepDiveSection;
