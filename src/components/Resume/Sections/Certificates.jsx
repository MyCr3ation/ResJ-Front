import { useState, Suspense } from "react"; // Keep Suspense if Editor was truly the only lazy part
import useStore from "../../../store/store.jsx"; // Adjusted path
import Input from "../../Common/Input.jsx"; // Adjusted path
import Button from "../../Button.jsx"; // Adjusted path
import TextArea from "../../Common/TextArea.jsx"; // Using TextArea
import toast from "react-hot-toast";
import Example from "../Example.jsx"; // Assuming shared Example in ../Experience/Example.jsx or similar
import { MdDateRange } from "react-icons/md";

// Simple date formatting function
const formatDate = (dateString, locale = "en-US") => {
	if (!dateString) return "";
	try {
		return new Date(dateString).toLocaleDateString(locale, {
			month: "short",
			year: "numeric",
		});
	} catch (e) {
		console.warn("Error formatting date:", dateString, e);
		return dateString; // Fallback
	}
};

const Certificates = () => {
	const {
		store: { certificates },
		addItem,
		editItem,
		removeItem,
		updateOrder,
	} = useStore();

	const initialCertificateState = {
		title: "",
		date: "",
		description: "",
	};

	const [newCertificate, setNewCertificate] = useState(initialCertificateState);
	const [editedIndex, setEditedIndex] = useState(null);

	const isFormValid = () => {
		return (
			newCertificate.title.trim() !== "" && newCertificate.date.trim() !== ""
			// Description can be optional for certificates often
		);
	};

	const handleAddCertificate = () => {
		if (isFormValid()) {
			addItem("certificates", newCertificate);
			setNewCertificate(initialCertificateState);
			toast.success("Certificate added successfully.");
		} else {
			toast.error("Title and Date are required.");
		}
	};

	const handleEditCertificate = () => {
		if (newCertificate.title.trim() && newCertificate.date.trim()) {
			try {
				editItem("certificates", editedIndex, newCertificate);
				toast.success("Certificate updated successfully.");
				setEditedIndex(null);
				setNewCertificate(initialCertificateState);
			} catch (error) {
				console.error(error);
				toast.error("Failed to update certificate.");
			}
		} else {
			toast.error("Title and Date cannot be empty when editing.");
		}
	};

	const handleChooseCertificate = (index) => {
		setEditedIndex(index);
		const certificateItem = certificates[index];
		setNewCertificate({
			title: certificateItem.title || "",
			date: certificateItem.date || "",
			description: certificateItem.description || "",
		});
	};

	const handleCloseEdit = () => {
		setEditedIndex(null);
		setNewCertificate(initialCertificateState);
	};

	const handleRemoveCertificate = (index) => {
		removeItem("certificates", index);
		toast.success("Certificate removed.");
		if (editedIndex === index) {
			handleCloseEdit();
		}
	};

	const handleMoveCertificatesUp = (index) => {
		if (index > 0) {
			const updatedItems = [...certificates];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index - 1, 0, movedItem);
			updateOrder("certificates", updatedItems);
		}
	};

	const handleMoveCertificatesDown = (index) => {
		if (index < certificates.length - 1) {
			const updatedItems = [...certificates];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index + 1, 0, movedItem);
			updateOrder("certificates", updatedItems);
		}
	};

	const localeIso = "en-US"; // Hardcoded locale

	return (
		<div className="w-full mx-auto px-2 bg-white">
			<h1 className="text-center font-bold text-3xl text-brand mb-4">
				Certificates
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Input
					state={newCertificate.title}
					setState={(value) =>
						setNewCertificate({ ...newCertificate, title: value })
					}
					name="title"
					label={"Certificate Name" + "*"}
				/>
				<Input
					state={newCertificate.date}
					setState={(value) =>
						setNewCertificate({ ...newCertificate, date: value })
					}
					type="month"
					name="date"
					label={"Date Issued" + "*"}
				/>
			</div>
			<div className="mt-2">
				<TextArea
					state={newCertificate.description}
					setState={(value) =>
						setNewCertificate({ ...newCertificate, description: value })
					}
					label="Description (Optional)"
					name="certificate_description"
					rows={4}
				/>
			</div>
			<div className="mt-4 flex gap-2">
				<Button
					onClick={() =>
						editedIndex === null
							? handleAddCertificate()
							: handleEditCertificate()
					}
					disabled={editedIndex === null && !isFormValid()}
					className={
						editedIndex === null && !isFormValid()
							? "!bg-gray-400 hover:!bg-gray-400 cursor-not-allowed opacity-70"
							: ""
					}
				>
					{editedIndex !== null ? "Save Changes" : "Add Certificate"}
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
				{certificates.length > 0 && (
					<div className="space-y-4 text-black/80">
						{certificates.map((cert, index) => (
							<Example
								key={cert.id || index}
								index={index}
								remove={handleRemoveCertificate}
								edit={handleChooseCertificate}
								down={handleMoveCertificatesDown}
								up={handleMoveCertificatesUp}
								title={cert.title || "N/A"}
								state={certificates}
							>
								<p className="flex items-center gap-1">
									<strong className="text-brand">
										<MdDateRange />
									</strong>{" "}
									{formatDate(cert.date, localeIso)}
								</p>
								{cert.description && (
									<div
										className="text-left mt-2 text-sm opacity-80 prose prose-sm max-w-none"
										dangerouslySetInnerHTML={{
											__html: String(cert.description).replace(/\n/g, "<br />"),
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

export default Certificates;
