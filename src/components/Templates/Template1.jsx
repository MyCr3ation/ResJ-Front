// Template1.jsx
import React from "react";
// MODIFIED: Updated icon imports
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
import { MdArrowOutward } from "react-icons/md";
import useStore from "../../store/store.jsx";

// --- Local Helper: cn (Conditional ClassNames) ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Local Helper: formatDate ---
const formatDate = (
	dateString,
	locale,
	options = { month: "short", year: "numeric" }
) => {
	if (!dateString) return ""; // Return empty for consistency if date is not present
	try {
		const date = new Date(dateString);
		// Check if date is valid
		if (isNaN(date.getTime())) {
			// Try to parse if it's a specific format like YYYY-MM-DD that might be parsed as UTC midnight
			const parts = dateString.split("-");
			if (parts.length === 3) {
				const year = parseInt(parts[0], 10);
				const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
				const day = parseInt(parts[2], 10);
				const localDate = new Date(year, month, day);
				if (!isNaN(localDate.getTime())) {
					return localDate.toLocaleDateString(locale, options);
				}
			}
			return dateString; // Fallback to original string if invalid
		}
		return date.toLocaleDateString(locale, options);
	} catch (e) {
		// console.error("Error formatting date:", e);
		return dateString; // Fallback
	}
};

// --- Local Constants ---
const DEFAULT_LOCALE_ISO = "en-US"; // Replaces useLocale and LOCALES

const DEFAULT_FONT_FAMILY =
	"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"; // Replaces uiSans

// Hardcoded translations (replaces useTranslations/t function)
const translations = {
	present: "Present",
	projectsLive: "Live",
	projectsGithub: "GitHub",
	projectsTech: "Technologies",
	socialTitle: "Social",
	experienceTitle: "Experience",
	educationTitle: "Education",
	skillsTitle: "Skills",
	projectsTitle: "Projects",
	languagesTitle: "Languages",
	interestsTitle: "Interests",
	certificatesTitle: "Certificates",
	referencesTitle: "References",
};

// Default template settings (mimicking the removed useTemplateStore's initial state)
const defaultTemplateSettings = {
	name: "CV",
	templateNumber: 1,
	h1Color: "",
	h2Color: "",
	h3Color: "",
	textColor: "",
	descriptionColor: "",
	hyperLinkColor: "",
	imageSize: "",
	projectLink: "", // "text" or "icon"
	spaceBetween: "", // "less", "normal", "more"
	align: "", // "left", "center", "right"
	titleCase: "", // "lower", "normal", "upper"
	fontFamily: "",
	h1FontSize: "", // "small", "normal", "large"
	h2FontSize: "",
	h3FontSize: "",
	textFontSize: "",
	descriptionFontSize: "",
	hyperLinkFontSize: "#0284c7", // Original store default; handleFindStyle will turn this into "text-sm"
};

// --- Helper: Style Calculation (Kept As Is, now local) ---
const handleFindStyle = (state, x, y, z) => {
	const xOptions = ["small", "left", "lower", "less"];
	const yOptions = ["large", "right", "normal", "more"];
	if (xOptions.includes(String(state).toLowerCase())) {
		// Added toLowerCase for robustness
		return x;
	} else if (yOptions.includes(String(state).toLowerCase())) {
		return y;
	} else {
		return z;
	}
};

// --- Helper: Section Component (Minor Enhancements) ---
const Section = ({
	id,
	title,
	children,
	color,
	align,
	size,
	titleCase,
	space,
}) => {
	return (
		<section
			id={`template1-${id}`}
			className={cn(
				"flex items-center justify-center flex-col gap-1.5 w-full px-8",
				space
			)}
		>
			<h2
				style={{ color: color, borderColor: color ? `${color}50` : "#e5e5e5" }}
				className={cn(
					"pb-0.5 border-b font-semibold w-full",
					size,
					align,
					titleCase
				)}
			>
				{title}
			</h2>
			<div
				className={cn(
					"w-full",
					align === "text-left"
						? "text-left"
						: align === "text-right"
						? "text-right"
						: "text-center"
				)}
			>
				{children}
			</div>
		</section>
	);
};

