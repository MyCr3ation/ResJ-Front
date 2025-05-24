// src/components/Common/TextArea.jsx
import React from "react";
import { TbPencilStar } from "react-icons/tb";

const TextArea = ({
	state,
	setState,
	label,
	name,
	className, // This className is now for the NEW WRAPPER DIV
	className__textarea,
	textareaRef,
	required,
	rows = 4,
}) => {
	const defaultTextareaClasses =
		"w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen-200 focus:border-brandGreen-300";
	const combinedTextareaClasses = `${defaultTextareaClasses} ${
		className__textarea || ""
	}`;

	return (
		// THE FIX: Add a wrapper div and make it 'relative'
		// The 'className' prop from the parent is now applied here.
		<div className={`relative ${className || ""}`}>
			<textarea
				name={name}
				id={name}
				value={state || ""}
				onChange={(e) => setState(e.target.value)}
				rows={rows}
				className={combinedTextareaClasses}
				placeholder={label || " "}
				required={required}
				ref={textareaRef}
			/>
			{/* This div is now positioned relative to the above 'div' */}
			<div className="absolute bottom-4 right-3">
				{" "}
				{/* Adjusted offsets slightly for better padding */}
				<TbPencilStar
					onClick={() => {
						console.log("Data present: " + state);
					}}
					size={24} // Slightly larger for better click target
					className="text-brandGreen-500 hover:text-brandGreen-600 cursor-pointer"
					aria-label="Activate feature" // Good practice for accessibility
				/>
			</div>
		</div>
	);
};

export default TextArea;
