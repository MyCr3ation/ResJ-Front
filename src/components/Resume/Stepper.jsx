// src/components/Resume/Stepper.jsx
import React from "react";
import { FiArrowLeft, FiArrowRight, FiCheckCircle } from "react-icons/fi"; // Added FiCheckCircle
import Button from "../Button.jsx"; // Adjust path

const Stepper = ({
	prev,
	next,
	prevTitle,
	nextTitle,
	onFinishAndPreview,
	isLastStep,
}) => {
	const stepperButtonSharedOverrides =
		"w-1/2 sm:w-auto text-center text-sm font-medium !shadow-sm !px-4 !py-2.5 sm:!px-5 !transform-none hover:!scale-100 focus:!ring-2 focus:!ring-offset-2";

	const prevActiveClasses = `${stepperButtonSharedOverrides} !bg-brandGreen-500 hover:!bg-brandGreen-600 !text-white`;
	const nextActiveClasses = `${stepperButtonSharedOverrides} !bg-brandGreen-500 hover:!bg-brandGreen-600 !text-white ${
		!prev && "w-full"
	}`;
	const finishButtonClasses = `${stepperButtonSharedOverrides} !text-white ${
		!prev && "w-full" // If only finish button, make it full width
	}`;
	const disabledClasses = `${stepperButtonSharedOverrides} !bg-brandGreen-200 !text-gray-400 !cursor-not-allowed !border-transparent !shadow-none`;

	return (
		<div
			className={`flex items-center justify-between min-w-full max-w-xs sm:max-w-sm md:max-w-md space-x-2 sm:space-x-3 ${
				!prev && "!justify-end"
			}`}
		>
			{prev && (
				<Button
					href={prev}
					IconComponent={FiArrowLeft}
					iconPosition="left"
					className={prevActiveClasses}
				>
					{prevTitle || "Previous"}
				</Button>
			)}

			{/* Conditionally render Next button or Finish & Preview button */}
			{isLastStep ? (
				<Button
					onClick={onFinishAndPreview} // Trigger modal
					IconComponent={FiCheckCircle}
					iconPosition="right"
					className={finishButtonClasses}
					moveDisabled={true}
				>
					Finish & Preview CV
				</Button>
			) : next ? (
				<Button
					href={next}
					IconComponent={FiArrowRight}
					iconPosition="right"
					className={nextActiveClasses}
				>
					{nextTitle || "Next"}
				</Button>
			) : (
				// This case might not be reached if isLastStep handles the end.
				// Kept for robustness if next can be null before the last step.
				<Button
					IconComponent={FiArrowRight}
					iconPosition="right"
					className={disabledClasses}
					disabled={true}
				>
					{nextTitle || "Next"}
				</Button>
			)}
		</div>
	);
};

export default Stepper;
