// Template7.jsx
import React from "react";
import {
	SiXing,
	SiMedium,
	SiFigma,
	// SiGithub and SiLinkedin are not directly imported here as Fa versions are in the map
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
import {
	MdEmail,
	MdPhone,
	MdLocationOn,
	MdLink,
	MdWorkOutline,
	MdSchool,
	MdOutlineStarOutline,
	MdOutlineTranslate,
	MdOutlineInterests,
	MdOutlineDescription,
	MdOutlineVerifiedUser,
	MdOutlineGroups,
	MdOutlineBuild,
} from "react-icons/md";
import useStore from "../../store/store.jsx";

// --- Local Helper: cn (Conditional ClassNames) ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Local Helper: formatDate ---
const formatDate = (
	dateString,
	locale, // locale can be undefined
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
	"'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";

// Hardcoded translations
const translations = {
	present: "Present",
	summary: "Profile",
	experience: "Experience",
	education: "Education",
	skills: "Skills",
	projects: "Projects",
	projectsLive: "Live",
	projectsGithub: "GitHub",
	projectsTech: "Technologies",
	languages: "Languages",
	interests: "Interests",
	certificates: "Certificates",
	references: "References",
};

// MODIFIED: SOCIALS_MAP for icon mapping, updated with your list
const LOCAL_SOCIALS_MAP_T7 = {
	linkedin: {
		name: "LinkedIn",
		logo: <FaLinkedin />,
		className: "inline mr-1 text-sm flex-shrink-0",
	},
	github: {
		name: "GitHub",
		logo: <FaGithub />,
		className: "inline mr-1 text-sm flex-shrink-0",
	},
	twitter: {
		name: "Twitter",
		logo: <FaTwitter />,
		className: "inline mr-1 text-sm flex-shrink-0",
	},
	facebook: {
		name: "Facebook",
		logo: <FaFacebook />,
		className: "inline mr-1 text-sm flex-shrink-0",
	},
	instagram: {
		name: "Instagram",
		logo: <FaInstagram />,
		className: "inline mr-1 text-sm flex-shrink-0",
	},
	website: {
		name: "Website",
		logo: <FaGlobe />,
		className: "inline mr-1 text-sm flex-shrink-0",
	},
	xing: {
		name: "Xing",
		logo: <SiXing />,
		className: "inline mr-1 text-sm flex-shrink-0",
	},
	medium: {
		name: "Medium",
		logo: <SiMedium />,
		className: "inline mr-1 text-sm flex-shrink-0",
	},
	figma: {
		name: "Figma",
		logo: <SiFigma />,
		className: "inline mr-1 text-sm flex-shrink-0",
	},
	dribbble: {
		name: "Dribbble",
		logo: <FaDribbble />,
		className: "inline mr-1 text-sm flex-shrink-0",
	},
};

// Default template settings for Template7
const defaultTemplateSettings = {
	name: "Modern Clean CV",
	templateNumber: 7,
	pageBgColor: "#F0F4F8", // MODIFIED: This will be for the inner content area
	textColor: "#4B5563",
	headingColor: "#111827",
	subHeadingColor: "#1F2937",
	itemTitleColor: "#374151",
	accentColor: "#4F46E5",
	linkColor: "#4338CA",
	borderColor: "#D1D5DB",
	descriptionColor: "#6B7280",
	headerContactIconsColor: "#6B7280",
	h1Color: "",
	h2Color: "",
	h3Color: "",
	// textColor (for inner content) is defined above
	// descriptionColor is defined above
	hyperLinkColor: "",
	imageSize: "80",
	projectLink: "text",
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
				"prose-p:my-1 prose-ul:list-disc prose-ul:pl-4 prose-ul:my-1.5 prose-li:my-0.5",
				size,
				className
			)}
		/>
	);
};

