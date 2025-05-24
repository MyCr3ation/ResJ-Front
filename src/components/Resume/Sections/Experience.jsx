import { useState, useEffect } from "react"; // Added useEffect
import useStore from "../../../store/store.jsx";
import Input from "../../Common/Input.jsx";
import Button from "../../Button.jsx";
import toast from "react-hot-toast";
import Example from "../Example.jsx"; // Assuming Example.jsx is in the same folder (../)
import { MdDateRange, MdPinDrop } from "react-icons/md";
import TextArea from "../../Common/TextArea.jsx";

// Date formatting function
const formatDate = (dateString) => {
	if (!dateString || dateString === "Present") return "Present"; // Handle "Present" string
	try {
		return new Date(dateString).toLocaleDateString(undefined, {
			month: "short",
			year: "numeric",
		});
	} catch (e) {
		console.warn("Error formatting date:", e);
		return dateString;
	}
};

const Experience = () => {
	const {
		store: { experience },
		addItem,
		editItem,
		removeItem,
		updateOrder,
	} = useStore();

	const initialExperienceState = {
		company: "",
		jobTitle: "",
		city: "",
		startDate: "",
		endDate: "", // Can be "Present" or a month string
		description: "",
	};

	const [newExperience, setNewExperience] = useState(initialExperienceState);
	const [editedIndex, setEditedIndex] = useState(null);

	// Validation for enabling the "Add Experience" button
	const isAddFormValid = () => {
		return (
			newExperience.company.trim() !== "" &&
			newExperience.jobTitle.trim() !== "" &&
			newExperience.city.trim() !== "" &&
			newExperience.startDate.trim() !== "" &&
			(newExperience.endDate.trim() !== "" ||
				newExperience.endDate === "Present") && // endDate can be filled or "Present"
			newExperience.description.trim() !== ""
		);
	};

	const handleAddExperience = () => {
		if (isAddFormValid()) {
			addItem("experience", { ...newExperience });
			setNewExperience(initialExperienceState);
			toast.success("Experience added successfully.");
		} else {
			toast.error(
				"Company, Job Title, City, Start Date, End Date (or Present), and Description are required."
			);
		}
	};

	const handleEditExperience = () => {
		if (newExperience.company.trim() && newExperience.jobTitle.trim()) {
			try {
				// Ensure endDate is "Present" or a valid month, or empty if not present
				const experienceToSave = { ...newExperience };
				if (
					experienceToSave.endDate !== "Present" &&
					experienceToSave.endDate.trim() === ""
				) {
					// If not "Present" and empty, ensure it's truly empty not just spaces
					experienceToSave.endDate = "";
				}

				editItem("experience", editedIndex, experienceToSave);
				toast.success("Experience updated successfully.");
				setEditedIndex(null);
				setNewExperience(initialExperienceState);
			} catch (error) {
				console.error(error);
				toast.error("Failed to update experience.");
			}
		} else {
			toast.error("Company and Job Title cannot be empty when editing.");
		}
	};

	const handleChooseExperience = (index) => {
		setEditedIndex(index);
		const experienceItem = experience[index];
		const itemToEdit = {
			company: experienceItem.company || "",
			jobTitle: experienceItem.jobTitle || "",
			city: experienceItem.city || "",
			startDate: experienceItem.startDate || "",
			endDate: experienceItem.endDate || "", // This can be "Present"
			description: experienceItem.description || "",
		};
		setNewExperience(itemToEdit);
	};

	const handleCloseEdit = () => {
		setEditedIndex(null);
		setNewExperience(initialExperienceState);
	};

	const handleRemoveExperience = (index) => {
		removeItem("experience", index);
		toast.success("Experience removed.");
		if (editedIndex === index) {
			handleCloseEdit();
		}
	};

	const handleMoveExperienceUp = (index) => {
		if (index > 0) {
			const updatedItems = [...experience];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index - 1, 0, movedItem);
			updateOrder("experience", updatedItems);
		}
	};

	const handleMoveExperienceDown = (index) => {
		if (index < experience.length - 1) {
			const updatedItems = [...experience];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index + 1, 0, movedItem);
			updateOrder("experience", updatedItems);
		}
	};

	// When choosing an experience to edit, if its endDate is "Present",
	// ensure the Input component's internal presentStatus is also set.
	// The Input component now handles this with its own useEffect.

	return (
		<div className="w-full mx-auto px-2 bg-white">
			<h1 className="text-center font-bold text-3xl text-brand mb-4">
				Experience
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Input
					state={newExperience.company}
					setState={(value) =>
						setNewExperience({ ...newExperience, company: value })
					}
					name={"company"}
					label={"Company*"}
				/>
				<Input
					state={newExperience.jobTitle}
					setState={(value) =>
						setNewExperience({ ...newExperience, jobTitle: value })
					}
					name={"jobTitle"}
					label={"Job Title*"}
				/>
				<Input
					state={newExperience.city}
					setState={(value) =>
						setNewExperience({ ...newExperience, city: value })
					}
					className={`sm:col-span-2`}
					name={"city"}
					label={"City*"}
				/>
				<Input
					state={newExperience.startDate}
					setState={(value) =>
						setNewExperience({ ...newExperience, startDate: value })
					}
					type="month"
					name={"startDate"}
					label={"Start Date*"}
				/>
				<Input
					state={newExperience.endDate}
					setState={(value) =>
						setNewExperience({ ...newExperience, endDate: value })
					}
					type="month"
					present={true} // This enables the "Present" button functionality in Input.jsx
					name={"endDate"}
					label={"End Date*"} // Mark as required as either a date or "Present"
				/>
			</div>
			<div className="mt-2">
				<TextArea
					state={newExperience.description}
					setState={(value) =>
						setNewExperience({ ...newExperience, description: value })
					}
					label="Description*"
					name="description"
					rows={6}
					className__textarea="min-h-[100px]"
				/>
			</div>
			<div className="mt-4 flex gap-2">
				<Button
					onClick={() =>
						editedIndex === null
							? handleAddExperience()
							: handleEditExperience()
					}
					disabled={editedIndex === null && !isAddFormValid()}
					className={
						editedIndex === null && !isAddFormValid()
							? "!bg-gray-400 hover:!bg-gray-400 cursor-not-allowed opacity-70"
							: ""
					}
				>
					{editedIndex !== null ? "Save Changes" : "Add Experience"}
				</Button>
				{editedIndex !== null && (
					<Button
						onClick={() => handleCloseEdit()}
						className="bg-gray-500 hover:bg-gray-600 focus:ring-gray-400"
					>
						{"Cancel Edit"}
					</Button>
				)}
			</div>

			<div className="mt-6">
				{experience.length > 0 && (
					<div className="space-y-4 text-black/80">
						{experience.map((exp, index) => (
							<Example
								key={exp.id || index}
								index={index}
								remove={handleRemoveExperience}
								edit={handleChooseExperience}
								down={handleMoveExperienceDown}
								up={handleMoveExperienceUp}
								title={`${exp.company || "N/A"} - ${exp.jobTitle || "N/A"}`}
								state={experience}
							>
								{exp.city && (
									<p className="flex items-center gap-1">
										<strong className="text-brand">
											<MdPinDrop />
										</strong>{" "}
										{exp.city}
									</p>
								)}
								<p className="flex items-center gap-1">
									<strong className="text-brand">
										<MdDateRange />
									</strong>{" "}
									{formatDate(exp.startDate)} -{" "}
									{/* formatDate now handles "Present" */}
									{formatDate(exp.endDate)}
								</p>
								<div
									className="text-left mt-2 text-sm opacity-80 prose prose-sm max-w-none"
									dangerouslySetInnerHTML={{
										__html:
											exp?.description &&
											exp.description.trim() !== "" &&
											exp.description !== "<p><br></p>" &&
											exp.description !== "<p></p>"
												? String(exp.description).replace(/\n/g, "<br />")
												: "",
									}}
								></div>
							</Example>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Experience;
