// src/components/Common/ProfileImageUpload.jsx
import React, { useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import ImageCrop from "./ImageCrop.jsx"; // Make sure path is correct
import defaultProfilePicPlaceholder from "../../assets/profilepic.jpg"; // Your default placeholder

const ProfileImageUpload = ({
	initialImage, // URL or base64 of the current profile picture (from backend or local state)
	onImageCropped, // Callback: (base64CroppedImage) => void
	onImageDeleted, // Callback: () => void
	isBackendConnected = false, // Future flag to slightly alter behavior if needed
}) => {
	const [imageForCropper, setImageForCropper] = useState(null); // Raw image selected by user for cropper
	const [modalOpen, setModalOpen] = useState(false);
	// This state reflects what's currently displayed, either initial, cropped, or default
	const [displayImage, setDisplayImage] = useState(
		initialImage || defaultProfilePicPlaceholder
	);

	useEffect(() => {
		// Update display image if initialImage prop changes (e.g., after login, data fetch)
		setDisplayImage(initialImage || defaultProfilePicPlaceholder);
	}, [initialImage]);

	const handleFileSelect = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageForCropper(reader.result); // Set this for the cropper
				setModalOpen(true);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleCropDone = (croppedAreaPixels) => {
		if (!imageForCropper) {
			setModalOpen(false);
			return;
		}
		const canvas = document.createElement("canvas");
		const imageObj = new Image();
		imageObj.src = imageForCropper;
		imageObj.onload = () => {
			canvas.width = croppedAreaPixels.width;
			canvas.height = croppedAreaPixels.height;
			const ctx = canvas.getContext("2d");
			ctx.drawImage(
				imageObj,
				croppedAreaPixels.x,
				croppedAreaPixels.y,
				croppedAreaPixels.width,
				croppedAreaPixels.height,
				0,
				0,
				croppedAreaPixels.width,
				croppedAreaPixels.height
			);
			const base64CroppedImage = canvas.toDataURL("image/jpeg");
			setDisplayImage(base64CroppedImage); // Update preview immediately
			if (onImageCropped) {
				onImageCropped(base64CroppedImage); // Pass cropped image to parent
			}
			setModalOpen(false);
			setImageForCropper(null); // Clear temp cropper image
		};
		imageObj.onerror = () => {
			console.error("Error loading image for cropping.");
			setModalOpen(false);
			setImageForCropper(null);
		};
	};

	const handleCropCancel = () => {
		setModalOpen(false);
		setImageForCropper(null);
	};

	const handleDelete = () => {
		if (
			window.confirm("Are you sure you want to remove your profile picture?")
		) {
			setDisplayImage(defaultProfilePicPlaceholder); // Revert preview to default
			if (onImageDeleted) {
				onImageDeleted(); // Notify parent to handle backend deletion
			}
		}
	};

	const canDelete = displayImage !== defaultProfilePicPlaceholder;

	return (
		<div className="flex flex-col items-center">
			<div className="w-20 h-20 relative">
				<img
					src={displayImage}
					alt="Profile"
					loading="lazy"
					className="w-full h-full object-cover rounded-full"
				/>
				{canDelete && (
					<button
						onClick={handleDelete}
						type="button"
						className="absolute top-0 right-0 bg-red-400 text-black rounded-full p-1 transform translate-x-1/4 -translate-y-1/4 hover:bg-red-500 transition-colors"
						aria-label="Delete profile picture"
					>
						<MdDelete size={14} />
					</button>
				)}
			</div>

			<ImageCrop
				image={imageForCropper} // Pass the raw selected image to cropper
				open={modalOpen}
				onCropCancel={handleCropCancel}
				onCropDone={handleCropDone}
			/>

			<div className="flex items-center justify-center gap-2 my-2">
				<label
					htmlFor="profile-page-image-upload"
					className="flex flex-col items-center justify-center w-full cursor-pointer text-center"
				>
					<IoCloudUploadOutline size={24} className="text-black mb-1" />
					<span className="text-xs text-gray-600">Change Photo</span>
					<input
						id="profile-page-image-upload"
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleFileSelect}
						onClick={(event) => {
							event.target.value = null; // Allows re-selecting the same file
						}}
					/>
				</label>
			</div>
		</div>
	);
};

export default ProfileImageUpload;
