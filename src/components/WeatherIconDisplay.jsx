// src/components/ui/WeatherIconDisplay.jsx (Example location)
import React from "react";
import { getWeatherIconElement } from "../utils/weatherUtils.jsx";

/**
 * Renders a weather icon based on the provided condition string.
 * Accepts optional size and className props for customization.
 */
const WeatherIconDisplay = ({ condition, size = 24, className = "" }) => {
	// Get the icon JSX element from the utility function
	const IconElement = getWeatherIconElement(condition, size);

	// If the utility function somehow returned null/undefined (it shouldn't with current logic)
	if (!IconElement) {
		return null; // Or return a default placeholder span/div if preferred
	}

	// Render the icon, wrapped in a span to easily apply custom classes
	return (
		<span className={`inline-flex items-center justify-center ${className}`}>
			{IconElement}
		</span>
	);
};

export default WeatherIconDisplay;
