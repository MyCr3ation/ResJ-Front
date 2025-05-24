import React from "react";

const Modal = ({
	isOpen,
	onClose,
	children,
	className,
	className__children,
}) => {
	if (!isOpen) return null;

	const handleModalClick = (e) => {
		e.stopPropagation();
	};

	const handleOutsideClick = () => {
		onClose();
	};

	// Construct the className for the outer div
	const outerDivClasses = [
		"fixed top-0 left-0 bg-zinc-900/95 backdrop-blur-lg flex justify-center items-center z-[999] h-full w-full",
		className, // Add the custom className if provided
	]
		.filter(Boolean) // Remove any falsy values (e.g., if className is undefined)
		.join(" "); // Join with a space

	// Construct the className for the children's div
	const childrenDivClasses = [
		"rounded-md shadow-lg w-96 grid grid-cols-1 gap-2",
		className__children, // Add the custom className__children if provided
	]
		.filter(Boolean) // Remove any falsy values
		.join(" "); // Join with a space

	return (
		<div className={outerDivClasses} onClick={handleOutsideClick}>
			<div className={childrenDivClasses} onClick={handleModalClick}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
