import React from "react";

export default function Editor({
	// Removed 'state' and 'setState' props as 'value' and 'onChange' are sufficient
	value,
	onChange,
	label,
	placeholder,
	id = "editor-textarea", // Added id prop with a default, can be overridden
	rows = 8, // Added rows prop with a default
}) {
	return (
		<div className="relative">
			{label && (
				<label
					htmlFor={id} // Link label to the textarea
					title={value || label} // Show current value or label as title
					// Base classes define the "shrunken" state.
					// peer-placeholder-shown overrides to "unshrunken" state.
					// Conditional class at the end applies specific styling when there's a value.
					className={`absolute flex items-center gap-1 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-brand peer-focus:bg-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 select-none cursor-text 
                    ${
											// Apply styles when textarea has a value, ensuring label background is opaque
											value !== "" && value !== undefined && value !== null
												? "bg-white text-green-800" // Original: text-green-800. Input.jsx uses text-brandGreen-700
												: "bg-transparent" // Or "bg-white" if you always want a bg behind the label when it's not in placeholder state
										}`}
				>
					{label}
				</label>
			)}
			<textarea
				id={id} // Use the id prop
				name={id} // Often good to have a name attribute as well
				value={value || ""} // Ensure value is not undefined for controlled component
				onChange={(e) => onChange(e.target.value)}
				rows={rows} // Use the rows prop
				className="peer w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen-200 focus:border-brandGreen-300 transition-colors placeholder-gray-400" // Added 'peer' class and placeholder color
				placeholder={placeholder} // Use the placeholder prop
			/>
		</div>
	);
}
