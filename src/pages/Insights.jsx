// src/components/insights/InsightsPage.jsx
import React, { useState, useMemo } from "react";
import { sampleJournalEntries } from "../data/sampleJournalData";
import StreaksSection from "../components/insights/StreaksSection.jsx";
import ActivityStatsSection from "../components/insights/ActivityStatsSection.jsx";
import MoodDeepDiveSection from "../components/insights/MoodDeepDiveSection.jsx";
import ContentInsightsSection from "../components/insights/ContentInsightsSection.jsx";
import GrowthFocusSection from "../components/insights/GrowthFocusSection.jsx";
import { FiLoader } from "react-icons/fi"; // For loading state

const InsightsPage = () => {
	// In a real app, entries might come from props, context, or a store
	const allEntries = sampleJournalEntries;

	// Memoize entries once to avoid re-processing if the source data doesn't change
	// This is a shallow memoization, if allEntries itself is a new array instance, this will re-run
	const memoizedEntries = useMemo(() => allEntries, [allEntries]);

	const [activityFilteredEntries, setActivityFilteredEntries] =
		useState(memoizedEntries);
	const [currentPeriodLabel, setCurrentPeriodLabel] = useState("All-time"); // Default or derived

	// Callback for ActivityStatsSection to update filtered data used by other sections
	const handleActivityFilterChange = React.useCallback(
		(filteredData, periodLabel) => {
			setActivityFilteredEntries(filteredData);
			setCurrentPeriodLabel(periodLabel);
		},
		[]
	);

	if (!memoizedEntries) {
		// This case might be for when data is loading asynchronously
		return (
			<div className="min-h-screen bg-white flex flex-col items-center justify-center text-brandGreen-100 p-8">
				<FiLoader className="text-5xl animate-spin mb-4" />
				<p className="text-xl">Loading insights...</p>
			</div>
		);
	}

	if (memoizedEntries.length === 0) {
		return (
			<div className="min-h-screen bg-white flex flex-col items-center justify-center text-center text-brandGreen-100 p-8">
				<h1 className="text-3xl font-bold mb-4">Insights</h1>
				<p className="text-brandGreen-200 text-lg">
					No journal entries yet. Start journaling to see your insights!
				</p>
				{/* You could add a button/link to the journaling page here */}
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-brandGreen-50 text-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
			<header className="mb-6 sm:mb-8 md:mb-10">
				<h1
					className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brandGreen-500 animate-fadeIn"
					style={{ animationDelay: "0.1s" }}
				>
					Your Insights
				</h1>
				<p
					className="text-brandGreen-900 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg animate-fadeIn"
					style={{ animationDelay: "0.2s" }}
				>
					Discover patterns and reflect on your journey.
				</p>
			</header>

			<div className="space-y-8 sm:space-y-10 lg:space-y-12">
				<StreaksSection entries={memoizedEntries} />
				<ActivityStatsSection
					entries={memoizedEntries}
					onFilterChange={handleActivityFilterChange}
				/>
				<MoodDeepDiveSection entries={memoizedEntries} />
				<ContentInsightsSection
					filteredEntries={activityFilteredEntries}
					periodLabel={currentPeriodLabel}
				/>
				<GrowthFocusSection
					filteredEntries={activityFilteredEntries}
					periodLabel={currentPeriodLabel}
				/>
			</div>
		</div>
	);
};

export default InsightsPage;
