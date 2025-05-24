// src/components/insights/MoodPaletteCard.jsx
import React, { useMemo } from "react";
import InsightCard from "../Common/InsightCard.jsx";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { moodNameMap } from "../../data/sampleJournalData";
import {
	parseEntryDate,
	subDays,
	getToday,
	isWithinInterval,
} from "../../utils/dateUtils.jsx";
import { FiSmile } from "react-icons/fi";

const MOOD_COLORS = {
	"😊": "#FFD700", // Happy - Gold
	"😔": "#6495ED", // Sad - CornflowerBlue
	"😠": "#FF6347", // Angry - Tomato
	"😴": "#B0C4DE", // Tired - LightSteelBlue
	"😄": "#32CD32", // Joyful - LimeGreen
	"😐": "#A9A9A9", // Neutral - DarkGray
	"😩": "#FFB6C1", // Stressed/Tearful - LightPink
	Other: "#D3D3D3", // LightGrey for any other moods
};

const MoodPaletteCard = ({ entries, delay = 0 }) => {
	const moodData = useMemo(() => {
		const thirtyDaysAgo = subDays(getToday(), 30);
		const recentEntries = entries.filter((e) => {
			const entryDate = parseEntryDate(e.date);
			return isWithinInterval(entryDate, {
				start: thirtyDaysAgo,
				end: getToday(),
			});
		});

		if (recentEntries.length === 0) return [];

		const moodCounts = recentEntries.reduce((acc, entry) => {
			acc[entry.mood] = (acc[entry.mood] || 0) + 1;
			return acc;
		}, {});

		return Object.entries(moodCounts)
			.map(([mood, count]) => ({
				name: moodNameMap[mood] || "Other",
				moodEmoji: mood,
				value: count,
			}))
			.sort((a, b) => b.value - a.value);
	}, [entries]);

	if (moodData.length === 0) {
		return (
			<InsightCard
				title="Your Mood Palette (Last 30 Days)"
				icon={<FiSmile />}
				elementDelay={delay}
			>
				<p className="text-brandGreen-300 text-center py-10">
					Not enough mood data from the last 30 days.
				</p>
			</InsightCard>
		);
	}

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			return (
				<div className="bg-brandGreen-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-brandGreen-600">
					<p className="text-brandGreen-100 font-semibold">{`${data.moodEmoji} ${data.name}`}</p>
					<p className="text-brandGreen-200 text-sm">{`Count: ${data.value}`}</p>
				</div>
			);
		}
		return null;
	};

	return (
		<InsightCard
			title="Your Mood Palette (Last 30 Days)"
			icon={<FiSmile />}
			elementDelay={delay}
			className="min-h-[300px] sm:min-h-[350px]"
		>
			<div className="w-full h-52 sm:h-64 md:h-72">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={moodData}
							cx="50%"
							cy="50%"
							labelLine={false}
							outerRadius="80%"
							fill="#8884d8"
							dataKey="value"
							nameKey="name"
						>
							{moodData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={MOOD_COLORS[entry.moodEmoji] || MOOD_COLORS.Other}
								/>
							))}
						</Pie>
						<Tooltip content={<CustomTooltip />} />
						<Legend
							formatter={(value, entry) => (
								<span className="text-brandGreen-200 text-xs sm:text-sm ml-1">
									{entry.payload.moodEmoji} {value}
								</span>
							)}
							iconSize={10}
							layout="horizontal"
							verticalAlign="bottom"
							align="center"
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</InsightCard>
	);
};

export default MoodPaletteCard;
