// src/components/LoadingAnimation.jsx
import React, { useState, useEffect } from "react";
import logoSrc from "../assets/resj-logo-color.svg";

const LoadingAnimation = ({ onAppShouldFadeIn, onLoadingFinished }) => {
	const [animate, setAnimate] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [logoLoaded, setLogoLoaded] = useState(false);

	const FADE_OUT_DURATION_MS = 500; // Should match your CSS transition duration for opacity

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const isMobile = windowWidth < 768;

	useEffect(() => {
		if (!logoLoaded) {
			return;
		}

		// Timers for animation sequence
		const animateTimeout = setTimeout(() => {
			setAnimate(true);
		}, 500);

		const signalAppFadeInTimeout = setTimeout(() => {
			if (onAppShouldFadeIn) {
				onAppShouldFadeIn();
			}
		}, 1900); // App starts fading in

		const startLoadingFadeOutTimeout = setTimeout(() => {
			setFadeOut(true);
		}, 1900); // Loading screen starts fading out

		const signalLoadingFinishedTimeout = setTimeout(() => {
			if (onLoadingFinished) {
				onLoadingFinished();
			}
		}, 1900 + FADE_OUT_DURATION_MS); // Call after fade out animation completes

		return () => {
			clearTimeout(animateTimeout);
			clearTimeout(signalAppFadeInTimeout);
			clearTimeout(startLoadingFadeOutTimeout);
			clearTimeout(signalLoadingFinishedTimeout);
		};
		// This effect should only re-run if logoLoaded or the stable callbacks change.
		// Do NOT include `animate` or `fadeOut` here.
	}, [logoLoaded, onAppShouldFadeIn, onLoadingFinished]);

	const containerStyle = {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100vw",
		height: "100vh",
		backgroundColor: "#FFFFFF",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 9999,
		opacity: fadeOut ? 0 : 1,
		transition: `opacity ${FADE_OUT_DURATION_MS / 1000}s ease-in-out`, // Use variable
		pointerEvents: fadeOut ? "none" : "auto",
	};

	const logoStyle = {
		position: "absolute",
		height: animate ? "96px" : isMobile ? "150px" : "250px",
		width: "auto",
		maxHeight: "100vh", // Corrected from 1000vh
		maxWidth: "100vw", // Corrected from 1000vw
		top: animate ? (isMobile ? "-16px" : "-8px") : "50%",
		left: animate ? (isMobile ? "24px" : "24px") : "50%",
		transform: animate ? "translate(0, 0)" : "translate(-50%, -50%)",
		transition: "all 1.2s ease-in-out",
		zIndex: 10000,
		filter: "drop-shadow(0px 0px 10px rgba(76, 175, 80, 0.7))",
		visibility: logoLoaded ? "visible" : "hidden",
	};

	const handleLogoLoad = () => {
		setLogoLoaded(true);
	};

	const handleLogoError = () => {
		// Still set logoLoaded to true to allow the animation sequence to proceed
		// or at least for the loading screen to eventually disappear.
		setLogoLoaded(true);
	};

	return (
		<div style={containerStyle}>
			<img
				src={logoSrc}
				alt="ResJ Loading..."
				style={logoStyle}
				onLoad={handleLogoLoad}
				onError={handleLogoError}
			/>
		</div>
	);
};

export default LoadingAnimation;
