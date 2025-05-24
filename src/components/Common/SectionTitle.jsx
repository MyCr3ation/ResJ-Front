import React, { useState, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const SectionTitle = ({ children, tooltip, class_input }) => (
	<h3
		className={`text-lg font-medium text-brandGreen-700 mb-3 flex items-center justify-center ${class_input}`}
	>
		{children}
		{tooltip && (
			<AiOutlineInfoCircle
				title={tooltip}
				className="inline ml-2 cursor-pointer text-brandGreen-400"
			/>
		)}
	</h3>
);

export default SectionTitle;
