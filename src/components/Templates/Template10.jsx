// Template10.jsx
import React from "react";
// Icon Imports - Updated based on your list for social links and section icons
import { SiXing, SiMedium, SiFigma } from "react-icons/si";
import {
	FaLinkedin,
	FaGithub,
	FaTwitter,
	FaFacebook,
	FaInstagram,
	FaGlobe,
	FaDribbble,
} from "react-icons/fa";
import {
	MdEmail,
	MdPhone,
	MdLocationOn,
	MdLink, // Kept for general link/website if not in FaGlobe
	MdWorkOutline, // For Experience
	MdSchool, // For Education
	MdOutlineStar, // For Skills (filled star)
	MdPersonOutline, // For Profile/Summary
	MdOutlineBuild, // For Projects
	MdTranslate, // For Languages
	MdOutlineInterests, // For Interests
	MdMilitaryTech, // For Certificates (was MdOutlineRedeem)
	MdGroups, // For References (was MdOutlineConnectWithoutContact)
} from "react-icons/md";
import useStore from "../../store/store";

// --- Local Helper: cn (Conditional ClassNames) ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Local Helper: formatDate ---
const formatDate = (
	dateString,
	locale, // Can be undefined to use system default
	options = { month: "short", year: "numeric" }
) => {
	if (!dateString) return "";
	try {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			const parts = dateString.split("-");
			if (parts.length === 3) {
				const year = parseInt(parts[0], 10);
				const month = parseInt(parts[1], 10) - 1;
				const day = parseInt(parts[2], 10);
				const localDate = new Date(year, month, day);
				if (!isNaN(localDate.getTime())) {
					return localDate.toLocaleDateString(locale, options);
				}
			}
			return dateString;
		}
		return date.toLocaleDateString(locale, options);
	} catch (e) {
		return dateString;
	}
};

// --- Local Constants ---
// MODIFIED: DEFAULT_LOCALE_ISO removed
const DEFAULT_FONT_FAMILY_INTER =
	"'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";

// Hardcoded translations - adjusted to fit the new design context
const translations = {
	present: "Present",
	summary: "Profile",
	experience: "Experience",
	education: "Education",
	skills: "Skills",
	projects: "Projects",
	languages: "Languages",
	interests: "Interests",
	certificates: "Certificates",
	references: "References",
	referencesAvailable: "References available upon request.",
	projectsLive: "Live Demo",
	projectsGithub: "View Code",
	projectsTech: "Technologies",
};

// MODIFIED: SOCIALS_MAP for icon mapping - updated with your list
const LOCAL_SOCIALS_MAP_T10 = {
	linkedin: {
		name: "LinkedIn",
		logo: <FaLinkedin />,
		className: "inline mr-1.5 text-sm flex-shrink-0",
	},
	github: {
		name: "GitHub",
		logo: <FaGithub />,
		className: "inline mr-1.5 text-sm flex-shrink-0",
	},
	twitter: {
		name: "Twitter",
		logo: <FaTwitter />,
		className: "inline mr-1.5 text-sm flex-shrink-0",
	},
	facebook: {
		name: "Facebook",
		logo: <FaFacebook />,
		className: "inline mr-1.5 text-sm flex-shrink-0",
	},
	instagram: {
		name: "Instagram",
		logo: <FaInstagram />,
		className: "inline mr-1.5 text-sm flex-shrink-0",
	},
	website: {
		name: "Website",
		logo: <FaGlobe />,
		className: "inline mr-1.5 text-sm flex-shrink-0",
	},
	xing: {
		name: "Xing",
		logo: <SiXing />,
		className: "inline mr-1.5 text-sm flex-shrink-0",
	},
	medium: {
		name: "Medium",
		logo: <SiMedium />,
		className: "inline mr-1.5 text-sm flex-shrink-0",
	},
	figma: {
		name: "Figma",
		logo: <SiFigma />,
		className: "inline mr-1.5 text-sm flex-shrink-0",
	},
	dribbble: {
		name: "Dribbble",
		logo: <FaDribbble />,
		className: "inline mr-1.5 text-sm flex-shrink-0",
	}, // Using FaDribbble
};

