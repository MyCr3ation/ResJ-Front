// src/components/insights/JournaledDaysSummaryCard.jsx
import React, { useMemo } from "react";
import InsightCard from "../Common/InsightCard.jsx";
import { parseEntryDate } from "../../utils/dateUtils.jsx";
import { FiCheckSquare } from "react-icons/fi";

const JournaledDaysSummaryCard = ({ filteredEntries, delay = 0 }) => {
	const uniqueDays = useMemo(() => {
		const dates = new Set(
			filteredEntries.map((e) => parseEntryDate(e.date).toDateString())
		);
		return dates.size;
	}, [filteredEntries]);

	return (
		<InsightCard
			title="Journaled Days"
			icon={<FiCheckSquare />}
			elementDelay={delay}
		>
			<p className="text-3xl sm:text-4xl font-bold text-brandGreen-50">
				{uniqueDays}
			</p>
			<p className="text-sm text-brandGreen-200">Unique Days</p>
		</InsightCard>
	);
};

export default JournaledDaysSummaryCard;
