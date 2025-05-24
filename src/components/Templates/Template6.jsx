// Template6.jsx
import React from "react";
import {
	SiXing,
	SiMedium,
	SiFigma,
	// SiGithub, SiLinkedin are no longer directly used as Fa versions are preferred
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
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import useStore from "../../store/store.jsx";

// --- Local Helper: cn (Conditional ClassNames) ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Local Helper: formatDate ---
const formatDate = (
	dateString,
	locale, // locale can be undefined to use system default
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
	"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";

// Hardcoded translations
const translations = {
	present: "Present",
	summary: "Summary",
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
	referencesAvailable: "References available upon request.",
};

// MODIFIED: SOCIALS_MAP for icon mapping - updated with your list
const LOCAL_SOCIALS_MAP_T6 = {
	linkedin: {
		name: "LinkedIn",
		logo: <FaLinkedin />,
		iconClassName: "mr-1.5 text-sm flex-shrink-0",
	},
	github: {
		name: "GitHub",
		logo: <FaGithub />,
		iconClassName: "mr-1.5 text-sm flex-shrink-0",
	},
	twitter: {
		name: "Twitter",
		logo: <FaTwitter />,
		iconClassName: "mr-1.5 text-sm flex-shrink-0",
	},
	facebook: {
		name: "Facebook",
		logo: <FaFacebook />,
		iconClassName: "mr-1.5 text-sm flex-shrink-0",
	},
	instagram: {
		name: "Instagram",
		logo: <FaInstagram />,
		iconClassName: "mr-1.5 text-sm flex-shrink-0",
	},
	website: {
		name: "Website",
		logo: <FaGlobe />,
		iconClassName: "mr-1.5 text-sm flex-shrink-0",
	},
	xing: {
		name: "Xing",
		logo: <SiXing />,
		iconClassName: "mr-1.5 text-sm flex-shrink-0",
	},
	medium: {
		name: "Medium",
		logo: <SiMedium />,
		iconClassName: "mr-1.5 text-sm flex-shrink-0",
	},
	figma: {
		name: "Figma",
		logo: <SiFigma />,
		iconClassName: "mr-1.5 text-sm flex-shrink-0",
	},
	dribbble: {
		name: "Dribbble",
		logo: <FaDribbble />,
		iconClassName: "mr-1.5 text-sm flex-shrink-0",
	},
};

// Default template settings for Template6 - "Classic Professional"
const defaultTemplateSettings = {
	name: "Classic Professional CV",
	templateNumber: 6,
	textColor: "#333333",
	headingColor: "#000000",
	subHeadingColor: "#222222",
	linkColor: "#0056b3",
	borderColor: "#cccccc",
	backgroundColor: "#FFFFFF",
	descriptionColor: "#555555",
	h1Color: "",
	h2Color: "",
	h3Color: "",
	hyperLinkColor: "",
	imageSize: "0",
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
				"prose-p:my-1 prose-ul:list-disc prose-ul:pl-5 prose-ul:my-1.5 prose-li:my-0.5",
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
	titleStyle,
	titleCase,
	borderColor,
	showBorder = true,
}) => {
	if (React.Children.count(children) === 0) {
		if (typeof children === "string" && children.trim() === "") return null;
		if (
			React.isValidElement(children) &&
			children.props.state &&
			(children.props.state === "<p><br></p>" ||
				children.props.state === "<p></p>")
		)
			return null;
		if (
			!title &&
			(React.Children.count(children) === 0 ||
				(React.isValidElement(children) &&
					(!children.props.state ||
						children.props.state === "<p><br></p>" ||
						children.props.state === "<p></p>")))
		)
			return null;
	}
	return (
		<section className="mb-4 print:mb-3">
			{title && (
				<h2
					style={{ color: titleStyle.color, borderColor: borderColor }}
					className={cn(
						"font-semibold pb-1",
						titleStyle.size,
						titleCase,
						showBorder ? "border-b mb-2 print:mb-1.5" : "mb-1 print:mb-0.5"
					)}
				>
					{title}
				</h2>
			)}
			{children}
		</section>
	);
};

// --- Main Template Component ---
const Template6 = ({}) => {
	const { store } = useStore();
	const template = defaultTemplateSettings;
	// MODIFIED: localeIso removed

	const colors = {
		text: template.textColor,
		heading: template.h1Color || template.headingColor,
		sectionTitle: template.h2Color || template.headingColor,
		itemTitle: template.h3Color || template.subHeadingColor,
		link: template.hyperLinkColor || template.linkColor,
		border: template.borderColor,
		description: template.descriptionColor || template.textColor,
		background: template.backgroundColor,
	};

	const fonts = {
		family: template.fontFamily || DEFAULT_FONT_FAMILY,
		nameSize: handleFindStyle(
			template.h1FontSize,
			"text-xl xs:text-2xl",
			"text-2xl xs:text-3xl",
			"text-xl xs:text-2xl font-bold"
		),
		sectionTitleSize: handleFindStyle(
			template.h2FontSize,
			"text-md xs:text-lg",
			"text-lg xs:text-xl",
			"text-base xs:text-lg"
		),
		itemTitleSize: handleFindStyle(
			template.h3FontSize,
			"text-sm xs:text-base",
			"text-base xs:text-lg",
			"text-sm xs:text-base font-semibold"
		),
		textSize: handleFindStyle(
			template.textFontSize,
			"text-xs xs:text-sm",
			"text-sm xs:text-base",
			"text-xs xs:text-sm"
		),
		descriptionSize: handleFindStyle(
			template.descriptionFontSize,
			"text-xs xs:text-sm",
			"text-sm",
			"text-xs xs:text-sm"
		),
		linkSize: handleFindStyle(
			template.hyperLinkFontSize,
			"text-xs xs:text-sm",
			"text-sm xs:text-base",
			"text-xs xs:text-sm"
		),
	};

	const layout = {
		imageSize: parseInt(template.imageSize, 10) || 0,
		projectLinkType: template.projectLink || "text",
		titleCase: handleFindStyle(
			template.titleCase,
			"lowercase",
			"normal-case",
			"uppercase"
		),
	};

	const sectionTitleStyle = {
		color: colors.sectionTitle,
		size: fonts.sectionTitleSize,
	};

	return (
		// MODIFIED: Outermost div structure aligned with Template1/2.
		<div
			style={{ fontFamily: fonts.family }}
			className="w-[210mm] min-h-[297mm] bg-white mx-auto my-0 shadow-lg rounded-sm overflow-x-hidden overflow-y-auto print:shadow-none print:my-0 print:bg-transparent"
		>
			{/* Inner container for padding and content color, similar to Template6's original outer div */}
			<div
				style={{ backgroundColor: colors.background, color: colors.text }}
				className="p-6 sm:p-8 md:p-10 print:p-6"
			>
				<header className="text-center mb-4 print:mb-3">
					{layout.imageSize > 0 && store.image && (
						<img
							src={store.image}
							alt="Profile"
							className="rounded-full mx-auto mb-2 print:mb-1"
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
						<p
							style={{ color: colors.itemTitle }}
							className={cn("mt-0.5", fonts.itemTitleSize)}
						>
							{store.personal.jobTitle}
						</p>
					)}
					<div
						style={{ color: colors.text }}
						className={cn(
							"mt-1.5 print:mt-1 flex flex-wrap justify-center items-start gap-x-3 gap-y-1.5 text-xs",
							fonts.textSize
						)} // items-start for multiline alignment
					>
						{(store.personal.city || store.personal.country) && (
							<span className="inline-flex items-center">
								<MdLocationOn
									className="mr-1 flex-shrink-0"
									style={{ color: colors.itemTitle }}
								/>
								{store.personal.city}
								{store.personal.city && store.personal.country && ", "}
								{store.personal.country}
							</span>
						)}
						{store.personal.email && (
							<>
								{(store.personal.city || store.personal.country) && (
									<span className="hidden sm:inline print:inline text-gray-400">
										•
									</span>
								)}
								<a
									href={`mailto:${store.personal.email}`}
									className="inline-flex items-center hover:underline"
									style={{ color: colors.link }}
								>
									<MdEmail
										className="mr-1 flex-shrink-0"
										style={{ color: colors.itemTitle }}
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
									<span className="hidden sm:inline print:inline text-gray-400">
										•
									</span>
								)}
								<a
									href={`tel:${store.personal.phone}`}
									className="inline-flex items-center hover:underline"
									style={{ color: colors.link }}
								>
									<MdPhone
										className="mr-1 flex-shrink-0"
										style={{ color: colors.itemTitle }}
									/>
									{store.personal.phone}
								</a>
							</>
						)}
						{/* MODIFIED: Social link display */}
						{Object.entries(store.socialLinks || {})
							.filter(
								([key, value]) =>
									value && LOCAL_SOCIALS_MAP_T6[key.toLowerCase()]
							)
							.map(([key, value]) => {
								const socialEntry = LOCAL_SOCIALS_MAP_T6[key.toLowerCase()];
								const url = String(value).startsWith("http")
									? String(value)
									: `https://${String(value)}`;
								return (
									<React.Fragment key={key}>
										<span className="hidden sm:inline print:inline text-gray-400">
											•
										</span>
										<a
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-start gap-1 hover:underline" // items-start for multiline alignment
											style={{ color: colors.link }}
											title={url}
										>
											{React.cloneElement(socialEntry.logo, {
												className: socialEntry.iconClassName && "inline mr-1.5", // Using class from map
												style: { color: colors.itemTitle }, // Keep original color style
											})}
											<span className="min-w-0 break-all">{url}</span>{" "}
											{/* Full URL with wrapping */}
										</a>
									</React.Fragment>
								);
							})}
					</div>
				</header>

				{store.summary && store.summary !== "<p><br></p>" && (
					<Section
						title={translations.summary}
						titleStyle={sectionTitleStyle}
						titleCase={layout.titleCase}
						borderColor={colors.border}
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
						titleStyle={sectionTitleStyle}
						titleCase={layout.titleCase}
						borderColor={colors.border}
					>
						<div className="space-y-3 print:space-y-2">
							{store.experience.map((exp, index) => (
								<div key={index} className="print:break-inside-avoid">
									<div className="flex justify-between items-baseline flex-wrap mb-0.5">
										<h3
											style={{ color: colors.itemTitle }}
											className={cn("font-semibold", fonts.itemTitleSize)}
										>
											{exp.jobTitle}
										</h3>
										<p
											style={{ color: colors.text }}
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
										className={cn("text-sm mb-0.5", fonts.textSize)}
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

				{store.education?.length > 0 && (
					<Section
						title={translations.education}
						titleStyle={sectionTitleStyle}
						titleCase={layout.titleCase}
						borderColor={colors.border}
					>
						<div className="space-y-3 print:space-y-2">
							{store.education.map((edu, index) => (
								<div key={index} className="print:break-inside-avoid">
									<div className="flex justify-between items-baseline flex-wrap mb-0.5">
										<h3
											style={{ color: colors.itemTitle }}
											className={cn("font-semibold", fonts.itemTitleSize)}
										>
											{edu.degree}
											{edu.fieldOfStudy && ` - ${edu.fieldOfStudy}`}
										</h3>
										<p
											style={{ color: colors.text }}
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
									<p
										style={{ color: colors.text }}
										className={cn("text-sm mb-0.5", fonts.textSize)}
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
						titleStyle={sectionTitleStyle}
						titleCase={layout.titleCase}
						borderColor={colors.border}
					>
						<p style={{ color: colors.text }} className={cn(fonts.textSize)}>
							{Array.isArray(store.skills)
								? store.skills.join("  •  ")
								: store.skills}
						</p>
					</Section>
				)}

				{store.projects?.length > 0 && (
					<Section
						title={translations.projects}
						titleStyle={sectionTitleStyle}
						titleCase={layout.titleCase}
						borderColor={colors.border}
					>
						<div className="space-y-3 print:space-y-2">
							{store.projects.map((project, index) => (
								<div key={index} className="print:break-inside-avoid">
									<div className="flex justify-between items-baseline flex-wrap mb-0.5">
										<h3
											style={{ color: colors.itemTitle }}
											className={cn("font-semibold", fonts.itemTitleSize)}
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
												>
													{layout.projectLinkType === "icon"
														? "Live"
														: translations.projectsLive}
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
												>
													{layout.projectLinkType === "icon"
														? "Code"
														: translations.projectsGithub}
												</a>
											)}
										</div>
									</div>
									{project.technologies?.length > 0 && (
										<p
											style={{ color: colors.description }}
											className={cn("text-xs italic mb-0.5", fonts.textSize)}
										>
											{translations.projectsTech}:{" "}
											{project.technologies.join(", ")}
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

				{store.languages?.length > 0 && (
					<Section
						title={translations.languages}
						titleStyle={sectionTitleStyle}
						titleCase={layout.titleCase}
						borderColor={colors.border}
					>
						<ul
							className={cn(
								"list-none p-0 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 print:grid-cols-2",
								fonts.textSize
							)}
						>
							{store.languages.map((lang, index) => (
								<li key={index} className="flex">
									<span
										style={{ color: colors.itemTitle }}
										className="font-medium w-1/2 sm:w-auto sm:min-w-[100px] print:w-auto print:min-w-[80px]"
									>
										{lang.language}:
									</span>
									<span style={{ color: colors.text }}>{lang.level}</span>
								</li>
							))}
						</ul>
					</Section>
				)}

				{store.interests?.length > 0 && (
					<Section
						title={translations.interests}
						titleStyle={sectionTitleStyle}
						titleCase={layout.titleCase}
						borderColor={colors.border}
					>
						<p style={{ color: colors.text }} className={cn(fonts.textSize)}>
							{store.interests.join("  •  ")}
						</p>
					</Section>
				)}

				{store.certificates?.length > 0 && (
					<Section
						title={translations.certificates}
						titleStyle={sectionTitleStyle}
						titleCase={layout.titleCase}
						borderColor={colors.border}
					>
						<div className="space-y-2 print:space-y-1.5">
							{store.certificates.map((cert, index) => (
								<div key={index} className="print:break-inside-avoid">
									<div className="flex justify-between items-baseline flex-wrap mb-0.5">
										<h3
											style={{ color: colors.itemTitle }}
											className={cn("font-semibold", fonts.itemTitleSize)}
										>
											{cert.title}
										</h3>
										<p
											style={{ color: colors.text }}
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
											className={cn("text-sm italic", fonts.textSize)}
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

				{store.references?.length > 0 && (
					<Section
						title={translations.references}
						titleStyle={sectionTitleStyle}
						titleCase={layout.titleCase}
						borderColor={colors.border}
					>
						<div className="space-y-3 print:space-y-2">
							{store.references.map((ref, index) => (
								<div key={index} className="print:break-inside-avoid">
									<h3
										style={{ color: colors.itemTitle }}
										className={cn("font-semibold", fonts.itemTitleSize)}
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
									/>
								</div>
							))}
						</div>
						<p
							style={{ color: colors.description }}
							className={cn(
								"text-xs italic mt-2 text-center print:text-left",
								fonts.textSize
							)}
						>
							*{translations.referencesAvailable}
						</p>
					</Section>
				)}
			</div>
		</div>
	);
};

export default Template6;
