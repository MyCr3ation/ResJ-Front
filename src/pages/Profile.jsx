// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import Input from "../components/Common/Input";
import Button from "../components/Button";
import ProfileImageUpload from "../components/Common/ProfileImageUpload";
import defaultProfilePicForPage from "../assets/profilepic.jpg";

import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Sample data for display on the profile page - this would come from backend eventually
const sampleUserData = {
	fullname: "Alex Doe",
	email: "alex.doe@example.com",
	phone: "555-123-4567",
	dateOfBirth: "1990-05-15",
	// This would be the URL/base64 from your backend after login/fetch
	// For now, it's null, so ProfileImageUpload will use its internal default.
	profilePicture: null,
};

const ProfilePage = () => {
	// This state would hold the user's actual profile picture URL/base64 from the backend.
	// It's passed to ProfileImageUpload as initialImage.
	const [userProfileImage, setUserProfileImage] = useState(
		sampleUserData.profilePicture
	);

	const [passwordData, setPasswordData] = useState({
		oldPassword: "", // Kept for UI completeness
		newPassword: "",
		confirmNewPassword: "",
	});
	const [passwordErrors, setPasswordErrors] = useState({});
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

	// Simulate fetching user data on mount (including profile pic)
	useEffect(() => {
		// In a real app:
		// const fetchUserData = async () => {
		//   const data = await api.getUser(); // Fetch from backend
		//   setUserData(data); // If you had a full userData state
		//   setUserProfileImage(data.profilePictureUrl);
		// };
		// fetchUserData();
		// For this demo, userProfileImage is initialized from sampleUserData
	}, []);

	const handlePasswordValueChange = (e) => {
		const { name, value } = e.target;
		setPasswordData((prev) => ({ ...prev, [name]: value }));
		if (passwordErrors[name]) {
			setPasswordErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
		}
	};
	// Use this wrapper for Input component's setState prop
	const handleInputComponentChange = (fieldName, value) => {
		setPasswordData((prev) => ({ ...prev, [fieldName]: value }));
		if (passwordErrors[fieldName]) {
			setPasswordErrors((prevErrors) => ({ ...prevErrors, [fieldName]: null }));
		}
	};

	const validatePasswordForm = () => {
		const newErrors = {};
		if (!passwordData.oldPassword)
			newErrors.oldPassword = "Old password is required.";
		if (!passwordData.newPassword) {
			newErrors.newPassword = "New password is required.";
		} else if (passwordData.newPassword.length < 6) {
			newErrors.newPassword = "New password must be at least 6 characters.";
		}
		if (passwordData.newPassword !== passwordData.confirmNewPassword) {
			newErrors.confirmNewPassword = "New passwords do not match.";
		}
		return newErrors;
	};

	const handleChangePassword = (e) => {
		e.preventDefault();
		const formErrors = validatePasswordForm();
		if (Object.keys(formErrors).length > 0) {
			setPasswordErrors(formErrors);
			return;
		}
		setPasswordErrors({});
		// --- Backend Call Simulation ---
		console.log("Attempting to change password with:", passwordData);
		// api.changePassword(passwordData).then(() => {
		toast.success("Password change request sent! (Simulated)");
		setPasswordData({
			oldPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		});
		// }).catch(err => toast.error(err.message));
		// --- End Backend Call Simulation ---
	};

	// Called by ProfileImageUpload when a new image is cropped
	const handleProfileImageCropped = (base64Image) => {
		// --- Backend Call Simulation ---
		console.log(
			"New profile image cropped (base64), ready for backend upload:",
			base64Image.substring(0, 60) + "..."
		);
		// api.uploadProfilePicture(base64Image).then(newImageUrl => {
		//   setUserProfileImage(newImageUrl); // Update state with URL from backend
		//   // You might also update a global auth user state here for the navbar
		//   toast.success("Profile picture updated!");
		// }).catch(err => toast.error(err.message));
		setUserProfileImage(base64Image); // For local preview until backend is connected
		toast.success("Profile picture updated locally (backend pending).");
		// --- End Backend Call Simulation ---
	};

	// Called by ProfileImageUpload when delete is clicked
	const handleProfileImageDeleted = () => {
		// --- Backend Call Simulation ---
		console.log("Request to delete profile image from backend.");
		// api.deleteProfilePicture().then(() => {
		//   setUserProfileImage(null); // Or your default placeholder from backend
		//   // Update global auth user state
		//   toast.info("Profile picture removed.");
		// }).catch(err => toast.error(err.message));
		setUserProfileImage(null); // Reverts to default in ProfileImageUpload via initialImage prop
		toast.info("Profile picture removed locally (backend pending).");
		// --- End Backend Call Simulation ---
	};

	// Helper for display fields (read-only)
	const DisplayField = ({ label, value }) => (
		<div className="p-3 border border-brandGreen-200 rounded-xl bg-brandGreen-50">
			<label className="block text-xs text-brandGreen-500 mb-0.5">
				{label}
			</label>
			<p className="text-sm text-black whitespace-pre-wrap">{value || "-"}</p>
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="bg-white shadow-xl rounded-2xl p-6 md:p-10">
					<h1 className="text-3xl font-bold text-brand mb-6 text-center">
						My Profile
					</h1>

					<div className="flex flex-col items-center mb-8">
						<ProfileImageUpload
							initialImage={userProfileImage || defaultProfilePicForPage}
							onImageCropped={handleProfileImageCropped}
							onImageDeleted={handleProfileImageDeleted}
						/>
					</div>

					{/* Personal Details Section - Read Only with Sample Data */}
					<div className="mb-8 border-b border-gray-200 pb-8">
						<h2 className="text-xl font-semibold text-brand mb-6">
							Personal Details
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
							<DisplayField label="Full Name" value={sampleUserData.fullname} />
							<DisplayField
								label="Email Address"
								value={sampleUserData.email}
							/>
							<DisplayField label="Phone Number" value={sampleUserData.phone} />
							<DisplayField
								label="Date of Birth"
								value={sampleUserData.dateOfBirth}
							/>
						</div>
					</div>

					{/* Change Password Section */}
					<div>
						<h2 className="text-xl font-semibold text-brand mb-6">
							Change Password
						</h2>
						<form onSubmit={handleChangePassword} className="space-y-5">
							<div className="relative">
								{" "}
								{/* Wrapper for Input and Icon */}
								<Input
									label="Old Password"
									name="oldPassword"
									type={showOldPassword ? "text" : "password"}
									state={passwordData.oldPassword}
									setState={(val) =>
										handleInputComponentChange("oldPassword", val)
									}
									placeholder="••••••••"
									required
									className__input="peer" // Ensure peer class for label interaction if needed
								/>
								<button
									type="button"
									onClick={() => setShowOldPassword(!showOldPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/4 text-gray-500 hover:text-gray-700" // Adjust top/transform for your Input
								>
									{showOldPassword ? (
										<FaEyeSlash className="h-5 w-5" />
									) : (
										<FaEye className="h-5 w-5" />
									)}
								</button>
								{passwordErrors.oldPassword && (
									<p className="mt-1 text-xs text-red-600">
										{passwordErrors.oldPassword}
									</p>
								)}
							</div>

							<div className="relative">
								<Input
									label="New Password"
									name="newPassword"
									type={showNewPassword ? "text" : "password"}
									state={passwordData.newPassword}
									setState={(val) =>
										handleInputComponentChange("newPassword", val)
									}
									placeholder="••••••••"
									required
								/>
								<button
									type="button"
									onClick={() => setShowNewPassword(!showNewPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/4 text-gray-500 hover:text-gray-700"
								>
									{showNewPassword ? (
										<FaEyeSlash className="h-5 w-5" />
									) : (
										<FaEye className="h-5 w-5" />
									)}
								</button>
								{passwordErrors.newPassword && (
									<p className="mt-1 text-xs text-red-600">
										{passwordErrors.newPassword}
									</p>
								)}
							</div>

							<div className="relative">
								<Input
									label="Confirm New Password"
									name="confirmNewPassword"
									type={showConfirmNewPassword ? "text" : "password"}
									state={passwordData.confirmNewPassword}
									setState={(val) =>
										handleInputComponentChange("confirmNewPassword", val)
									}
									placeholder="••••••••"
									required
								/>
								<button
									type="button"
									onClick={() =>
										setShowConfirmNewPassword(!showConfirmNewPassword)
									}
									className="absolute right-3 top-1/2 transform -translate-y-1/4 text-gray-500 hover:text-gray-700"
								>
									{showConfirmNewPassword ? (
										<FaEyeSlash className="h-5 w-5" />
									) : (
										<FaEye className="h-5 w-5" />
									)}
								</button>
								{passwordErrors.confirmNewPassword && (
									<p className="mt-1 text-xs text-red-600">
										{passwordErrors.confirmNewPassword}
									</p>
								)}
							</div>

							<div className="flex justify-end pt-2">
								<Button type="submit">Change Password</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
