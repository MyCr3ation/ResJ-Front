// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	useLocation,
	Navigate,
	useNavigate,
} from "react-router-dom";

// Page and Component Imports (ensure paths are correct)
import HomePage from "./pages/Home";
import AllJournal from "./pages/AllJournal";
import CreateJournal from "./pages/CreateJournal";
import NotFoundPage from "./pages/NotFoundPage";
import JournalDetailPage from "./pages/JournalDetailPage";
import EditJournal from "./pages/EditJournal";
import Resume from "./pages/Resume";
import Template from "./pages/Template.jsx";
import ChooseTemplate from "./pages/ChooseTemplate.jsx";
import Profile from "./pages/Profile.jsx";
import InsightsPage from "./pages/Insights.jsx";

import Navbar from "./components/Navbar"; // Your Navbar component
import LoadingAnimation from "./components/LoadingAnimation";
import AuthModal from "./components/AuthModal";
import Footer from "./components/Footer.jsx";

import Chatbot from "./pages/Chatbot.jsx";
import ChatbotFAB from "./components/Chatbot/ChatbotFAB.jsx";

// Constants for Chatbot Panel
const CHATBOT_PANEL_DESKTOP_WIDTH_PX = 360;
const CHATBOT_PANEL_MOBILE_WIDTH_VW = 85; // e.g., 85vw for mobile
const MOBILE_BREAKPOINT_PX = 768; // Tailwind's 'md' breakpoint

