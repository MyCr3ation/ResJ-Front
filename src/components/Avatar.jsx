// src/components/Common/Avatar.jsx
import React from "react";
import defaultProfilePic from "../assets/profilepic.jpg"; // Adjust path as needed

const Avatar = ({ src, alt = "User Avatar" }) => {
	const imageToDisplay = src || defaultProfilePic;
	const altText = src ? alt : "Default user avatar";

	return (
		<div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
			<img
				src={imageToDisplay}
				alt={altText}
				className="h-full w-full object-cover"
			/>
		</div>
	);
};

export default Avatar;