// --- Reusable Section Component ---
const Section = ({
	title,
	icon,
	children,
	colors,
	fonts,
	layout,
	className = "",
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

	if (
		isEmpty &&
		(!title || (Array.isArray(children) && children.length === 0))
	) {
		return null;
	}

	return (
		<section className={cn("mb-5 print:mb-4", className)}>
			{title && (
				<div className="flex items-center mb-2 print:mb-1.5">
					{icon &&
						React.cloneElement(icon, {
							className: "text-lg mr-2 flex-shrink-0",
							style: { color: colors.accent },
						})}
					<h2
						style={{ color: colors.subHeading, borderColor: colors.accent }}
						className={cn(
							fonts.sectionTitleSize,
							layout.titleCase,
							"font-semibold w-full pb-1 border-b"
						)}
					>
						{title}
					</h2>
				</div>
			)}
			<div className={cn(fonts.textSize)} style={{ color: colors.text }}>
				{children}
			</div>
		</section>
	);
};

// --- Main Template Component ---
const Template7 = ({}) => {
	const { store } = useStore();
	const template = defaultTemplateSettings;
	// MODIFIED: localeIso removed

	const colors = {
		pageShellBg: "#FFFFFF", // For the A4 page effect
		pageContentBg: template.pageBgColor, // For the inner content area of Template7
		text: template.textColor || template.textColor,
		heading: template.h1Color || template.headingColor,
		subHeading: template.h2Color || template.subHeadingColor,
		itemTitle: template.h3Color || template.itemTitleColor,
		accent: template.accentColor,
		link: template.hyperLinkColor || template.linkColor,
		border: template.borderColor,
		description: template.descriptionColor || template.descriptionColor,
		headerContactIcons: template.headerContactIconsColor,
	};

	const fonts = {
		family: template.fontFamily || DEFAULT_FONT_FAMILY,
		nameSize: handleFindStyle(
			template.h1FontSize,
			"text-2xl",
			"text-4xl",
			"text-3xl font-bold"
		),
		jobTitleSize: handleFindStyle(
			template.h1FontSize,
			"text-lg",
			"text-xl",
			"text-xl font-normal"
		),
		sectionTitleSize: handleFindStyle(
			template.h2FontSize,
			"text-base",
			"text-lg",
			"text-base"
		),
		itemTitleSize: handleFindStyle(
			template.h3FontSize,
			"text-sm",
			"text-base",
			"text-sm font-medium"
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
		imageSize: parseInt(template.imageSize, 10) || 80,
		projectLinkType: template.projectLink || "text",
		mainGap: handleFindStyle(
			template.spaceBetween,
			"gap-x-4 gap-y-0",
			"gap-x-8 gap-y-0",
			"gap-x-6 gap-y-0"
		),
		titleCase: handleFindStyle(
			template.titleCase,
			"lowercase",
			"normal-case",
			"uppercase"
		),
	};

	const sectionProps = { colors, fonts, layout };

	return (
		// MODIFIED: Outermost div for A4 page shell
		<div
			style={{ fontFamily: fonts.family, backgroundColor: colors.pageShellBg }} // Base font family, A4 page is white
			className="w-[210mm] min-h-[297mm] bg-white mx-auto my-0 shadow-lg rounded-sm overflow-x-hidden overflow-y-auto print:shadow-none print:my-0 print:bg-transparent"
		>
			{/* Inner container for Template7's specific background and padding */}
			<div
				style={{ backgroundColor: colors.pageContentBg, color: colors.text }}
				className="p-6 sm:p-8 md:p-10 print:p-6 h-full" // Template7 padding and content background
			>
				<header
					className="flex items-center mb-6 print:mb-4 pb-4 border-b"
					style={{ borderColor: colors.border }}
				>
					{store.image && layout.imageSize > 0 && (
						<img
							src={store.image}
							alt="Profile"
							className="rounded-full flex-shrink-0 mr-4 sm:mr-6 print:mr-4"
							style={{
								width: `${layout.imageSize}px`,
								height: `${layout.imageSize}px`,
								objectFit: "cover",
							}}
						/>
					)}
					<div className="flex-grow">
						<h1
							style={{ color: colors.heading }}
							className={cn(fonts.nameSize)}
						>
							{store.personal.name} {store.personal.surname}
						</h1>
						{store.personal.jobTitle && (
							<p
								style={{ color: colors.itemTitle }}
								className={cn(fonts.jobTitleSize, "mt-0.5 opacity-90")}
							>
								{store.personal.jobTitle}
							</p>
						)}
						<div
							style={{ color: colors.text }}
							className={cn(
								"mt-2 print:mt-1.5 flex flex-wrap items-start gap-x-3 sm:gap-x-4 gap-y-1.5",
								fonts.textSize
							)} // items-start for multiline
						>
							{(store.personal.city || store.personal.country) && (
								<span className="inline-flex items-center">
									<MdLocationOn
										className="mr-1.5 text-sm"
										style={{ color: colors.headerContactIcons }}
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
									style={{ color: colors.link }}
								>
									<MdEmail
										className="mr-1.5 text-sm"
										style={{ color: colors.headerContactIcons }}
									/>
									{store.personal.email}
								</a>
							)}
							{store.personal.phone && (
								<a
									href={`tel:${store.personal.phone}`}
									className="inline-flex items-center hover:underline"
									style={{ color: colors.link }}
								>
									<MdPhone
										className="mr-1.5 text-sm"
										style={{ color: colors.headerContactIcons }}
									/>
									{store.personal.phone}
								</a>
							)}
							{/* MODIFIED: Social link rendering */}
							{Object.entries(store.socialLinks || {})
								.filter(
									([key, value]) =>
										value && LOCAL_SOCIALS_MAP_T7[key.toLowerCase()]
								)
								.map(([key, value]) => {
									const socialEntry = LOCAL_SOCIALS_MAP_T7[key.toLowerCase()];
									const url = String(value).startsWith("http")
										? String(value)
										: `https://${String(value)}`;
									return (
										<a
											key={key}
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-start gap-1 hover:underline" // items-start for multiline alignment
											style={{ color: colors.link }}
											title={url}
										>
											{React.cloneElement(socialEntry.logo, {
												className: socialEntry.className, // Use className from map
												style: { color: colors.headerContactIcons }, // Icon color
											})}
											<span className="min-w-0 break-all">{url}</span>{" "}
											{/* Full URL with wrapping */}
										</a>
									);
								})}
						</div>
					</div>
				</header>

				<div
					className={cn(
						"grid grid-cols-1 md:grid-cols-5 print:grid-cols-5",
						layout.mainGap
					)}
				>
					<div className="md:col-span-3 print:col-span-3">
						{store.summary && store.summary !== "<p><br></p>" && (
							<Section
								title={translations.summary}
								icon={<MdOutlineDescription />}
								{...sectionProps}
							>
								<Description
									state={store.summary}
									color={colors.description}
									size={fonts.descriptionSize}
								/>
							</Section>
						)}

						{store.experience?.length > 0 && (
							<Section
								title={translations.experience}
								icon={<MdWorkOutline />}
								{...sectionProps}
							>
								<div className="space-y-3 print:space-y-2.5">
									{store.experience.map((exp, index) => (
										<div key={index} className="print:break-inside-avoid">
											<div className="flex justify-between items-baseline flex-wrap mb-0.5">
												<h3
													style={{ color: colors.itemTitle }}
													className={cn(fonts.itemTitleSize)}
												>
													{exp.jobTitle}
												</h3>
												<p
													style={{ color: colors.description }}
													className={cn(
														"text-xs flex-shrink-0 ml-2",
														fonts.textSize
													)}
												>
													{formatDate(exp.startDate, undefined)} -{" "}
													{/* MODIFIED: locale removed */}
													{exp.endDate
														? formatDate(exp.endDate, undefined)
														: translations.present}{" "}
													{/* MODIFIED: locale removed */}
												</p>
											</div>
											<p
												style={{ color: colors.text }}
												className={cn(
													"text-sm font-normal mb-0.5",
													fonts.textSize,
													"opacity-90"
												)}
											>
												{exp.company}
												{exp.company && exp.city && ", "}
												{exp.city}
											</p>
											<Description
												state={exp.description}
												color={colors.description}
												size={fonts.descriptionSize}
											/>
										</div>
									))}
								</div>
							</Section>
						)}

						{store.projects?.length > 0 && (
							<Section
								title={translations.projects}
								icon={<MdOutlineBuild />}
								{...sectionProps}
							>
								<div className="space-y-3 print:space-y-2.5">
									{store.projects.map((project, index) => (
										<div key={index} className="print:break-inside-avoid">
											<div className="flex justify-between items-start flex-wrap mb-0.5">
												<h3
													style={{ color: colors.itemTitle }}
													className={cn(fonts.itemTitleSize)}
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
															className="hover:underline inline-flex items-center gap-1"
															style={{ color: colors.link }}
														>
															<MdLink className="text-xs" />{" "}
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
															style={{ color: colors.link }}
														>
															<FaGithub className="text-xs" />{" "}
															{translations.projectsGithub}{" "}
															{/* Using FaGithub from import */}
														</a>
													)}
												</div>
											</div>
											{project.technologies?.length > 0 && (
												<p
													style={{ color: colors.description }}
													className={cn(
														"text-xs italic mb-0.5",
														fonts.textSize
													)}
												>
													{project.technologies.join(" · ")}
												</p>
											)}
											<Description
												state={project.description}
												color={colors.description}
												size={fonts.descriptionSize}
											/>
										</div>
									))}
								</div>
							</Section>
						)}
					</div>

					<div className="md:col-span-2 print:col-span-2">
						{store.education?.length > 0 && (
							<Section
								title={translations.education}
								icon={<MdSchool />}
								{...sectionProps}
							>
								<div className="space-y-3 print:space-y-2.5">
									{store.education.map((edu, index) => (
										<div key={index} className="print:break-inside-avoid">
											<div className="flex justify-between items-baseline flex-wrap mb-0.5">
												<h3
													style={{ color: colors.itemTitle }}
													className={cn(fonts.itemTitleSize)}
												>
													{edu.degree}
												</h3>
												<p
													style={{ color: colors.description }}
													className={cn(
														"text-xs flex-shrink-0 ml-2",
														fonts.textSize
													)}
												>
													{formatDate(edu.startDate, undefined)} -{" "}
													{/* MODIFIED: locale removed */}
													{edu.endDate
														? formatDate(edu.endDate, undefined)
														: translations.present}{" "}
													{/* MODIFIED: locale removed */}
												</p>
											</div>
											{edu.fieldOfStudy && (
												<p
													style={{ color: colors.text }}
													className={cn(
														"text-sm font-normal mb-0.5",
														fonts.textSize,
														"opacity-70"
													)}
												>
													{edu.fieldOfStudy}
												</p>
											)}
											<p
												style={{ color: colors.text }}
												className={cn(
													"text-sm font-normal mb-0.5",
													fonts.textSize,
													"opacity-90"
												)}
											>
												{edu.institution}
												{edu.institution && edu.city && ", "}
												{edu.city}
											</p>
											<Description
												state={edu.description}
												color={colors.description}
												size={fonts.descriptionSize}
											/>
										</div>
									))}
								</div>
							</Section>
						)}

						{store.skills?.length > 0 && (
							<Section
								title={translations.skills}
								icon={<MdOutlineStarOutline />}
								{...sectionProps}
							>
								<div className="flex flex-wrap gap-1.5 print:gap-1">
									{store.skills.map((skill, index) => (
										<span
											key={index}
											className={cn(
												"px-2 py-0.5 rounded-sm text-xs",
												fonts.textSize
											)}
											style={{
												backgroundColor: `${colors.accent}1A`,
												color: colors.accent,
											}}
										>
											{skill}
										</span>
									))}
								</div>
							</Section>
						)}

						{store.languages?.length > 0 && (
							<Section
								title={translations.languages}
								icon={<MdOutlineTranslate />}
								{...sectionProps}
							>
								<ul className="list-none p-0 space-y-1 print:space-y-0.5">
									{store.languages.map((lang, index) => (
										<li key={index} className="flex justify-between">
											<span
												style={{ color: colors.text }}
												className="font-medium"
											>
												{lang.language}:
											</span>
											<span style={{ color: colors.description }}>
												{lang.level}
											</span>
										</li>
									))}
								</ul>
							</Section>
						)}

						{store.certificates?.length > 0 && (
							<Section
								title={translations.certificates}
								icon={<MdOutlineVerifiedUser />}
								{...sectionProps}
							>
								<div className="space-y-2 print:space-y-1.5">
									{store.certificates.map((cert, index) => (
										<div key={index} className="print:break-inside-avoid">
											<div className="flex justify-between items-baseline flex-wrap mb-0.5">
												<h3
													style={{ color: colors.itemTitle }}
													className={cn(fonts.itemTitleSize, "pr-1")}
												>
													{cert.title}
												</h3>
												<p
													style={{ color: colors.description }}
													className={cn(
														"text-xs ml-1 flex-shrink-0",
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
														"text-xs italic opacity-80",
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
											/>
										</div>
									))}
								</div>
							</Section>
						)}

						{store.interests?.length > 0 && (
							<Section
								title={translations.interests}
								icon={<MdOutlineInterests />}
								{...sectionProps}
							>
								<p
									style={{ color: colors.description }}
									className={cn(fonts.textSize)}
								>
									{store.interests.join(" · ")}
								</p>
							</Section>
						)}

						{store.references?.length > 0 && (
							<Section
								title={translations.references}
								icon={<MdOutlineGroups />}
								{...sectionProps}
							>
								<div className="space-y-2 print:space-y-1.5">
									{store.references.map((ref, index) => (
										<div key={index} className="print:break-inside-avoid">
											<h3
												style={{ color: colors.itemTitle }}
												className={cn(fonts.itemTitleSize)}
											>
												{ref.name} {ref.company && `- ${ref.company}`}
											</h3>
											<div
												className={cn(
													"flex items-center gap-x-2 gap-y-0.5 flex-wrap mt-0.5",
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
											/>
										</div>
									))}
								</div>
							</Section>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Template7;
