// Navbar.jsx
import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaArrowRight, FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import Button from "./Button";
import Avatar from "./Avatar";
import Logo from "../assets/resj-logo-color.svg";

const logoSrc = Logo;

const Navbar = ({
	isLoggedIn = false,
	userName = "User Name",
	userEmail = "user@example.com",
	userImage = null,
	onAuthRequired,
	onLogout,
}) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
	const location = useLocation();
	const [isJournalOpen, setIsJournalOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const navLinks = [
		{ name: "Home", href: "/", requiresAuth: false },
		{ name: "Resume", requiresAuth: true, mainPath: "/resume" }, // Add mainPath for easy checking
		{ name: "Journal", requiresAuth: true, mainPath: "/journal" }, // Add mainPath
	];
	const loggedInNavLinks = [
		{ name: "Dashboard", href: "/", requiresAuth: false },
		{
			name: "Resume",
			href: "/resume",
			requiresAuth: false,
			mainPath: "/resume",
		}, // Add mainPath
		{
			name: "Journal",
			href: "/journal",
			requiresAuth: false,
			mainPath: "/journal", // Add mainPath
			dropdown: [
				{ name: "View Journal", href: "/journal/view" },
				{ name: "New Entry", href: "/journal/new" },
			],
		},
	];
	const profileNavLinks = [
		{ name: "Profile", href: "/profile" },
		{ name: "Sign Out", href: "/logout" },
	];

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
		setOpenMobileDropdown(null);
		setIsJournalOpen(false);
		setIsProfileOpen(false);
	};
	const handleMobileDropdownToggle = (itemName) => {
		setOpenMobileDropdown(openMobileDropdown === itemName ? null : itemName);
	};
	const handleAuthLinkClick = (e) => {
		e.preventDefault();
		onAuthRequired();
		closeMobileMenu();
	};

	const baseLinkClasses =
		"px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 no-underline";
	const mobileBaseLinkClasses =
		"block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 no-underline w-full text-left";
	const authButtonClasses = `${baseLinkClasses} text-gray-600 hover:text-brand hover:bg-brandGreen-50 cursor-pointer`;
	const mobileAuthButtonClasses = `${mobileBaseLinkClasses} text-gray-700 hover:text-brand hover:bg-brandGreen-50 cursor-pointer`;

	// Helper to check if a link related to "Resume" should be active
	const isResumeActive = (currentPath, linkMainPath) => {
		if (linkMainPath !== "/resume") return false; // Only apply to "Resume" link
		return (
			currentPath === "/resume" ||
			currentPath === "/choose-template" ||
			currentPath.startsWith("/template/")
		);
	};

	const navLinkClassName = (isActiveOriginal, linkHref, linkMainPath = "") => {
		let actualIsActive = isActiveOriginal;
		if (linkMainPath === "/resume") {
			actualIsActive = isResumeActive(location.pathname, linkMainPath);
		}

		return `${baseLinkClasses} ${
			actualIsActive
				? "text-brand bg-brandGreen-50 font-semibold"
				: "text-gray-600 hover:text-brand hover:bg-brandGreen-50"
		}`;
	};

	const mobileNavLinkClassName = (
		isActiveOriginal,
		linkHref,
		linkMainPath = ""
	) => {
		let actualIsActive = isActiveOriginal;
		if (linkMainPath === "/resume") {
			actualIsActive = isResumeActive(location.pathname, linkMainPath);
		}

		return `${mobileBaseLinkClasses} ${
			actualIsActive
				? "text-brand bg-brandGreen-100 font-semibold"
				: "text-gray-700 hover:text-brand hover:bg-brandGreen-50"
		}`;
	};

	const parentNavLinkClassName = (isActiveOriginal, parentPath) => {
		// For dropdown parents like "Journal", check if any child route is active
		const active =
			isActiveOriginal ||
			(isLoggedIn && location.pathname.startsWith(parentPath + "/"));
		return `${baseLinkClasses} inline-flex items-center ${
			active
				? "text-brand bg-brandGreen-50 font-semibold"
				: "text-gray-600 hover:text-brand hover:bg-brandGreen-50"
		}`;
	};

	const subNavLinkClassName = ({ isActive }) =>
		`block px-4 py-2 text-sm no-underline ${
			isActive ? "bg-brandGreen-50 text-brand font-semibold" : "text-gray-700"
		} hover:bg-brandGreen-100 hover:text-brand`;

	const currentNavLinks = isLoggedIn ? loggedInNavLinks : navLinks;

	return (
		<nav className="bg-white shadow-md sticky top-0 z-50 w-full">
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 md:h-20">
					<div className="flex-shrink-0">
						<Link to="/" aria-label="ResJ Home" onClick={closeMobileMenu}>
							<img
								className="h-24 md:h-24 w-auto" // Adjusted height as per your code
								src={logoSrc}
								alt="ResJ Logo"
							/>
						</Link>
					</div>

					<div className="hidden md:flex md:items-center md:space-x-1">
						{currentNavLinks.map((link) => {
							if (link.dropdown && isLoggedIn) {
								return (
									<div
										key={link.name}
										className="relative"
										onMouseEnter={() =>
											link.name === "Journal" && setIsJournalOpen(true)
										}
										onMouseLeave={() =>
											link.name === "Journal" && setIsJournalOpen(false)
										}
									>
										<NavLink
											to={link.href}
											// Pass NavLink's isActive prop to our custom function
											className={({ isActive }) =>
												parentNavLinkClassName(isActive, link.href)
											}
											end
										>
											<span>{link.name}</span>
											<FaAngleDown
												className={`ml-1 h-4 w-4 text-gray-500 transition-transform duration-200 ${
													isJournalOpen && link.name === "Journal"
														? "rotate-180"
														: "rotate-0"
												}`}
											/>
										</NavLink>
										{link.name === "Journal" && (
											<div
												className={`absolute left-1/2 transform -translate-x-1/2 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out z-10 ${
													isJournalOpen
														? "opacity-100 visible"
														: "opacity-0 invisible"
												}`}
												onMouseEnter={() => setIsJournalOpen(true)}
												onMouseLeave={() => setIsJournalOpen(false)}
											>
												<div
													className="py-1"
													role="menu"
													aria-orientation="vertical"
													aria-labelledby={`${link.name.toLowerCase()}-options-menu`}
												>
													{link.dropdown.map((subLink) => (
														<NavLink
															key={subLink.name}
															to={subLink.href}
															className={subNavLinkClassName}
															role="menuitem"
															onClick={() => setIsJournalOpen(false)}
														>
															{subLink.name}
														</NavLink>
													))}
												</div>
											</div>
										)}
									</div>
								);
							} else if (link.requiresAuth && !isLoggedIn) {
								return (
									<button
										key={link.name}
										onClick={handleAuthLinkClick}
										className={authButtonClasses}
									>
										{link.name}
									</button>
								);
							} else {
								return (
									<NavLink
										key={link.name}
										to={link.href}
										// Pass NavLink's isActive prop and link details to our custom function
										className={({ isActive }) =>
											navLinkClassName(isActive, link.href, link.mainPath)
										}
										end={link.href === "/"} // 'end' prop for exact match, usually for home
									>
										{link.name}
									</NavLink>
								);
							}
						})}
					</div>

					<div className="flex items-center">
						<div className="hidden md:block flex-shrink-0 ml-4">
							{isLoggedIn ? (
								<div
									className="relative"
									onMouseEnter={() => setIsProfileOpen(true)}
									onMouseLeave={() => setIsProfileOpen(false)}
								>
									<div className="cursor-pointer p-1 rounded-full hover:bg-gray-100">
										<Avatar src={userImage} alt="User Avatar" />
									</div>
									{isProfileOpen && (
										<div
											className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out z-10 ${
												isProfileOpen
													? "opacity-100 visible"
													: "opacity-0 invisible"
											}`}
											onMouseEnter={() => setIsProfileOpen(true)}
											onMouseLeave={() => setIsProfileOpen(false)}
										>
											<div className="px-4 pt-3 border-b border-gray-200">
												<p className="text-sm font-medium text-gray-900 truncate">
													{userName}
												</p>
												<p className="text-xs text-gray-500 truncate">
													{userEmail}
												</p>
											</div>
											<div
												className="py-1"
												role="menu"
												aria-orientation="vertical"
												aria-labelledby="profile-options-menu"
											>
												{profileNavLinks.map((subLink) => (
													<NavLink
														key={subLink.name}
														to={subLink.href}
														className={subNavLinkClassName}
														role="menuitem"
														onClick={() => setIsProfileOpen(false)}
													>
														{subLink.name}
													</NavLink>
												))}
											</div>
										</div>
									)}
								</div>
							) : (
								<Button
									onClick={handleAuthLinkClick}
									ariaLabel="Get started with ResJ"
									IconComponent={FaArrowRight}
									iconPosition="right"
									className="w-auto h-10 md:h-12"
								>
									Get Started
								</Button>
							)}
						</div>
						<div className="md:hidden ml-3">
							<button
								onClick={toggleMobileMenu}
								type="button"
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-brand hover:bg-brandGreen-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand"
								aria-controls="mobile-menu"
								aria-expanded={isMobileMenuOpen}
							>
								<span className="sr-only">Open main menu</span>
								{isMobileMenuOpen ? (
									<FaTimes className="block h-6 w-6" aria-hidden="true" />
								) : (
									<FaBars className="block h-6 w-6" aria-hidden="true" />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			<div
				className={`md:hidden ${
					isMobileMenuOpen ? "block" : "hidden"
				} border-t border-gray-200 absolute top-full left-0 w-full bg-white shadow-lg z-40`}
				id="mobile-menu"
			>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					{currentNavLinks.map((link) => {
						if (link.dropdown && isLoggedIn) {
							return (
								<div key={link.name}>
									<button
										onClick={() => handleMobileDropdownToggle(link.name)}
										className={`${mobileBaseLinkClasses} flex justify-between items-center ${
											(link.mainPath === "/journal" &&
												location.pathname.startsWith(link.href)) ||
											(link.mainPath === "/resume" &&
												isResumeActive(location.pathname, link.mainPath))
												? "text-brand bg-brandGreen-100 font-semibold"
												: "text-gray-700 hover:text-brand hover:bg-brandGreen-50"
										}`}
									>
										<span>{link.name}</span>
										<FaAngleDown
											className={`ml-1 h-5 w-5 transform transition-transform duration-200 ${
												openMobileDropdown === link.name
													? "rotate-180"
													: "rotate-0"
											}`}
										/>
									</button>
									{link.name === "Journal" && (
										<div
											className={`pl-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
												openMobileDropdown === link.name
													? "max-h-40 opacity-100"
													: "max-h-0 opacity-0"
											}`}
										>
											{link.dropdown.map((subLink) => (
												<NavLink
													key={subLink.name}
													to={subLink.href}
													// Pass NavLink's isActive prop and link details to our custom function
													className={({ isActive }) =>
														mobileNavLinkClassName(isActive, subLink.href)
													}
													onClick={closeMobileMenu}
												>
													{subLink.name}
												</NavLink>
											))}
										</div>
									)}
								</div>
							);
						} else if (link.requiresAuth && !isLoggedIn) {
							return (
								<button
									key={link.name}
									onClick={handleAuthLinkClick}
									className={mobileAuthButtonClasses}
								>
									{link.name}
								</button>
							);
						} else {
							return (
								<NavLink
									key={link.name}
									to={link.href}
									// Pass NavLink's isActive prop and link details to our custom function
									className={({ isActive }) =>
										mobileNavLinkClassName(isActive, link.href, link.mainPath)
									}
									onClick={closeMobileMenu}
									end={link.href === "/"}
								>
									{link.name}
								</NavLink>
							);
						}
					})}
				</div>
				<div className="pt-4 pb-3 border-t border-gray-200 px-4">
					{isLoggedIn ? (
						<>
							<div className="flex items-center mb-3">
								<div className="flex-shrink-0">
									<Avatar src={userImage} alt="User Avatar" />
								</div>
								<div className="ml-3">
									<div className="text-base font-medium text-gray-800">
										{userName}
									</div>
									<div className="text-sm font-medium text-gray-500">
										{userEmail}
									</div>
								</div>
							</div>
							<div className="mt-1 space-y-1">
								{profileNavLinks.map((link) => (
									<NavLink
										key={link.name}
										to={link.href}
										onClick={closeMobileMenu}
										// Standard active check for profile links is fine
										className={({ isActive }) =>
											mobileNavLinkClassName(isActive, link.href)
										}
									>
										{link.name}
									</NavLink>
								))}
							</div>
						</>
					) : (
						<Button
							onClick={handleAuthLinkClick}
							ariaLabel="Get started with ResJ"
							IconComponent={FaArrowRight}
							className="w-full justify-center"
							iconPosition="right"
						>
							Get Started
						</Button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
