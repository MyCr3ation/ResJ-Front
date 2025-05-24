// src/pages/AllJournal.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";

// Import Sample Data and Components
import { sampleJournalEntries } from "../data/sampleJournalData";
import FilterPanel from "../components/Journal/Filter.jsx"; // Corrected path if needed
import RealContent from "../components/Journal/RealContent.jsx"; // Corrected path if needed
import SkeletonGrid from "../components/Journal/SkeletonGrid.jsx"; // Corrected path if needed

// Helper function to get date string in YYYY-MM-DD format
const getCurrentDateString = () => {
	return new Date().toISOString().split("T")[0];
};

// --- Main AllJournal Page Component ---
const AllJournal = () => {
	// --- State ---
	const [isLoading, setIsLoading] = useState(true);
	const [isMounted, setIsMounted] = useState(false);
	const [allJournalEntries] = useState(sampleJournalEntries);

	const [minDataDate, setMinDataDate] = useState(null);
	const [maxDataDate, setMaxDataDate] = useState(null);
	const currentDateString = useMemo(() => getCurrentDateString(), []);

	const [filterPanelDisable, setFilterPanelDisable] = useState(true);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [selectedMood, setSelectedMood] = useState("");
	const [onlyWithGoal, setOnlyWithGoal] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 30;

	// --- Calculate Unique Mood Options from Data ---
	const dynamicMoodOptions = useMemo(() => {
		if (!allJournalEntries || allJournalEntries.length === 0) {
			return []; // Return empty array if no data
		}

		// 1. Extract all moods
		const allMoods = allJournalEntries.map((entry) => entry.mood);

		// 2. Filter out falsy values (null, undefined, '') and get unique moods
		const uniqueMoods = [...new Set(allMoods.filter(Boolean))];

		// 3. Sort the unique moods (optional, for consistent order)
		uniqueMoods.sort();

		// 4. Format for the select dropdown
		return uniqueMoods.map((mood) => ({
			value: mood,
			label: `${mood}`, // You can customize the label here e.g., `${mood} Mood`
		}));
	}, [allJournalEntries]); // Dependency: recalculate only if data changes

	// --- Calculate Min/Max Dates & Set Initial Filter Dates ---
	useEffect(() => {
		let earliestDate = null;
		let latestDate = null;

		if (allJournalEntries.length > 0) {
			const sortedDates = allJournalEntries
				.map((entry) => entry.date)
				.filter(Boolean)
				.sort();

			if (sortedDates.length > 0) {
				earliestDate = sortedDates[0];
				latestDate = sortedDates[sortedDates.length - 1];
			}
		}

		setMinDataDate(earliestDate);
		setMaxDataDate(latestDate);
		setStartDate(earliestDate || "");
		// Use latestDate if available, otherwise fall back to currentDateString
		setEndDate(latestDate || currentDateString);

		const loadingTimer = setTimeout(() => {
			setIsLoading(false);
		}, 500);

		return () => clearTimeout(loadingTimer);
	}, [allJournalEntries, currentDateString]);

	// --- Effect to Handle Content Fade-in After Loading ---
	useEffect(() => {
		let fadeInTimer;
		if (!isLoading) {
			fadeInTimer = setTimeout(() => {
				setIsMounted(true);
			}, 50);
		} else {
			setIsMounted(false);
		}
		return () => clearTimeout(fadeInTimer);
	}, [isLoading]);

	// --- Effect to Disable/Enable Filter Panel ---
	useEffect(() => {
		const shouldDisable = isLoading || allJournalEntries.length === 0;
		setFilterPanelDisable(shouldDisable);
	}, [isLoading, allJournalEntries]);

	// --- Filter Logic ---
	const getFilteredEntries = useCallback(() => {
		if (
			isLoading ||
			(allJournalEntries.length > 0 && (!minDataDate || !maxDataDate))
		) {
			return [];
		}

		return allJournalEntries.filter((entry) => {
			if (entry.date) {
				if (startDate && entry.date < startDate) return false;
				if (endDate && entry.date > endDate) return false;
			} else if (startDate || endDate) {
				return false;
			}
			if (selectedMood && entry.mood !== selectedMood) return false;
			if (onlyWithGoal && !entry.goal) return false;
			const lowerSearch = searchTerm.toLowerCase();
			if (searchTerm) {
				const titleMatch = entry.title?.toLowerCase().includes(lowerSearch);
				const bodyMatch = entry.body?.toLowerCase().includes(lowerSearch);
				if (!titleMatch && !bodyMatch) return false;
			}
			return true;
		});
	}, [
		allJournalEntries,
		startDate,
		endDate,
		selectedMood,
		onlyWithGoal,
		searchTerm,
		isLoading,
		minDataDate,
		maxDataDate,
	]);

	// --- Calculate Pagination ---
	const filteredEntriesResult = getFilteredEntries();
	const totalItems = filteredEntriesResult.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentEntries = !isLoading
		? filteredEntriesResult.slice(startIndex, endIndex)
		: [];

	// --- Reset Pagination on Filter Change ---
	useEffect(() => {
		setCurrentPage(1);
	}, [startDate, endDate, selectedMood, onlyWithGoal, searchTerm]);

	// --- Filter Reset Logic ---
	const resetFilters = () => {
		setStartDate(minDataDate || "");
		setEndDate(maxDataDate || currentDateString);
		setSelectedMood("");
		setOnlyWithGoal(false);
		setSearchTerm("");
		setIsFilterOpen(false); // Optionally close panel on reset
		setCurrentPage(1);
	};

	// --- Check for Active Filters ---
	const hasActiveFilters = useMemo(() => {
		const initialStartDate = minDataDate || "";
		const initialEndDate = maxDataDate || currentDateString;

		return (
			startDate !== initialStartDate ||
			endDate !== initialEndDate ||
			!!selectedMood ||
			onlyWithGoal ||
			!!searchTerm
		);
	}, [
		startDate,
		endDate,
		selectedMood,
		onlyWithGoal,
		searchTerm,
		minDataDate,
		maxDataDate,
		currentDateString,
	]);

	// --- Render ---
	return (
		<div className="min-h-screen bg-brandGreen-50 py-10">
			<div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold text-center mb-6 text-brandGreen-800">
					Journal Entries
				</h1>

				{/* Filter Panel - Pass dynamic mood options */}
				<FilterPanel
					isFilterOpen={isFilterOpen}
					setIsFilterOpen={setIsFilterOpen}
					startDate={startDate}
					setStartDate={setStartDate}
					endDate={endDate}
					setEndDate={setEndDate}
					selectedMood={selectedMood}
					setSelectedMood={setSelectedMood}
					moodOptions={dynamicMoodOptions} // <-- Pass the calculated options
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					onlyWithGoal={onlyWithGoal}
					setOnlyWithGoal={setOnlyWithGoal}
					resetFilters={resetFilters}
					isLoading={filterPanelDisable}
					hasActiveFilters={hasActiveFilters}
					minDataDate={minDataDate}
					currentDateString={currentDateString}
				/>

				{/* --- Content Area --- */}
				<div className="mt-6">
					{isLoading ? (
						<SkeletonGrid count={10} />
					) : (
						<div
							className={`transition-opacity duration-500 ease-in-out ${
								isMounted ? "opacity-100" : "opacity-0"
							}`}
						>
							<RealContent
								currentEntries={currentEntries}
								allJournalEntries={allJournalEntries} // Pass all for potential "No results" message context
								hasActiveFilters={hasActiveFilters}
								resetFilters={resetFilters} // Pass reset for the "No results" component
								totalPages={totalPages}
								currentPage={currentPage}
								onPageChange={setCurrentPage}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AllJournal;
