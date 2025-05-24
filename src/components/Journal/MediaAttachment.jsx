import React, { useState, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import SectionTitle from "../Common/SectionTitle.jsx";

// Note: initialFiles prop added to allow resetting from parent via key prop
const MediaAttachment = ({ handleFileChange, initialFiles = [] }) => {
	const [files, setFiles] = useState(initialFiles);

	// Effect to sync with potential external resets (e.g., after form submission)
	useEffect(() => {
		setFiles(initialFiles);
	}, [initialFiles]);

	const handleLocalFileChange = (event) => {
		const newFiles = Array.from(event.target.files);

		// --- Validation Checks (Kept from original) ---
		let currentTotalSize = files.reduce((sum, file) => sum + file.size, 0);
		const newFilesSize = newFiles.reduce((sum, file) => sum + file.size, 0);

		if (currentTotalSize + newFilesSize > 100 * 1024 * 1024) {
			alert("Total file size exceeds the limit (100MB).");
			event.target.value = ""; // Clear the input
			return;
		}

		const validNewFiles = [];
		for (const file of newFiles) {
			if (file.size > 20 * 1024 * 1024) {
				alert(`File "${file.name}" is too large! Maximum size is 20MB.`);
				// Don't add this file, but continue checking others
			} else {
				validNewFiles.push(file);
			}
		}
		// --- End Validation ---

		// Prepare simplified data for parent (no backend URL needed)
		const newFileData = validNewFiles.map((file) => ({
			// Keep the actual File object if needed later, or just extract info
			// fileObject: file, // Optional: keep the raw file object
			name: file.name,
			mediatype: file.type,
			size: file.size,
			// No filePath from backend anymore
		}));

		const updatedFiles = [...files, ...newFileData];
		setFiles(updatedFiles);
		handleFileChange(updatedFiles); // Pass the simplified data up

		event.target.value = ""; // Clear the input to allow selecting the same file again
	};

	const removeFile = (index) => {
		const updatedFiles = [...files];
		updatedFiles.splice(index, 1);
		setFiles(updatedFiles);
		handleFileChange(updatedFiles); // Notify parent of removal
	};

	return (
		<div>
			<div className="mb-3">
				<label className="block text-sm font-medium text-gray-700">
					<SectionTitle tooltip="Select photos, videos, or audio clips (Max 20MB each, 100MB total)">
						Attach Media
					</SectionTitle>
				</label>

				<input
					type="file"
					name="media"
					accept="image/*,video/*,audio/*"
					multiple
					onChange={handleLocalFileChange}
					className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen-200 focus:border-brandGreen-300 transition-colors"
				/>
			</div>
			{files.length > 0 && (
				<div className="mt-4">
					<h4 className="text-md font-medium text-gray-700 mb-2">
						Selected Files:
					</h4>
					<ul>
						{files.map((file, index) => (
							<li
								key={index} // Using index is okay here as list changes fully on add/remove
								className="flex items-center justify-between py-2 border-b border-gray-200 last:border-none"
							>
								<span className="text-sm truncate pr-2" title={file.name}>
									{file.name} ({file.mediatype}) -{" "}
									{(file.size / (1024 * 1024)).toFixed(2)} MB
								</span>
								<button
									type="button"
									onClick={() => removeFile(index)}
									className="px-3 py-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
								>
									Remove
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default MediaAttachment;
