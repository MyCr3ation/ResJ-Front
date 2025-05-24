// src/sampleData.js

export const SAMPLE_QUOTE = {
	q: "The journey of a thousand miles begins with a single step.",
	a: "Lao Tzu",
};

export const SAMPLE_REFLECTION_QUESTION = {
	question:
		"What was one thing today that challenged you and how did you respond?",
	rid: "sample-rid-123", // Example ID
};

// Function to get sample weather based on location (or default)
export const getSampleWeather = (location) => {
	// You could add more sophisticated logic here to return different
	// sample data based on location if needed, but for now, it's static.
	const tempF = 72.5;
	const tempC = ((tempF - 32) * 5) / 9;
	return {
		temperaturef: tempF,
		temperaturec: tempC,
		condition: "Mostly Sunny",
		location: location || "Sample City, CA", // Use provided location or default
	};
};
