// Template5.jsx
import React from "react";
// Icon Imports
import { SiXing, SiMedium, SiFigma } from "react-icons/si";
import {
	FaLinkedin,
	FaGithub,
	FaTwitter,
	FaFacebook,
	FaInstagram,
	FaGlobe,
	FaDribbble,
	FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import useStore from "../../store/store";

// --- Local Helper: cn (Conditional ClassNames) ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Local Helper: formatDate (Improved timezone handling for YYYY-MM-DD) ---
const formatDate = (
	dateString,
	locale,
	options = { month: "short", year: "numeric" }
) => {
	if (!dateString) return "";
	try {
		// Try parsing as a full date string first
		let date = new Date(dateString);

		// If parsing results in an invalid date, or if it's a YYYY-MM-DD string (often misinterp. by new Date())
		if (isNaN(date.getTime()) || /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
			const parts = dateString.split(/[-/]/); // Split by hyphen or slash
			if (parts.length === 3) {
				const year = parseInt(parts[0], 10);
				const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date
				const day = parseInt(parts[2], 10);

				// Check if parts form a valid date configuration
				if (year > 0 && month >= 0 && month < 12 && day > 0 && day <= 31) {
					const utcDate = new Date(Date.UTC(year, month, day));
					if (!isNaN(utcDate.getTime())) {
						// Format UTC date to local string; options specify how it's presented, not timezone for calculation
						return utcDate.toLocaleDateString(locale, {
							...options,
							timeZone: "UTC",
						});
					}
				}
			}
			// If specific parsing fails, fall back to original string or less reliable new Date()
			if (isNaN(date.getTime())) return dateString; // Return original if all parsing fails
		}
		// For dates already parsed correctly (e.g., full ISO strings with timezone)
		return date.toLocaleDateString(locale, options);
	} catch (e) {
		console.warn("Error formatting date:", dateString, e);
		return dateString; // Fallback to original string
	}
};

// --- Local Constants ---
const DEFAULT_LOCALE_ISO = "en-US";

const translations = {
	present: "Present",
};

// Updated SOCIAL_ICONS_T5
const SOCIAL_ICONS_T5 = {
	linkedin: {
		name: "LinkedIn",
		logo: <FaLinkedin />,
		className: "inline mr-1.5",
	},
	github: { name: "Github", logo: <FaGithub />, className: "inline mr-1.5" },
	twitter: { name: "Twitter", logo: <FaTwitter />, className: "inline mr-1.5" },
	facebook: {
		name: "Facebook",
		logo: <FaFacebook />,
		className: "inline mr-1.5",
	},
	instagram: {
		name: "Instagram",
		logo: <FaInstagram />,
		className: "inline mr-1.5",
	},
	website: { name: "Website", logo: <FaGlobe />, className: "inline mr-1.5" },
	xing: { name: "Xing", logo: <SiXing />, className: "inline mr-1.5" },
	medium: { name: "Medium", logo: <SiMedium />, className: "inline mr-1.5" },
	figma: { name: "Figma", logo: <SiFigma />, className: "inline mr-1.5" },
	dribbble: {
		name: "Dribbble",
		logo: <FaDribbble />,
		className: "inline mr-1.5",
	},
};

// --- Default Template Settings for Template5 - REVISED ---
const defaultTemplateSettings = {
	name: "Classic CV",
	templateNumber: 5,

	// Theme Colors
	cvBgColor: "#f3f3f3",
	headerBgColor: "#ededed",
	headerBorderColor: "#cf8a05",
	sectionTitleColor: "#cf8a05",
	mainTextColor: "#444444",
	headingContentColor: "#222222",
	subDetailsColor: "#444444",
	borderColor: "#dedede",

	// Fonts
	fontFamilyLato: "'Lato', helvetica, arial, sans-serif",
	fontFamilyRokkitt: "'Rokkitt', Helvetica, Arial, sans-serif",

	// Structural settings
	cvMaxWidth: "800px",
	imageSize: "90px", // Reduced from 100px

	// Font size revisions
	nameH1Size: "text-3xl",
	nameH2Size: "text-xl",
	contactFontSize: "text-sm",
	sectionTitleH1Size: "text-xl",
	sectionContentH2Size: "text-lg",
	subDetailsFontSize: "text-xs",
	skillsFontSize: "text-sm",
	paragraphFontSize: "text-sm",

	// Padding/Margin settings (used to apply consistent Tailwind classes)
	headerPaddingY: "py-6",
	headerPaddingX: "px-8",
	mainAreaPaddingX: "px-8",
	sectionTopPadding: "pt-6",
	articleBottomMargin: "mb-4",
	cvBottomPadding: "pb-8", // Bottom padding for the entire CV content area
};

// --- Helper: Description Component (Revised prose style) ---
const Description = ({ state, size, className }) => {
	if (!state || state === "<p><br></p>" || state === "<p></p>") return null;
	return (
		<div
			dangerouslySetInnerHTML={{ __html: state }}
			className={cn(
				"prose prose-sm max-w-none",
				"prose-p:text-[#444444] prose-p:mb-2.5 prose-p:leading-normal", // Adjusted paragraph margin
				"prose-ul:text-[#444444] prose-li:text-[#444444] prose-ul:list-disc prose-ul:pl-5", // Added list styling
				size, // e.g., text-sm from effectiveSettings.paragraphFontSize
				className
			)}
		/>
	);
};

// --- Reusable Section Component (Revised layout proportions) ---
const CvSection = ({ title, children, settings }) => (
	<section
		className={cn(
			"border-t first:border-t-0",
			settings.sectionTopPadding // e.g., pt-6
		)}
		style={{ borderColor: settings.borderColor }}
	>
		<div className="flex flex-col md:flex-row">
			<div className="w-full md:w-[25%] mb-2.5 md:mb-0">
				<h1
					className={cn(settings.sectionTitleH1Size, "italic")}
					style={{
						fontFamily: settings.fontFamilyRokkitt,
						color: settings.sectionTitleColor,
					}}
				>
					{title}
				</h1>
			</div>
			<div className="w-full md:w-[70%] md:pl-[5%]">{children}</div>
		</div>
	</section>
);

// --- Main Template Component ---
const Template5 = ({}) => {
	const { store } = useStore();
	const effectiveSettings = defaultTemplateSettings;
	const localeIso = store.meta?.language || DEFAULT_LOCALE_ISO;

	return (
		<div
			style={{ fontFamily: effectiveSettings.fontFamilyLato }}
			className="bg-gray-300 print:bg-white mx-auto my-0 print:my-0 w-[210mm] min-h-[297mm] flex justify-center items-start print:p-0 shadow-lg print:shadow-none"
		>
			<div
				className={cn(
					"w-full print:w-full ",
					effectiveSettings.cvBottomPadding // e.g., pb-8
				)}
				style={{
					maxWidth: effectiveSettings.cvMaxWidth,
					backgroundColor: effectiveSettings.cvBgColor,
					color: effectiveSettings.mainTextColor,
				}}
			>
				<header
					className={cn(
						effectiveSettings.headerPaddingX,
						effectiveSettings.headerPaddingY
					)}
					style={{
						backgroundColor: effectiveSettings.headerBgColor,
						borderBottom: `2px solid ${effectiveSettings.headerBorderColor}`,
					}}
				>
					<div className="flex flex-wrap items-center">
						{store.image && (
							<div className="w-full sm:w-auto sm:mr-6 mb-4 sm:mb-0 flex justify-center sm:justify-start">
								<img
									src={store.image}
									alt={`${store.personal.name} ${store.personal.surname}`}
									className="rounded-full"
									style={{
										width: effectiveSettings.imageSize,
										height: effectiveSettings.imageSize,
										objectFit: "cover",
									}}
								/>
							</div>
						)}

						<div className="w-full sm:flex-1 text-center sm:text-left mb-4 sm:mb-0 sm:mr-4">
							<h1
								className={cn(effectiveSettings.nameH1Size, "font-bold mb-0")}
								style={{
									fontFamily: effectiveSettings.fontFamilyRokkitt,
									color: effectiveSettings.headingContentColor,
								}}
							>
								{store.personal.name} {store.personal.surname}
							</h1>
							{store.personal.jobTitle && (
								<h2
									className={cn(effectiveSettings.nameH2Size, "mt-0.5")}
									style={{
										fontFamily: effectiveSettings.fontFamilyRokkitt,
										color: effectiveSettings.headingContentColor,
									}}
								>
									{store.personal.jobTitle}
								</h2>
							)}
						</div>

						<div
							className={cn(
								effectiveSettings.contactFontSize,
								"w-full sm:w-auto text-center sm:text-right"
							)}
						>
							<ul className="list-none mt-1 sm:mt-0">
								{store.personal.email && (
									<li
										className="mb-1.5"
										style={{ color: effectiveSettings.mainTextColor }}
									>
										<MdEmail className={"inline mr-1.5"} />
										<a
											href={`mailto:${store.personal.email}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-inherit hover:text-[#cf8a05] no-underline transition-colors duration-300"
										>
											{store.personal.email}
										</a>
									</li>
								)}
								{store.personal.phone && (
									<li
										className="mb-1.5"
										style={{ color: effectiveSettings.mainTextColor }}
									>
										<FaPhoneAlt className={"inline mr-1.5"} />
										{store.personal.phone}
									</li>
								)}
								{Object.entries(store.socialLinks || {})
									.filter(([key]) => key !== "website")
									.map(([key, value]) => {
										if (!value) return null;
										const socialEntry = SOCIAL_ICONS_T5[key.toLowerCase()];
										const url = String(value).startsWith("http")
											? String(value)
											: `https://${String(value)}`;
										const displayUrl = url.replace(/^https?:\/\/(www\.)?/, "");

										if (socialEntry) {
											return (
												<li
													key={key}
													className="mb-1.5"
													style={{ color: effectiveSettings.mainTextColor }}
												>
													{React.cloneElement(socialEntry.logo, {
														size: "1em",
														className: socialEntry.className || "inline mr-1.5",
													})}
													<a
														href={url}
														target="_blank"
														rel="noopener noreferrer"
														className="text-inherit hover:text-[#cf8a05] no-underline transition-colors duration-300 ml-0.5"
														title={socialEntry.name}
													>
														{displayUrl}
													</a>
												</li>
											);
										}
										return null;
									})}
							</ul>
						</div>
					</div>
				</header>

				<main
					className={cn(
						effectiveSettings.mainAreaPaddingX,
						"py-5 md:py-0" // Vertical padding: 20px on small, 0 on md+ (sections handle their own top padding)
					)}
				>
					{store.summary &&
						store.summary !== "<p><br></p>" &&
						store.summary !== "<p></p>" && (
							<CvSection title="Personal Profile" settings={effectiveSettings}>
								<Description
									state={store.summary}
									size={effectiveSettings.paragraphFontSize}
								/>
							</CvSection>
						)}

					{store.experience?.length > 0 && (
						<CvSection title="Work Experience" settings={effectiveSettings}>
							{store.experience.map((exp, index) => (
								<article
									key={index}
									className={cn(
										effectiveSettings.articleBottomMargin,
										"last:mb-0"
									)}
								>
									<h2
										className={cn(
											effectiveSettings.sectionContentH2Size,
											"mb-0.5"
										)}
										style={{
											fontFamily: effectiveSettings.fontFamilyRokkitt,
											color: effectiveSettings.headingContentColor,
										}}
									>
										{exp.jobTitle} at {exp.company}
									</h2>
									<p
										className={cn(
											effectiveSettings.subDetailsFontSize,
											"italic mb-1.5"
										)}
										style={{ color: effectiveSettings.subDetailsColor }}
									>
										{formatDate(exp.startDate, localeIso, {
											month: "long",
											year: "numeric",
										})}{" "}
										-{" "}
										{exp.endDate
											? formatDate(exp.endDate, localeIso, {
													month: "long",
													year: "numeric",
											  })
											: translations.present}
									</p>
									<Description
										state={exp.description}
										size={effectiveSettings.paragraphFontSize}
									/>
								</article>
							))}
						</CvSection>
					)}

					{store.skills?.length > 0 && (
						<CvSection title="Key Skills" settings={effectiveSettings}>
							<ul
								className={cn(
									effectiveSettings.skillsFontSize,
									effectiveSettings.articleBottomMargin, // Consistent bottom margin for the block
									"list-none sm:columns-2 md:columns-3 print:columns-3"
								)}
								style={{ color: effectiveSettings.mainTextColor }}
							>
								{store.skills.map((skill, index) => (
									<li key={index} className="mb-1 break-inside-avoid-column">
										{typeof skill === "string" ? skill : skill.name}
									</li>
								))}
							</ul>
						</CvSection>
					)}

					{store.education?.length > 0 && (
						<CvSection title="Education" settings={effectiveSettings}>
							{store.education.map((edu, index) => (
								<article
									key={index}
									className={cn(
										effectiveSettings.articleBottomMargin,
										"last:mb-0"
									)}
								>
									<h2
										className={cn(
											effectiveSettings.sectionContentH2Size,
											"mb-0.5"
										)}
										style={{
											fontFamily: effectiveSettings.fontFamilyRokkitt,
											color: effectiveSettings.headingContentColor,
										}}
									>
										{edu.institution}
									</h2>
									<p
										className={cn(
											effectiveSettings.subDetailsFontSize,
											"italic mb-1.5"
										)}
										style={{ color: effectiveSettings.subDetailsColor }}
									>
										{edu.degree} {edu.fieldOfStudy && `- ${edu.fieldOfStudy}`}
										{(edu.startDate || edu.endDate) && (
											<span className="block mt-0.5">
												{formatDate(edu.startDate, localeIso, {
													month: "long",
													year: "numeric",
												})}
												{edu.startDate && edu.endDate ? " - " : ""}
												{edu.endDate
													? formatDate(edu.endDate, localeIso, {
															month: "long",
															year: "numeric",
													  })
													: edu.startDate
													? translations.present
													: ""}
											</span>
										)}
									</p>
									<Description
										state={edu.description}
										size={effectiveSettings.paragraphFontSize}
									/>
								</article>
							))}
						</CvSection>
					)}

					{store.projects?.length > 0 && (
						<CvSection title="Projects" settings={effectiveSettings}>
							{store.projects.map((project, index) => (
								<article
									key={index}
									className={cn(
										effectiveSettings.articleBottomMargin,
										"last:mb-0"
									)}
								>
									<div className="flex justify-between items-baseline flex-wrap">
										<h2
											className={cn(
												effectiveSettings.sectionContentH2Size,
												"mb-0.5 mr-2"
											)} // Added mr-2 for spacing if links wrap
											style={{
												fontFamily: effectiveSettings.fontFamilyRokkitt,
												color: effectiveSettings.headingContentColor,
											}}
										>
											{project.title}
										</h2>
										<div
											className={cn(
												effectiveSettings.subDetailsFontSize,
												"flex-shrink-0 whitespace-nowrap"
											)}
										>
											{" "}
											{/* whitespace-nowrap for links */}
											{project.liveLink && (
												<a
													href={
														project.liveLink.startsWith("http")
															? project.liveLink
															: `https://${project.liveLink}`
													}
													target="_blank"
													rel="noopener noreferrer"
													className="text-[#cf8a05] hover:underline ml-2"
												>
													Live
												</a>
											)}
											{project.githubLink && (
												<a
													href={
														project.githubLink.startsWith("http")
															? project.githubLink
															: `https://www.${project.githubLink}`
													}
													target="_blank"
													rel="noopener noreferrer"
													className="text-[#cf8a05] hover:underline ml-2"
												>
													GitHub
												</a>
											)}
										</div>
									</div>
									{project.technologies?.length > 0 && (
										<p
											className={cn(
												effectiveSettings.subDetailsFontSize,
												"italic mb-1.5"
											)}
											style={{ color: effectiveSettings.mainTextColor }}
										>
											Technologies: {project.technologies.join(", ")}
										</p>
									)}
									<Description
										state={project.description}
										size={effectiveSettings.paragraphFontSize}
									/>
								</article>
							))}
						</CvSection>
					)}

					{store.languages?.length > 0 && (
						<CvSection title="Languages" settings={effectiveSettings}>
							<ul
								className={cn(
									effectiveSettings.skillsFontSize,
									effectiveSettings.articleBottomMargin,
									"list-none"
								)}
								style={{ color: effectiveSettings.mainTextColor }}
							>
								{store.languages.map((lang, index) => (
									<li key={index} className="mb-1">
										<strong>{lang.language}:</strong> {lang.level}
									</li>
								))}
							</ul>
						</CvSection>
					)}

					{store.interests?.length > 0 && (
						<CvSection title="Interests" settings={effectiveSettings}>
							<p
								className={cn(
									effectiveSettings.paragraphFontSize,
									effectiveSettings.articleBottomMargin
								)}
								style={{ color: effectiveSettings.mainTextColor }}
							>
								{Array.isArray(store.interests)
									? store.interests.join(", ")
									: String(store.interests)}
							</p>
						</CvSection>
					)}
				</main>
			</div>
		</div>
	);
};

export default Template5;
