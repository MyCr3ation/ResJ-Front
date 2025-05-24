// src/components/insights/CurrentJournalingStreakCard.jsx
import React from "react";
import InsightCard from "../Common/InsightCard.jsx";
import { calculateCurrentDailyStreak } from "../../utils/insightsUtils.jsx";
import { FiZap } from "react-icons/fi"; // Example Icon

const CurrentJournalingStreakCard = ({ entries, delay = 0 }) => {
	const streak = calculateCurrentDailyStreak(entries);

	return (
		<InsightCard
			title="Current Daily Streak"
			icon={<FiZap />}
			elementDelay={delay}
		>
			{streak > 0 ? (
				<div className="text-center">
					<p className="text-4xl sm:text-5xl font-bold text-brandGreen-50 animate-pulse">
						{streak}
					</p>
					<p className="text-sm text-brandGreen-200">
						{streak === 1 ? "Day" : "Days"}
					</p>
				</div>
			) : (
				<p className="text-brandGreen-200 text-center py-4">
					No current streak. Keep journaling!
				</p>
			)}
		</InsightCard>
	);
};

export default CurrentJournalingStreakCard;
