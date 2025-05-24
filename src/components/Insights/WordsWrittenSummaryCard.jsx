// src/components/insights/WordsWrittenSummaryCard.jsx
import React, { useMemo } from "react";
import InsightCard from "../Common/InsightCard.jsx";
import { FiEdit3 } from "react-icons/fi";

const WordsWrittenSummaryCard = ({ filteredEntries, delay = 0 }) => {
	const totalWords = useMemo(() => {
		return filteredEntries.reduce((sum, entry) => {
			const words = entry.body
				? entry.body.split(/\s+/).filter(Boolean).length
				: 0;
			return sum + words;
		}, 0);
	}, [filteredEntries]);

	return (
		<InsightCard title="Words Written" icon={<FiEdit3 />} elementDelay={delay}>
			<p className="text-3xl sm:text-4xl font-bold text-brandGreen-50">
				{totalWords.toLocaleString()}
			</p>
			<p className="text-sm text-brandGreen-200">Approx. Words</p>
		</InsightCard>
	);
};

export default WordsWrittenSummaryCard;
