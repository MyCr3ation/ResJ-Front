// src/components/insights/FrequentMoodCard.jsx
import React, { useMemo } from "react";
import InsightCard from "../Common/InsightCard.jsx";
import { moodNameMap } from "../../data/sampleJournalData.js";
import {
	parseEntryDate,
	subDays,
	getToday,
	isWithinInterval,
} from "../../utils/dateUtils.jsx";
import { FiHeart } from "react-icons/fi";

const FrequentMoodCard = ({ entries, delay = 0 }) => {
	const frequentMood = useMemo(() => {
		const thirtyDaysAgo = subDays(getToday(), 30);
		const recentEntries = entries.filter((e) => {
			const entryDate = parseEntryDate(e.date);
			return isWithinInterval(entryDate, {
				start: thirtyDaysAgo,
				end: getToday(),
			});
		});

		if (recentEntries.length === 0) return null;

		const moodCounts = recentEntries.reduce((acc, entry) => {
			acc[entry.mood] = (acc[entry.mood] || 0) + 1;
			return acc;
		}, {});

		let mostFrequent = null;
		let maxCount = 0;
		for (const mood in moodCounts) {
			if (moodCounts[mood] > maxCount) {
				mostFrequent = mood;
				maxCount = moodCounts[mood];
			}
		}
		return mostFrequent
			? { emoji: mostFrequent, name: moodNameMap[mostFrequent] || "Mood" }
			: null;
	}, [entries]);

	return (
		<InsightCard
			title="Often Feeling... (Last 30 Days)"
			icon={<FiHeart />}
			elementDelay={delay}
		>
			{frequentMood ? (
				<div className="text-center py-4">
					<p className="text-6xl sm:text-7xl">{frequentMood.emoji}</p>
					<p className="text-xl sm:text-2xl text-brandGreen-100 mt-2 font-semibold">
						{frequentMood.name}
					</p>
				</div>
			) : (
				<p className="text-brandGreen-300 text-center py-10">
					Not enough mood data from the last 30 days.
				</p>
			)}
		</InsightCard>
	);
};

export default FrequentMoodCard;
