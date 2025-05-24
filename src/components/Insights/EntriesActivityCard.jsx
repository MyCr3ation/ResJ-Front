// src/components/insights/EntriesActivityCard.jsx
import React, { useState, useMemo } from "react";
import InsightCard from "../Common/InsightCard.jsx";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import {
	parseEntryDate,
	getYear,
	format,
	getToday,
} from "../../utils/dateUtils.jsx";
import { FiBarChart2 } from "react-icons/fi";

const EntriesActivityCard = ({ entries, onFilterChange, delay = 0 }) => {
	const availableYears = useMemo(() => {
		const years = new Set(entries.map((e) => getYear(parseEntryDate(e.date))));
		return ["All-time", ...Array.from(years).sort((a, b) => b - a)];
	}, [entries]);

	const currentYear = getYear(getToday());
	const initialPeriod = availableYears.includes(String(currentYear))
		? String(currentYear)
		: "All-time";

	const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);

	const filteredEntries = useMemo(() => {
		if (selectedPeriod === "All-time") return entries;
		return entries.filter(
			(e) => getYear(parseEntryDate(e.date)) === parseInt(selectedPeriod)
		);
	}, [entries, selectedPeriod]);

	// Effect to call onFilterChange when filteredEntries or selectedPeriod changes
	React.useEffect(() => {
		onFilterChange(filteredEntries, selectedPeriod);
	}, [filteredEntries, selectedPeriod, onFilterChange]);

	const monthlyData = useMemo(() => {
		const counts = {};
		for (let i = 0; i < 12; i++) {
			counts[format(new Date(2000, i, 1), "MMM")] = 0; // Initialize all months for consistent chart
		}
		filteredEntries.forEach((entry) => {
			const month = format(parseEntryDate(entry.date), "MMM");
			counts[month] = (counts[month] || 0) + 1;
		});
		return Object.entries(counts).map(([name, value]) => ({
			name,
			entries: value,
		}));
	}, [filteredEntries]);

	return (
		<InsightCard
			title={`Journal Activity (${selectedPeriod})`}
			icon={<FiBarChart2 />}
			elementDelay={delay}
			className="min-h-[300px] sm:min-h-[400px]"
		>
			<div className="flex flex-wrap gap-2 mb-4">
				{availableYears.map((year) => (
					<button
						key={year}
						onClick={() => setSelectedPeriod(String(year))}
						className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-colors duration-200
                        ${
													selectedPeriod === String(year)
														? "bg-brandGreen-500 text-white shadow-md"
														: "bg-brandGreen-700 hover:bg-brandGreen-600 text-brandGreen-100"
												}`}
					>
						{year}
					</button>
				))}
			</div>
			<p className="text-brandGreen-200 mb-1 text-sm">
				Total Entries:{" "}
				<span className="font-semibold text-brandGreen-50">
					{filteredEntries.length}
				</span>
			</p>
			{filteredEntries.length > 0 ? (
				<div className="h-52 sm:h-64 md:h-72 mt-4">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={monthlyData}
							margin={{ top: 5, right: 0, left: -25, bottom: 5 }}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								strokeOpacity={0.2}
								stroke="#C0DBCC"
							/>
							<XAxis
								dataKey="name"
								tick={{ fill: "#C0DBCC", fontSize: "0.75rem" }}
							/>
							<YAxis
								allowDecimals={false}
								tick={{ fill: "#C0DBCC", fontSize: "0.75rem" }}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "rgba(32, 62, 49, 0.9)", // brandGreen-800 with opacity
									borderColor: "#71AD8B", // brandGreen-400
									borderRadius: "8px",
									boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
								}}
								labelStyle={{ color: "#F2F8F5", fontWeight: "bold" }} // brandGreen-50
								itemStyle={{ color: "#C0DBCC" }} // brandGreen-200
							/>
							<Bar
								dataKey="entries"
								fill="#71AD8B"
								radius={[4, 4, 0, 0]}
								barSize={20}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			) : (
				<p className="text-brandGreen-300 text-center pt-10">
					No entries for this period.
				</p>
			)}
		</InsightCard>
	);
};

export default EntriesActivityCard;
