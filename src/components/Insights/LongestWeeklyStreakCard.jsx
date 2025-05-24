// src/components/insights/LongestWeeklyStreakCard.jsx
import React from "react";
import InsightCard from "../Common/InsightCard.jsx";
import { calculateLongestWeeklyStreak } from "../../utils/insightsUtils.jsx";
import { FiCalendar } from "react-icons/fi"; // Example Icon

const LongestWeeklyStreakCard = ({ entries, delay = 0 }) => {
	const streak = calculateLongestWeeklyStreak(entries);

	return (
		<InsightCard
			title="Longest Weekly Streak"
			icon={<FiCalendar />}
			elementDelay={delay}
		>
			{streak > 0 ? (
				<div className="text-center">
					<p className="text-4xl sm:text-5xl font-bold text-brandGreen-50">
						{streak}
					</p>
					<p className="text-sm text-brandGreen-200">
						{streak === 1 ? "Week" : "Weeks"}
					</p>
				</div>
			) : (
				<p className="text-brandGreen-200 text-center py-4">
					No weekly streaks recorded yet.
				</p>
			)}
		</InsightCard>
	);
};

export default LongestWeeklyStreakCard;
