// src/pages/EditJournal.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { sampleJournalEntries } from "../data/sampleJournalData.js";
import JournalForm from "../components/JournalForm";
import EditJournalLoadingSkeleton from "../components/Journal/EditJournalSkeleton.jsx";

const deepEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
const TODAY_DATE_EDIT = new Date().toISOString().split("T")[0];

const EditJournal = () => {
	const { jid } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState(null);
	const [originalData, setOriginalData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setError(null);
		setFormData(null);
		setOriginalData(null);
		const timer = setTimeout(() => {
			if (!jid) {
				setError("Journal ID is missing.");
				setIsLoading(false);
				return;
			}
			const entry = sampleJournalEntries.find(
				(e) => String(e.id) === String(jid)
			);
			console.log("Entry:", entry);
			if (entry) {
				let formattedDate = TODAY_DATE_EDIT;
				if (entry.date) {
					/* ... existing date formatting logic from previous answer ... */
					const inputDate = entry.date;
					if (typeof inputDate === "string") {
						if (/^\d{4}-\d{2}-\d{2}$/.test(inputDate))
							formattedDate = inputDate;
						else {
							try {
								const pD = new Date(inputDate);
								if (!isNaN(pD.getTime()))
									formattedDate = pD.toISOString().split("T")[0];
								else console.warn(`Could not parse date: ${inputDate}`);
							} catch (e) {
								console.error("Err parsing date:", inputDate, e);
							}
						}
					} else if (inputDate instanceof Date && !isNaN(inputDate.getTime()))
						formattedDate = inputDate.toISOString().split("T")[0];
					else if (inputDate.seconds && typeof inputDate.seconds === "number") {
						try {
							formattedDate = new Date(inputDate.seconds * 1000)
								.toISOString()
								.split("T")[0];
						} catch (e) {
							console.error("Err parsing TS:", inputDate, e);
						}
					} else console.warn(`Unrecognized date: ${inputDate}`);
				}
				const currentFormData = {
					date: formattedDate,
					mood: entry.mood || "",
					title: entry.title || "",
					body: entry.body || "",
					goal: entry.goal || "",
					affirmation: entry.affirmation || "",
					reflection: entry.reflection?.answer || "",
				};
				const currentOriginalData = {
					weather: entry.weather || null,
					quote: entry.quote || null,
					reflectionQuestion: entry.reflection?.question || "No question.",
					media: entry.media || [],
					_initialFormData: { ...currentFormData },
					_initialMedia: [...(entry.media || [])],
				};
				setFormData(currentFormData);
				setOriginalData(currentOriginalData);
				setIsLoading(false);
			} else {
				setError(`Entry not found (ID: ${jid}).`);
				toast.error(`Error: Entry not found.`);
				setIsLoading(false);
			}
		}, 1000);
		return () => clearTimeout(timer);
	}, [jid]);

	// This handler is passed to JournalForm as onInputChange
	// JournalForm adapts it for Input's setState prop: (val) => onInputChange("fieldName", val)
	const handleInputChange = useCallback((name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	}, []);

	// This handler is passed to JournalForm as onDateChange
	// JournalForm passes it directly as setState for the date Input, which expects (value)
	const handleDateChange = useCallback((value) => {
		const validDate =
			value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : TODAY_DATE_EDIT;
		setFormData((prev) => ({ ...prev, date: validDate })); // Update formData directly
	}, []);

	const handleMoodChange = useCallback((emoji) => {
		setFormData((prev) => ({ ...prev, mood: emoji }));
	}, []);

	const handleDeleteMedia = useCallback((mediaUrl) => {
		if (window.confirm("Remove media locally?")) {
			setOriginalData((prev) => ({
				...prev,
				media: prev.media.filter((m) => m.url !== mediaUrl),
			}));
			toast.success("Media removed locally.");
		}
	}, []);

	const handleFileChange = (files) => {
		toast.info("Adding new files disabled in edit.");
	};
	const handleCancel = () => {
		navigate(`/journal/view/${jid}`);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		const toastId = toast.loading("Simulating update...");
		if (
			!formData?.date ||
			!formData?.mood ||
			!formData?.title ||
			!formData?.body
		) {
			toast.error("Fill Date, Mood, Title, Story.", { id: toastId });
			setIsSubmitting(false);
			return;
		}
		setTimeout(() => {
			const dataToUpdate = {
				id: jid,
				...formData,
				weather: originalData.weather,
				quote: originalData.quote,
				reflectionQuestion: originalData.reflectionQuestion,
				media: originalData.media,
			};
			console.log("Simulated Update:", dataToUpdate);
			console.log("Data updated");
			toast.success("Update simulated!", { id: toastId });
			setIsSubmitting(false);
			navigate(`/journal/view/${jid}`);
		}, 1500);
	};

	const canSaveChanges = useCallback(() => {
		if (
			!formData ||
			!originalData?._initialFormData ||
			!originalData?._initialMedia
		)
			return false;
		const formChanged = !deepEqual(formData, originalData._initialFormData);
		const mediaChanged = !deepEqual(
			originalData.media.map((m) => m.url).sort(),
			originalData._initialMedia.map((m) => m.url).sort()
		);
		return formChanged || mediaChanged;
	}, [formData, originalData]);

	if (isLoading) return <EditJournalLoadingSkeleton />;
	if (error || !formData || !originalData)
		return (
			<div className="text-center p-6 bg-red-100 text-red-700">
				{" "}
				<p>{error || "Could not load data."}</p>{" "}
				<button
					onClick={() => navigate("/journal/view")}
					className="mt-2 px-3 py-1 bg-brandGreen-600 text-white rounded"
				>
					Back
				</button>{" "}
			</div>
		);

	return (
		<JournalForm
			mode="edit"
			formData={formData}
			originalData={originalData}
			onInputChange={handleInputChange} // Passed to JournalForm
			onDateChange={handleDateChange} // Passed to JournalForm
			onMoodChange={handleMoodChange} // Passed to JournalForm
			onDeleteMedia={handleDeleteMedia}
			onFileChange={handleFileChange}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
			isSubmitting={isSubmitting}
			canSaveChanges={canSaveChanges()}
		/>
	);
};

export default EditJournal;
