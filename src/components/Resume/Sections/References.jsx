import { useState } from "react";
import useStore from "../../../store/store.jsx";
import Input from "../../Common/Input.jsx";
import Button from "../../Button.jsx"; // Adjusted path
import Example from "../Example.jsx"; // Adjusted path, assuming Example is in components/Resume/Example.jsx
import { MdEmail, MdPhone } from "react-icons/md";
import toast from "react-hot-toast";

const References = () => {
	const t = (key) => key;
	const {
		store: { references },
		addItem,
		editItem,
		removeItem,
		updateOrder,
	} = useStore();

	const initialReferenceState = {
		name: "",
		company: "",
		phone: "",
		email: "",
	};

	const [newReference, setNewReference] = useState(initialReferenceState);
	const [editedIndex, setEditedIndex] = useState(null);

	const isFormValid = () => {
		return (
			newReference.name.trim() !== "" && newReference.company.trim() !== ""
		);
	};

	const handleAddReference = () => {
		if (isFormValid()) {
			addItem("references", newReference);
			setNewReference(initialReferenceState);
			toast.success("Reference added.");
		} else {
			toast.error("Name and Company are required.");
		}
	};

	const handleEditReference = () => {
		if (newReference.name.trim() && newReference.company.trim()) {
			try {
				editItem("references", editedIndex, newReference);
				toast.success("Reference updated.");
				setEditedIndex(null);
				setNewReference(initialReferenceState);
			} catch (error) {
				console.error(error);
				toast.error("Failed to update reference.");
			}
		} else {
			toast.error("Name and Company cannot be empty when editing.");
		}
	};

	const handleChooseReference = (index) => {
		setEditedIndex(index);
		const referenceItem = references[index];
		setNewReference({
			name: referenceItem.name || "",
			company: referenceItem.company || "",
			phone: referenceItem.phone || "",
			email: referenceItem.email || "",
		});
	};

	const handleCloseEdit = () => {
		setEditedIndex(null);
		setNewReference(initialReferenceState);
	};

	const handleRemoveReference = (index) => {
		removeItem("references", index);
		toast.success("Reference removed.");
		if (editedIndex === index) {
			handleCloseEdit();
		}
	};

	const handleMoveReferenceUp = (index) => {
		if (index > 0) {
			const updatedItems = [...references];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index - 1, 0, movedItem);
			updateOrder("references", updatedItems);
		}
	};

	const handleMoveReferenceDown = (index) => {
		if (index < references.length - 1) {
			const updatedItems = [...references];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index + 1, 0, movedItem);
			updateOrder("references", updatedItems);
		}
	};

	return (
		<div className="w-full mx-auto px-2 bg-white">
			<div className="flex justify-center items-center mb-6">
				{" "}
				{/* Changed from justify-between, removed CV Preview button */}
				<h1 className="font-bold text-3xl text-brand">
					{" "}
					{/* Removed text-center and flex-grow as it's the only item */}
					References
				</h1>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Input
					state={newReference.name}
					setState={(value) =>
						setNewReference({ ...newReference, name: value })
					}
					name={"reference_name"}
					label={t("Full Name") + "*"}
				/>
				<Input
					state={newReference.company}
					setState={(value) =>
						setNewReference({ ...newReference, company: value })
					}
					name={"reference_company"}
					label={t("Company / Title") + "*"}
				/>
				<Input
					state={newReference.phone}
					setState={(value) =>
						setNewReference({ ...newReference, phone: value })
					}
					name={"reference_phone"}
					label={t("Phone Number")}
					type="tel"
				/>
				<Input
					state={newReference.email}
					setState={(value) =>
						setNewReference({ ...newReference, email: value })
					}
					name={"reference_email"}
					label={t("Email Address")}
					type="email"
				/>
			</div>
			<div className="mt-4 flex gap-2">
				<Button
					onClick={() =>
						editedIndex === null ? handleAddReference() : handleEditReference()
					}
					disabled={editedIndex === null && !isFormValid()}
					className={
						editedIndex === null && !isFormValid()
							? "!bg-gray-400 hover:!bg-gray-400 cursor-not-allowed opacity-70"
							: ""
					}
				>
					{editedIndex !== null ? "Save Changes" : "Add Reference"}
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
				{references.length > 0 && (
					<div className="space-y-4 text-black/80">
						{references.map((ref, index) => (
							<Example
								key={ref.id || index}
								index={index}
								remove={handleRemoveReference}
								edit={handleChooseReference}
								down={handleMoveReferenceDown}
								up={handleMoveReferenceUp}
								title={`${ref.name || "N/A"} - ${ref.company || "N/A"}`}
								state={references}
							>
								{ref.phone && (
									<p className="flex items-center gap-1 text-sm">
										<strong className="text-brand">
											<MdPhone />
										</strong>{" "}
										<a href={`tel:${ref.phone}`} className="hover:underline">
											{ref.phone}
										</a>
									</p>
								)}
								{ref.email && (
									<p className="flex items-center gap-1 text-sm">
										<strong className="text-brand">
											<MdEmail />
										</strong>{" "}
										<a
											href={`mailto:${ref.email}`}
											className="text-blue-600 hover:underline"
										>
											{ref.email}
										</a>
									</p>
								)}
							</Example>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default References;
