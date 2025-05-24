// src/components/JournalForm.jsx
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

import Input from "./Common/Input.jsx";
import Textarea from "./Common/TextArea.jsx"; // Import the new Textarea component
import MoodSelector from "./Journal/MoodSelector.jsx";
import SectionTitle from "./Common/SectionTitle.jsx";
import MediaAttachment from "./Journal/MediaAttachment.jsx";
import WeatherWidget from "./Journal/Weather.jsx";
import QuoteWidget from "./Journal/Quote.jsx";

const TODAY_DATE_FORM = new Date().toISOString().split("T")[0];

// src/components/journalFormFields.js (Example - or define directly in JournalForm.jsx)
const journalInputFields = [
	{
		name: "title",
		type: "text",
		sectionTitle: "Journal Title",
		sectionTooltip: "A short description about your day",
		inputLabel: "Give your entry a title...",
		inputClassName: "text-lg border-2 border-gray-200 rounded-lg w-full",
		required: true,
	},
	{
		name: "goal",
		type: "text",
		sectionTitle: "Tomorrow's Goal",
		sectionTooltip: "Optional: Set a short term or next day goal",
		inputLabel: "What's one goal for tomorrow?",
		inputClassName:
			"border-2 border-gray-200 rounded-lg focus:border-brandGreen-300 w-full",
		required: false,
	},
	{
		name: "affirmation",
		type: "text",
		sectionTitle: "Today's Affirmation",
		sectionTooltip: "A positive statement about yourself or what you learned",
		inputLabel: "e.g., 'I am capable...' or 'Learned about...",
		inputClassName:
			"border-2 border-gray-200 rounded-lg focus:border-brandGreen-300 w-full",
		required: false,
	},
];

const dateInputConfig = {
	name: "date",
	type: "date",
	sectionTitle: "Date",
	inputLabel: "Select Date",
	inputClassName:
		"border-2 border-gray-200 rounded-lg focus:border-brandGreen-300",
	required: true,
};

