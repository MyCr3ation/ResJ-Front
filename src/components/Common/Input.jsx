// src/components/Common/Input.jsx
import { useState, useEffect } from "react"; // Added useEffect
import { FaCalendarTimes, FaCalendarAlt } from "react-icons/fa";

const Input = ({
	state,
	setState,
	label,
	name,
	type = "text",
	present, // Prop to enable the "Present" button feature
	className,
	className__input,
	inputRef,
	required,
	max,
	min,
	placeholder,
}) => {
	// Internal state for the "Present" toggle, derived from the main state if it's "Present"
	const isCurrentlyPresent = state === "Present";
	const [presentStatus, setPresentStatus] = useState(isCurrentlyPresent);

	// Effect to sync presentStatus if the parent state changes to/from "Present"
	useEffect(() => {
		const isParentStatePresent = state === "Present";
		if (isParentStatePresent !== presentStatus) {
			setPresentStatus(isParentStatePresent);
		}
	}, [state, presentStatus]);

	const handlePresentToggle = () => {
		const newStatus = !presentStatus;
		if (type === "month" && present) {
			// Specific logic for type="month" and present=true
			if (newStatus) {
				setState("Present"); // Set the actual state to "Present"
			} else {
				setState(""); // Clear the state when un-ticking "Present"
			}
		} else if (present) {
			// Generic present toggle for other input types
			setState(newStatus ? "Present" : ""); // Or handle differently if needed
		}
		setPresentStatus(newStatus);
	};

	const wrapperClasses = `relative w-full ${className || ""}`;
	const inputClasses = `block px-3 py-2 w-full text-sm bg-transparent rounded-md border border-gray-600 appearance-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-brandGreen-200 focus:border-brandGreen-300 transition-colors peer disabled:opacity-50 h-10 ${
		className__input || ""
	}`;

	// Determine if the input should be disabled
	// Disabled if 'present' prop is true, 'presentStatus' is true, and it's a month type (for End Date)
	// Or if 'present' prop is true, 'presentStatus' is true, and it's NOT a date type (original logic)
	const isDisabled =
		(present && presentStatus && type === "month") ||
		(present && presentStatus && type !== "date");

	// Determine the value to display in the input
	// If it's a month input and 'Present' is active, display empty string, otherwise the actual state.
	const displayValue =
		type === "month" && present && presentStatus ? "" : state || "";

	return (
		<div className={wrapperClasses}>
			<input
				type={type}
				name={name}
				value={displayValue} // Use the determined display value
				id={name}
				className={inputClasses}
				placeholder=" "
				disabled={isDisabled} // Use the determined disabled state
				onChange={(e) => {
					// Only allow change if not disabled by presentStatus for 'month' type
					if (!(type === "month" && present && presentStatus)) {
						setState(e.target.value);
					}
				}}
				required={required && !(type === "month" && present && presentStatus)} // Not required if "Present" is checked for endDate
				max={max}
				min={min}
				ref={inputRef}
			/>
			<label
				title={state || label}
				htmlFor={name}
				className={`absolute flex items-center gap-1 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] peer-focus:bg-white start-1 px-2 peer-focus:px-2 peer-focus:text-brandGreen-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto select-none cursor-text ${
					(state !== "" && state !== undefined && state !== null) ||
					(type === "month" && present && presentStatus)
						? "bg-white text-brandGreen-700"
						: "bg-white" // Keep bg-white for label to cover input border
				}`}
			>
				{label}
				{/* "Present" button specifically for type="month" when 'present' prop is true */}
				{present && type === "month" && (
					<button
						type="button"
						title={presentStatus ? "Unset 'Present'" : "Set as 'Present'"}
						className={`ml-1 bg-gray-700 hover:bg-gray-600 px-2 py-0.5 rounded-md flex items-center gap-1 whitespace-nowrap text-xs ${
							presentStatus ? "text-brandGreen-400" : "text-gray-400"
						}`}
						onClick={handlePresentToggle}
					>
						{presentStatus ? "Present" : "Present"}
						<FaCalendarTimes className="ml-0.5" />
					</button>
				)}
				{/* Original present button logic for non-date, non-month types */}
				{present && type !== "date" && type !== "month" && (
					<button
						type="button"
						title={presentStatus ? "Clear 'Present'" : "Set as 'Present'"}
						className={`ml-1 bg-gray-700 hover:bg-gray-600 px-2 rounded-md flex items-center gap-1 whitespace-nowrap text-xs ${
							presentStatus ? "text-brandGreen-400" : "text-gray-400"
						}`}
						onClick={handlePresentToggle}
					>
						{"Present"}
						<FaCalendarTimes className="ml-0.5" />
					</button>
				)}
				{/* Always show calendar icon for date type if not present */}
				{type === "date" && !(present && presentStatus) && (
					<FaCalendarAlt className="text-gray-400 ml-1 pointer-events-none" />
				)}
			</label>
		</div>
	);
};

export default Input;
