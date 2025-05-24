// Template4.jsx
import React from "react";
// MODIFIED: Updated icon imports for social links and general UI
import {
	SiGithub,
	SiLinkedin,
	SiFacebook,
	SiInstagram,
	SiXing,
	SiMedium,
	SiFigma,
} from "react-icons/si";
import {
	FaTwitter,
	FaLinkedin as FaLinkedinAlt, // Renamed to avoid conflict if SiLinkedin was also used by chance elsewhere
	FaGithub as FaGithubAlt,
	FaFacebook as FaFacebookAlt,
	FaInstagram as FaInstagramAlt,
	FaGlobe,
	FaDribbble,
} from "react-icons/fa";
import {
	MdArrowOutward,
	MdEmail,
	MdPhone,
	MdLocationOn,
	MdWork,
	MdSchool,
	MdLightbulbOutline,
	MdFavoriteBorder,
	MdTranslate,
	MdLink,
	MdDescription,
	MdVerifiedUser,
	MdGroup,
} from "react-icons/md";
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
	"'Roboto', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";

const translations = {
	present: "Present",
	contactAndSocial: "Contact & Social",
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

// MODIFIED: Updated LOCAL_SOCIALS_T4 with the new list
const LOCAL_SOCIALS_T4 = [
	{ name: "LinkedIn", key: "linkedin", logo: <FaLinkedinAlt /> },
	{ name: "Github", key: "github", logo: <FaGithubAlt /> },
	{ name: "Twitter", key: "twitter", logo: <FaTwitter /> },
	{ name: "Facebook", key: "facebook", logo: <FaFacebookAlt /> },
	{ name: "Instagram", key: "instagram", logo: <FaInstagramAlt /> },
	{ name: "Website", key: "website", logo: <FaGlobe /> },
	{ name: "Xing", key: "xing", logo: <SiXing /> },
	{ name: "Medium", key: "medium", logo: <SiMedium /> },
	{ name: "Figma", key: "figma", logo: <SiFigma /> },
	{ name: "Dribbble", key: "dribbble", logo: <FaDribbble /> },
];

const defaultTemplateSettings = {
	name: "Creative Header CV",
	templateNumber: 4,
	headerBgColor: "#2D3748",
	headerTextColor: "#F7FAFC",
	accentColor: "#38B2AC",
	sectionTitleColor: "#1A252F",
	mainTextColor: "#4A5568",
	subtleTextColor: "#718096",
	borderColor: "#E2E8F0",
	tagBgColor: "#E6FFFA",
	tagTextColor: "#2C7A7B",
	pageBgColor: "#F8F9FA", // This will be applied to <main>
	h1Color: "",
	h2Color: "",
	h3Color: "",
	textColor: "",
	descriptionColor: "",
	hyperLinkColor: "",
	imageSize: "100",
	projectLink: "icon",
	spaceBetween: "normal",
	align: "left",
	titleCase: "uppercase",
	fontFamily: "",
	h1FontSize: "normal",
	h2FontSize: "normal",
	h3FontSize: "normal",
	textFontSize: "normal",
	descriptionFontSize: "normal",
	hyperLinkFontSize: "normal",
};

const handleFindStyle = (state, x, y, z) => {
	const xOptions = ["small", "left", "lower", "less"];
	const yOptions = ["large", "right", "normal", "more"];
	const s = String(state).toLowerCase();
	if (xOptions.includes(s)) return x;
	if (yOptions.includes(s)) return y;
	return z;
};

const Description = ({ state, color, size, className }) => {
	if (!state || state === "<p><br></p>" || state === "<p></p>") return null;
	return (
		<div
			style={{ color: color }}
			dangerouslySetInnerHTML={{ __html: state }}
			className={cn(
				"prose prose-sm max-w-none mt-1",
				"prose-p:my-1 prose-ul:my-1 prose-li:my-0.5",
				size,
				className
			)}
		/>
	);
};

const Template4 = ({}) => {
	const { store } = useStore();
	const template = defaultTemplateSettings;
	const localeIso = DEFAULT_LOCALE_ISO;

	const colors = {
		headerBg: template.headerBgColor,
		headerText: template.h1Color || template.headerTextColor,
		accent: template.accentColor,
		sectionTitle: template.h2Color || template.sectionTitleColor,
		mainText: template.textColor || template.mainTextColor,
		subtleText: template.descriptionColor || template.subtleTextColor,
		border: template.borderColor,
		link: template.hyperLinkColor || template.accentColor,
		tagBg: template.tagBgColor,
		tagText: template.tagTextColor,
		itemTitle: template.h3Color || template.mainTextColor,
		pageBg: template.pageBgColor,
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
			"text-xl font-light"
		),
		sectionTitleSize: handleFindStyle(
			template.h2FontSize,
			"text-lg",
			"text-2xl",
			"text-xl font-semibold"
		),
		itemTitleSize: handleFindStyle(
			template.h3FontSize,
			"text-base",
			"text-lg",
			"text-md font-semibold"
		),
		textSize: handleFindStyle(
			template.textFontSize,
			"text-xs",
			"text-base",
			"text-sm"
		),
		descriptionSize: handleFindStyle(
			template.descriptionFontSize,
			"text-xs",
			"text-sm",
			"text-sm leading-relaxed"
		),
		linkSize: handleFindStyle(
			template.hyperLinkFontSize,
			"text-xs",
			"text-sm",
			"text-sm"
		),
	};

	const layout = {
		imageSize: parseInt(template.imageSize, 10) || 100,
		projectLinkType: template.projectLink || "icon",
		sectionGap: handleFindStyle(template.spaceBetween, "mb-4", "mb-8", "mb-6"),
		titleCase: handleFindStyle(
			template.titleCase,
			"lowercase",
			"normal-case",
			"uppercase"
		),
	};

	const SectionWrapper = ({ title, icon, children, className }) => (
		<section className={cn(layout.sectionGap, className)}>
			<div className="flex items-center mb-3">
				{icon &&
					React.cloneElement(icon, {
						className: "text-2xl mr-3",
						style: { color: colors.accent },
					})}
				<h2
					style={{ color: colors.sectionTitle, borderColor: colors.accent }}
					className={cn(
						fonts.sectionTitleSize,
						layout.titleCase,
						`border-b-2 pb-1 w-full`
					)}
				>
					{title}
				</h2>
			</div>
			{children}
		</section>
	);

	const TimelineItem = ({ title, subtitle, date, description, isLast }) => (
		<div className="flex">
			{/* MODIFIED: Simplified timeline marker */}
			<div className="flex flex-col items-center mr-3 md:mr-4">
				<div
					className="w-2.5 h-2.5 mt-1.5 rounded-full print:w-2 print:h-2 print:mt-1"
					style={{ backgroundColor: colors.accent }}
				></div>
				{!isLast && (
					<div
						className="w-0.5 grow"
						style={{ backgroundColor: colors.border }}
					></div>
				)}
			</div>
			<div
				className={cn("pb-4 flex-1", isLast ? "" : "")}
				style={{ color: colors.mainText }}
			>
				<p
					className={cn("font-semibold mb-0.5", fonts.itemTitleSize)}
					style={{ color: colors.itemTitle }}
				>
					{title}
				</p>
				<p
					className={cn("text-sm mb-0.5", fonts.textSize)}
					style={{ color: colors.subtleText }}
				>
					{subtitle}
				</p>
				<p
					className={cn("text-xs mb-1", fonts.textSize)}
					style={{ color: colors.subtleText }}
				>
					{date}
				</p>
				<Description
					state={description}
					color={colors.subtleText}
					size={fonts.descriptionSize}
					className="ml-0"
				/>
			</div>
		</div>
	);

	return (
		// MODIFIED: Outermost div structure aligned with Template1/2.
		// `colors.pageBg` will be applied to the `<main>` tag.
		<div
			style={{ fontFamily: fonts.family }}
			className="w-[210mm] min-h-[297mm] bg-white mx-auto my-0 shadow-lg rounded-sm overflow-x-hidden overflow-y-auto print:shadow-none print:my-0 print:bg-white print:min-h-0"
		>
			<header
				style={{ backgroundColor: colors.headerBg, color: colors.headerText }}
				className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 md:gap-6 print:p-6 print:bg-gray-800"
			>
				{store.image && (
					<img
						src={store.image}
						alt="Profile"
						className="rounded-full flex-shrink-0 order-1 md:order-none"
						style={{
							width: `${layout.imageSize}px`,
							height: `${layout.imageSize}px`,
							objectFit: "cover",
							border: `3px solid ${colors.accent}`,
						}}
					/>
				)}
				<div className="flex-grow text-center md:text-left">
					<h1 className={cn(fonts.nameSize, "mb-0.5")}>
						{store.personal.name} {store.personal.surname}
					</h1>
					{store.personal.jobTitle && (
						<h2 className={cn(fonts.jobTitleSize, "opacity-90")}>
							{store.personal.jobTitle}
						</h2>
					)}
					<div
						className={cn(
							"mt-2 md:mt-3 flex flex-wrap justify-center md:justify-start items-center gap-x-3 md:gap-x-4 gap-y-1.5 text-sm", // increased gap-y
							fonts.textSize,
							"opacity-90"
						)}
					>
						{(store.personal.city || store.personal.country) && (
							<span className="flex items-center">
								<MdLocationOn
									className="mr-1.5 text-base"
									style={{ color: colors.accent }}
								/>
								{store.personal.city}
								{store.personal.city && store.personal.country && ", "}
								{store.personal.country}
							</span>
						)}
						{store.personal.email && (
							<a
								href={`mailto:${store.personal.email}`}
								className="flex items-center hover:underline"
								style={{ color: colors.headerText }}
							>
								<MdEmail
									className="mr-1.5 text-base"
									style={{ color: colors.accent }}
								/>
								{store.personal.email}
							</a>
						)}
						{store.personal.phone && (
							<a
								href={`tel:${store.personal.phone}`}
								className="flex items-center hover:underline"
								style={{ color: colors.headerText }}
							>
								<MdPhone
									className="mr-1.5 text-base"
									style={{ color: colors.accent }}
								/>
								{store.personal.phone}
							</a>
						)}
					</div>
					{/* MODIFIED: Social links display icon + full URL and wrap */}
					{Object.values(store.socialLinks || {}).some((link) => link) && (
						<div
							className={cn(
								"mt-2 flex flex-col items-center md:items-start gap-y-1", // Changed to flex-col for stacking on small screens if needed, items-start for left align
								fonts.linkSize
							)}
						>
							{LOCAL_SOCIALS_T4.map((social) => {
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
										className="flex items-center gap-x-1.5 hover:opacity-80 transition-opacity w-full md:w-auto group"
										style={{ color: colors.headerText }}
										title={url}
									>
										{React.cloneElement(social.logo, {
											size: 16, // Slightly smaller icon when text is present
											className:
												"flex-shrink-0 group-hover:opacity-100 transition-opacity",
											style: { color: colors.accent },
										})}
										<span className="min-w-0 break-all">{url}</span>
									</a>
								);
							})}
						</div>
					)}
				</div>
			</header>

			{/* MODIFIED: Applied pageBgColor here */}
			<main
				className="p-6 md:p-8 print:p-6"
				style={{ backgroundColor: colors.pageBg }}
			>
				{store.summary && store.summary !== "<p><br></p>" && (
					<SectionWrapper title={translations.summary} icon={<MdDescription />}>
						<Description
							state={store.summary}
							color={colors.subtleText}
							size={fonts.descriptionSize}
						/>
					</SectionWrapper>
				)}

				{(store.skills?.length > 0 ||
					store.languages?.length > 0 ||
					store.interests?.length > 0) && (
					<section
						className={cn(layout.sectionGap, "p-4 md:p-6 rounded-lg print:p-4")}
						style={{
							backgroundColor: "#FFFFFF",
							border: `1px solid ${colors.border}`,
						}}
					>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 print:gap-4">
							{store.skills?.length > 0 && (
								<div className="print:break-inside-avoid">
									<h3
										className={cn(
											"font-semibold mb-2 flex items-center",
											fonts.itemTitleSize
										)}
										style={{ color: colors.itemTitle }}
									>
										<MdLightbulbOutline
											className="mr-2 text-lg md:text-xl"
											style={{ color: colors.accent }}
										/>{" "}
										{translations.skills}
									</h3>
									<div className="flex flex-wrap gap-1.5 md:gap-2 print:gap-1">
										{store.skills.map((skill, index) => (
											<span
												key={index}
												className={cn(
													"px-2 py-0.5 md:px-2.5 md:py-1 rounded-md text-xs",
													fonts.textSize
												)}
												style={{
													backgroundColor: colors.tagBg,
													color: colors.tagText,
												}}
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							)}
							{store.languages?.length > 0 && (
								<div className="print:break-inside-avoid">
									<h3
										className={cn(
											"font-semibold mb-2 flex items-center",
											fonts.itemTitleSize
										)}
										style={{ color: colors.itemTitle }}
									>
										<MdTranslate
											className="mr-2 text-lg md:text-xl"
											style={{ color: colors.accent }}
										/>{" "}
										{translations.languages}
									</h3>
									<ul className={cn("list-none p-0", fonts.textSize)}>
										{store.languages.map((lang, index) => (
											<li
												key={index}
												className="mb-0.5 md:mb-1 flex justify-between"
											>
												<span style={{ color: colors.mainText }}>
													{lang.language}:
												</span>
												<span style={{ color: colors.subtleText }}>
													{lang.level}
												</span>
											</li>
										))}
									</ul>
								</div>
							)}
							{store.interests?.length > 0 && (
								<div className="print:break-inside-avoid">
									<h3
										className={cn(
											"font-semibold mb-2 flex items-center",
											fonts.itemTitleSize
										)}
										style={{ color: colors.itemTitle }}
									>
										<MdFavoriteBorder
											className="mr-2 text-lg md:text-xl"
											style={{ color: colors.accent }}
										/>{" "}
										{translations.interests}
									</h3>
									<p
										className={fonts.textSize}
										style={{ color: colors.subtleText }}
									>
										{store.interests.join(" · ")}
									</p>
								</div>
							)}
						</div>
					</section>
				)}

				{store.experience?.length > 0 && (
					<SectionWrapper title={translations.experience} icon={<MdWork />}>
						<div className="flex flex-col">
							{" "}
							{/* Ensured this is a flex container for grow on timeline line */}
							{store.experience.map((exp, index) => (
								<TimelineItem
									key={index}
									title={exp.jobTitle}
									subtitle={`${exp.company}${exp.city ? `, ${exp.city}` : ""}`}
									date={`${formatDate(exp.startDate, localeIso)} - ${
										exp.endDate
											? formatDate(exp.endDate, localeIso)
											: translations.present
									}`}
									description={exp.description}
									isLast={index === store.experience.length - 1}
								/>
							))}
						</div>
					</SectionWrapper>
				)}

				{store.education?.length > 0 && (
					<SectionWrapper title={translations.education} icon={<MdSchool />}>
						<div className="flex flex-col">
							{" "}
							{/* Ensured this is a flex container for grow on timeline line */}
							{store.education.map((edu, index) => (
								<TimelineItem
									key={index}
									title={`${edu.degree}${
										edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ""
									}`}
									subtitle={`${edu.institution}${
										edu.city ? `, ${edu.city}` : ""
									}`}
									date={`${formatDate(edu.startDate, localeIso)} - ${
										edu.endDate
											? formatDate(edu.endDate, localeIso)
											: translations.present
									}`}
									description={edu.description}
									isLast={index === store.education.length - 1}
								/>
							))}
						</div>
					</SectionWrapper>
				)}

				{store.projects?.length > 0 && (
					<SectionWrapper
						title={translations.projects}
						icon={<MdLightbulbOutline />}
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 print:gap-4 print:grid-cols-1">
							{store.projects.map((project, index) => (
								<div
									key={index}
									className="p-3 md:p-4 rounded-md print:p-2 print:break-inside-avoid"
									style={{
										backgroundColor: "#FFFFFF",
										border: `1px solid ${colors.border}`,
										color: colors.mainText,
									}}
								>
									<div className="flex justify-between items-start mb-1">
										<h3
											className={cn("font-semibold", fonts.itemTitleSize)}
											style={{ color: colors.itemTitle }}
										>
											{project.title}
										</h3>
										<div
											className={cn(
												"flex items-center gap-1.5 md:gap-2 ml-2 flex-shrink-0",
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
														<MdLink size={16} />
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
														<FaGithubAlt size={14} />
													) : (
														translations.projectsGithub
													)}
												</a>
											)}
										</div>
									</div>
									{project.technologies?.length > 0 && (
										<p
											className={cn("text-xs mb-1 md:mb-1.5", fonts.textSize)}
											style={{ color: colors.subtleText }}
										>
											<span
												className="font-medium"
												style={{ color: colors.itemTitle }}
											>
												{translations.projectsTech}:{" "}
											</span>
											{project.technologies.join(" · ")}
										</p>
									)}
									<Description
										state={project.description}
										color={colors.subtleText}
										size={fonts.descriptionSize}
									/>
								</div>
							))}
						</div>
					</SectionWrapper>
				)}

				{store.certificates?.length > 0 && (
					<SectionWrapper
						title={translations.certificates}
						icon={<MdVerifiedUser />}
					>
						<div className="space-y-3 md:space-y-4 print:space-y-2">
							{store.certificates.map((cert, index) => (
								<div
									key={index}
									style={{ color: colors.mainText }}
									className="print:break-inside-avoid"
								>
									<div className="flex justify-between items-baseline flex-wrap">
										<h3
											className={cn("font-semibold", fonts.itemTitleSize)}
											style={{ color: colors.itemTitle }}
										>
											{cert.title}
										</h3>
										<p
											className={cn(
												"text-xs ml-2 flex-shrink-0",
												fonts.textSize
											)}
											style={{ color: colors.subtleText }}
										>
											{formatDate(cert.date, localeIso)}
										</p>
									</div>
									{cert.institution && (
										<p
											className={cn("text-sm italic mt-0.5", fonts.textSize)}
											style={{ color: colors.subtleText }}
										>
											{cert.institution}
										</p>
									)}
									<Description
										state={cert.description}
										color={colors.subtleText}
										size={fonts.descriptionSize}
									/>
								</div>
							))}
						</div>
					</SectionWrapper>
				)}

				{store.references?.length > 0 && (
					<SectionWrapper title={translations.references} icon={<MdGroup />}>
						<div className="space-y-3 md:space-y-4 print:space-y-2">
							{store.references.map((ref, index) => (
								<div
									key={index}
									style={{ color: colors.mainText }}
									className="print:break-inside-avoid"
								>
									<h3
										className={cn("font-semibold", fonts.itemTitleSize)}
										style={{ color: colors.itemTitle }}
									>
										{ref.name} {ref.company && `- ${ref.company}`}
									</h3>
									<div
										className={cn(
											"flex items-center gap-x-2 md:gap-x-3 gap-y-0.5 flex-wrap mt-0.5",
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
											<span style={{ color: colors.subtleText }}>|</span>
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
										color={colors.subtleText}
										size={fonts.descriptionSize}
									/>
								</div>
							))}
						</div>
						<p
							className={cn(
								"text-xs italic mt-3 md:mt-4 text-center md:text-left",
								fonts.textSize
							)}
							style={{ color: colors.subtleText }}
						>
							*{translations.referencesAvailable}
						</p>
					</SectionWrapper>
				)}
			</main>
		</div>
	);
};

export default Template4;
