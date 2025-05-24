import { useState } from "react";
import toast from "react-hot-toast";
import useStore from "../../../store/store"; // Adjusted path
import Input from "../../Common/Input.jsx"; // Adjusted path
import Button from "../../Button.jsx"; // Adjusted path
import Example from "../Example.jsx"; // Assuming shared Example, adjust path
import { TbProgress } from "react-icons/tb";

// Simplified Language Options (inline)
const INLINE_LANGUAGE_OPTIONS = [
	{ value: "", label: "Select Level", disabled: true }, // Added a disabled placeholder
	{ value: "native", label: "Native" },
	{ value: "fluent", label: "Fluent" },
	{ value: "professional", label: "Professional Working Proficiency" },
	{ value: "limited", label: "Limited Working Proficiency" },
	{ value: "elementary", label: "Elementary Proficiency" },
	{ value: "basic", label: "Basic" },
];

const Languages = () => {
	const {
		store: { languages },
		addItem,
		editItem,
		removeItem,
		updateOrder,
	} = useStore();

	const initialLanguageState = {
		language: "",
		level: "", // Default to empty to show placeholder
	};
	const [newLanguage, setNewLanguage] = useState(initialLanguageState);
	const [editedIndex, setEditedIndex] = useState(null);

	const isFormValid = () => {
		return (
			newLanguage.language.trim() !== "" && newLanguage.level.trim() !== ""
		);
	};

	const handleAddLanguage = () => {
		if (isFormValid()) {
			addItem("languages", newLanguage);
			setNewLanguage(initialLanguageState);
			toast.success("Language added.");
		} else {
			toast.error("Language and Level are required.");
		}
	};

	const handleEditLanguage = () => {
		if (isFormValid()) {
			try {
				editItem("languages", editedIndex, newLanguage);
				toast.success("Language updated.");
				setEditedIndex(null);
				setNewLanguage(initialLanguageState);
			} catch (error) {
				console.error(error);
				toast.error("Failed to update language.");
			}
		} else {
			toast.error("Language and Level cannot be empty when editing.");
		}
	};

	const handleChooseLanguage = (index) => {
		setEditedIndex(index);
		const languageItem = languages[index];
		setNewLanguage({
			language: languageItem.language || "",
			level: languageItem.level || "",
		});
	};

	const handleCloseEdit = () => {
		setEditedIndex(null);
		setNewLanguage(initialLanguageState);
	};

	const handleRemoveLanguage = (index) => {
		removeItem("languages", index);
		toast.success("Language removed.");
		if (editedIndex === index) {
			handleCloseEdit();
		}
	};

	const handleMoveLanguageUp = (index) => {
		if (index > 0) {
			const updatedItems = [...languages];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index - 1, 0, movedItem);
			updateOrder("languages", updatedItems);
		}
	};

	const handleMoveLanguageDown = (index) => {
		if (index < languages.length - 1) {
			const updatedItems = [...languages];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index + 1, 0, movedItem);
			updateOrder("languages", updatedItems);
		}
	};

	// Define a base style for input/select elements to match Input.jsx
	const formElementClasses = `block px-3 py-2 w-full text-sm bg-transparent rounded-md border border-gray-600 appearance-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-brandGreen-200 focus:border-brandGreen-300 transition-colors h-10`;

	return (
		<div className="w-full mx-auto px-2 bg-white">
			<h1 className="text-center font-bold text-3xl text-brand mb-4">
				Languages
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Input
					state={newLanguage.language}
					setState={(value) =>
						setNewLanguage({ ...newLanguage, language: value })
					}
					name="language_name"
					label={"Language"}
				/>
				{/* Custom Dropdown for Level */}
				<div className="relative w-full">
					{" "}
					{/* Wrapper to mimic Input.jsx structure for label */}
					<select
						name="language_level"
						id="language_level" // For label linking
						value={newLanguage.level}
						onChange={(e) =>
							setNewLanguage({ ...newLanguage, level: e.target.value })
						}
						className={`${formElementClasses} ${
							newLanguage.level === "" ? "text-gray-500" : "text-gray-900"
						} peer`} // Add peer for label
						required
					>
						{INLINE_LANGUAGE_OPTIONS.map((option) => (
							<option
								key={option.value}
								value={option.value}
								disabled={option.disabled}
								className={
									option.value === "" ? "text-gray-500" : "text-gray-900"
								} // Style placeholder option
							>
								{option.label}
							</option>
						))}
					</select>
					{/* Floating Label for Select */}
					<label
						htmlFor="language_level"
						// Simplified label behavior for select. It won't perfectly float like the input
						// due to how browsers render select. This provides a basic label.
						// A more complex JS solution or a custom select component would be needed for identical floating.
						// This approach places the label above consistently.
						className={`absolute flex items-center gap-1 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white start-1 px-2 select-none
									${newLanguage.level !== "" ? "text-brandGreen-700" : ""} `}
					>
						{"Level" + "*"}
					</label>
				</div>
			</div>

			<div className="mt-4 flex gap-2">
				<Button
					onClick={() =>
						editedIndex === null ? handleAddLanguage() : handleEditLanguage()
					}
					disabled={editedIndex === null && !isFormValid()}
					className={
						editedIndex === null && !isFormValid()
							? "!bg-gray-400 hover:!bg-gray-400 cursor-not-allowed opacity-70"
							: ""
					}
				>
					{editedIndex !== null ? "Save Changes" : "Add Language"}
				</Button>
				{editedIndex !== null && (
					<Button
						onClick={() => handleCloseEdit()}
						className="bg-gray-500 hover:bg-gray-600 focus:ring-gray-400"
					>
						Cancel Edit
					</Button>
				)}
			</div>

			<div className="my-6">
				{languages.length > 0 && (
					<div className="space-y-4 text-black/80">
						{languages.map((lang, index) => (
							<Example
								key={lang.id || index}
								index={index}
								remove={handleRemoveLanguage}
								edit={handleChooseLanguage}
								down={handleMoveLanguageDown}
								up={handleMoveLanguageUp}
								title={lang.language || "N/A"}
								state={languages}
							>
								<p className="flex items-center gap-1">
									<strong className="text-brand">
										<TbProgress />
									</strong>{" "}
									{INLINE_LANGUAGE_OPTIONS.find(
										(opt) => opt.value === lang.level
									)?.label || lang.level}
								</p>
							</Example>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Languages;
