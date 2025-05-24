// src/components/insights/LongestDailyStreakCard.jsx
import React from "react";
import InsightCard from "../Common/InsightCard.jsx";
import { calculateLongestDailyStreak } from "../../utils/insightsUtils.jsx";
import { FiTrendingUp } from "react-icons/fi"; // Example Icon

const LongestDailyStreakCard = ({ entries, delay = 0 }) => {
	const streak = calculateLongestDailyStreak(entries);

	return (
		<InsightCard
			title="Longest Daily Streak"
			icon={<FiTrendingUp />}
			elementDelay={delay}
		>
			{streak > 0 ? (
				<div className="text-center">
					<p className="text-4xl sm:text-5xl font-bold text-brandGreen-50">
						{streak}
					</p>
					<p className="text-sm text-brandGreen-200">
						{streak === 1 ? "Day" : "Days"}
					</p>
				</div>
			) : (
				<p className="text-brandGreen-200 text-center py-4">
					No daily streaks recorded yet.
				</p>
			)}
		</InsightCard>
	);
};

export default LongestDailyStreakCard;
