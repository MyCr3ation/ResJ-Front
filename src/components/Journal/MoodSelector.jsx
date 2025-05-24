import React from "react";
// Optional: For prop type validation
// import PropTypes from 'prop-types';

// Define mood data with emojis and labels
const moodOptions = [
	{ emoji: "😄", label: "Joyful" },
	{ emoji: "😊", label: "Happy" },
	{ emoji: "😐", label: "Neutral" },
	{ emoji: "😔", label: "Sad" },
	{ emoji: "😠", label: "Angry" },
	{ emoji: "😴", label: "Tired" },
	{ emoji: "😩", label: "Stressed" },
];
const MoodSelector = ({
	selectedMood,
	onMoodChange,
	availableMoods = moodOptions, // Allow overriding moods via props if needed
}) => {
	// Basic validation in case an invalid prop is passed (optional but good practice)
	const moodsToDisplay =
		Array.isArray(availableMoods) && availableMoods.length > 0
			? availableMoods
			: moodOptions;

	return (
		<div className="bg-brandGreen-50 rounded-lg p-3 border border-brandGreen-100">
			<div className="flex flex-wrap gap-3 justify-center">
				{" "}
				{/* Increased gap slightly */}
				{moodsToDisplay.map((mood) => (
					<button
						key={mood.emoji}
						type="button"
						title={mood.label}
						onClick={() => onMoodChange(mood.emoji)}
						aria-pressed={selectedMood === mood.emoji}
						aria-label={`Select mood: ${mood.label}`}
						className={`transition-transform duration-150 ease-in-out ${
							selectedMood === mood.emoji ? "scale-125" : "hover:scale-110"
						}`}
					>
						<span
							className={`
                            inline-block text-2xl leading-none p-1
                            rounded-full
                            ${
															selectedMood === mood.emoji
																? "ring-2 ring-brandGreen-400"
																: ""
														}
                        `}
						>
							{mood.emoji}
						</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default MoodSelector;
