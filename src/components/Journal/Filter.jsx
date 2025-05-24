// src/components/Journal/FilterPanel.jsx
import React from "react";
import {
	AiOutlineSearch,
	AiOutlineClear,
	AiOutlineDown,
	AiOutlineUp,
} from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { useNavigate } from "react-router-dom";

// Helper component for labels
const InputLabel = ({ htmlFor, children }) => (
	<label
		htmlFor={htmlFor}
		className="block text-sm font-medium text-white mb-1"
	>
		{children}
	</label>
);

// Input styling
const inputClasses =
	"block w-full rounded-md border-gray-300 shadow-sm focus:border-brandGreen-500 focus:ring-brandGreen-500 sm:text-sm p-2 bg-white disabled:bg-gray-100 transition duration-150 ease-in-out text-gray-800";

const FilterPanel = ({
	isFilterOpen,
	setIsFilterOpen,
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	selectedMood,
	setSelectedMood,
	moodOptions, // <<< Now received as a prop
	searchTerm,
	setSearchTerm,
	onlyWithGoal,
	setOnlyWithGoal,
	resetFilters,
	isLoading,
	hasActiveFilters,
	minDataDate,
	currentDateString,
}) => {
	const navigate = useNavigate();

	const moodLabels = [
		{ value: "😊", label: "😊 Happy" },
		{ value: "😔", label: "😔 Sad" },
		{ value: "😠", label: "😠 Angry" },
		{ value: "😄", label: "😄 Joyful" },
		{ value: "😐", label: "😐 Neutral" },
		{ value: "😩", label: "😩 Stressed" },
		{ value: "😴", label: "😴 Tired" },
	];

	// Merging dynamic moodOptions with hardcoded labels (optional logic)
	const mergedMoodOptions = moodOptions.map((opt) => {
		const labelObj = moodLabels.find((m) => m.value === opt.value);
		return {
			...opt,
			label: labelObj ? labelObj.label : opt.label,
		};
	});

	const handleGoalToggle = () => {
		setOnlyWithGoal(!onlyWithGoal);
	};

	const newJournalEntry = () => {
		navigate("/journal/new");
		// window.location.href = "/journal/new";
	};

	return (
		<>
			{/* Filter Toggle Button */}
			<div className="mb-2 flex justify-end">
				<button
					onClick={() => setIsFilterOpen(!isFilterOpen)}
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brandGreen-600 hover:bg-brandGreen-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandGreen-500 disabled:opacity-50 transition duration-150 ease-in-out"
					disabled={isLoading}
					aria-controls="filter-panel"
					aria-expanded={isFilterOpen}
				>
					<FiFilter className="mr-2 h-4 w-4" />
					{isFilterOpen ? "Hide Filters" : "Show Filters"}
					{isFilterOpen ? (
						<AiOutlineUp className="ml-2 h-4 w-4" />
					) : (
						<AiOutlineDown className="ml-2 h-4 w-4" />
					)}
				</button>
				<button
					onClick={newJournalEntry}
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brandGreen-600 hover:bg-brandGreen-700 ml-2"
				>
					<FaRegEdit className="mr-2 h-4 w-4" />
					New Entry
				</button>
			</div>

			{/* Collapsible Filter Panel */}
			<div
				id="filter-panel"
				className={`transition-all duration-300 ease-in-out overflow-hidden ${
					isFilterOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className="bg-brandGreen-500 p-6 rounded-lg shadow-lg border border-brandGreen-200">
					<h2 className="text-xl font-semibold text-white mb-4">
						Filter Options
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-end">
						{/* Start Date */}
						<div>
							<InputLabel htmlFor="startDate">Start Date</InputLabel>
							<input
								type="date"
								id="startDate"
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								className={inputClasses}
								disabled={isLoading}
								min={minDataDate || undefined} // Set min attribute
								max={endDate || currentDateString} // Set max attribute
							/>
						</div>

						{/* End Date */}
						<div>
							<InputLabel htmlFor="endDate">End Date</InputLabel>
							<input
								type="date"
								id="endDate"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
								className={inputClasses}
								disabled={isLoading}
								min={startDate || minDataDate || undefined} // Set min attribute
								max={currentDateString} // Set max attribute (today)
							/>
						</div>

						{/* Mood Selector - Uses the passed moodOptions prop */}
						<div>
							<InputLabel htmlFor="moodSelect">Mood</InputLabel>
							<select
								id="moodSelect"
								value={selectedMood}
								onChange={(e) => setSelectedMood(e.target.value)}
								className={inputClasses}
								disabled={isLoading}
							>
								<option value="">All Moods</option>
								{/* Iterate over the dynamic moodOptions prop */}
								{mergedMoodOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						</div>

						{/* Search Box */}
						<div className="sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1">
							<InputLabel htmlFor="searchBox">Search</InputLabel>
							<div className="relative">
								<input
									type="text"
									id="searchBox"
									placeholder="Search title or body..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className={`${inputClasses} pr-10`}
									disabled={isLoading}
								/>
								<AiOutlineSearch
									size={20}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
								/>
							</div>
						</div>

						{/* Actions column */}
						<div className="flex flex-col items-start space-y-3 sm:flex-row sm:items-end sm:space-y-0 sm:space-x-4">
							{/* Goal Toggle Button */}
							<button
								type="button"
								onClick={handleGoalToggle}
								disabled={isLoading}
								title={
									onlyWithGoal
										? "Filtering by entries with goals"
										: "Show all entries regardless of goal"
								}
								className={`flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brandGreen-500 ${
									onlyWithGoal
										? "bg-brandGreen-600 text-white hover:bg-brandGreen-700 focus:ring-brandGreen-700"
										: "bg-brandGreen-100 text-brandGreen-700 hover:bg-brandGreen-200 focus:ring-brandGreen-200"
								} disabled:bg-gray-100 disabled:text-gray-400`}
							>
								<GoGoal className="mr-1 h-4 w-4" />
								Has Goal
							</button>

							{/* Clear Filters Button */}
							<button
								onClick={resetFilters}
								className="flex items-center justify-center px-3 py-2 bg-brandGreen-100 text-brandGreen-700 hover:bg-brandGreen-200 rounded-md text-sm font-medium transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 w-full sm:w-auto"
								disabled={isLoading || !hasActiveFilters}
								title="Clear all filters"
							>
								<AiOutlineClear className="mr-1 h-4 w-4" />
								Clear
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FilterPanel;
