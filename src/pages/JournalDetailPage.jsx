// src/pages/JournalDetailPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sampleJournalEntries } from "../data/sampleJournalData.js";
import LoadingPlaceholder from "../components/Journal/LoadingPlaceholder.jsx";
import JournalDetailView from "../components/Journal/JournalDetailView.jsx";

const JournalDetailPage = () => {
	const [journalEntry, setJournalEntry] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { jid: journalIdParam } = useParams(); // Get ID string from URL, renamed to avoid conflict
	const navigate = useNavigate();

	useEffect(() => {
		const findJournalEntry = () => {
			if (!journalIdParam) {
				setError("No Journal ID provided in URL.");
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			setError(null);
			setJournalEntry(null);

			// Simulate loading delay
			const timer = setTimeout(() => {
				const numericJournalId = Number(journalIdParam);

				if (isNaN(numericJournalId)) {
					console.error("Invalid Journal ID format:", journalIdParam);
					setError("Invalid Journal ID format in URL.");
					setIsLoading(false);
					return;
				}

				const entry = sampleJournalEntries.find(
					(e) => e.id === numericJournalId
				);

				if (entry) {
					setJournalEntry(entry);
				} else {
					setError(`Journal entry with ID ${numericJournalId} not found.`);
				}
				setIsLoading(false); // Loading finished
			}, 300); // 300ms delay simulation

			// Cleanup timer
			return () => clearTimeout(timer);
		};

		findJournalEntry();
	}, [journalIdParam]); // Depend on the ID from the URL parameter

	// --- Render states ---

	if (isLoading) {
		return <LoadingPlaceholder />;
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-brandGreen-100 to-brandGreen-300 p-8 flex justify-center items-center">
				<div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md text-center max-w-md">
					<p className="font-bold text-lg mb-2">Error</p>
					<p>{error}</p>
					<button
						onClick={() => navigate("/journal")} // Navigate back to list or appropriate route
						className="mt-4 px-4 py-2 bg-brandGreen-600 text-white rounded hover:bg-brandGreen-700 transition duration-150 ease-in-out"
					>
						Back to Journal List
					</button>
				</div>
			</div>
		);
	}

	// This condition should technically be covered by the error state if not found,
	// but kept as a safeguard.
	if (!journalEntry) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-brandGreen-100 to-brandGreen-300 p-8 flex justify-center items-center">
				<div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-lg shadow-md text-center max-w-md">
					<p className="font-bold text-lg mb-2">Not Found</p>
					<p>The requested journal entry could not be loaded.</p>
					<button
						onClick={() => navigate("/journal")}
						className="mt-4 px-4 py-2 bg-brandGreen-600 text-white rounded hover:bg-brandGreen-700 transition duration-150 ease-in-out"
					>
						Back to Journal List
					</button>
				</div>
			</div>
		);
	}

	// Render the actual view component, passing the entry data AND the ID
	return (
		<JournalDetailView
			journalEntry={journalEntry}
			journalId={journalEntry.id} // Pass the ID from the loaded entry object
		/>
	);
};

export default JournalDetailPage;
