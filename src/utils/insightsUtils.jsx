// src/utils/insightsUtils.js
import {
	parseEntryDate,
	isSameDay,
	subDays,
	getWeek,
	getYear,
	getToday,
	differenceInCalendarDays,
} from "./dateUtils";

// Helper to sort entries by date descending
const sortEntriesByDateDesc = (entries) =>
	[...entries].sort((a, b) => parseEntryDate(b.date) - parseEntryDate(a.date));

export const calculateCurrentDailyStreak = (entries) => {
	if (!entries || entries.length === 0) return 0;
	const sortedEntries = sortEntriesByDateDesc(entries);
	let streak = 0;
	let currentDate = getToday();

	const uniqueEntryDates = new Set(
		sortedEntries.map((entry) => parseEntryDate(entry.date).toISOString())
	);

	if (!uniqueEntryDates.has(currentDate.toISOString())) {
		// If no entry today, check if yesterday was part of a streak
		currentDate = subDays(currentDate, 1);
		if (!uniqueEntryDates.has(currentDate.toISOString())) {
			return 0; // No entry today or yesterday
		}
	}

	// Check from today (or yesterday if no entry today but yesterday had one)
	while (uniqueEntryDates.has(currentDate.toISOString())) {
		streak++;
		currentDate = subDays(currentDate, 1);
	}
	return streak;
};

export const calculateLongestDailyStreak = (entries) => {
	if (!entries || entries.length === 0) return 0;

	const uniqueDates = [
		...new Set(entries.map((e) => parseEntryDate(e.date).getTime())),
	].sort((a, b) => a - b); // Ascending sort of timestamps

	if (uniqueDates.length === 0) return 0;

	let longestStreak = 0;
	let currentStreak = 0;

	for (let i = 0; i < uniqueDates.length; i++) {
		if (i === 0) {
			currentStreak = 1;
		} else {
			const diff = differenceInCalendarDays(
				new Date(uniqueDates[i]),
				new Date(uniqueDates[i - 1])
			);
			if (diff === 1) {
				currentStreak++;
			} else {
				longestStreak = Math.max(longestStreak, currentStreak);
				currentStreak = 1; // Reset streak
			}
		}
	}
	longestStreak = Math.max(longestStreak, currentStreak); // Final check
	return longestStreak;
};

export const calculateLongestWeeklyStreak = (entries) => {
	if (!entries || entries.length === 0) return 0;

	const entriesByWeek = {};
	entries.forEach((entry) => {
		const date = parseEntryDate(entry.date);
		const year = getYear(date);
		const week = getWeek(date, { weekStartsOn: 1 }); // Monday as start of week
		const weekKey = `${year}-W${String(week).padStart(2, "0")}`;
		entriesByWeek[weekKey] = true;
	});

	const sortedWeekKeys = Object.keys(entriesByWeek).sort();
	if (sortedWeekKeys.length === 0) return 0;

	let longestStreak = 0;
	let currentStreak = 0;

	for (let i = 0; i < sortedWeekKeys.length; i++) {
		if (i === 0) {
			currentStreak = 1;
		} else {
			const [prevYear, prevWeekStr] = sortedWeekKeys[i - 1].split("-W");
			const [currYear, currWeekStr] = sortedWeekKeys[i].split("-W");
			const prevWeekNum = parseInt(prevWeekStr);
			const currWeekNum = parseInt(currWeekStr);

			// Check for consecutive weeks
			// This simple check works if weeks are within the same year or consecutive years
			// A more robust solution would use date-fns's week manipulation more directly for edge cases like year boundaries
			if (
				parseInt(currYear) === parseInt(prevYear) &&
				currWeekNum === prevWeekNum + 1
			) {
				currentStreak++;
			} else if (
				parseInt(currYear) === parseInt(prevYear) + 1 &&
				currWeekNum === 1 &&
				prevWeekNum >= 52
			) {
				// Handle year transition (e.g. week 52/53 of prev year to week 1 of curr year)
				const prevDate = new Date(parseInt(prevYear), 11, 31); // Approx end of year
				const prevActualWeek = getWeek(prevDate, { weekStartsOn: 1 });
				if (prevWeekNum === prevActualWeek)
					currentStreak++; // If last week of prev year
				else {
					// Discontinuity
					longestStreak = Math.max(longestStreak, currentStreak);
					currentStreak = 1;
				}
			} else {
				longestStreak = Math.max(longestStreak, currentStreak);
				currentStreak = 1;
			}
		}
	}
	longestStreak = Math.max(longestStreak, currentStreak);
	return longestStreak;
};

export const getWordFrequency = (texts, stopWordsSet) => {
	const wordCounts = {};
	texts.forEach((text) => {
		// Ensure text is a non-empty string before processing
		if (typeof text !== "string" || text.trim() === "") return;

		const words = text.toLowerCase().match(/\b(\w+)\b/g) || []; // Get words
		words.forEach((word) => {
			if (!stopWordsSet.has(word) && word.length > 2) {
				// Exclude stop words and short words
				wordCounts[word] = (wordCounts[word] || 0) + 1;
			}
		});
	});

	// If no words were counted, return an empty array immediately
	if (Object.keys(wordCounts).length === 0) {
		return [];
	}

	return Object.entries(wordCounts)
		.map(([text, value]) => ({ text, value }))
		.sort((a, b) => b.value - a.value) // Sort by frequency
		.slice(0, 100); // Take top 100 words
};
