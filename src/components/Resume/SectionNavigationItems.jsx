import React from "react";
import { HiCheck } from "react-icons/hi";

const SectionNavigationItems = ({
	sections,
	activeSection, // This is local React state from Resume.jsx
	isSectionComplete,
	store, // This is the 'store' data object from Zustand, passed via Resume.jsx
	onSectionClick,
	onLoadSampleDataClick,
	isMobile = false,
}) => {
	const baseButtonClasses =
		"text-left rounded-xl transition-all duration-150 ease-in-out flex items-center w-full text-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGreen-500";
	const itemPadding = "px-3.5 py-3";
	const activeItemClasses =
		"bg-brandGreen-100 text-brandGreen-700 font-semibold";
	const inactiveItemClasses =
		"text-gray-600 hover:bg-gray-100 hover:text-gray-800";
	const loadSampleClasses =
		"mt-3 w-full font-semibold py-2.5 px-4 rounded-xl transition-colors duration-150 ease-in-out text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-brandGreen-50 hover:bg-brandGreen-100 text-brandGreen-600 border border-brandGreen-200/80 hover:border-brandGreen-300 focus-visible:ring-brandGreen-500";

	return (
		<div
			className={`flex flex-col ${isMobile ? "gap-y-2 pt-1 pb-1" : "gap-y-2"}`}
		>
			{!isMobile && (
				<h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 px-1">
					Resume Sections
				</h3>
			)}
			{sections.map((section) => {
				const isComplete = isSectionComplete(section.id, store); // 'store' is Zustand data
				const showCheckmark = isComplete && activeSection !== section.id;

				return (
					<button
						key={section.id}
						className={`${baseButtonClasses} ${itemPadding} ${
							activeSection === section.id
								? activeItemClasses
								: inactiveItemClasses
						} ${
							activeSection === section.id ? "font-semibold" : "font-medium"
						}`}
						onClick={() => onSectionClick(section.id)}
						aria-current={activeSection === section.id ? "page" : undefined}
					>
						{showCheckmark && (
							<HiCheck
								className="text-brandGreen-500 mr-2 flex-shrink-0"
								size={20}
								aria-hidden="true"
							/>
						)}
						<span className="truncate flex-1">{section.label}</span>
					</button>
				);
			})}
			<button onClick={onLoadSampleDataClick} className={loadSampleClasses}>
				Load Sample Data
			</button>
		</div>
	);
};

export default SectionNavigationItems;
