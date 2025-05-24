// src/components/insights/StreaksSection.jsx
import React from "react";
import CurrentJournalingStreakCard from "./CurrentJournalingStreakCard.jsx";
import LongestDailyStreakCard from "./LongestDailyStreakCard.jsx";
import LongestWeeklyStreakCard from "./LongestWeeklyStreakCard.jsx";

const StreaksSection = ({ entries }) => {
	return (
		<section>
			<h2
				className="text-2xl font-semibold text-brandGreen-500 mb-4 animate-fadeIn"
				style={{ animationDelay: "0.3s" }}
			>
				Streaks
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				<CurrentJournalingStreakCard entries={entries} delay={3} />
				<LongestDailyStreakCard entries={entries} delay={4} />
				<LongestWeeklyStreakCard entries={entries} delay={5} />
			</div>
		</section>
	);
};

export default StreaksSection;
