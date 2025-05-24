import React from "react";
import useStore from "../../store/store";
import SectionTitle from "../Common/SectionTitle";
import ShimmerDiv from "../Common/ShimmerDiv";

// Skeleton loader for the reflection question
const ReflectionSkeleton = () => {
	return (
		<div className="space-y-2">
			<ShimmerDiv width="full" height="4" />
		</div>
	);
};

const Reflection = ({ Question }) => {
	const journal = useStore((state) => state.store.journal) || {};
	const setStore = useStore((state) => state.setStore);

	const handleInputChange = (name, value) => {
		setStore(`journal.${name}`, value);
	};

	// Determine if the reflection question is loading
	const questionText = Question || journal?.reflectionQuestion || null;

	return (
		<div>
			<SectionTitle
				tooltip="Reflect on the day by answering the question"
				class_input="md:justify-start"
			>
				Reflection
			</SectionTitle>

			{/* Display Reflection Question or Skeleton */}
			<div className="bg-brandGreen-50 rounded-lg p-3 my-3 border border-brandGreen-100">
				{questionText ? (
					<p className="text-sm text-brandGreen-800 font-medium">
						{questionText}
					</p>
				) : (
					<ReflectionSkeleton />
				)}
			</div>

			{/* Reflection Answer Textarea */}
			<textarea
				name="reflection"
				value={journal?.reflection || ""}
				onChange={(e) => handleInputChange("reflection", e.target.value)}
				rows={4}
				className="w-full px-4 py-3 border-3 border-gray-200 rounded-lg focus:outline-none focus:border-brandGreen-200 transition-colors"
				placeholder="Share your thoughts on the question above..."
			/>
		</div>
	);
};

export default Reflection;
