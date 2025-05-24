// Template8.jsx
import React from "react";
import {
	SiXing,
	SiMedium,
	SiFigma,
	// SiGithub, SiLinkedin removed as Fa versions are in map
} from "react-icons/si";
import {
	FaLinkedin,
	FaGithub,
	FaTwitter,
	FaFacebook,
	FaInstagram,
	FaGlobe,
	FaDribbble, // Using FaDribbble as FaDribbbleSquare is not standard
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn, MdLink } from "react-icons/md";
import useStore from "../../store/store";

// --- Local Helper: cn (Conditional ClassNames) ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Local Helper: formatDate ---
const formatDate = (
	dateString,
	locale, // Can be undefined
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
const DEFAULT_FONT_FAMILY =
	"'Lato', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";

// Hardcoded translations
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
	projectsLive: "Demo",
	projectsGithub: "Code",
	projectsTech: "Tech Stack",
};

// MODIFIED: SOCIALS_MAP for icon mapping - updated with your list
const LOCAL_SOCIALS_MAP_T8 = {
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
	},
};

// Default template settings for Template8
const defaultTemplateSettings = {
	name: "Minimalist Timeline CV",
	templateNumber: 8,
	textColor: "#333D4B",
	headingColor: "#1F2937",
	subHeadingColor: "#333D4B",
	accentColor: "#60A5FA",
	borderColor: "#D1D5DB",
	backgroundColor: "#FFFFFF", // This will be for the inner content area
	descriptionColor: "#4B5563",
	h1Color: "",
	h2Color: "",
	h3Color: "",
	hyperLinkColor: "",
	imageSize: "0",
	projectLink: "icon",
	spaceBetween: "normal",
	align: "left",
	titleCase: "uppercase",
	fontFamily: "",
	h1FontSize: "large",
	h2FontSize: "normal",
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
				"prose prose-sm max-w-none mt-1",
				"prose-p:my-0.5 prose-ul:list-disc prose-ul:pl-4 prose-ul:my-1 prose-li:my-0.25",
				size,
				className
			)}
		/>
	);
};

// --- Reusable Section Component ---
const Section = ({
	title,
	children,
	colors,
	fonts,
	layout,
	className = "",
	noBorder = false,
}) => {
	const isEmpty = !React.Children.toArray(children).some((child) => {
		if (
			React.isValidElement(child) &&
			child.props &&
			typeof child.props.state === "string"
		) {
			return (
				child.props.state !== "<p><br></p>" && child.props.state !== "<p></p>"
			);
		}
		if (Array.isArray(child) && child.length === 0) return false;
		if (typeof child === "string" && child.trim() === "") return false;
		return true;
	});
	if (isEmpty && (!title || (Array.isArray(children) && children.length === 0)))
		return null;

	return (
		<section className={cn("mb-4 print:mb-3", className)}>
			{title && (
				<h2
					style={{ color: colors.subHeading, borderColor: colors.borderColor }}
					className={cn(
						fonts.sectionTitleSize,
						layout.titleCase,
						"font-semibold tracking-wider pb-1 mb-2 print:mb-1.5",
						!noBorder && "border-b"
					)}
				>
					{title}
				</h2>
			)}
			<div className={cn(fonts.textSize)} style={{ color: colors.text }}>
				{children}
			</div>
		</section>
	);
};

// --- Timeline Item Component ---
const TimelineItem = ({
	date,
	title,
	subtitle,
	description,
	colors,
	fonts,
	isLast,
}) => (
	<div className="flex">
		<div className="w-24 md:w-28 flex-shrink-0 pr-3 text-right">
			<p
				className={cn("text-xs", fonts.textSize)}
				style={{ color: colors.description }}
			>
				{date}
			</p>
		</div>
		{/* MODIFIED: Timeline Gutter - Dot removed, only line visible */}
		<div className="relative w-6 md:w-8 flex-shrink-0 flex flex-col items-center">
			{/* Dot is removed, line starts from top implicitly or slightly offset if needed */}
			{!isLast && (
				<div
					className="absolute top-1 bottom-0 w-px" // Line starts near the top
					style={{ backgroundColor: colors.borderColor }}
				></div>
			)}
		</div>
		<div className={cn("flex-grow pb-3 print:pb-2", !isLast && "mb-1")}>
			<h3
				style={{ color: colors.subHeading }}
				className={cn(fonts.itemTitleSize, "font-medium")}
			>
				{title}
			</h3>
			{subtitle && (
				<p
					style={{ color: colors.text }}
					className={cn("text-sm mt-0.5 opacity-90", fonts.textSize)}
				>
					{subtitle}
				</p>
			)}
			<Description
				state={description}
				color={colors.description}
				size={fonts.descriptionSize}
				className="mt-0.5"
			/>
		</div>
	</div>
);

