// Template3.jsx
import React from "react";
// MODIFIED: Updated icon imports to match the user's list
import { SiXing, SiMedium, SiFigma } from "react-icons/si"; // Kept Si for these as specified
import {
	FaLinkedin,
	FaGithub,
	FaTwitter,
	FaFacebook,
	FaInstagram,
	FaGlobe,
	FaDribbble,
} from "react-icons/fa";
import { MdArrowOutward, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import useStore from "../../store/store";

// --- Local Helper: cn (Conditional ClassNames) ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Local Helper: formatDate ---
const formatDate = (
	dateString,
	locale,
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
const DEFAULT_LOCALE_ISO = "en-US";
const DEFAULT_FONT_FAMILY =
	"Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";

// Hardcoded translations
const translations = {
	present: "Present",
	contact: "Contact",
	social: "Social",
	skills: "Skills",
	languages: "Languages",
	interests: "Interests",
	summary: "Summary",
	experience: "Experience",
	education: "Education",
	projects: "Projects",
	projectsLive: "Live",
	projectsGithub: "GitHub",
	projectsTech: "Technologies",
	certificates: "Certificates",
	references: "References",
	referencesAvailable: "References available upon request.",
};

// MODIFIED: Updated LOCAL_SOCIALS to use specified icons and keys
const LOCAL_SOCIALS_T3 = [
	{ name: "LinkedIn", key: "linkedin", logo: <FaLinkedin /> },
	{ name: "Github", key: "github", logo: <FaGithub /> },
	{ name: "Twitter", key: "twitter", logo: <FaTwitter /> },
	{ name: "Facebook", key: "facebook", logo: <FaFacebook /> },
	{ name: "Instagram", key: "instagram", logo: <FaInstagram /> },
	{ name: "Website", key: "website", logo: <FaGlobe /> },
	{ name: "Xing", key: "xing", logo: <SiXing /> },
	{ name: "Medium", key: "medium", logo: <SiMedium /> },
	{ name: "Figma", key: "figma", logo: <SiFigma /> },
	{ name: "Dribbble", key: "dribbble", logo: <FaDribbble /> }, // Using FaDribbble
];

// Default template settings for Template3
const defaultTemplateSettings = {
	name: "Modern Sidebar CV",
	templateNumber: 3,
	accentColor: "#0D9488",
	sidebarBgColor: "#F1F5F9",
	textColor: "#334155",
	sidebarTextColor: "#1E293B",
	headingColor: "#0F172A",
	subHeadingColor: "#475569",
	linkColor: "#0D9488",
	descriptionColor: "#4B5563",
	h1Color: "",
	h2Color: "",
	h3Color: "",
	hyperLinkColor: "",
	imageSize: "100",
	projectLink: "icon",
	spaceBetween: "normal",
	align: "left",
	titleCase: "uppercase",
	fontFamily: "",
	h1FontSize: "normal",
	h2FontSize: "normal",
	sidebarH2FontSize: "normal",
	h3FontSize: "normal",
	textFontSize: "normal",
	descriptionFontSize: "normal",
	hyperLinkFontSize: "normal",
};

// --- Helper: Style Calculation ---
const handleFindStyle = (state, x, y, z) => {
	const xOptions = ["small", "left", "lower", "less"];
	const yOptions = ["large", "right", "normal", "more"];
	const s = String(state).toLowerCase();
	if (xOptions.includes(s)) return x;
	if (yOptions.includes(s)) return y;
	return z;
};

// --- Helper: Description Component ---
const Description = ({ state, color, size, className }) => {
	if (!state || state === "<p><br></p>" || state === "<p></p>") return null;
	return (
		<div
			style={{ color: color }}
			dangerouslySetInnerHTML={{ __html: state }}
			className={cn(
				"text-left mt-1 prose prose-sm max-w-none",
				"prose-p:mt-1 prose-p:mb-1 prose-ul:my-1 prose-li:my-0.5",
				size,
				className
			)}
		/>
	);
};

// --- Main Template Component ---
const Template3 = ({}) => {
	const { store } = useStore();
	const template = defaultTemplateSettings;
	const localeIso = DEFAULT_LOCALE_ISO;

	const colors = {
		accent: template.accentColor,
		sidebarBg: template.sidebarBgColor,
		text: template.textColor,
		sidebarText: template.sidebarTextColor,
		heading: template.h1Color || template.headingColor,
		subHeading: template.h3Color || template.subHeadingColor,
		mainSectionTitle: template.h2Color || template.accentColor,
		sidebarSectionTitle: template.h2Color || template.sidebarTextColor,
		link: template.hyperLinkColor || template.linkColor,
		description: template.descriptionColor || template.textColor,
	};

	const fonts = {
		family: template.fontFamily || DEFAULT_FONT_FAMILY,
		nameSize: handleFindStyle(
			template.h1FontSize,
			"text-2xl",
			"text-4xl",
			"text-3xl"
		),
		mainTitleSize: handleFindStyle(
			template.h2FontSize,
			"text-base",
			"text-xl",
			"text-lg"
		),
		sidebarTitleSize: handleFindStyle(
			template.sidebarH2FontSize,
			"text-sm",
			"text-lg",
			"text-base"
		),
		itemHeadingSize: handleFindStyle(
			template.h3FontSize,
			"text-sm",
			"text-lg",
			"text-base"
		),
		textSize: handleFindStyle(
			template.textFontSize,
			"text-xs",
			"text-base",
			"text-sm"
		),
		linkSize: handleFindStyle(
			template.hyperLinkFontSize,
			"text-xs",
			"text-base",
			"text-sm"
		),
		descriptionSize: handleFindStyle(
			template.descriptionFontSize,
			"text-xs",
			"text-base",
			"text-sm"
		),
	};

	const layout = {
		imageSize: parseInt(template.imageSize, 10) || 100,
		projectLinkType: template.projectLink || "icon",
		sectionSpacing: handleFindStyle(
			template.spaceBetween,
			"gap-4",
			"gap-8",
			"gap-6"
		),
		mainContentAlign: handleFindStyle(
			template.align,
			"text-left",
			"text-right",
			"text-left"
		),
		mainTitleCase: handleFindStyle(
			template.titleCase,
			"lowercase",
			"normal-case",
			"uppercase"
		),
	};

	return (
		// MODIFIED: Outermost div structure aligned with Template1/2 for dimension/shadow consistency,
		// but kept Template3's overflow-y-auto for its two-column scrolling.
		// Padding is handled by internal aside/main elements.
		<div
			style={{ fontFamily: fonts.family, color: colors.text }} // Base font and text color
			className="w-[210mm] min-h-[297mm] bg-white mx-auto my-0 shadow-lg rounded-sm overflow-x-hidden overflow-y-auto print:shadow-none print:my-0 print:bg-transparent print:h-auto"
		>
			<div className="flex flex-row min-h-[inherit]">
				{" "}
				{/* This container allows sidebar and main to fill height */}
				{/* --- Sidebar (Left Column) --- */}
				<aside
					style={{
						backgroundColor: colors.sidebarBg,
						color: colors.sidebarText,
					}}
					className={cn(
						"w-[33%] min-h-[inherit] p-6 flex flex-col print:bg-slate-100",
						layout.sectionSpacing
					)}
				>
					<div className="text-center flex flex-col items-center mb-2">
						{store.image && (
							<img
								src={store.image}
								alt="Profile"
								className="rounded-full mb-4 flex-shrink-0"
								style={{
									width: `${layout.imageSize}px`,
									height: `${layout.imageSize}px`,
									objectFit: "cover",
								}}
							/>
						)}
						<h1
							style={{ color: colors.heading }}
							className={cn("font-bold", fonts.nameSize)}
						>
							{store.personal.name} {store.personal.surname}
						</h1>
						{store.personal.jobTitle && (
							<h2
								style={{ color: colors.subHeading }}
								className={cn("font-medium mt-1", fonts.itemHeadingSize)}
							>
								{store.personal.jobTitle}
							</h2>
						)}
					</div>

					<div className="w-full">
						<h3
							style={{
								color: colors.sidebarSectionTitle,
								borderColor: `${colors.sidebarSectionTitle}50`,
							}}
							className={cn(
								"font-semibold border-b pb-1 mb-2 text-left",
								fonts.sidebarTitleSize,
								"normal-case"
							)}
						>
							{translations.contact}
						</h3>
						<div className={cn("flex flex-col gap-1.5", fonts.textSize)}>
							{(store.personal.city || store.personal.country) && (
								<div className="flex items-center gap-2">
									<MdLocationOn
										className="text-lg flex-shrink-0"
										style={{ color: colors.accent }}
									/>
									<span>
										{store.personal.city}
										{store.personal.city && store.personal.country && ", "}
										{store.personal.country}
									</span>
								</div>
							)}
							{store.personal.email && (
								<a
									href={`mailto:${store.personal.email}`}
									className="flex items-center gap-2 hover:underline"
									style={{ color: colors.link }}
								>
									<MdEmail
										className="text-lg flex-shrink-0"
										style={{ color: colors.accent }}
									/>
									<span>{store.personal.email}</span>
								</a>
							)}
							{store.personal.phone && (
								<a
									href={`tel:${store.personal.phone}`}
									className="flex items-center gap-2 hover:underline"
									style={{ color: colors.link }}
								>
									<MdPhone
										className="text-lg flex-shrink-0"
										style={{ color: colors.accent }}
									/>
									<span>{store.personal.phone}</span>
								</a>
							)}
						</div>
					</div>

					{Object.values(store.socialLinks || {}).some((link) => link) && (
						<div className="w-full">
							<h3
								style={{
									color: colors.sidebarSectionTitle,
									borderColor: `${colors.sidebarSectionTitle}50`,
								}}
								className={cn(
									"font-semibold border-b pb-1 mb-2 text-left",
									fonts.sidebarTitleSize,
									"normal-case"
								)}
							>
								{translations.social}
							</h3>
							<div className={cn("flex flex-col gap-1.5", fonts.linkSize)}>
								{/* MODIFIED: Using LOCAL_SOCIALS_T3 */}
								{LOCAL_SOCIALS_T3.map((social) => {
									const link = store.socialLinks?.[social.key];
									if (!link) return null;
									const url = String(link).startsWith("http")
										? String(link)
										: `https://${String(link)}`;

									return (
										<a
											key={social.key}
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											// MODIFIED: Removed truncate, added items-start for better multiline alignment
											className="flex items-start gap-2 hover:underline w-full group"
											style={{ color: colors.link }}
											title={url}
										>
											{React.cloneElement(social.logo, {
												// icon styles from original T3, flex-shrink-0 is important
												className:
													"text-lg flex-shrink-0 group-hover:opacity-100 transition-opacity pt-0.5",
												style: { color: colors.accent },
											})}
											{/* MODIFIED: Added break-all and min-w-0 for URL wrapping */}
											<span className="min-w-0 break-all">{url}</span>
										</a>
									);
								})}
							</div>
						</div>
					)}

					{store.skills?.length > 0 && (
						<div className="w-full">
							<h3
								style={{
									color: colors.sidebarSectionTitle,
									borderColor: `${colors.sidebarSectionTitle}50`,
								}}
								className={cn(
									"font-semibold border-b pb-1 mb-2 text-left",
									fonts.sidebarTitleSize,
									"normal-case"
								)}
							>
								{translations.skills}
							</h3>
							<div className="flex flex-wrap gap-1.5">
								{store.skills.map((skill, index) => (
									<span
										key={index}
										className={cn(
											"px-2 py-0.5 rounded-md text-xs font-medium",
											fonts.textSize
										)}
										style={{
											backgroundColor: `${colors.accent}20`,
											color: colors.accent,
										}}
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					)}

					{store.languages?.length > 0 && (
						<div className="w-full">
							<h3
								style={{
									color: colors.sidebarSectionTitle,
									borderColor: `${colors.sidebarSectionTitle}50`,
								}}
								className={cn(
									"font-semibold border-b pb-1 mb-2 text-left",
									fonts.sidebarTitleSize,
									"normal-case"
								)}
							>
								{translations.languages}
							</h3>
							<div className={cn("flex flex-col gap-1", fonts.textSize)}>
								{store.languages.map((lang, index) => (
									<div key={index} className="flex justify-between">
										<span className="font-medium">{lang.language}:</span>
										<span className="opacity-90">{lang.level}</span>
									</div>
								))}
							</div>
						</div>
					)}

					{store.interests?.length > 0 && (
						<div className="w-full">
							<h3
								style={{
									color: colors.sidebarSectionTitle,
									borderColor: `${colors.sidebarSectionTitle}50`,
								}}
								className={cn(
									"font-semibold border-b pb-1 mb-2 text-left",
									fonts.sidebarTitleSize,
									"normal-case"
								)}
							>
								{translations.interests}
							</h3>
							<p className={cn("opacity-90", fonts.textSize)}>
								{store.interests.join(" · ")}
							</p>
						</div>
					)}
				</aside>
				{/* --- Main Content (Right Column) --- */}
				<main
					className={cn(
						"w-[67%] min-h-[inherit] p-8 flex flex-col print:p-6",
						layout.sectionSpacing,
						layout.mainContentAlign
					)}
					style={{ color: colors.text }}
				>
					{store.summary &&
						store.summary !== "<p><br></p>" &&
						store.summary !== "<p></p>" && (
							<section id="template3-summary" className="w-full">
								<h2
									style={{
										color: colors.mainSectionTitle,
										borderColor: `${colors.mainSectionTitle}50`,
									}}
									className={cn(
										"font-semibold border-b-2 pb-1 mb-3 w-full",
										fonts.mainTitleSize,
										layout.mainTitleCase,
										layout.mainContentAlign
									)}
								>
									{translations.summary}
								</h2>
								<Description
									state={store.summary}
									color={colors.description}
									size={fonts.descriptionSize}
									className={cn("opacity-90", layout.mainContentAlign)}
								/>
							</section>
						)}

					{store.experience?.length > 0 && (
						<section id="template3-experience" className="w-full">
							<h2
								style={{
									color: colors.mainSectionTitle,
									borderColor: `${colors.mainSectionTitle}50`,
								}}
								className={cn(
									"font-semibold border-b-2 pb-1 mb-3 w-full",
									fonts.mainTitleSize,
									layout.mainTitleCase,
									layout.mainContentAlign
								)}
							>
								{translations.experience}
							</h2>
							<div className="flex flex-col gap-4">
								{store.experience.map((exp, index) => (
									<div
										key={index}
										className={cn("flex flex-col text-left w-full")}
									>
										<div className="flex items-baseline justify-between w-full flex-wrap">
											<h3
												style={{ color: colors.subHeading }}
												className={cn("font-medium", fonts.itemHeadingSize)}
											>
												{exp.jobTitle}
											</h3>
											<p
												style={{ color: colors.text }}
												className={cn(
													"text-xs opacity-80 flex-shrink-0 ml-2",
													fonts.textSize
												)}
											>
												{formatDate(exp.startDate, localeIso)} -{" "}
												{exp.endDate
													? formatDate(exp.endDate, localeIso)
													: translations.present}
											</p>
										</div>
										<h4
											style={{ color: colors.text }}
											className={cn(
												"font-normal opacity-90 mt-0.5",
												fonts.textSize
											)}
										>
											{exp.company}
											{exp.company && exp.city && ", "}
											{exp.city}
										</h4>
										<Description
											state={exp.description}
											color={colors.description}
											size={fonts.descriptionSize}
											className="opacity-90"
										/>
									</div>
								))}
							</div>
						</section>
					)}

					{store.education?.length > 0 && (
						<section id="template3-education" className="w-full">
							<h2
								style={{
									color: colors.mainSectionTitle,
									borderColor: `${colors.mainSectionTitle}50`,
								}}
								className={cn(
									"font-semibold border-b-2 pb-1 mb-3 w-full",
									fonts.mainTitleSize,
									layout.mainTitleCase,
									layout.mainContentAlign
								)}
							>
								{translations.education}
							</h2>
							<div className="flex flex-col gap-4">
								{store.education.map((edu, index) => (
									<div
										key={index}
										className={cn("flex flex-col text-left w-full")}
									>
										<div className="flex items-baseline justify-between w-full flex-wrap">
											<h3
												style={{ color: colors.subHeading }}
												className={cn("font-medium", fonts.itemHeadingSize)}
											>
												{edu.degree}{" "}
												{edu.fieldOfStudy && `- ${edu.fieldOfStudy}`}
											</h3>
											<p
												style={{ color: colors.text }}
												className={cn(
													"text-xs opacity-80 flex-shrink-0 ml-2",
													fonts.textSize
												)}
											>
												{formatDate(edu.startDate, localeIso)} -{" "}
												{edu.endDate
													? formatDate(edu.endDate, localeIso)
													: translations.present}
											</p>
										</div>
										<h4
											style={{ color: colors.text }}
											className={cn(
												"font-normal opacity-90 mt-0.5",
												fonts.textSize
											)}
										>
											{edu.institution}
											{edu.institution && edu.city && ", "}
											{edu.city}
										</h4>
										<Description
											state={edu.description}
											color={colors.description}
											size={fonts.descriptionSize}
											className="opacity-90"
										/>
									</div>
								))}
							</div>
						</section>
					)}

					{store.projects?.length > 0 && (
						<section id="template3-projects" className="w-full">
							<h2
								style={{
									color: colors.mainSectionTitle,
									borderColor: `${colors.mainSectionTitle}50`,
								}}
								className={cn(
									"font-semibold border-b-2 pb-1 mb-3 w-full",
									fonts.mainTitleSize,
									layout.mainTitleCase,
									layout.mainContentAlign
								)}
							>
								{translations.projects}
							</h2>
							<div className="flex flex-col gap-4">
								{store.projects.map((project, index) => (
									<div
										key={index}
										className={cn("flex flex-col text-left w-full")}
									>
										<div className="flex items-center justify-between w-full flex-wrap gap-x-2">
											<h3
												style={{ color: colors.subHeading }}
												className={cn("font-medium", fonts.itemHeadingSize)}
											>
												{project.title}
											</h3>
											<div
												className={cn(
													"flex items-center gap-2 flex-shrink-0",
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
														className="inline-flex items-center gap-1 hover:underline"
														style={{ color: colors.link }}
													>
														{layout.projectLinkType === "icon" ? (
															<MdArrowOutward size={16} />
														) : (
															translations.projectsLive
														)}
													</a>
												)}
												{project.liveLink && project.githubLink && (
													<span className="text-gray-400 text-xs">|</span>
												)}
												{project.githubLink && (
													// Using FaGithub here for consistency with other templates if preferred,
													// or SiGithub if that was the original intent from Template3's initial LOCAL_SOCIALS
													<a
														href={
															String(project.githubLink).startsWith("http")
																? project.githubLink
																: `https://${project.githubLink}`
														}
														target="_blank"
														rel="noopener noreferrer"
														className="inline-flex items-center gap-1 hover:underline"
														style={{ color: colors.link }}
													>
														{layout.projectLinkType === "icon" ? (
															<FaGithub size={14} />
														) : (
															translations.projectsGithub
														)}
													</a>
												)}
											</div>
										</div>
										{project.technologies?.length > 0 && (
											<p
												style={{ color: colors.text }}
												className={cn(
													"text-xs mt-1 opacity-80",
													fonts.textSize
												)}
											>
												<span className="font-medium opacity-100">
													{" "}
													{translations.projectsTech}:{" "}
												</span>
												{project.technologies.join(", ")}
											</p>
										)}
										<Description
											state={project.description}
											color={colors.description}
											size={fonts.descriptionSize}
											className="opacity-90"
										/>
									</div>
								))}
							</div>
						</section>
					)}

					{store.certificates?.length > 0 && (
						<section id="template3-certificates" className="w-full">
							<h2
								style={{
									color: colors.mainSectionTitle,
									borderColor: `${colors.mainSectionTitle}50`,
								}}
								className={cn(
									"font-semibold border-b-2 pb-1 mb-3 w-full",
									fonts.mainTitleSize,
									layout.mainTitleCase,
									layout.mainContentAlign
								)}
							>
								{translations.certificates}
							</h2>
							<div className="flex flex-col gap-4">
								{store.certificates.map((cert, index) => (
									<div
										key={index}
										className={cn("flex flex-col text-left w-full")}
									>
										<div className="flex items-baseline justify-between w-full flex-wrap">
											<h3
												style={{ color: colors.subHeading }}
												className={cn("font-medium", fonts.itemHeadingSize)}
											>
												{cert.title}
											</h3>
											<p
												style={{ color: colors.text }}
												className={cn(
													"text-xs opacity-80 flex-shrink-0 ml-2",
													fonts.textSize
												)}
											>
												{formatDate(cert.date, localeIso)}
											</p>
										</div>
										{cert.institution && (
											<h4
												style={{ color: colors.text }}
												className={cn(
													"font-normal italic opacity-90 mt-0.5",
													fonts.textSize
												)}
											>
												{cert.institution}
											</h4>
										)}
										<Description
											state={cert.description}
											color={colors.description}
											size={fonts.descriptionSize}
											className="opacity-90"
										/>
									</div>
								))}
							</div>
						</section>
					)}

					{store.references?.length > 0 && (
						<section id="template3-references" className="w-full">
							<h2
								style={{
									color: colors.mainSectionTitle,
									borderColor: `${colors.mainSectionTitle}50`,
								}}
								className={cn(
									"font-semibold border-b-2 pb-1 mb-3 w-full",
									fonts.mainTitleSize,
									layout.mainTitleCase,
									layout.mainContentAlign
								)}
							>
								{translations.references}
							</h2>
							<div className="flex flex-col gap-4">
								{store.references.map((ref, index) => (
									<div
										key={index}
										className={cn("flex flex-col text-left w-full")}
									>
										<h3
											style={{ color: colors.subHeading }}
											className={cn("font-medium", fonts.itemHeadingSize)}
										>
											{ref.name} {ref.company && `- ${ref.company}`}
										</h3>
										<div
											className={cn(
												"flex items-center gap-x-3 gap-y-0.5 flex-wrap mt-1",
												fonts.linkSize
											)}
										>
											{ref.email && (
												<a
													href={`mailto:${ref.email}`}
													target="_blank"
													rel="noopener noreferrer"
													className="hover:underline"
													style={{ color: colors.link }}
												>
													{ref.email}
												</a>
											)}
											{ref.email && ref.phone && (
												<span className="text-gray-400">|</span>
											)}
											{ref.phone && (
												<a
													href={`tel:${ref.phone}`}
													target="_blank"
													rel="noopener noreferrer"
													className="hover:underline"
													style={{ color: colors.link }}
												>
													{ref.phone}
												</a>
											)}
										</div>
										<Description
											state={ref.description}
											color={colors.description}
											size={fonts.descriptionSize}
											className="opacity-90"
										/>
									</div>
								))}
							</div>
							<p
								className={cn(
									"text-xs italic mt-3 w-full",
									fonts.textSize,
									layout.mainContentAlign === "text-right"
										? "text-right"
										: layout.mainContentAlign === "text-center"
										? "text-center"
										: "text-left"
								)}
								style={{ color: colors.description, opacity: 0.8 }}
							>
								*{translations.referencesAvailable}
							</p>
						</section>
					)}
				</main>
			</div>
		</div>
	);
};

export default Template3;
