import React, { useState, useEffect } from "react";
import SectionTitle from "../common/SectionTitle.jsx"; // Assuming path is correct
import useStore from "../../store/store.jsx"; // Assuming path is correct
import { getSampleWeather } from "../../data/sampleData.js"; // Import sample data function
import ShimmerDiv from "../Common/ShimmerDiv.jsx";

const WeatherSkeleton = () => {
	return (
		<div className="space-y-2 mt-4">
			{/* Location */}
			<ShimmerDiv width="2/3" height="4" />
			{/* Condition */}
			<ShimmerDiv width="1/2" height="4" />
			{/* Temperature */}
			<ShimmerDiv width="1/4" height="4" />
		</div>
	);
};

const Weather = ({ userLocation }) => {
	// Local state for display and unit conversion
	const [displayTemp, setDisplayTemp] = useState(null);
	const [displayUnit, setDisplayUnit] = useState("F"); // Default display unit
	const [displayLocation, setDisplayLocation] = useState("");
	const [displayCondition, setDisplayCondition] = useState("");
	const setStore = useStore((state) => state.setStore);

	// Store actual fetched values separately for conversion
	const [tempF, setTempF] = useState(null);
	const [tempC, setTempC] = useState(null);

	useEffect(() => {
		// Simulate fetching weather based on userLocation prop
		const sampleWeather = getSampleWeather(userLocation); // Get sample data

		setTempF(sampleWeather.temperaturef);
		setTempC(sampleWeather.temperaturec);
		setDisplayLocation(sampleWeather.location);
		setDisplayCondition(sampleWeather.condition);

		// Set initial display temperature based on the default unit
		setDisplayTemp(
			displayUnit === "F"
				? sampleWeather.temperaturef
				: sampleWeather.temperaturec
		);

		// Update the global journal store with weather data.
		setStore("journal.temperaturef", sampleWeather.temperaturef);
		setStore("journal.temperaturec", sampleWeather.temperaturec);
		setStore("journal.condition", sampleWeather.condition);
		setStore("journal.location", sampleWeather.location); // Also store location used
	}, [userLocation, setStore]); // Re-run if userLocation changes

	const toggleUnit = () => {
		const newUnit = displayUnit === "F" ? "C" : "F";
		setDisplayUnit(newUnit);
		// Update displayed temp based on the new unit and stored values
		setDisplayTemp(newUnit === "F" ? tempF : tempC);
	};

	return (
		<div className="bg-white rounded-lg shadow p-5 border border-gray-100 transition-all hover:shadow-md">
			<SectionTitle>Weather</SectionTitle>
			<>
				{displayTemp !== null ? ( // Only show button if temp is loaded
					<>
						<p className="text-sm">Location: {displayLocation}</p>
						<p className="text-sm">Condition: {displayCondition}</p>
						<p className="text-sm">
							Temperature: {displayTemp.toFixed(1)}°{displayUnit}
						</p>
						<button
							type="button"
							onClick={toggleUnit}
							className="px-3 py-1 mt-2 bg-brandGreen-100 text-brandGreen-800 text-xs rounded hover:bg-brandGreen-200 transition-colors"
						>
							Show in °{displayUnit === "F" ? "C" : "F"}
						</button>
					</>
				) : (
					<WeatherSkeleton />
				)}
			</>
		</div>
	);
};

export default Weather;
