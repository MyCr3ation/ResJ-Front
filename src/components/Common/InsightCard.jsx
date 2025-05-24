// src/components/insights/common/InsightCard.jsx
import React from "react";

const InsightCard = ({
	title,
	children,
	className = "",
	icon,
	titleClassName = "",
	elementDelay = 0,
}) => {
	return (
		<div
			className={`bg-brandGreen-700/90 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-xl border border-brandGreen-700/50 transition-all duration-300 hover:shadow-glow-brand-light animate-fadeIn ${className}`}
			style={{ animationDelay: `${elementDelay * 0.1}s` }}
		>
			{title && (
				<div className="flex items-center mb-3 sm:mb-4">
					{icon && (
						<div className="mr-3 text-brandGreen-300 text-xl sm:text-2xl">
							{icon}
						</div>
					)}
					<h3
						className={`text-base sm:text-lg font-semibold text-brandGreen-100 ${titleClassName}`}
					>
						{title}
					</h3>
				</div>
			)}
			<div className="text-brandGreen-50">{children}</div>
		</div>
	);
};

export default InsightCard;