// --- Main Template Component ---
const Template8 = ({}) => {
	const { store } = useStore();
	const template = defaultTemplateSettings;
	// MODIFIED: localeIso removed

	const colors = {
		pageShellBg: "#FFFFFF", // A4 page is white
		contentBg: template.backgroundColor, // For the inner content area of Template8
		text: template.textColor,
		heading: template.headingColor,
		subHeading: template.subHeadingColor,
		accent: template.accentColor,
		borderColor: template.borderColor,
		description: template.descriptionColor,
		link: template.hyperLinkColor || template.accentColor,
	};

	const fonts = {
		family: template.fontFamily || DEFAULT_FONT_FAMILY,
		nameSize: handleFindStyle(
			template.h1FontSize,
			"text-2xl",
			"text-4xl",
			"text-3xl font-semibold tracking-tight"
		),
		jobTitleSize: handleFindStyle(
			template.h1FontSize,
			"text-lg",
			"text-xl",
			"text-lg font-normal tracking-wide opacity-80"
		),
		sectionTitleSize: handleFindStyle(
			template.h2FontSize,
			"text-sm",
			"text-base",
			"text-sm"
		),
		itemTitleSize: handleFindStyle(
			template.h3FontSize,
			"text-base",
			"text-lg",
			"text-base"
		),
		textSize: handleFindStyle(
			template.textFontSize,
			"text-xs",
			"text-sm",
			"text-xs"
		),
		descriptionSize: handleFindStyle(
			template.descriptionFontSize,
			"text-xs",
			"text-sm",
			"text-xs"
		),
		linkSize: handleFindStyle(
			template.hyperLinkFontSize,
			"text-xs",
			"text-sm",
			"text-xs"
		),
	};

	const layout = {
		imageSize: parseInt(template.imageSize, 10) || 0,
		projectLinkType: template.projectLink || "icon",
		titleCase: handleFindStyle(
			template.titleCase,
			"lowercase",
			"normal-case",
			"uppercase"
		),
	};

	const sectionProps = { colors, fonts, layout };
	const timelineItemProps = { colors, fonts };

	return (
		// MODIFIED: Outermost div for A4 page consistency
		<div
			style={{ fontFamily: fonts.family, backgroundColor: colors.pageShellBg }}
			className="w-[210mm] min-h-[297mm] bg-white mx-auto my-0 shadow-lg rounded-sm overflow-x-hidden overflow-y-auto print:shadow-none print:my-0 print:bg-transparent"
		>
			{/* Inner container for Template8's specific background and padding */}
			<div
				style={{ backgroundColor: colors.contentBg, color: colors.text }}
				className="p-8 sm:p-10 md:p-12 print:p-8 h-full"
			>
				<header className="text-center mb-6 print:mb-5">
					<h1 style={{ color: colors.heading }} className={cn(fonts.nameSize)}>
						{store.personal.name} {store.personal.surname}
					</h1>
					{store.personal.jobTitle && (
						<p
							style={{ color: colors.subHeading }}
							className={cn(fonts.jobTitleSize, "mt-1")}
						>
							{store.personal.jobTitle}
						</p>
					)}
					<div
						style={{ color: colors.text }}
						className={cn(
							"mt-2 print:mt-1.5 flex flex-wrap justify-center items-start gap-x-3 gap-y-1.5",
							fonts.textSize
						)} // items-start for multiline
					>
						{(store.personal.city || store.personal.country) && (
							<span className="inline-flex items-center">
								<MdLocationOn
									className="mr-1 text-sm flex-shrink-0"
									style={{ color: colors.accent }}
								/>
								{store.personal.city}
								{store.personal.city && store.personal.country && ", "}
								{store.personal.country}
							</span>
						)}
						{store.personal.email && (
							<>
								{(store.personal.city || store.personal.country) && (
									<span className="hidden sm:inline text-gray-400">•</span>
								)}
								<a
									href={`mailto:${store.personal.email}`}
									className="inline-flex items-center hover:underline"
									style={{ color: colors.link }}
								>
									<MdEmail
										className="mr-1 text-sm flex-shrink-0"
										style={{ color: colors.accent }}
									/>
									{store.personal.email}
								</a>
							</>
						)}
						{store.personal.phone && (
							<>
								{(store.personal.city ||
									store.personal.country ||
									store.personal.email) && (
									<span className="hidden sm:inline text-gray-400">•</span>
								)}
								<a
									href={`tel:${store.personal.phone}`}
									className="inline-flex items-center hover:underline"
									style={{ color: colors.link }}
								>
									<MdPhone
										className="mr-1 text-sm flex-shrink-0"
										style={{ color: colors.accent }}
									/>
									{store.personal.phone}
								</a>
							</>
						)}
						{/* MODIFIED: Social Links - Full URL with wrapping */}
						{Object.entries(store.socialLinks || {})
							.filter(
								([key, value]) =>
									value && LOCAL_SOCIALS_MAP_T8[key.toLowerCase()]
							)
							.map(([key, value]) => {
								const socialEntry = LOCAL_SOCIALS_MAP_T8[key.toLowerCase()];
								const url = String(value).startsWith("http")
									? String(value)
									: `https://${String(value)}`;
								return (
									<React.Fragment key={key}>
										<span className="hidden sm:inline text-gray-400">•</span>
										<a
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-start gap-1 hover:opacity-75" // items-start for multiline
											style={{ color: colors.link }}
											title={socialEntry.name}
										>
											{React.cloneElement(socialEntry.logo, {
												// Use className from map for consistent icon styling
												className: socialEntry.className,
												style: { color: colors.accent },
											})}
											<span className="min-w-0 break-all">{url}</span>{" "}
											{/* Full URL, wraps */}
										</a>
									</React.Fragment>
								);
							})}
					</div>
				</header>

				{store.summary && store.summary !== "<p><br></p>" && (
					<Section
						title={translations.summary}
						{...sectionProps}
						noBorder={true}
						className="mb-5 text-center"
					>
						<Description
							state={store.summary}
							color={colors.description}
							size={fonts.descriptionSize}
							className="mx-auto max-w-xl"
						/>
					</Section>
				)}

				{store.experience?.length > 0 && (
					<Section title={translations.experience} {...sectionProps}>
						<div className="mt-1">
							{store.experience.map((exp, index) => (
								<TimelineItem
									key={index}
									date={`${formatDate(exp.startDate, undefined)} - ${
										exp.endDate
											? formatDate(exp.endDate, undefined)
											: translations.present
									}`}
									title={exp.jobTitle}
									subtitle={`${exp.company}${exp.city ? `, ${exp.city}` : ""}`}
									description={exp.description}
									isLast={index === store.experience.length - 1}
									{...timelineItemProps}
								/>
							))}
						</div>
					</Section>
				)}

				{store.education?.length > 0 && (
					<Section title={translations.education} {...sectionProps}>
						<div className="mt-1">
							{store.education.map((edu, index) => (
								<TimelineItem
									key={index}
									date={`${formatDate(edu.startDate, undefined)} - ${
										edu.endDate
											? formatDate(edu.endDate, undefined)
											: translations.present
									}`}
									title={`${edu.degree}${
										edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ""
									}`}
									subtitle={`${edu.institution}${
										edu.city ? `, ${edu.city}` : ""
									}`}
									description={edu.description}
									isLast={index === store.education.length - 1}
									{...timelineItemProps}
								/>
							))}
						</div>
					</Section>
				)}

				{store.skills?.length > 0 && (
					<Section title={translations.skills} {...sectionProps}>
						<p
							style={{ color: colors.text }}
							className={cn(fonts.textSize, "leading-relaxed")}
						>
							{Array.isArray(store.skills)
								? store.skills.join("  •  ")
								: store.skills}
						</p>
					</Section>
				)}

				{store.projects?.length > 0 && (
					<Section title={translations.projects} {...sectionProps}>
						<div className="space-y-2.5 print:space-y-2">
							{store.projects.map((project, index) => (
								<div key={index} className="print:break-inside-avoid">
									<div className="flex justify-between items-start flex-wrap mb-0.5">
										<h3
											style={{ color: colors.subHeading }}
											className={cn(fonts.itemTitleSize, "font-medium")}
										>
											{project.title}
										</h3>
										<div
											className={cn(
												"flex items-center gap-2 ml-2 flex-shrink-0",
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
													className="hover:underline"
													style={{ color: colors.link }}
													title={translations.projectsLive}
												>
													{layout.projectLinkType === "icon" ? (
														<MdLink size={14} />
													) : (
														translations.projectsLive
													)}
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
													className="hover:underline"
													style={{ color: colors.link }}
													title={translations.projectsGithub}
												>
													{layout.projectLinkType === "icon" ? (
														<FaGithub size={12} />
													) : (
														translations.projectsGithub
													)}{" "}
													{/* Using FaGithub from import */}
												</a>
											)}
										</div>
									</div>
									{project.technologies?.length > 0 && (
										<p
											style={{ color: colors.description }}
											className={cn("text-xs italic mb-0.5", fonts.textSize)}
										>
											{project.technologies.join(", ")}
										</p>
									)}
									<Description
										state={project.description}
										color={colors.description}
										size={fonts.descriptionSize}
										className="mt-0.5"
									/>
								</div>
							))}
						</div>
					</Section>
				)}

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 print:grid-cols-2 print:gap-x-4">
					{store.languages?.length > 0 && (
						<Section title={translations.languages} {...sectionProps}>
							<ul className="list-none p-0 space-y-0.5">
								{store.languages.map((lang, index) => (
									<li key={index} className="flex justify-between">
										<span className="font-medium">{lang.language}:</span>
										<span>{lang.level}</span>
									</li>
								))}
							</ul>
						</Section>
					)}

					{store.interests?.length > 0 && (
						<Section title={translations.interests} {...sectionProps}>
							<p
								style={{ color: colors.text }}
								className={cn(fonts.textSize, "leading-relaxed")}
							>
								{store.interests.join("  •  ")}
							</p>
						</Section>
					)}
				</div>

				{store.certificates?.length > 0 && (
					<Section title={translations.certificates} {...sectionProps}>
						<div className="space-y-2 print:space-y-1.5">
							{store.certificates.map((cert, index) => (
								<div key={index} className="print:break-inside-avoid">
									<div className="flex justify-between items-start flex-wrap mb-0.5">
										<h3
											style={{ color: colors.subHeading }}
											className={cn(fonts.itemTitleSize, "font-medium")}
										>
											{cert.title}
										</h3>
										<p
											style={{ color: colors.description }}
											className={cn(
												"text-xs ml-2 flex-shrink-0",
												fonts.textSize
											)}
										>
											{formatDate(cert.date, undefined)}{" "}
											{/* MODIFIED: locale removed */}
										</p>
									</div>
									{cert.institution && (
										<p
											style={{ color: colors.text }}
											className={cn(
												"text-sm italic opacity-90",
												fonts.textSize
											)}
										>
											{cert.institution}
										</p>
									)}
									<Description
										state={cert.description}
										color={colors.description}
										size={fonts.descriptionSize}
										className="mt-0.5"
									/>
								</div>
							))}
						</div>
					</Section>
				)}

				{store.references?.length > 0 && (
					<Section title={translations.references} {...sectionProps}>
						<div className="space-y-2 print:space-y-1.5">
							{store.references.map((ref, index) => (
								<div key={index} className="print:break-inside-avoid">
									<h3
										style={{ color: colors.subHeading }}
										className={cn(fonts.itemTitleSize, "font-medium")}
									>
										{ref.name} {ref.company && `- ${ref.company}`}
									</h3>
									<div
										className={cn(
											"flex items-center gap-x-3 gap-y-0.5 flex-wrap mt-0.5",
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
											<span style={{ color: colors.description }}>|</span>
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
										className="mt-0.5"
									/>
								</div>
							))}
						</div>
					</Section>
				)}
			</div>
		</div>
	);
};

export default Template8;