// --- Helper: Description Component (Minor Enhancements) ---
const Description = ({ state, color, size }) => {
	if (!state || state === "<p><br></p>" || state === "<p></p>") return null;
	return (
		<div
			style={{ color: color || "#52525b" }}
			dangerouslySetInnerHTML={{ __html: state }}
			className={cn("text-left mt-1 text-zinc-700", size)} // Kept text-left for readability
		/>
	);
};

// --- Social Icon Map for Template 1 ---
const SOCIAL_ICON_MAP_T1 = {
	linkedin: <FaLinkedin />,
	github: <FaGithub />,
	twitter: <FaTwitter />,
	facebook: <FaFacebook />,
	instagram: <FaInstagram />,
	website: <FaGlobe />,
	xing: <SiXing />,
	medium: <SiMedium />,
	figma: <SiFigma />,
	dribbble: <FaDribbble />,
};

// --- Main Template Component ---
const Template1 = ({}) => {
	// Removed templateOverrides prop, using internal defaults
	const { store } = useStore();
	// Use defaultTemplateSettings directly, as if it's from a store with these defaults
	const template = defaultTemplateSettings;
	const localeIso = DEFAULT_LOCALE_ISO; // Use the local default

	// --- Calculate Effective Styles (Enhanced Defaults) ---
	const BASE_COLORS = {
		h1: "#18181b",
		h2: "#3f3f46",
		h3: "#52525b",
		text: "#3f3f46",
		description: "#71717a",
		hyperlink: "#0ea5e9",
	};

	const colorSettings = {
		h1Color: template.h1Color || BASE_COLORS.h1,
		h2Color: template.h2Color || BASE_COLORS.h2,
		h3Color: template.h3Color || BASE_COLORS.h3,
		textColor: template.textColor || BASE_COLORS.text,
		descriptionColor: template.descriptionColor || BASE_COLORS.description,
		hyperLinkColor: template.hyperLinkColor || BASE_COLORS.hyperlink,
	};

	const fontSettings = {
		fontFamily: template.fontFamily || DEFAULT_FONT_FAMILY,
		h1FontSize: handleFindStyle(
			template.h1FontSize,
			"text-base xs:text-lg",
			"text-xl xs:text-2xl",
			"text-lg xs:text-xl"
		),
		h2FontSize: handleFindStyle(
			template.h2FontSize,
			"text-sm xs:text-base",
			"text-lg xs:text-xl",
			"text-base xs:text-lg"
		),
		h3FontSize: handleFindStyle(
			template.h3FontSize,
			"text-sm",
			"text-base xs:text-lg",
			"text-base"
		),
		textFontSize: handleFindStyle(
			template.textFontSize,
			"text-xs",
			"text-sm",
			"text-sm"
		),
		hyperLinkFontSize: handleFindStyle(
			// If template.hyperLinkFontSize is "#0284c7", this results in "text-sm"
			template.hyperLinkFontSize,
			"text-xs",
			"text-sm",
			"text-sm"
		),
		descriptionFontSize: handleFindStyle(
			template.descriptionFontSize,
			"text-xs",
			"text-sm",
			"text-sm"
		),
	};

	const sectionSettings = {
		imageSize: parseInt(template.imageSize || "80"),
		spaceBetween: handleFindStyle(
			template.spaceBetween,
			"mt-3",
			"mt-6",
			"mt-4"
		),
		align: handleFindStyle(
			template.align,
			"text-left",
			"text-right",
			"text-center"
		),
		titleCase: handleFindStyle(
			template.titleCase,
			"lowercase",
			"normal-case",
			"uppercase"
		),
		projectLink: template.projectLink || "text", // Default to "text" if not specified
	};

	// --- Render Template ---
	return (
		<div
			style={{ fontFamily: fontSettings.fontFamily }}
			className="w-[210mm] min-h-[297mm] bg-white text-zinc-800 my-0 mx-auto p-8 shadow-md rounded-sm overflow-x-hidden overflow-y-visible print:shadow-none print:bg-transparent print:p-6"
		>
			{/* --- Header Section --- */}
			<div
				className={cn(
					"flex flex-col items-center justify-between w-full text-center px-8 mb-6",
					sectionSettings.align // Apply overall alignment to header
				)}
			>
				{store.image && (
					<img
						src={store.image}
						height={sectionSettings.imageSize} // Standard img attribute
						width={sectionSettings.imageSize} // Standard img attribute
						alt={"Personal"}
						className="rounded-full flex-shrink-0"
						style={{ objectFit: "cover" }} // Added for better aspect ratio handling like Next/Image
					/>
				)}
				<h1
					style={{ color: colorSettings.h1Color }}
					className={cn(
						"whitespace-nowrap w-full font-bold",
						fontSettings.h1FontSize
					)}
				>
					{store.personal.name} {store.personal.surname}
				</h1>
				<p
					style={{ color: colorSettings.textColor }}
					className={cn(
						"w-full mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 items-center",
						fontSettings.textFontSize,
						sectionSettings.align === "text-left"
							? "justify-start"
							: sectionSettings.align === "text-right"
							? "justify-end"
							: "justify-center"
					)}
				>
					{(store.personal.city || store.personal.country) && (
						<span>
							{store.personal.city}
							{store.personal.city && store.personal.country && ", "}
							{store.personal.country}
						</span>
					)}
					{store.personal.email && (
						<>
							{(store.personal.city || store.personal.country) && (
								<span className="text-zinc-400 mx-1">•</span>
							)}
							<a
								className={cn(
									"hover:underline",
									fontSettings.hyperLinkFontSize
								)}
								style={{ color: colorSettings.hyperLinkColor }}
								target="_blank"
								rel="noopener noreferrer"
								href={`mailto:${store.personal.email}`}
							>
								{store.personal.email}
							</a>
						</>
					)}
					{store.personal.phone && (
						<>
							{(store.personal.city ||
								store.personal.country ||
								store.personal.email) && (
								<span className="text-zinc-400 mx-1">•</span>
							)}
							<a
								className={cn(
									"hover:underline",
									fontSettings.hyperLinkFontSize
								)}
								style={{ color: colorSettings.hyperLinkColor }}
								target="_blank"
								rel="noopener noreferrer"
								href={`tel:${store.personal.phone}`}
							>
								{store.personal.phone}
							</a>
						</>
					)}
				</p>
			</div>

			{/* --- Main Content Sections --- */}
			{/* Summary */}
			{store.summary && store.summary !== "<p><br></p>" && (
				<section
					id="template1-summary"
					className={cn("w-full px-8", sectionSettings.spaceBetween)}
				>
					<div
						dangerouslySetInnerHTML={{ __html: store.summary }}
						style={{ color: colorSettings.textColor }}
						className={cn(
							"prose prose-sm max-w-none", // prose classes handle styling of HTML content
							fontSettings.textFontSize,
							sectionSettings.align
						)}
					></div>
				</section>
			)}

			{/* Socials */}
			{Object.values(store.socialLinks || {}).some((link) => link) && (
				<Section
					id="socials"
					title={translations.socialTitle}
					color={colorSettings.h2Color}
					size={fontSettings.h2FontSize}
					align={sectionSettings.align}
					titleCase={sectionSettings.titleCase}
					space={sectionSettings.spaceBetween}
				>
					<div
						className={cn(
							"flex items-center flex-wrap gap-x-4 gap-y-1 w-full",
							sectionSettings.align === "text-left"
								? "justify-start"
								: sectionSettings.align === "text-right"
								? "justify-end"
								: "justify-center"
						)}
					>
						{Object.entries(store.socialLinks || {})
							.filter(([, value]) => value) // Ensure value is not empty
							.map(([key, value]) => {
								const socialKey = key.toLowerCase();
								// MODIFIED: Get icon from the map
								const iconElement = SOCIAL_ICON_MAP_T1[socialKey];

								const url = String(value).startsWith("http")
									? String(value)
									: `https://${String(value)}`;

								return (
									<a
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										key={key}
										className={cn(
											"inline-flex items-center gap-1.5 hover:underline",
											fontSettings.hyperLinkFontSize
										)}
										style={{ color: colorSettings.hyperLinkColor }}
									>
										{iconElement &&
											// MODIFIED: Render icon with specified size
											React.cloneElement(iconElement, { size: 18 })}
										<span>{url}</span> {/* Display full URL */}
									</a>
								);
							})}
					</div>
				</Section>
			)}

			{/* Experience */}
			{store.experience?.length > 0 && (
				<Section
					id="experience"
					title={translations.experienceTitle}
					color={colorSettings.h2Color}
					size={fontSettings.h2FontSize}
					align={sectionSettings.align}
					titleCase={sectionSettings.titleCase}
					space={sectionSettings.spaceBetween}
				>
					<div className="w-full flex flex-col gap-2.5">
						{store.experience.map((exp, index) => (
							<div key={index} className="flex flex-col w-full text-left">
								<div className="flex items-baseline justify-between w-full">
									<h3
										className={cn("font-medium", fontSettings.h3FontSize)}
										style={{ color: colorSettings.h3Color }}
									>
										{exp.jobTitle}
									</h3>
									<p
										style={{ color: colorSettings.textColor }}
										className={cn(
											"text-xs flex-shrink-0 ml-2",
											fontSettings.textFontSize
										)}
									>
										{formatDate(exp.startDate, localeIso)} -{" "}
										{exp.endDate
											? formatDate(exp.endDate, localeIso)
											: translations.present}
									</p>
								</div>
								<h4
									style={{ color: colorSettings.textColor }}
									className={cn(
										"font-normal text-sm",
										fontSettings.textFontSize
									)}
								>
									{exp.company}
									{exp.company && exp.city && ", "}
									{exp.city}
								</h4>
								<Description
									color={colorSettings.descriptionColor}
									size={fontSettings.descriptionFontSize}
									state={exp.description}
								/>
							</div>
						))}
					</div>
				</Section>
			)}

			{/* Education */}
			{store.education?.length > 0 && (
				<Section
					id="education"
					title={translations.educationTitle}
					color={colorSettings.h2Color}
					size={fontSettings.h2FontSize}
					align={sectionSettings.align}
					titleCase={sectionSettings.titleCase}
					space={sectionSettings.spaceBetween}
				>
					<div className="w-full flex flex-col gap-2.5">
						{store.education.map((edu, index) => (
							<div key={index} className="flex flex-col w-full text-left">
								<div className="flex items-baseline justify-between w-full">
									<h3
										className={cn("font-medium", fontSettings.h3FontSize)}
										style={{ color: colorSettings.h3Color }}
									>
										{edu.degree} {edu.fieldOfStudy && `- ${edu.fieldOfStudy}`}
									</h3>
									<p
										style={{ color: colorSettings.textColor }}
										className={cn(
											"text-xs flex-shrink-0 ml-2",
											fontSettings.textFontSize
										)}
									>
										{formatDate(edu.startDate, localeIso)} -{" "}
										{edu.endDate
											? formatDate(edu.endDate, localeIso)
											: translations.present}
									</p>
								</div>
								<h4
									style={{ color: colorSettings.textColor }}
									className={cn(
										"font-normal text-sm",
										fontSettings.textFontSize
									)}
								>
									{edu.institution}
									{edu.institution && edu.city && ", "}
									{edu.city}
								</h4>
								<Description
									color={colorSettings.descriptionColor}
									size={fontSettings.descriptionFontSize}
									state={edu.description}
								/>
							</div>
						))}
					</div>
				</Section>
			)}

			{/* Skills */}
			{store.skills?.length > 0 && (
				<Section
					id="skills"
					title={translations.skillsTitle}
					color={colorSettings.h2Color}
					size={fontSettings.h2FontSize}
					align={sectionSettings.align}
					titleCase={sectionSettings.titleCase}
					space={sectionSettings.spaceBetween}
				>
					<p
						style={{ color: colorSettings.textColor }}
						className={cn("w-full", fontSettings.textFontSize)}
					>
						{store.skills.join(", ")}
					</p>
				</Section>
			)}

			{/* Projects */}
			{store.projects?.length > 0 && (
				<Section
					id="projects"
					title={translations.projectsTitle}
					color={colorSettings.h2Color}
					size={fontSettings.h2FontSize}
					align={sectionSettings.align}
					titleCase={sectionSettings.titleCase}
					space={sectionSettings.spaceBetween}
				>
					<div className="w-full flex flex-col gap-3">
						{store.projects.map((project, index) => (
							<div key={index} className="flex flex-col w-full text-left">
								<div className="flex items-baseline justify-between w-full gap-2">
									<h3
										className={cn("font-medium", fontSettings.h3FontSize)}
										style={{ color: colorSettings.h3Color }}
									>
										{project.title}
									</h3>
									<div
										className={cn(
											"flex items-center gap-x-2 gap-y-0.5 flex-shrink-0 flex-wrap justify-end",
											fontSettings.hyperLinkFontSize
										)}
									>
										{project.liveLink && (
											<a
												target="_blank"
												rel="noopener noreferrer"
												href={
													String(project.liveLink).startsWith("http")
														? project.liveLink
														: `https://${project.liveLink}`
												}
												className="inline-flex items-center gap-1 hover:underline"
												style={{ color: colorSettings.hyperLinkColor }}
											>
												{sectionSettings.projectLink === "icon" ? (
													<MdArrowOutward size={14} />
												) : (
													translations.projectsLive
												)}
											</a>
										)}
										{project.githubLink && ( // MODIFIED: Original template has SiGithub icon already
											<a
												target="_blank"
												rel="noopener noreferrer"
												href={
													String(project.githubLink).startsWith("http")
														? project.githubLink
														: `https://${project.githubLink}`
												}
												className="inline-flex items-center gap-1 hover:underline"
												style={{ color: colorSettings.hyperLinkColor }}
											>
												{sectionSettings.projectLink === "icon" ? (
													<FaGithub size={12} /> // Assuming FaGithub if preferred universally, or keep SiGithub if it was specifically for projects
												) : (
													translations.projectsGithub
												)}
											</a>
										)}
									</div>
								</div>
								{project?.technologies?.length > 0 && (
									<p
										style={{ color: colorSettings.textColor }}
										className={cn("text-xs mt-0.5", fontSettings.textFontSize)}
									>
										<span className="font-medium mr-1.5">
											{translations.projectsTech}:
										</span>
										{project.technologies.join(" · ")}
									</p>
								)}
								<Description
									color={colorSettings.descriptionColor}
									size={fontSettings.descriptionFontSize}
									state={project.description}
								/>
							</div>
						))}
					</div>
				</Section>
			)}

			{/* Languages */}
			{store.languages?.length > 0 && (
				<Section
					id="languages"
					title={translations.languagesTitle}
					color={colorSettings.h2Color}
					size={fontSettings.h2FontSize}
					align={sectionSettings.align}
					titleCase={sectionSettings.titleCase}
					space={sectionSettings.spaceBetween}
				>
					<div
						className={cn(
							"flex flex-wrap gap-x-6 gap-y-1 w-full",
							fontSettings.textFontSize,
							sectionSettings.align === "text-center"
								? "justify-center"
								: sectionSettings.align === "text-right"
								? "justify-end"
								: "justify-start"
						)}
					>
						{store.languages.map((lang, index) => (
							<div key={index} className="flex">
								<p
									className="font-medium mr-2"
									style={{ color: colorSettings.h3Color }}
								>
									{lang.language}:
								</p>
								<p style={{ color: colorSettings.textColor }}>
									{`${lang.level}`}
								</p>
							</div>
						))}
					</div>
				</Section>
			)}

			{/* Interests */}
			{store.interests?.length > 0 && (
				<Section
					id="interests"
					title={translations.interestsTitle}
					color={colorSettings.h2Color}
					size={fontSettings.h2FontSize}
					align={sectionSettings.align}
					titleCase={sectionSettings.titleCase}
					space={sectionSettings.spaceBetween}
				>
					<p
						style={{ color: colorSettings.textColor }}
						className={cn("w-full", fontSettings.textFontSize)}
					>
						{store.interests.join(" • ")}
					</p>
				</Section>
			)}

			{/* Certificates */}
			{store.certificates?.length > 0 && (
				<Section
					id="certificates"
					title={translations.certificatesTitle}
					color={colorSettings.h2Color}
					size={fontSettings.h2FontSize}
					align={sectionSettings.align}
					titleCase={sectionSettings.titleCase}
					space={sectionSettings.spaceBetween}
				>
					<div className="w-full flex flex-col gap-2.5">
						{store.certificates.map((certificate, index) => (
							<div key={index} className="flex flex-col w-full text-left">
								<div className="flex items-baseline justify-between w-full">
									<h3
										className={cn("font-medium", fontSettings.h3FontSize)}
										style={{ color: colorSettings.h3Color }}
									>
										{certificate.title}
									</h3>
									<p
										style={{ color: colorSettings.textColor }}
										className={cn(
											"text-xs flex-shrink-0 ml-2",
											fontSettings.textFontSize
										)}
									>
										{formatDate(certificate.date, localeIso)}
									</p>
								</div>
								{certificate.institution && (
									<h4
										style={{ color: colorSettings.textColor }}
										className={cn(
											"font-normal text-sm italic",
											fontSettings.textFontSize
										)}
									>
										{certificate.institution}
									</h4>
								)}
								<Description
									color={colorSettings.descriptionColor}
									size={fontSettings.descriptionFontSize}
									state={certificate.description}
								/>
							</div>
						))}
					</div>
				</Section>
			)}

			{/* References */}
			{store.references?.length > 0 && (
				<Section
					id="references"
					title={translations.referencesTitle}
					color={colorSettings.h2Color}
					size={fontSettings.h2FontSize}
					align={sectionSettings.align}
					titleCase={sectionSettings.titleCase}
					space={sectionSettings.spaceBetween}
				>
					<div className="w-full flex flex-col gap-2.5">
						{store.references.map((ref, index) => (
							<div key={index} className="flex flex-col w-full text-left mb-1">
								<h3
									className={cn("font-medium", fontSettings.h3FontSize)}
									style={{ color: colorSettings.h3Color }}
								>
									{ref.name} {ref.company && `- ${ref.company}`}
								</h3>
								<div
									className={cn(
										"flex items-center gap-x-3 gap-y-0.5 flex-wrap mt-0.5",
										fontSettings.textFontSize
									)}
								>
									{ref.email && (
										<a
											className={cn(
												"hover:underline",
												fontSettings.hyperLinkFontSize
											)}
											target="_blank"
											rel="noopener noreferrer"
											href={`mailto:${ref.email}`}
											style={{ color: colorSettings.hyperLinkColor }}
										>
											{ref.email}
										</a>
									)}
									{ref.email && ref.phone && (
										<span className="text-zinc-400 mx-1">|</span>
									)}
									{ref.phone && (
										<a
											className={cn(
												"hover:underline",
												fontSettings.hyperLinkFontSize
											)}
											target="_blank"
											rel="noopener noreferrer"
											href={`tel:${ref.phone}`}
											style={{ color: colorSettings.hyperLinkColor }}
										>
											{ref.phone}
										</a>
									)}
								</div>
								<Description
									color={colorSettings.descriptionColor}
									size={fontSettings.descriptionFontSize}
									state={ref.description}
								/>
							</div>
						))}
					</div>
				</Section>
			)}
		</div>
	);
};

export default Template1;
