// src/utils/weatherUtils.js
import React from "react";
import { AiOutlineCloud, AiOutlineQuestionCircle } from "react-icons/ai";
import {
	BsSun,
	BsFillCloudSunFill,
	BsCloudyFill,
	BsCloudRain,
	BsCloudRainHeavy,
	BsCloudSnow,
	BsCloudSleet,
	BsCloudLightningRain,
	BsWind,
	BsMoonStars,
	BsFillCloudMoonFill,
	BsCloudFog2Fill,
	BsSunrise,
} from "react-icons/bs";

/**
 * Returns a weather icon component based on the condition string.
 * @param {string} condition - The weather condition string.
 * @param {number} [size=24] - The size of the icon.
 * @returns {JSX.Element} - The icon component.
 */
export const getWeatherIconElement = (condition, size = 24) => {
	const lowerCaseCondition = condition?.toLowerCase() || "";
	const isNight =
		lowerCaseCondition.includes("night") ||
		lowerCaseCondition.includes("evening");
	const title = condition || "N/A"; // Tooltip text

	switch (lowerCaseCondition) {
		// --- Clear / Sunny ---
		case "clear":
		case "sunshine":
		case "clearingpm":
		case "rainclearinglater":
		case "snowclearinglater":
		case "rainsnowclearinglater":
			return isNight ? (
				<BsMoonStars size={size} className="text-indigo-400" title={title} />
			) : (
				<BsSun size={size} className="text-yellow-500" title={title} />
			);
		case "clear sunrise":
			return (
				<BsSunrise size={size} className="text-orange-400" title={title} />
			);
		case "clear night":
		case "evening clear":
			return (
				<BsMoonStars size={size} className="text-indigo-400" title={title} />
			);

		// --- Partly Cloudy / Variable ---
		case "variablecloud":
		case "cloudierpm":
		case "partly cloudy":
		case "partly-cloudy":
		case "sunny intervals":
			return isNight ? (
				<BsFillCloudMoonFill
					size={size}
					className="text-indigo-300"
					title={title}
				/>
			) : (
				<div className="relative w-6 h-6">
					<BsFillCloudSunFill
						size={24}
						className="text-yellow-400 absolute left-0 top-0"
						style={{ clipPath: "circle(40% at 30% 30%)" }} // fake sun
					/>
					<BsFillCloudSunFill
						size={24}
						className="text-blue-300 absolute left-0 top-0"
					/>
				</div>
			);

		// --- Cloudy / Overcast ---
		case "cloudy":
		case "overcast":
		case "cloudcover":
			return (
				<BsCloudyFill size={size} className="text-gray-600" title={title} />
			);

		// --- Rain / Showers / General Precipitation ---
		case "precip":
		case "estprecip":
		case "rainy":
		case "showers":
		case "rainam":
		case "rainpm":
		case "rainearlyam":
		case "rainlatepm":
		case "rainallday":
		case "rainampm":
			return (
				<BsCloudRain size={size} className="text-blue-500" title={title} />
			);

		// --- Heavy Rain ---
		case "heavy rain":
			return (
				<BsCloudRainHeavy size={size} className="text-blue-600" title={title} />
			);

		// --- Snow ---
		case "snow":
		case "snowam":
		case "snowpm":
		case "snowearlyam":
		case "snowlatepm":
		case "snowallday":
		case "snowampm":
			return (
				<BsCloudSnow size={size} className="text-cyan-300" title={title} />
			);

		// --- Rain/Snow Mix (Sleet) ---
		case "rainsnowallday":
		case "rainsnowam":
		case "rainsnowampm":
		case "rainsnowearlyam":
		case "rainsnowlatepm":
		case "rainsnowpm":
			return (
				<BsCloudSleet size={size} className="text-cyan-400" title={title} />
			);

		// --- Storms ---
		case "stormspossible":
		case "stormsstrong":
			return (
				<BsCloudLightningRain
					size={size}
					className="text-yellow-400"
					title={title}
				/>
			);

		// --- Windy ---
		case "windy":
			return <BsWind size={size} className="text-teal-500" title={title} />;

		// --- Fog/Mist/Haze ---
		case "fog":
		case "mist":
		case "haze":
			return (
				<BsCloudFog2Fill size={size} className="text-gray-400" title={title} />
			);

		// --- Default / Unknown ---
		default:
			if (
				lowerCaseCondition &&
				!["id", "address" /* ... other ignored types ... */].includes(
					lowerCaseCondition
				)
			) {
				console.warn(
					`Unhandled weather condition in getWeatherIconElement: ${condition}`
				);
			}
			return (
				<AiOutlineQuestionCircle
					size={size}
					className="text-gray-400"
					title={`Unknown: ${title}`}
				/>
			);
	}
};
