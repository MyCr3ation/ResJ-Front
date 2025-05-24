// src/components/insights/GoalFocusCard.jsx
import React, { useMemo } from "react";
import InsightCard from "../Common/InsightCard.jsx";
import { FiTarget } from "react-icons/fi";

const GoalFocusCard = ({ filteredEntries, periodLabel, delay = 0 }) => {
	const goalStats = useMemo(() => {
		const entriesWithGoals = filteredEntries.filter(
			(e) => e.goal && e.goal.trim() !== ""
		);
		const uniqueGoals = [
			...new Set(entriesWithGoals.map((e) => e.goal.trim())),
		];

		// Get up to 3 most recent unique goals
		const recentUniqueGoals = [];
		const addedGoals = new Set();
		for (let i = entriesWithGoals.length - 1; i >= 0; i--) {
			const goal = entriesWithGoals[i].goal.trim();
			if (!addedGoals.has(goal)) {
				recentUniqueGoals.push(goal);
				addedGoals.add(goal);
				if (recentUniqueGoals.length >= 3) break;
			}
		}

		return {
			count: entriesWithGoals.length,
			examples: recentUniqueGoals.reverse(), // Show oldest of the recent first
		};
	}, [filteredEntries]);

	const title =
		periodLabel === "All-time"
			? "Your Aspirations"
			: `Goal Focus for ${periodLabel}`;

	return (
		<InsightCard title={title} icon={<FiTarget />} elementDelay={delay}>
			{goalStats.count > 0 ? (
				<>
					<p className="text-brandGreen-200 mb-3">
						You've set goals in{" "}
						<span className="font-bold text-brandGreen-50">
							{goalStats.count}
						</span>{" "}
						{goalStats.count === 1 ? "entry" : "entries"} for this period.
					</p>
					{goalStats.examples.length > 0 && (
						<div>
							<h4 className="text-sm font-semibold text-brandGreen-100 mb-1">
								Recent Goals:
							</h4>
							<ul className="list-disc list-inside space-y-1 pl-1">
								{goalStats.examples.map((goal, index) => (
									<li
										key={index}
										className="text-brandGreen-200 text-sm truncate"
										title={goal}
									>
										{goal}
									</li>
								))}
							</ul>
						</div>
					)}
				</>
			) : (
				<p className="text-brandGreen-300 text-center py-6">
					No specific goals set in entries for this period.
				</p>
			)}
		</InsightCard>
	);
};

export default GoalFocusCard;