function JournalForm({
	mode = "create",
	formData,
	originalData = {},
	onInputChange,
	onDateChange,
	onMoodChange,
	onFileChange,
	onDeleteMedia,
	onSubmit,
	onCancel,
	isSubmitting = false,
	canSaveChanges = true,
	userLocation = null,
	mediaResetKey = null,
}) {
	const isEditMode = mode === "edit";

	const getSafeDate = () => {
		const dateValue = formData?.date;
		if (dateValue && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) return dateValue;
		return TODAY_DATE_FORM;
	};

	const reflectionQuestionText = isEditMode
		? originalData?.reflectionQuestion || "Reflection Question"
		: formData?.reflectionQuestion || "Loading reflection question...";

	const displayedExistingMedia =
		isEditMode && originalData?.media ? originalData.media : [];

	return (
		<form
			onSubmit={onSubmit}
			className="bg-gradient-to-br from-brandGreen-50 to-brandGreen-100 border border-gray-200 p-6 md:p-8 mx-auto h-full"
		>
			<h2 className="text-3xl font-bold mb-6 text-brandGreen-600 border-b border-brandGreen-200 pb-3 text-center">
				{isEditMode ? "Edit Journal Entry" : "My Journal"}
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* --- Left Column --- */}
				<div className="md:col-span-1 space-y-6">
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100 ">
						<div className="mb-4">
							<SectionTitle>{dateInputConfig.sectionTitle}</SectionTitle>
							<Input
								label={dateInputConfig.inputLabel}
								type={dateInputConfig.type}
								name={dateInputConfig.name}
								state={getSafeDate()}
								setState={onDateChange}
								required={dateInputConfig.required}
								max={new Date().toISOString().split("T")[0]}
								className__input={`${dateInputConfig.inputClassName} w-full`}
							/>
						</div>
						<div>
							<SectionTitle>Today's Mood</SectionTitle>
							<MoodSelector
								selectedMood={formData.mood}
								onMoodChange={onMoodChange}
								className="flex justify-around items-center py-2"
							/>
						</div>
					</div>

					{isEditMode ? (
						<>
							{originalData.weather && (
								<div className="bg-white rounded-lg shadow p-5 border border-gray-100">
									<SectionTitle>Weather Conditions</SectionTitle>
									<div className="text-gray-700 mt-2 text-sm">
										{/* Weather display logic (unchanged) */}
										{originalData.weather.temperatureC && (
											<p>
												<strong>Temp (C):</strong>{" "}
												{originalData.weather.temperatureC}°C{" "}
											</p>
										)}
										{originalData.weather.temperatureF && (
											<p>
												<strong>Temp (F):</strong>{" "}
												{originalData.weather.temperatureF}°F{" "}
											</p>
										)}
										{originalData.weather.temp_c &&
											!originalData.weather.temperatureC && (
												<p>
													<strong>Temp:</strong> {originalData.weather.temp_c}°C{" "}
												</p>
											)}
										{originalData.weather.temp_f &&
											!originalData.weather.temperatureF && (
												<p>
													<strong>Temp:</strong> {originalData.weather.temp_f}°F{" "}
												</p>
											)}
										{originalData.weather.condition?.text && (
											<p>
												<strong>Condition:</strong>{" "}
												{originalData.weather.condition.text}{" "}
											</p>
										)}
										{originalData.weather.condition &&
											typeof originalData.weather.condition === "string" && (
												<p>
													<strong>Condition:</strong>{" "}
													{originalData.weather.condition}{" "}
												</p>
											)}
										{originalData.weather.location?.name && (
											<p>
												<strong>Location:</strong>{" "}
												{originalData.weather.location.name}{" "}
											</p>
										)}
										{originalData.weather.location &&
											typeof originalData.weather.location === "string" && (
												<p>
													<strong>Location:</strong>{" "}
													{originalData.weather.location}{" "}
												</p>
											)}
										{!originalData.weather.temperatureC &&
											!originalData.weather.temp_c &&
											!originalData.weather.condition &&
											!originalData.weather.location?.name &&
											typeof originalData.weather.location !== "string" && (
												<p className="italic text-gray-500">
													Weather data unavailable.
												</p>
											)}
									</div>
								</div>
							)}
							{originalData.quote &&
								(originalData.quote.text || originalData.quote.q) && (
									<div className="bg-white rounded-lg shadow p-5 border border-gray-100">
										<SectionTitle>Quote of the Day</SectionTitle>
										<blockquote className="mt-2 italic text-gray-600 text-sm border-l-4 border-brandGreen-200 pl-3 py-1">
											"{originalData.quote.text || originalData.quote.q}"
											{(originalData.quote.author || originalData.quote.a) && (
												<footer className="text-xs text-gray-500 mt-1">
													- {originalData.quote.author || originalData.quote.a}
												</footer>
											)}
										</blockquote>
									</div>
								)}
						</>
					) : (
						<>
							<WeatherWidget userLocation={userLocation} />
							<QuoteWidget />
						</>
					)}
				</div>

				{/* --- Right (Main) Column --- */}
				<div className="md:col-span-2 space-y-6">
					{journalInputFields
						.filter((field) => field.name === "title" || field.name === "goal")
						.map((field) => (
							<div
								key={field.name}
								className="bg-white rounded-lg shadow p-5 border border-gray-100"
							>
								<SectionTitle tooltip={field.sectionTooltip}>
									{field.sectionTitle}
								</SectionTitle>
								<Input
									label={field.inputLabel}
									type={field.type}
									name={field.name}
									state={formData[field.name] || ""}
									setState={(val) => onInputChange(field.name, val)}
									required={field.required}
									className__input={field.inputClassName}
								/>
							</div>
						))}

					{/* Journal Body (Textarea) */}
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100">
						<SectionTitle tooltip="Write what happened during your day">
							Today's Story
						</SectionTitle>
						<Textarea
							label="Write your journal entry here..."
							name="body"
							state={formData.body || ""}
							setState={(val) => onInputChange("body", val)}
							required
							rows={8}
							className="mt-2" // Spacing between SectionTitle and Textarea
							className__textarea="border-2 border-gray-200 rounded-lg focus:border-brandGreen-200 focus:ring-brandGreen-200"
						/>
					</div>

					{/* Personal Growth Section */}
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100">
						<SectionTitle class_input="text-xl font-semibold">
							Personal Growth
						</SectionTitle>
						<div className="mb-5">
							{journalInputFields
								.filter((field) => field.name === "affirmation")
								.map((field) => (
									<React.Fragment key={field.name}>
										<SectionTitle
											tooltip={field.sectionTooltip}
											class_input="md:justify-start"
										>
											{field.sectionTitle}
										</SectionTitle>
										<Input
											label={field.inputLabel}
											type={field.type}
											name={field.name}
											state={formData[field.name] || ""}
											setState={(val) => onInputChange(field.name, val)}
											required={field.required}
											className__input={field.inputClassName}
										/>
									</React.Fragment>
								))}
						</div>
						<div>
							<SectionTitle tooltip="Reflect on the day by answering the question">
								Reflection
							</SectionTitle>
							<div className="bg-brandGreen-50 rounded-lg p-3 mb-3 border border-brandGreen-100">
								<p className="text-sm text-brandGreen-800 font-medium italic">
									{reflectionQuestionText}
								</p>
							</div>
							<Textarea
								label="Share your thoughts..."
								name="reflection"
								state={formData.reflection || ""}
								setState={(val) => onInputChange("reflection", val)}
								rows={4}
								// Custom styles for this specific textarea instance
								className__textarea="border-2 border-gray-200 rounded-lg focus:ring-brandGreen-200 focus:border-brandGreen-300"
							/>
						</div>
					</div>

					{/* Media Sections */}
					{isEditMode && displayedExistingMedia.length > 0 && (
						<div className="bg-white rounded-lg shadow p-5 border border-gray-100">
							<SectionTitle>Existing Media</SectionTitle>
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
								{displayedExistingMedia.map((media, index) => (
									<div
										key={media.url || index}
										className="relative group border rounded-md overflow-hidden shadow-sm aspect-square"
									>
										{/* Media display logic (unchanged) */}
										{media.type?.startsWith("image/") ? (
											<img
												src={media.url}
												alt={`Journal media ${index + 1}`}
												className="w-full h-full object-cover"
											/>
										) : media.type?.startsWith("video/") ? (
											<video
												controls
												src={media.url}
												className="w-full h-full object-cover bg-black"
											/>
										) : media.type?.startsWith("audio/") ? (
											<div className="w-full h-full flex flex-col items-center justify-center p-2 bg-gray-100">
												<span className="text-xs text-gray-500 mb-2 text-center truncate w-full px-1">
													Audio
												</span>
												<audio
													controls
													src={media.url}
													className="w-full max-w-[150px]"
												/>
											</div>
										) : (
											<div className="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-500 p-2">
												<a
													href={media.url}
													target="_blank"
													rel="noopener noreferrer"
													className="hover:underline break-all text-center"
													title={media.url}
												>
													{" "}
													View File{" "}
												</a>
											</div>
										)}
										<button
											type="button"
											onClick={() => onDeleteMedia(media.url)}
											className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-400 hover:bg-red-600"
											aria-label="Remove media"
											title="Remove this media"
											disabled={isSubmitting}
										>
											<AiOutlineDelete size={14} />
										</button>
									</div>
								))}
							</div>
						</div>
					)}
					<div className="bg-white rounded-lg shadow p-5 border border-gray-100">
						<MediaAttachment
							key={mediaResetKey}
							handleFileChange={onFileChange}
							initialFiles={[]}
						/>
						{isEditMode && (
							<p className="text-xs text-gray-500 mt-1">
								Feature currently disabled. You can only manage existing media.
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
				{isEditMode && (
					<button
						type="button"
						onClick={onCancel}
						disabled={isSubmitting}
						className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
					>
						Cancel
					</button>
				)}
				<button
					type="submit"
					disabled={isSubmitting || (isEditMode && !canSaveChanges)}
					className="px-8 py-3 bg-brandGreen-600 text-white font-semibold rounded-lg shadow hover:bg-brandGreen-700 focus:outline-none focus:ring-2 focus:ring-brandGreen-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isSubmitting
						? "Saving..."
						: isEditMode
						? "Save Changes"
						: "Save Entry"}
				</button>
			</div>
		</form>
	);
}

export default JournalForm;
