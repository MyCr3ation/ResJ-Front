import { useState, useCallback, useEffect } from "react";
import useStore from "../../../store/store.jsx"; // Adjusted
import Input from "../../Common/Input.jsx"; // Adjusted
import Button from "../../Button.jsx"; // Adjusted
import Example from "../Example.jsx"; // Assuming shared Example
import { FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const Interests = () => {
	const {
		store: { interests },
		addItem,
		editItem,
		removeItem,
		updateOrder,
	} = useStore();

	const [newInterest, setNewInterest] = useState(""); // Changed from newInterests
	const [editedIndex, setEditedIndex] = useState(null);

	const isFormValid = () => {
		return newInterest.trim() !== "";
	};

	const handleAddInterest = () => {
		// Renamed from handleAddInterests
		if (isFormValid()) {
			if (editedIndex === null) {
				addItem("interests", newInterest.trim());
				toast.success("Interest added.");
			} else {
				editItem("interests", editedIndex, newInterest.trim());
				setEditedIndex(null);
				toast.success("Interest updated.");
			}
			setNewInterest("");
		} else {
			toast.error("Interest cannot be empty.");
		}
	};

	const handleEditInterest = (index) => {
		// Renamed
		setEditedIndex(index);
		setNewInterest(interests[index] || ""); // Ensure string
	};

	const handleCloseEdit = () => {
		setEditedIndex(null);
		setNewInterest("");
	};

	const handleRemoveInterest = (index) => {
		// Renamed
		removeItem("interests", index);
		toast.success("Interest removed.");
		if (editedIndex === index) {
			handleCloseEdit();
		}
	};

	const handleMoveInterestsUp = (index) => {
		if (index > 0) {
			const updatedItems = [...interests];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index - 1, 0, movedItem);
			updateOrder("interests", updatedItems);
		}
	};

	const handleMoveInterestsDown = (index) => {
		if (index < interests.length - 1) {
			const updatedItems = [...interests];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index + 1, 0, movedItem);
			updateOrder("interests", updatedItems);
		}
	};

	const handleKeyPress = useCallback(
		(event) => {
			if (event.key === "Enter" && newInterest.trim() !== "") {
				handleAddInterest();
			}
		},
		[newInterest, handleAddInterest] // Corrected dependency
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [handleKeyPress]);

	return (
		<div className="w-full mx-auto px-2 bg-white">
			<h1 className="text-center font-bold text-3xl text-brand mb-4">
				Interests
			</h1>
			<div className="flex items-stretch gap-2 mb-4">
				{" "}
				{/* items-stretch for button height */}
				<Input
					state={newInterest}
					setState={setNewInterest}
					name={"interest_name"} // Changed name for clarity
					label={editedIndex === null ? "Add Interest" : "Edit Interest"}
				/>
				<Button
					onClick={handleAddInterest}
					disabled={!isFormValid() && editedIndex === null}
					className={`px-4 ${
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
				{interests.length > 0 && (
					<div className="space-y-4 text-black/80">
						{/* Note: 'interest' singular for map item */}
						{interests.map((interest, index) => (
							<Example
								key={index}
								index={index}
								up={handleMoveInterestsUp}
								down={handleMoveInterestsDown}
								remove={handleRemoveInterest}
								edit={handleEditInterest}
								title={interest}
								state={interests} // Pass the array
								cursor={false}
							/> // No children for simple string list
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Interests;
