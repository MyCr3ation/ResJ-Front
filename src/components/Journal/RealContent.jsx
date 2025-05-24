import React, { useEffect } from "react";
import JournalCard from "./Journal";
import Pagination from "../Pagination.jsx";
import { AiOutlineClear } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

const RealContent = ({
	currentEntries,
	allJournalEntries, // Needed to differentiate "no data" vs "no results"
	hasActiveFilters,
	resetFilters,
	totalPages,
	currentPage,
	onPageChange,
}) => {
	const newJournalEntry = () => {
		window.location.href = "/journal/new";
	};

	return (
		<>
			{currentEntries.length > 0 ? (
				// Grid for actual entries
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
					{currentEntries.map((entry) => (
						<JournalCard key={entry.id} entry={entry} />
					))}
				</div>
			) : (
				// "No Entries" message block
				<div className="text-center py-16 bg-white rounded-lg shadow border border-gray-200">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="mx-auto h-12 w-12 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={1.5}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9 9.75h.008v.008H9V9.75Zm6 0h.008v.008H15V9.75Z"
						/>
					</svg>
					<h3 className="mt-2 text-lg font-medium text-gray-800">
						{allJournalEntries.length === 0
							? "No journal entries yet"
							: "No matching entries found"}
					</h3>
					<p className="mt-1 text-sm text-gray-500">
						{allJournalEntries.length === 0
							? "Start writing to see your entries here!"
							: "Try adjusting your filters or clearing them."}
					</p>
					{/* Show Clear Filters button only if filters are active and resulted in no entries */}
					{allJournalEntries.length > 0 &&
						hasActiveFilters &&
						currentEntries.length === 0 && (
							<div className="mt-6">
								<button
									onClick={resetFilters}
									className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brandGreen-600 hover:bg-brandGreen-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandGreen-500"
								>
									<AiOutlineClear className="mr-1 h-4 w-4" />
									Clear Filters
								</button>
							</div>
						)}
					{/* Show Create First Entry button only if there's absolutely no data */}
					{allJournalEntries.length === 0 && (
						<div className="mt-6">
							<button
								onClick={newJournalEntry}
								className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brandGreen-600 hover:bg-brandGreen-700 ml-2"
							>
								<FaRegEdit className="mr-2 h-4 w-4" />
								New Entry
							</button>
						</div>
					)}
				</div>
			)}

			{/* Pagination Component (Render only if needed and content is visible) */}
			{totalPages > 1 && currentEntries.length > 0 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={onPageChange}
				/>
			)}
		</>
	);
};

export default RealContent;
