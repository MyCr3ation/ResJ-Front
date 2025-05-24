// src/pages/Resume/Summary.jsx
import React, { useState } from "react"; // useState is imported but not directly used in this snippet for summary, might be used elsewhere.
import useStore from "../../../store/store.jsx";
import TextArea from "../../Common/TextArea.jsx";

const Summary = () => {
	const { store, setStore } = useStore();

	return (
		<div className="w-full mx-auto px-2 bg-white">
			<h1 className="text-center font-bold text-3xl text-brand mb-4">
				Professional Summary
			</h1>
			<div>
				<label
					htmlFor="summary" // Link label to the TextArea
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Write a brief summary of your professional background and goals
				</label>
				{/* Replace Editor with TextArea */}
				<TextArea
					state={store.summary || ""}
					setState={(value) => setStore("summary", value)}
					label="e.g. Dedicated web developer with 5+ years of experience in building responsive and user-friendly websites..." // This will be used as placeholder
					name="summary" // Sets name and id attributes for the textarea
					rows={8} // Match the rows count from the previous Editor
				/>

				<div className="mt-4 text-gray-600 text-sm">
					<p>Tips for writing an effective summary:</p>
					<ul className="list-disc ml-5 space-y-1">
						<li>Keep it concise (3-5 sentences)</li>
						<li>Highlight your most relevant skills and experience</li>
						<li>Tailor it to the job you're applying for</li>
						<li>Include quantifiable achievements when possible</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Summary;
