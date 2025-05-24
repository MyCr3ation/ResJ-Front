// src/pages/CreateJournal.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import useStore from "../store/store.jsx"; // Assuming path is correct
import { SAMPLE_REFLECTION_QUESTION } from "../data/sampleData"; // Assuming path is correct

import JournalForm from "../components/JournalForm"; // Assuming path is correct

const TODAY_DATE = new Date().toISOString().split("T")[0];
const DEFAULT_LOCATION = "Dubai";

const initialJournalState = {
	date: TODAY_DATE,
	mood: "",
	title: "",
	body: "",
	goal: "",
	affirmation: "",
	reflection: "",
	reflectionQuestion: "",
	rid: null,
	media: [],
	temperaturef: null,
	temperaturec: null,
	condition: null,
	location: null,
	quote: null,
};

const CreateJournal = () => {
	const journal = useStore((state) => state.store.journal);
	const setStore = useStore((state) => state.setStore);
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [userLocation, setUserLocation] = useState(null);
	const [mediaResetKey, setMediaResetKey] = useState(Date.now());
	const [isSubmitting, setIsSubmitting] = useState(false);

	// EFFECT 1: Load from Cookie / Initialize Store
	useEffect(() => {
		const savedDraft = Cookies.get("journalDraft");
		let draftData = null;
		if (savedDraft) {
			try {
				draftData = JSON.parse(savedDraft);
			} catch (error) {
				console.error("EFFECT 1: Error parsing draft:", error);
				Cookies.remove("journalDraft"); // Remove corrupted draft
			}
		}

		const effectiveDate =
			draftData?.date && /^\d{4}-\d{2}-\d{2}$/.test(draftData.date)
				? draftData.date
				: TODAY_DATE;

		const initialStateForStore = {
			...initialJournalState,
			...(draftData || {}),
			date: effectiveDate,
		};

		setStore("journal", initialStateForStore);
		setUploadedFiles([]);
		setMediaResetKey(Date.now());
	}, [setStore]);

	// EFFECT 2: Set Reflection Question
	useEffect(() => {
		const currentJournalState = useStore.getState().store.journal;

		if (currentJournalState && !currentJournalState.reflectionQuestion) {
			const sampleQuestion = SAMPLE_REFLECTION_QUESTION;
			setStore("journal.reflectionQuestion", sampleQuestion.question);
			setStore("journal.rid", sampleQuestion.rid);
			// Removed cookie update from here as EFFECT 3 will handle it
		}
	}, [setStore]); // Runs when setStore is available, effectively on mount and if setStore instance changed (rare)

	// EFFECT 3: Save to Cookie
	useEffect(() => {
		// Get the latest journal state directly from the store for saving
		// This ensures we're saving the most up-to-date version,
		// especially after multiple setStore calls might have happened (e.g., from EFFECT 1, EFFECT 2, Weather component)
		const currentJournalForCookie = useStore.getState().store.journal;

		if (
			currentJournalForCookie &&
			Object.keys(currentJournalForCookie).length > 0 &&
			currentJournalForCookie.date
		) {
			Cookies.set("journalDraft", JSON.stringify(currentJournalForCookie), {
				expires: 1,
			});
		}
	}, [journal]); // This effect depends on the 'journal' state from the store.
	// It runs after the initial render and any time 'journal' changes.

	useEffect(() => {
		const getLocation = async () => {
			let locationToSet = DEFAULT_LOCATION;
			if (navigator.geolocation) {
				try {
					const position = await new Promise((resolve, reject) =>
						navigator.geolocation.getCurrentPosition(resolve, reject, {
							timeout: 10000,
						})
					);
					const { latitude, longitude } = position.coords;
					const response = await fetch(
						`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
					);
					if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
					const data = await response.json();
					locationToSet =
						data.city ||
						data.locality ||
						data.principalSubdivision ||
						locationToSet;
				} catch (error) {
					console.error("Error getting location:", error);
				}
			} else {
				console.warn("Geolocation not supported.");
			}
			setUserLocation(locationToSet);
		};
		getLocation();
	}, []);

	const handleFileChange = (files) => {
		setUploadedFiles(files);
	};

	const handleInputChange = (name, value) => {
		setStore(`journal.${name}`, value);
	};

	const handleDateChange = (value) => {
		const validDate =
			value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : TODAY_DATE;
		setStore("journal.date", validDate);
	};

	const handleMoodChange = (emoji) => {
		setStore("journal.mood", emoji);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsSubmitting(true);
		const currentJournal = useStore.getState().store.journal;
		if (!currentJournal?.date) {
			toast.error("Date is missing.");
			setIsSubmitting(false);
			return;
		}
		if (!currentJournal?.title?.trim()) {
			toast.error("Title is missing.");
			setIsSubmitting(false);
			return;
		}
		if (!currentJournal?.body?.trim()) {
			toast.error("Story is missing.");
			setIsSubmitting(false);
			return;
		}
		if (!currentJournal?.mood) {
			toast.error("Mood is missing.");
			setIsSubmitting(false);
			return;
		}

		const journalDataToSubmit = {
			rid: currentJournal.rid,
			date: currentJournal.date,
			mood: currentJournal.mood,
			title: currentJournal.title,
			body: currentJournal.body,
			goal: currentJournal.goal,
			affirmation: currentJournal.affirmation,
			reflection_answer: currentJournal.reflection,
			reflectionQuestion: currentJournal.reflectionQuestion,
			temperaturec: currentJournal.temperaturec,
			temperaturef: currentJournal.temperaturef,
			condition: currentJournal.condition,
			location: currentJournal.location || userLocation || DEFAULT_LOCATION,
			quote: currentJournal.quote?.q,
			quote_author: currentJournal.quote?.a,
			media: uploadedFiles.map((file) => ({
				name: file.name,
				type: file.mediatype || file.type,
				size: file.size,
			})),
		};
		setTimeout(() => {
			toast.success("Entry saved! (Simulated)");
			// Reset the store to a fresh initial state
			const freshInitialState = {
				...initialJournalState,
				date: TODAY_DATE, // Ensure date is today
				// Keep the reflection question logic if needed, or fetch a new one
				reflectionQuestion: SAMPLE_REFLECTION_QUESTION.question,
				rid: SAMPLE_REFLECTION_QUESTION.rid,
			};
			setStore("journal", freshInitialState);

			setUploadedFiles([]);
			Cookies.remove("journalDraft");
			setMediaResetKey(Date.now());
			setIsSubmitting(false);
		}, 1000);
	};

	return (
		<JournalForm
			mode="create"
			formData={journal}
			userLocation={userLocation}
			onInputChange={handleInputChange}
			onDateChange={handleDateChange}
			onMoodChange={handleMoodChange}
			onFileChange={handleFileChange}
			onSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			mediaResetKey={mediaResetKey}
		/>
	);
};

export default CreateJournal;
