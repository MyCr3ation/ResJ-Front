import React from "react";

const ShimmerDiv = ({ width = "full", height = "4" }) => (
	<div
		className={`w-${width} h-${height} rounded bg-[linear-gradient(to_right,#e2e8f0_0%,#f8fafc_50%,#e2e8f0_100%)] bg-[length:200%_100%] animate-shimmer`}
	/>
);

export default ShimmerDiv;
