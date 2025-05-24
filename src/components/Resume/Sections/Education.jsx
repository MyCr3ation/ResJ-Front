import { useState } from "react";
import useStore from "../../../store/store"; // Adjusted path
import Input from "../../Common/Input.jsx"; // Adjusted path
import Button from "../../Button.jsx"; // Adjusted path
import TextArea from "../../Common/TextArea.jsx"; // Using TextArea
import toast from "react-hot-toast";
import Example from "../Example.jsx"; // Assuming shared Example
import { MdDateRange, MdTextFields, MdLocationCity } from "react-icons/md"; // Added MdLocationCity

// Simple date formatting function
const formatDate = (dateString, locale = "en-US") => {
	if (!dateString || dateString === "Present") return "Present";
	try {
		return new Date(dateString).toLocaleDateString(locale, {
			month: "short",
			year: "numeric",
		});
	} catch (e) {
		console.warn("Error formatting date:", dateString, e);
		return dateString;
	}
};

const Education = () => {
	const {
		store: { education },
		addItem,
		editItem,
		removeItem,
		updateOrder,
	} = useStore();

	const initialEducationState = {
		institution: "",
		city: "",
		degree: "",
		fieldOfStudy: "",
		startDate: "",
		endDate: "", // Can be "Present"
		description: "",
	};

	const [newEducation, setNewEducation] = useState(initialEducationState);
	const [editedIndex, setEditedIndex] = useState(null);

	const isFormValid = () => {
		return (
			newEducation.institution.trim() !== "" &&
			newEducation.degree.trim() !== "" &&
			newEducation.startDate.trim() !== "" &&
			(newEducation.endDate.trim() !== "" || newEducation.endDate === "Present")
			// city, fieldOfStudy, description can be optional
		);
	};

	const handleAddEducation = () => {
		if (isFormValid()) {
			addItem("education", { ...newEducation }); // Ensure new object is passed
			setNewEducation(initialEducationState);
			toast.success("Education added successfully.");
		} else {
			toast.error(
				"Institution, Degree, Start Date, and End Date (or Present) are required."
			);
		}
	};

	const handleEditEducation = () => {
		if (newEducation.institution.trim() && newEducation.degree.trim()) {
			try {
				const educationToSave = { ...newEducation };
				if (
					educationToSave.endDate !== "Present" &&
					educationToSave.endDate.trim() === ""
				) {
					educationToSave.endDate = "";
				}
				editItem("education", editedIndex, educationToSave);
				toast.success("Education updated successfully.");
				setEditedIndex(null);
				setNewEducation(initialEducationState);
			} catch (error) {
				console.error(error);
				toast.error("Failed to update education.");
			}
		} else {
			toast.error("Institution and Degree cannot be empty when editing.");
		}
	};

	const handleChooseEducation = (index) => {
		setEditedIndex(index);
		const educationItem = education[index];
		setNewEducation({
			institution: educationItem.institution || "",
			city: educationItem.city || "",
			degree: educationItem.degree || "",
			fieldOfStudy: educationItem.fieldOfStudy || "",
			startDate: educationItem.startDate || "",
			endDate: educationItem.endDate || "", // This can be "Present"
			description: educationItem.description || "",
		});
	};

	const handleCloseEdit = () => {
		setEditedIndex(null);
		setNewEducation(initialEducationState);
	};

	const handleRemoveEducation = (index) => {
		removeItem("education", index);
		toast.success("Education removed.");
		if (editedIndex === index) {
			handleCloseEdit();
		}
	};

	const handleMoveEducationUp = (index) => {
		if (index > 0) {
			const updatedItems = [...education];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index - 1, 0, movedItem);
			updateOrder("education", updatedItems);
		}
	};

	const handleMoveEducationDown = (index) => {
		if (index < education.length - 1) {
			const updatedItems = [...education];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index + 1, 0, movedItem);
			updateOrder("education", updatedItems);
		}
	};

	const localeIso = "en-US"; // Hardcoded locale

	return (
		<div className="w-full mx-auto px-2 bg-white">
			<h1 className="text-center font-bold text-3xl text-brand mb-4">
				Education
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Input
					state={newEducation.institution}
					setState={(value) =>
						setNewEducation({ ...newEducation, institution: value })
					}
					name={"institution"}
					label={"Institution" + "*"}
				/>
				<Input
					state={newEducation.degree}
					setState={(value) =>
						setNewEducation({ ...newEducation, degree: value })
					}
					name={"degree"}
					label={"Degree" + "*"}
				/>
				<Input
					state={newEducation.fieldOfStudy}
					setState={(value) =>
						setNewEducation({ ...newEducation, fieldOfStudy: value })
					}
					name={"fieldOfStudy"}
					label={"Field of Study"}
				/>
				<Input
					state={newEducation.city}
					setState={(value) =>
						setNewEducation({ ...newEducation, city: value })
					}
					name={"city"}
					label={"City"}
				/>
				<Input
					state={newEducation.startDate}
					setState={(value) =>
						setNewEducation({ ...newEducation, startDate: value })
					}
					type="month"
					name={"startDate"}
					label={"Start Date" + "*"}
				/>
				<Input
					state={newEducation.endDate}
					setState={(value) =>
						setNewEducation({ ...newEducation, endDate: value })
					}
					present={true} // Enables "Present" toggle
					type="month"
					name={"endDate"}
					label={"End Date" + "*"}
				/>
			</div>

			<div className="mt-2">
				<TextArea
					state={newEducation.description}
					setState={(value) =>
						setNewEducation({ ...newEducation, description: value })
					}
					label="Description (Optional)"
					name="education_description"
					rows={4}
				/>
			</div>
			<div className="mt-4 flex gap-2">
				<Button
					onClick={() =>
						editedIndex === null ? handleAddEducation() : handleEditEducation()
					}
					disabled={editedIndex === null && !isFormValid()}
					className={
						editedIndex === null && !isFormValid()
							? "!bg-gray-400 hover:!bg-gray-400 cursor-not-allowed opacity-70"
							: ""
					}
				>
					{editedIndex !== null ? "Save Changes" : "Add Education"}
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

			<div className="mt-6">
				{education.length > 0 && (
					<div className="space-y-4 text-black/80">
						{education.map((item, index) => (
							<Example
								key={item.id || index}
								index={index}
								remove={handleRemoveEducation}
								edit={handleChooseEducation}
								down={handleMoveEducationDown}
								up={handleMoveEducationUp}
								title={`${item.institution || "N/A"} - ${item.degree || "N/A"}`}
								state={education}
							>
								<p className="flex items-center gap-1">
									<strong className="text-brand">
										<MdTextFields />
									</strong>{" "}
									{item.degree}
									{item.fieldOfStudy ? ` - ${item.fieldOfStudy}` : ""}
								</p>
								{item.city && (
									<p className="flex items-center gap-1">
										<strong className="text-brand">
											<MdLocationCity />
										</strong>{" "}
										{item.city}
									</p>
								)}
								<p className="flex items-center gap-1">
									<strong className="text-brand">
										<MdDateRange />
									</strong>{" "}
									{formatDate(item.startDate, localeIso)} -{" "}
									{formatDate(item.endDate, localeIso)}
								</p>
								{item.description && (
									<div
										className="text-left mt-2 text-sm opacity-80 prose prose-sm max-w-none"
										dangerouslySetInnerHTML={{
											__html: String(item.description).replace(/\n/g, "<br />"),
										}}
									></div>
								)}
							</Example>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Education;
