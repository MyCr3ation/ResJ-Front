import React, { useEffect, useState } from "react";
import useStore from "../../store/store"; // Make sure this path is correct
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import ImageCrop from "./ImageCrop"; // Make sure this path is correct and ImageCrop is also i18n-agnostic or handled

const ImageUpload = () => {
	const {
		store: { image },
		setStore,
	} = useStore();
	const [imagePreview, setImagePreview] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const handleImageChange = async (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result;
				setImagePreview(base64String); // Set preview for cropper
				setModalOpen(true);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		// If there's an image in the store (e.g., loaded initially), set it as preview
		// This might be redundant if the store `image` is always the final cropped one.
		// Consider if you want to show the stored image directly or always go through crop for an existing image.
		// For now, if `image` from store exists, we assume it's the one to display.
		if (image) {
			setImagePreview(image); // This will show the image in the <img> tag
		} else {
			setImagePreview(null); // Clear preview if store image is null
		}
	}, [image]);

	const deleteImage = () => {
		// Replaced t("remove") with a static string
		if (window.confirm("Are you sure you want to remove this image?")) {
			setStore("image", null);
			// setImagePreview(null); // image useEffect will handle this
		}
	};

	const onCropDone = (imgCroppedArea) => {
		const canvasElement = document.createElement("canvas");
		canvasElement.width = imgCroppedArea.width;
		canvasElement.height = imgCroppedArea.height;
		const context = canvasElement.getContext("2d");

		const imageObj = new Image();
		// imagePreview here should be the raw image selected by the user, before cropping
		// Ensure imagePreview holds the original base64 string of the selected file when onCropDone is called.
		imageObj.src = imagePreview; // imagePreview is the one passed to ImageCrop
		imageObj.onload = function () {
			context.drawImage(
				imageObj,
				imgCroppedArea.x,
				imgCroppedArea.y,
				imgCroppedArea.width,
				imgCroppedArea.height,
				0,
				0,
				imgCroppedArea.width,
				imgCroppedArea.height
			);
			const dataURL = canvasElement.toDataURL("image/jpeg");
			setStore("image", dataURL); // Update store with the cropped image
			setModalOpen(false);
			// setImagePreview(null); // Let useEffect handle setting preview based on store `image`
		};
		imageObj.onerror = function () {
			console.error("Error loading image for cropping.");
			// Handle error, maybe close modal and show a message
			setModalOpen(false);
		};
	};

	// This will be the image displayed in the circle, which comes from the store.
	const displayImage = image;

	return (
		<div className="flex flex-col items-center">
			<div className="w-20 h-20 relative">
				{displayImage ? (
					<img
						src={displayImage}
						alt="Uploaded"
						loading="lazy"
						className="w-full h-full object-cover rounded-full"
					/>
				) : (
					<div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
						<span className="select-none text-gray-900 text-xs">80 x 80</span>
					</div>
				)}
				{displayImage && (
					<button
						onClick={deleteImage}
						type="button"
						className="absolute top-0 right-0 bg-red-400 text-black rounded-full p-1 transform translate-x-1/4 -translate-y-1/4 hover:bg-red-500 transition-colors"
						aria-label="Delete image"
					>
						<MdDelete size={14} />
					</button>
				)}
			</div>

			{/* ImageCrop modal: imagePreview here is the *uncropped* image selected by user */}
			<ImageCrop
				image={
					imagePreview
				} /* Pass the raw selected image (before crop) to the cropper */
				open={modalOpen}
				onCropCancel={() => {
					setModalOpen(false);
					setImagePreview(image || null); // Reset preview to stored image or null if modal is cancelled
				}}
				onCropDone={onCropDone}
			/>

			<div className="flex items-center justify-center gap-2 my-2">
				<label
					htmlFor="dropzone-file-image-upload" // Unique ID for the label/input pair
					className="flex flex-col items-center justify-center w-full cursor-pointer text-center"
				>
					<IoCloudUploadOutline size={24} className="text-black mb-1" />
					<input
						id="dropzone-file-image-upload" // Match the htmlFor
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleImageChange}
						onClick={(event) => {
							event.target.value = null;
						}} // Allows re-selecting the same file
					/>
				</label>
			</div>
		</div>
	);
};

export default ImageUpload;