// Default template settings for Template10 - "Elegant Two-Column"
const defaultTemplateSettings = {
	name: "Elegant Two-Column CV",
	templateNumber: 10,

	// Theme Colors
	pageBgColor: "#F8FAFC", // slate-50 (Very light gray background for the page content)
	headerBgColor: "#FFFFFF", // White for the header area
	textColor: "#334155", // slate-700 (Main body text)
	headingColor: "#1E3A8A", // blue-800 (For Name - strong, professional blue)
	subHeadingColor: "#1E293B", // slate-800 (For Job Title in header)
	sectionTitleColor: "#111827", // slate-900 (Darker for section titles)
	itemTitleColor: "#1E293B", // slate-800 (For job/degree titles within sections)
	accentColor: "#2563EB", // blue-600 (For icons, highlights)
	linkColor: "#1D4ED8", // blue-700 (Slightly darker blue for links)
	descriptionColor: "#475569", // slate-600 (For descriptions)
	borderColor: "#E2E8F0", // slate-200 (For subtle borders)

	h1Color: "",
	h2Color: "",
	h3Color: "",
	hyperLinkColor: "", // Store overrides
	imageSize: "96",
	projectLink: "text",
	spaceBetween: "normal",
	align: "left",
	titleCase: "uppercase",
	fontFamily: DEFAULT_FONT_FAMILY_INTER, // Explicitly set Inter
	h1FontSize: "text-3xl",
	h2FontSize: "text-xl",
	h3FontSize: "text-lg",
	textFontSize: "text-sm",
	descriptionFontSize: "text-sm",
	hyperLinkFontSize: "text-sm",
};

// --- Helper: Style Calculation (Not heavily used in this direct-style version) ---
// const handleFindStyle = (state, x, y, z) => { ... }; // Can be kept if you plan to re-enable "small/normal/large" font options later

// --- Helper: Description Component ---
const Description = ({ state, color, size, className }) => {
	if (!state || state === "<p><br></p>" || state === "<p></p>") return null;
	return (
		<div
			style={{ color: color }}
			dangerouslySetInnerHTML={{ __html: state }}
			className={cn(
				"prose prose-sm max-w-none mt-1.5",
				"prose-p:my-1 prose-ul:list-disc prose-ul:pl-5 prose-ul:my-1.5 prose-li:my-0.5",
				size,
				className
			)}
		/>
	);
};

// --- Reusable Section Component for Main Area ---
const ContentSection = ({
	title,
	icon,
	children,
	colors,
	fonts,
	settings,
	className = "",
}) => {
	// Check if children are effectively empty
	const isEmpty = !React.Children.toArray(children).some((child) => {
		if (child === null || child === undefined) return false;
		if (typeof child === "string" && child.trim() === "") return false;
		// Check for Description components that are effectively empty
		if (
			React.isValidElement(child) &&
			child.type === Description &&
			child.props.state &&
			(child.props.state === "<p><br></p>" || child.props.state === "<p></p>")
		)
			return false;
		// Check for empty arrays (e.g., from mapping an empty skills/languages list)
		if (Array.isArray(child) && child.length === 0) return false;
		// If a child is an array (e.g. from a map), check if all its elements are null/undefined (handles cases where map returns array of nulls)
		if (
			Array.isArray(child) &&
			child.every((item) => item === null || item === undefined)
		)
			return false;
		return true;
	});

	if (isEmpty && !title) return null;
	if (title && isEmpty && !children) return null; // Handle case where title exists but children is literally null/undefined

	return (
		<section className={cn("mb-6 print:mb-4", className)}>
			{title && (
				<div className="flex items-center mb-3 print:mb-2">
					{icon &&
						React.cloneElement(icon, {
							className: "text-xl mr-2.5 flex-shrink-0",
							style: { color: colors.accent },
						})}
					<h2
						style={{
							color: colors.sectionTitleColor,
							borderColor: colors.borderColor,
						}}
						className={cn(
							fonts.sectionTitleSize,
							settings.titleCase,
							"font-semibold w-full pb-1.5 border-b"
						)}
					>
						{title}
					</h2>
				</div>
			)}
			<div className={cn(fonts.textSize)} style={{ color: colors.textColor }}>
				{children}
			</div>
		</section>
	);
};

