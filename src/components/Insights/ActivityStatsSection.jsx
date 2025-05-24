// src/components/insights/ActivityStatsSection.jsx
import React from "react";
import EntriesActivityCard from "./EntriesActivityCard";
import JournaledDaysSummaryCard from "./JournaledDaysSummaryCard";
import WordsWrittenSummaryCard from "./WordsWrittenSummaryCard";
import PhotosAddedSummaryCard from "./PhotosAddedSummaryCard";

const ActivityStatsSection = ({ entries, onFilterChange }) => {
	// This local state will hold the filtered entries passed from EntriesActivityCard
	const [currentFilteredEntries, setCurrentFilteredEntries] =
		React.useState(entries);

	const handleInternalFilterChange = (filteredData, periodLabel) => {
		setCurrentFilteredEntries(filteredData);
		onFilterChange(filteredData, periodLabel); // Propagate up
	};

	return (
		<section>
			<h2
				className="text-2xl font-semibold text-brandGreen-500 mb-4 animate-fadeIn"
				style={{ animationDelay: "0.6s" }}
			>
				Activity Stats
			</h2>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
				<div className="lg:col-span-2">
					<EntriesActivityCard
						entries={entries}
						onFilterChange={handleInternalFilterChange}
						delay={6}
					/>
				</div>
				<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 content-start">
					<JournaledDaysSummaryCard
						filteredEntries={currentFilteredEntries}
						delay={7}
					/>
					<WordsWrittenSummaryCard
						filteredEntries={currentFilteredEntries}
						delay={8}
					/>
					<PhotosAddedSummaryCard
						filteredEntries={currentFilteredEntries}
						delay={9}
					/>
				</div>
			</div>
		</section>
	);
};

export default ActivityStatsSection;
