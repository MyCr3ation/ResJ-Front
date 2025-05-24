import React, { useState, useEffect } from "react";
import useStore from "../../store/store"; // Assuming store path is correct
import { SAMPLE_QUOTE } from "../../data/sampleData"; // Import sample data
import { RiDoubleQuotesR } from "react-icons/ri";
import Cookies from "js-cookie";
import SectionTitle from "../Common/SectionTitle";
import ShimmerDiv from "../Common/ShimmerDiv";

const QuoteSkeleton = () => {
	return (
		<div className="space-y-2">
			<ShimmerDiv width="full" height="4" />
			<ShimmerDiv width="5/6" height="4" />
			<ShimmerDiv width="1/3" height="3" />
		</div>
	);
};

const Quote = () => {
	// Local state for the quote display, although it's fetched once
	const [quote, setQuote] = useState(null);
	const setStore = useStore((state) => state.setStore);

	useEffect(() => {
		const fetchedQuote = SAMPLE_QUOTE; // Simulate today's fetched quote
		setQuote(fetchedQuote);

		const existing = Cookies.get("journalDraft");

		let shouldUpdate = true;

		if (existing) {
			try {
				const parsed = JSON.parse(existing);
				// Check if the quote has already been saved
				if (
					parsed.quote?.q === fetchedQuote.q &&
					parsed.quote?.a === fetchedQuote.a
				) {
					shouldUpdate = false; // No change in quote
				}
			} catch (e) {
				console.error("Failed to parse existing cookie data", e);
			}
		}

		if (shouldUpdate) {
			// Update both store and cookie
			setStore("journal.quote", fetchedQuote);
			Cookies.set("journalDraft", JSON.stringify({ quote: fetchedQuote }), {
				expires: 7,
			});
		}
	}, [setStore]);

	return (
		<div className="relative z-0">
			<div className="bg-white rounded-lg shadow p-5 border border-gray-100 transition-all hover:shadow-md">
				<div className="absolute -top-10 -left-6 z-10">
					<RiDoubleQuotesR
						className="text-brand text-7xl sm:text-8xl opacity-90"
						aria-hidden="true"
					/>
				</div>
				<SectionTitle class_input="text-lg font-semibold">
					Quote of the Day
				</SectionTitle>
				{quote ? (
					<blockquote className="italic text-sm text-gray-700">
						"{quote.q}"
						<footer className="mt-1 text-xs text-gray-500">- {quote.a}</footer>
					</blockquote>
				) : (
					<QuoteSkeleton />
				)}
			</div>
		</div>
	);
};

export default Quote;
