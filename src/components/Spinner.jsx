// src/components/Spinner.jsx
import React from "react";

const Spinner = ({ isMobile }) => {
	const initialLogoHalfHeight = isMobile ? 150 / 2 : 250 / 2;
	const spinnerOffset = initialLogoHalfHeight + 40; // 40px gap below logo

	return (
		<div
			style={{
				border: "4px solid rgba(0, 0, 0, 0.1)",
				width: "36px",
				height: "36px",
				borderRadius: "50%",
				borderLeftColor: "#4CAF50", // ResJ theme color
				position: "absolute",
				top: `calc(50% + ${spinnerOffset}px)`,
				left: "50%",
				animation: "spin 1s linear infinite",
				zIndex: 9999, // Same as container, effectively under the logo if logo is 10000
			}}
		>
			{/* Keyframes are defined globally or locally. Here, for simplicity: */}
			<style>{`
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
		</div>
	);
};

export default Spinner;
