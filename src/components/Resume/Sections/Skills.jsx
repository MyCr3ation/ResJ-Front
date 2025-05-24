import { useState, useCallback, useEffect } from "react";
import useStore from "../../../store/store.jsx"; // Adjusted
import Input from "../../Common/Input.jsx"; // Adjusted
import Button from "../../Button.jsx"; // Adjusted
import Example from "../Example.jsx"; // Assuming shared Example
import { FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const Skills = () => {
	const {
		store: { skills },
		addItem,
		editItem,
		removeItem,
		updateOrder,
	} = useStore();

	const [newSkill, setNewSkill] = useState("");
	const [editedIndex, setEditedIndex] = useState(null);

	const isFormValid = () => {
		return newSkill.trim() !== "";
	};

	const handleAddSkill = () => {
		if (isFormValid()) {
			if (editedIndex === null) {
				addItem("skills", newSkill.trim());
				toast.success("Skill added.");
			} else {
				editItem("skills", editedIndex, newSkill.trim());
				setEditedIndex(null);
				toast.success("Skill updated.");
			}
			setNewSkill("");
		} else {
			toast.error("Skill cannot be empty.");
		}
	};

	const handleEditSkill = (index) => {
		setEditedIndex(index);
		setNewSkill(skills[index] || "");
	};

	const handleCloseEdit = () => {
		setEditedIndex(null);
		setNewSkill("");
	};

	const handleRemoveSkill = (index) => {
		removeItem("skills", index);
		toast.success("Skill removed.");
		if (editedIndex === index) {
			handleCloseEdit();
		}
	};

	const handleMoveSkillUp = (index) => {
		if (index > 0) {
			const updatedItems = [...skills];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index - 1, 0, movedItem);
			updateOrder("skills", updatedItems);
		}
	};

	const handleMoveSkillDown = (index) => {
		if (index < skills.length - 1) {
			const updatedItems = [...skills];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index + 1, 0, movedItem);
			updateOrder("skills", updatedItems);
		}
	};

	const handleKeyPress = useCallback(
		(event) => {
			if (event.key === "Enter" && newSkill.trim() !== "") {
				handleAddSkill();
			}
		},
		[newSkill, handleAddSkill] // Corrected dependency
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [handleKeyPress]);

	return (
		<div className="w-full mx-auto px-2 bg-white">
			<h1 className="text-center font-bold text-3xl text-brand mb-4">Skills</h1>
			<div className="flex items-stretch gap-2 mb-4">
				{" "}
				{/* items-stretch for button height */}
				<Input
					state={newSkill}
					setState={setNewSkill}
					name={"skill_name"}
					label={editedIndex === null ? "Add Skill" : "Edit Skill"}
				/>
				<Button
					onClick={handleAddSkill}
					disabled={!isFormValid() && editedIndex === null}
					className={`px-3 ${
						!isFormValid() && editedIndex === null
							? "!bg-gray-400 hover:!bg-gray-400 cursor-not-allowed opacity-70"
							: ""
					}`}
				>
					{editedIndex === null ? <FaPlus size={16} /> : <FaCheck size={16} />}
				</Button>
				{editedIndex !== null && (
					<Button
						onClick={handleCloseEdit}
						className="px-4 bg-gray-500 hover:bg-gray-600 focus:ring-gray-400"
					>
						<FaTimes size={16} />
					</Button>
				)}
			</div>

			<div className="my-6">
				{skills.length > 0 && (
					<div className="space-y-4 text-black/80">
						{skills.map((skill, index) => (
							<Example
								key={index}
								index={index}
								up={handleMoveSkillUp}
								down={handleMoveSkillDown}
								remove={handleRemoveSkill}
								edit={handleEditSkill}
								title={skill}
								state={skills}
								cursor={false}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Skills;
