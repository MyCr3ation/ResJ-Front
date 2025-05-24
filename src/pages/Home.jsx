// pages/Home.jsx (or your specific path to the Home component)
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import Main from "../components/Home/Main";
import AboutUsSection from "../components/Home/AboutUsSection";
import AboutCreatorsSection from "../components/Home/AboutCreatorsSection";
import FeaturesOverviewSection from "../components/Home/FeaturesOverviewSection";

const HomePage = ({ onAuthRequired }) => {
	const location = useLocation();
	const navigate = useNavigate(); // For clearing the state

	useEffect(() => {
		// Check if redirected here with a flag to show the modal
		if (location.state?.needsAuthModal) {
			if (typeof onAuthRequired === "function") {
				onAuthRequired();
			}
			// Clear the state from location to prevent modal re-opening on refresh or back navigation
			navigate(location.pathname, { replace: true, state: {} });
		}
	}, [location.state, onAuthRequired, navigate]); // Add navigate to dependencies

	return (
		<>
			<Main onAuthRequired={onAuthRequired} />{" "}
			{/* Pass onAuthRequired to Main for its "Get Started" button */}
			<AboutUsSection />
			<AboutCreatorsSection />
			<FeaturesOverviewSection />
		</>
	);
};

export default HomePage;