function AppContent() {
	const location = useLocation();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(location.pathname === "/");
	const [appOpacity, setAppOpacity] = useState(
		location.pathname === "/" ? 0 : 1
	);
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to true for development
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

	// --- CHATBOT STATE ---
	const [isChatbotOpen, setIsChatbotOpen] = useState(false);
	const [chatMessages, setChatMessages] = useState([
		{
			id: "welcome-atlas-initial",
			text: "Hello! I'm Atlas Insight. How can I assist you today?",
			sender: "bot",
		},
	]);
	const [currentChatbotPanelWidth, setCurrentChatbotPanelWidth] = useState(
		window.innerWidth >= MOBILE_BREAKPOINT_PX
			? `${CHATBOT_PANEL_DESKTOP_WIDTH_PX}px`
			: `${CHATBOT_PANEL_MOBILE_WIDTH_VW}vw`
	);

	// Update panel width on resize for responsive behavior
	useEffect(() => {
		const handleResize = () => {
			setCurrentChatbotPanelWidth(
				window.innerWidth >= MOBILE_BREAKPOINT_PX
					? `${CHATBOT_PANEL_DESKTOP_WIDTH_PX}px`
					: `${CHATBOT_PANEL_MOBILE_WIDTH_VW}vw`
			);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Loading and Opacity effect based on route change
	useEffect(() => {
		if (location.pathname === "/") {
			setIsLoading(true);
			setAppOpacity(0);
		} else {
			setIsLoading(false);
			setAppOpacity(1);
		}
	}, [location.pathname]);

	const toggleChatbot = useCallback(() => {
		setIsChatbotOpen((prev) => !prev);
		// Note: Body scroll lock is generally not needed for content-shifting panels
		// unless the panel itself has scroll issues on mobile when near full width.
	}, []);

	// Close chatbot on route change
	useEffect(() => {
		if (isChatbotOpen) {
			setIsChatbotOpen(false); // Close it
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]); // Only depends on pathname

	const handleUserMessage = useCallback((userMessageText) => {
		const newUserMessage = {
			id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
			text: userMessageText,
			sender: "user",
		};
		setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
		setTimeout(() => {
			const botResponse = {
				id: `bot-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
				text: `Atlas Insight received: "${userMessageText}". (Dummy response).`,
				sender: "bot",
			};
			setChatMessages((prevMessages) => [...prevMessages, botResponse]);
		}, 1000 + Math.random() * 500);
	}, []);
	// --- END CHATBOT STATE ---

	const openAuthModal = useCallback(() => {
		setIsAuthModalOpen(true);
		document.body.style.overflow = "hidden";
	}, []);
	const closeAuthModal = useCallback(() => {
		setIsAuthModalOpen(false);
		document.body.style.overflow = "";
	}, []);

	const handleLogin = useCallback(() => {
		setIsLoggedIn(true);
		closeAuthModal();
		setChatMessages([
			{
				id: "welcome-atlas-login",
				text: "Welcome back! How can Atlas Insight help?",
				sender: "bot",
			},
		]);
	}, [closeAuthModal]);

	const handleLogout = useCallback(() => {
		setIsLoggedIn(false);
		if (isChatbotOpen) setIsChatbotOpen(false); // Close chatbot on logout
		document.body.style.overflow = ""; // Ensure body scroll is reset
	}, [isChatbotOpen]);

	const handleAppShouldFadeIn = useCallback(() => setAppOpacity(1), []);
	const handleLoadingFinished = useCallback(() => setIsLoading(false), []);

	const requireAuth = useCallback(
		(element) => {
			if (!isLoggedIn) {
				return (
					<Navigate
						to="/"
						state={{ needsAuthModal: true, from: location.pathname }}
						replace
					/>
				);
			}
			return element;
		},
		[isLoggedIn, location.pathname]
	);

	// Handle needsAuthModal from navigation state
	useEffect(() => {
		if (location.state?.needsAuthModal && !isLoggedIn && !isAuthModalOpen) {
			openAuthModal();
			navigate(location.pathname, { replace: true, state: {} });
		}
	}, [
		location.state,
		isLoggedIn,
		isAuthModalOpen,
		openAuthModal,
		navigate,
		location.pathname,
	]);

	return (
		<>
			{isLoading && location.pathname === "/" && (
				<LoadingAnimation
					onAppShouldFadeIn={handleAppShouldFadeIn}
					onLoadingFinished={handleLoadingFinished}
				/>
			)}
			{/* MODIFIED LINE: Changed min-h-screen to h-screen, added max-h-screen and overflow-hidden */}
			<div
				className="flex flex-col h-screen max-h-screen overflow-hidden bg-gray-50"
				style={{ opacity: appOpacity, transition: "opacity 0.5s ease-in-out" }}
			>
				<Navbar
					isLoggedIn={isLoggedIn}
					onAuthRequired={openAuthModal}
					onLogout={handleLogout}
				/>
				{/* This div wraps the main content area and the chatbot panel. 
            flex-1 ensures it takes up remaining vertical space from its parent (h-screen div).
            overflow-hidden ensures this wrapper itself doesn't scroll. */}
				<div className="flex flex-1 overflow-hidden">
					{/* Main Content Area (Pages + Footer) */}
					<div
						className={`flex-1 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out
                        ${
													isLoggedIn && isChatbotOpen
														? "main-content-width-shrunk"
														: "main-content-width-normal"
												}`}
					>
						<main className="flex-grow">
							{" "}
							{/* flex-grow allows main content to expand, pushing footer down within this scrollable area */}
							<Routes>
								{/* ... (Routes remain the same) ... */}
								{!isLoggedIn ? (
									<Route
										path="/"
										element={<HomePage onAuthRequired={openAuthModal} />}
									/>
								) : (
									<Route path="/" element={requireAuth(<InsightsPage />)} />
								)}
								<Route
									path="/journal"
									element={<Navigate to="/journal/view" replace />}
								/>
								<Route
									path="/journal/view"
									element={requireAuth(<AllJournal />)}
								/>
								<Route
									path="/journal/view/:jid"
									element={requireAuth(<JournalDetailPage />)}
								/>
								<Route
									path="/journal/new"
									element={requireAuth(<CreateJournal />)}
								/>
								<Route
									path="/journal/edit/:jid"
									element={requireAuth(<EditJournal />)}
								/>
								<Route path="/resume" element={requireAuth(<Resume />)} />
								<Route
									path="/choose-template"
									element={requireAuth(<ChooseTemplate />)}
								/>
								<Route
									path="/template/:templateId"
									element={requireAuth(<Template />)}
								/>
								<Route
									path="/logout"
									element={
										<LogoutHandler
											onLogout={handleLogout}
											navigate={navigate}
										/>
									}
								/>
								<Route path="/profile" element={requireAuth(<Profile />)} />
								<Route path="*" element={<NotFoundPage />} />
							</Routes>
						</main>
						<Footer />
					</div>

					{/* Chatbot Panel (conditionally rendered) */}
					{isLoggedIn && isChatbotOpen && (
						<aside
							className="h-full overflow-hidden shrink-0"
							style={{
								width: currentChatbotPanelWidth,
								transition: "width 0.3s ease-in-out",
							}}
						>
							<Chatbot
								onClose={toggleChatbot}
								chatMessages={chatMessages}
								onSendMessage={handleUserMessage}
							/>
						</aside>
					)}
				</div>
			</div>
			{/* Chatbot FAB and AuthModal remain outside the main layout flow */}
			{isLoggedIn && !isChatbotOpen && (
				<ChatbotFAB onClick={toggleChatbot} />
			)}{" "}
			<AuthModal
				isOpen={isAuthModalOpen}
				onClose={closeAuthModal}
				onLoginSuccess={handleLogin}
			/>
		</>
	);
}

function LogoutHandler({ onLogout, navigate }) {
	useEffect(() => {
		onLogout();
		navigate("/");
	}, [onLogout, navigate]);
	return null;
}

function App() {
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	);
}

export default App;
// This is the main page