// --- Main Template Component ---
const Template10 = ({}) => {
	const { store } = useStore();
	const template = defaultTemplateSettings;
	// MODIFIED: localeIso removed

	const colors = {
		pageShellBg: "#FFFFFF", // A4 page is white
		contentBg: template.pageBgColor,
		headerBg: template.headerBgColor,
		textColor: template.textColor,
		headingColor: template.h1Color || template.headingColor,
		subHeadingColor: template.subHeadingColor,
		sectionTitleColor: template.h2Color || template.sectionTitleColor,
		itemTitleColor: template.h3Color || template.itemTitleColor,
		accentColor: template.accentColor,
		linkColor: template.hyperLinkColor || template.linkColor,
		descriptionColor: template.descriptionColor,
		borderColor: template.borderColor,
	};

	// Direct Tailwind classes for font sizes based on the new design
	const fonts = {
		family: template.fontFamily,
		nameSize: "text-3xl md:text-4xl font-bold",
		jobTitleSize: "text-lg md:text-xl font-light opacity-80",
		sectionTitleSize: "text-lg md:text-xl",
		itemTitleSize: "text-base md:text-lg",
		textSize: "text-sm",
		descriptionSize: "text-sm",
		linkSize: "text-sm",
	};

	const settings = {
		// Combine other layout settings
		imageSize: parseInt(template.imageSize, 10) || 96,
		projectLinkType: template.projectLink,
		titleCase: template.titleCase,
		sectionGap:
			template.spaceBetween === "less"
				? "gap-4"
				: template.spaceBetween === "more"
				? "gap-8"
				: "gap-6",
	};

	const sectionProps = { colors, fonts, settings };

	return (
		// MODIFIED: Outermost div for A4 page consistency
		<div
			style={{ fontFamily: fonts.family, backgroundColor: colors.pageShellBg }}
			className="w-[210mm] min-h-[297mm] bg-white mx-auto my-0 shadow-lg rounded-sm overflow-x-hidden overflow-y-auto print:shadow-none print:my-0 print:bg-transparent"
		>
			{/* Inner container for Template10's specific background and padding */}
			<div
				style={{ backgroundColor: colors.contentBg, color: colors.textColor }}
				className="p-6 md:p-8 print:p-6 h-full"
			>
				<header
					style={{ backgroundColor: colors.headerBg }}
					className="mb-6 md:mb-8 print:mb-5 p-6 md:p-0 print:p-0 rounded-lg print:rounded-none"
				>
					{" "}
					{/* Header can have its own bg */}
					<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
						{store.image && settings.imageSize > 0 && (
							<img
								src={store.image}
								alt="Profile"
								className="rounded-full flex-shrink-0 shadow-md"
								style={{
									width: `${settings.imageSize}px`,
									height: `${settings.imageSize}px`,
									objectFit: "cover",
									border: `3px solid ${colors.accentColor}`,
								}}
							/>
						)}
						<div className="flex-grow text-center sm:text-left">
							<h1
								style={{ color: colors.headingColor }}
								className={cn(fonts.nameSize)}
							>
								{store.personal.name} {store.personal.surname}
							</h1>
							{store.personal.jobTitle && (
								<h2
									style={{ color: colors.subHeadingColor }}
									className={cn(fonts.jobTitleSize, "mt-1")}
								>
									{store.personal.jobTitle}
								</h2>
							)}
							<div
								className={cn(
									"mt-3 flex flex-wrap justify-center sm:justify-start items-start gap-x-4 gap-y-2",
									fonts.textSize
								)}
							>
								{(store.personal.city || store.personal.country) && (
									<span
										className="inline-flex items-center"
										style={{ color: colors.textColor }}
									>
										<MdLocationOn
											className="mr-1.5 text-base"
											style={{ color: colors.accentColor }}
										/>
										{store.personal.city}
										{store.personal.city && store.personal.country && ", "}
										{store.personal.country}
									</span>
								)}
								{store.personal.email && (
									<a
										href={`mailto:${store.personal.email}`}
										className="inline-flex items-center hover:underline"
										style={{ color: colors.linkColor }}
									>
										<MdEmail
											className="mr-1.5 text-base"
											style={{ color: colors.accentColor }}
										/>
										{store.personal.email}
									</a>
								)}
								{store.personal.phone && (
									<a
										href={`tel:${store.personal.phone}`}
										className="inline-flex items-center hover:underline"
										style={{ color: colors.linkColor }}
									>
										<MdPhone
											className="mr-1.5 text-base"
											style={{ color: colors.accentColor }}
										/>
										{store.personal.phone}
									</a>
								)}
							</div>
						</div>
					</div>
					{/* Social Links below contact info for better flow */}
					{Object.values(store.socialLinks || {}).some((link) => link) && (
						<div
							className={cn(
								"mt-3 pt-3 border-t flex flex-wrap justify-center sm:justify-start items-start gap-x-4 gap-y-2",
								fonts.linkSize
							)}
							style={{ borderColor: colors.borderColor }}
						>
							{Object.entries(store.socialLinks || {})
								.filter(([, value]) => value)
								.map(([key, value]) => {
									const socialEntry = LOCAL_SOCIALS_MAP_T10[key.toLowerCase()];
									if (!socialEntry) return null;
									const url = String(value).startsWith("http")
										? String(value)
										: `https://${String(value)}`;
									return (
										<a
											key={key}
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-start gap-1.5 hover:underline group"
											style={{ color: colors.linkColor }}
											title={url}
										>
											{React.cloneElement(socialEntry.logo, {
												className:
													socialEntry.className + " group-hover:opacity-75",
												style: { color: colors.accentColor },
											})}
											<span className="min-w-0 break-all">{url}</span>
										</a>
									);
								})}
						</div>
					)}
				</header>

				<main
					className={cn(
						"grid grid-cols-1 md:grid-cols-3 print:grid-cols-3",
						settings.sectionGap
					)}
				>
					{/* Left Column */}
					<aside className="md:col-span-1 space-y-6 print:space-y-4">
						{store.summary && store.summary !== "<p><br></p>" && (
							<ContentSection
								title={translations.summary}
								icon={<MdPersonOutline />}
								{...sectionProps}
							>
								<Description
									state={store.summary}
									color={colors.descriptionColor}
									size={fonts.descriptionSize}
								/>
							</ContentSection>
						)}
						{store.skills?.length > 0 && (
							<ContentSection
								title={translations.skills}
								icon={<MdOutlineStar />}
								{...sectionProps}
							>
								<div className="flex flex-wrap gap-2">
									{store.skills.map((skill, index) => (
										<span
											key={index}
											className={cn(
												"px-2.5 py-1 rounded-md text-xs",
												fonts.textSize
											)}
											style={{
												backgroundColor: colors.accentColor + "20",
												color: colors.accentColor,
											}}
										>
											{skill}
										</span>
									))}
								</div>
							</ContentSection>
						)}
						{store.languages?.length > 0 && (
							<ContentSection
								title={translations.languages}
								icon={<MdTranslate />}
								{...sectionProps}
							>
								<ul className="list-none p-0 space-y-1.5">
									{store.languages.map((lang, index) => (
										<li key={index} className="flex justify-between">
											<span
												style={{ color: colors.textColor }}
												className="font-medium"
											>
												{lang.language}:
											</span>
											<span style={{ color: colors.descriptionColor }}>
												{lang.level}
											</span>
										</li>
									))}
								</ul>
							</ContentSection>
						)}
						{store.interests?.length > 0 && (
							<ContentSection
								title={translations.interests}
								icon={<MdOutlineInterests />}
								{...sectionProps}
							>
								<p
									style={{ color: colors.descriptionColor }}
									className={cn(fonts.textSize)}
								>
									{store.interests.join(" • ")}
								</p>
							</ContentSection>
						)}
					</aside>

					{/* Right Column */}
					<div className="md:col-span-2 space-y-6 print:space-y-4">
						{store.experience?.length > 0 && (
							<ContentSection
								title={translations.experience}
								icon={<MdWorkOutline />}
								{...sectionProps}
							>
								<div className="space-y-5">
									{store.experience.map((exp, index) => (
										<div key={index} className="print:break-inside-avoid">
											<div className="flex justify-between items-baseline flex-wrap mb-1">
												<h3
													style={{ color: colors.itemTitleColor }}
													className={cn(fonts.itemTitleSize, "font-semibold")}
												>
													{exp.jobTitle}
												</h3>
												<p
													style={{ color: colors.descriptionColor }}
													className={cn(
														"text-xs flex-shrink-0 ml-2",
														fonts.textSize
													)}
												>
													{formatDate(exp.startDate, undefined)} -{" "}
													{exp.endDate
														? formatDate(exp.endDate, undefined)
														: translations.present}
												</p>
											</div>
											<h4
												style={{ color: colors.textColor }}
												className={cn(
													"text-sm font-medium mb-0.5 opacity-90",
													fonts.textSize
												)}
											>
												{exp.company}
												{exp.company && exp.city && ", "}
												{exp.city}
											</h4>
											<Description
												state={exp.description}
												color={colors.descriptionColor}
												size={fonts.descriptionSize}
											/>
										</div>
									))}
								</div>
							</ContentSection>
						)}
						{store.education?.length > 0 && (
							<ContentSection
								title={translations.education}
								icon={<MdSchool />}
								{...sectionProps}
							>
								<div className="space-y-4">
									{store.education.map((edu, index) => (
										<div key={index} className="print:break-inside-avoid">
											<div className="flex justify-between items-baseline flex-wrap mb-1">
												<h3
													style={{ color: colors.itemTitleColor }}
													className={cn(fonts.itemTitleSize, "font-semibold")}
												>
													{edu.degree}
												</h3>
												<p
													style={{ color: colors.descriptionColor }}
													className={cn(
														"text-xs flex-shrink-0 ml-2",
														fonts.textSize
													)}
												>
													{formatDate(edu.startDate, undefined)} -{" "}
													{edu.endDate
														? formatDate(edu.endDate, undefined)
														: translations.present}
												</p>
											</div>
											{edu.fieldOfStudy && (
												<p
													style={{ color: colors.textColor }}
													className={cn(
														"text-sm opacity-80 mb-0.5",
														fonts.textSize
													)}
												>
													{edu.fieldOfStudy}
												</p>
											)}
											<h4
												style={{ color: colors.textColor }}
												className={cn(
													"text-sm font-medium mb-0.5 opacity-90",
													fonts.textSize
												)}
											>
												{edu.institution}
												{edu.institution && edu.city && ", "}
												{edu.city}
											</h4>
											<Description
												state={edu.description}
												color={colors.descriptionColor}
												size={fonts.descriptionSize}
											/>
										</div>
									))}
								</div>
							</ContentSection>
						)}
						{store.projects?.length > 0 && (
							<ContentSection
								title={translations.projects}
								icon={<MdOutlineBuild />}
								{...sectionProps}
							>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 print:grid-cols-1">
									{store.projects.map((project, index) => (
										<div
											key={index}
											className="p-3.5 rounded-lg print:p-2 print:break-inside-avoid"
											style={{
												border: `1px solid ${colors.borderColor}`,
												backgroundColor: colors.pageShellBg,
											}}
										>
											<div className="flex justify-between items-start mb-1.5 flex-wrap">
												<h3
													style={{ color: colors.itemTitleColor }}
													className={cn(
														fonts.itemTitleSize,
														"font-semibold pr-2"
													)}
												>
													{project.title}
												</h3>
												<div
													className={cn(
														"flex items-center gap-2.5 flex-shrink-0",
														fonts.linkSize
													)}
												>
													{project.liveLink && (
														<a
															href={
																String(project.liveLink).startsWith("http")
																	? project.liveLink
																	: `https://${project.liveLink}`
															}
															target="_blank"
															rel="noopener noreferrer"
															className="hover:underline inline-flex items-center gap-1"
															style={{ color: colors.linkColor }}
														>
															<MdLink className="text-sm" />
															{translations.projectsLive}
														</a>
													)}
													{project.githubLink && (
														<a
															href={
																String(project.githubLink).startsWith("http")
																	? project.githubLink
																	: `https://${project.githubLink}`
															}
															target="_blank"
															rel="noopener noreferrer"
															className="hover:underline inline-flex items-center gap-1"
															style={{ color: colors.linkColor }}
														>
															<FaGithub className="text-sm" />
															{translations.projectsGithub}
														</a>
													)}
												</div>
											</div>
											{project.technologies?.length > 0 && (
												<p
													style={{ color: colors.descriptionColor }}
													className={cn("text-xs mb-1", fonts.textSize)}
												>
													<span
														className="font-semibold not-italic"
														style={{ color: colors.textColor }}
													>
														{translations.projectsTech}:{" "}
													</span>
													{project.technologies.join(" • ")}
												</p>
											)}
											<Description
												state={project.description}
												color={colors.descriptionColor}
												size={fonts.descriptionSize}
											/>
										</div>
									))}
								</div>
							</ContentSection>
						)}
						{store.certificates?.length > 0 && (
							<ContentSection
								title={translations.certificates}
								icon={<MdMilitaryTech />}
								{...sectionProps}
							>
								<div className="space-y-4">
									{store.certificates.map((cert, index) => (
										<div key={index} className="print:break-inside-avoid">
											<div className="flex justify-between items-start flex-wrap mb-1">
												<h3
													style={{ color: colors.itemTitleColor }}
													className={cn(
														fonts.itemTitleSize,
														"font-semibold pr-1"
													)}
												>
													{cert.title}
												</h3>
												<p
													style={{ color: colors.descriptionColor }}
													className={cn(
														"text-xs ml-1 flex-shrink-0",
														fonts.textSize
													)}
												>
													{formatDate(cert.date, undefined)}
												</p>
											</div>
											{cert.institution && (
												<p
													style={{ color: colors.textColor }}
													className={cn(
														"text-sm italic opacity-80",
														fonts.textSize
													)}
												>
													{cert.institution}
												</p>
											)}
											<Description
												state={cert.description}
												color={colors.descriptionColor}
												size={fonts.descriptionSize}
											/>
										</div>
									))}
								</div>
							</ContentSection>
						)}
						{store.references?.length > 0 && (
							<ContentSection
								title={translations.references}
								icon={<MdGroups />}
								{...sectionProps}
							>
								<div className="space-y-4">
									{store.references.map((ref, index) => (
										<div key={index} className="print:break-inside-avoid">
											<h3
												style={{ color: colors.itemTitleColor }}
												className={cn(fonts.itemTitleSize, "font-semibold")}
											>
												{ref.name} {ref.company && `- ${ref.company}`}
											</h3>
											<div
												className={cn(
													"flex items-center gap-x-2.5 flex-wrap mt-1",
													fonts.linkSize
												)}
											>
												{ref.email && (
													<a
														href={`mailto:${ref.email}`}
														target="_blank"
														rel="noopener noreferrer"
														className="hover:underline"
														style={{ color: colors.linkColor }}
													>
														{ref.email}
													</a>
												)}
												{ref.email && ref.phone && (
													<span style={{ color: colors.descriptionColor }}>
														|
													</span>
												)}
												{ref.phone && (
													<a
														href={`tel:${ref.phone}`}
														target="_blank"
														rel="noopener noreferrer"
														className="hover:underline"
														style={{ color: colors.linkColor }}
													>
														{ref.phone}
													</a>
												)}
											</div>
											<Description
												state={ref.description}
												color={colors.descriptionColor}
												size={fonts.descriptionSize}
											/>
										</div>
									))}
								</div>
								<p
									style={{ color: colors.descriptionColor }}
									className={cn(
										"text-xs italic mt-3 text-center",
										fonts.textSize
									)}
								>
									*{translations.referencesAvailable}
								</p>
							</ContentSection>
						)}
					</div>
				</main>
			</div>
		</div>
	);
};

export default Template10;
