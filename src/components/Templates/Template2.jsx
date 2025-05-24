// Template2.jsx
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
import useStore from "../../store/store";
// FaTwitter was already imported, SiGithub, SiLinkedin etc. are replaced by Fa versions or other Si icons.

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
	"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";

// MODIFIED: Updated LOCAL_SOCIALS to use specified icons and include new ones
const LOCAL_SOCIALS_T2 = [
	{ name: "LinkedIn", logo: <FaLinkedin /> },
	{ name: "Github", logo: <FaGithub /> },
	{ name: "Twitter", logo: <FaTwitter /> },
	{ name: "Facebook", logo: <FaFacebook /> },
	{ name: "Instagram", logo: <FaInstagram /> },
	{ name: "Website", logo: <FaGlobe /> },
	{ name: "Xing", logo: <SiXing /> },
	{ name: "Medium", logo: <SiMedium /> },
	{ name: "Figma", logo: <SiFigma /> },
	{ name: "Dribbble", logo: <FaDribbble /> }, // Using FaDribbble as FaDribbbleSquare is not standard
];

// Default template settings (mimicking a store with these defaults)
const defaultTemplateSettings = {
	name: "CV Template 2", // Or similar identifier
	templateNumber: 2,

	// Colors - empty strings to allow Template2's internal defaults to take precedence
	h1Color: "",
	h2Color: "",
	h3Color: "",
	textColor: "",
	descriptionColor: "", // Empty to trigger opacity in Description component
	hyperLinkColor: "",

	// Section
	imageSize: "", // Will default to 80 in sectionSettingsDefault
	projectLink: "", // Will default to "icon" in sectionSettingsDefault
	spaceBetween: "", // "less", "normal", "more" - empty will pick "normal" (mt-4)
	align: "", // "left", "center", "right" - empty will pick "left"
	titleCase: "", // "lower", "normal", "upper" - empty will pick "normal"

	// Font
	fontFamily: "", // Will default to DEFAULT_FONT_FAMILY
	h1FontSize: "", // "small", "normal", "large" - empty will pick "normal"
	h2FontSize: "",
	h3FontSize: "",
	textFontSize: "",
	descriptionFontSize: "",
	hyperLinkFontSize: "", // Empty will pick default size in handleFindStyle
};

// --- Helper: Section Component (Slight Enhancements from original) ---
const Section = ({
	id,
	title,
	children,
	color,
	align,
	size,
	titleCase,
	space,
	className,
}) => {
	return (
		<section
			id={`template2-${id}`}
			className={cn(
				"flex items-center justify-center flex-col gap-2 w-full print-break-inside-avoid",
				space,
				className
			)}
		>
			<h2
				style={{ color: color, borderColor: color }}
				className={cn(
					"pb-1 mb-3 border-b-2 font-bold w-full",
					size,
					align,
					titleCase
				)}
			>
				{title}
			</h2>
			{children}
		</section>
	);
};

// --- Helper: Description Component (Slight Enhancements from original) ---
const Description = ({ state, color, size }) => {
	if (!state || state === "<p><br></p>" || state === "<p></p>") return null;
	return (
		<p // Changed from div to p for semantic correctness of description, can be styled as block
			style={{ color: color }}
			dangerouslySetInnerHTML={{ __html: state }}
			className={cn("text-left mt-1.5 block", size, !color ? "opacity-80" : "")} // Added block
		></p>
	);
};

// --- Helper: Style Calculation (Kept As Is, now local) ---
const handleFindStyle = (state, x, y, z) => {
	const xOptions = ["small", "left", "lower", "less"];
	const yOptions = ["large", "right", "normal", "more"];
	const s = String(state).toLowerCase();
	if (xOptions.includes(s)) {
		return x;
	} else if (yOptions.includes(s)) {
		return y;
	} else {
		return z;
	}
};

// --- Main Template Component ---
const Template2 = ({}) => {
	const { store } = useStore();
	const template = defaultTemplateSettings; // Use the local default settings
	const localeIso = DEFAULT_LOCALE_ISO;

	// --- Settings Calculations (from original Template2) ---
	const colorSettingsDefault = {
		h1Color: template.h1Color === "" ? "#1f2937" : template.h1Color,
		h2Color: template.h2Color === "" ? "#374151" : template.h2Color,
		h3Color: template.h3Color === "" ? "#4b5563" : template.h3Color,
		textColor: template.textColor === "" ? "#374151" : template.textColor,
		descriptionColor:
			template.descriptionColor === "" ? "" : template.descriptionColor,
		hyperLinkColor:
			template.hyperLinkColor === "" ? "#0ea5e9" : template.hyperLinkColor,
	};

	const fontSettingsDefault = {
		fontFamily:
			template.fontFamily === "" ? DEFAULT_FONT_FAMILY : template.fontFamily,
		h1FontSize: handleFindStyle(
			template.h1FontSize,
			"text-lg xs:text-xl",
			"text-2xl xs:text-3xl",
			"text-xl xs:text-2xl"
		),
		h2FontSize: handleFindStyle(
			template.h2FontSize,
			"text-sm xs:text-base",
			"text-lg xs:text-xl",
			"text-base xs:text-lg"
		),
		h3FontSize: handleFindStyle(
			template.h3FontSize,
			"text-sm xs:text-base",
			"text-base xs:text-lg",
			"text-sm xs:text-base font-semibold"
		),
		textFontSize: handleFindStyle(
			template.textFontSize,
			"text-xs xs:text-sm",
			"text-sm xs:text-base",
			"text-xs xs:text-sm leading-relaxed"
		),
		hyperLinkFontSize: handleFindStyle(
			template.hyperLinkFontSize, // if "", will use the default "text-xs xs:text-sm"
			"text-xs xs:text-sm",
			"text-sm xs:text-base",
			"text-xs xs:text-sm"
		),
		descriptionFontSize: handleFindStyle(
			template.descriptionFontSize,
			"text-xs",
			"text-sm xs:text-base",
			"text-xs xs:text-sm leading-relaxed"
		),
	};

	const sectionSettingsDefault = {
		imageSize:
			template.imageSize === "" ? 80 : parseInt(String(template.imageSize), 10),
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
			"text-left" // Default to left align
		),
		titleCase: handleFindStyle(
			template.titleCase,
			"lowercase",
			"normal-case",
			"uppercase"
		),
		projectLink: template.projectLink || "icon",
	};

	const getAlignmentClass = (baseClass = "") => {
		return cn(baseClass, {
			"items-start text-left": sectionSettingsDefault.align === "text-left",
			"items-end text-right": sectionSettingsDefault.align === "text-right",
			// Default case
			"items-start text-left":
				sectionSettingsDefault.align !== "text-left" &&
				sectionSettingsDefault.align !== "text-right",
		});
	};
	const getJustifyClass = (baseClass = "") => {
		return cn(baseClass, {
			"justify-start": sectionSettingsDefault.align === "text-left",
			"justify-end": sectionSettingsDefault.align === "text-right",
			// Default case
			"justify-start":
				sectionSettingsDefault.align !== "text-left" &&
				sectionSettingsDefault.align !== "text-right",
		});
	};

	return (
		<div
			style={{
				fontFamily: fontSettingsDefault.fontFamily,
				color: colorSettingsDefault.textColor,
			}}
			className="w-[210mm] min-h-[280mm] bg-white my-0 mx-auto p-10 rounded shadow-lg overflow-x-hidden overflow-y-visible print:shadow-none print:bg-transparent print:my-0 print:mx-auto print:p-8"
		>
			{/* --- Header Section --- */}
			<header
				className={cn(`flex items-center gap-6 mb-6 pb-4 border-b`, {
					"flex-row-reverse": sectionSettingsDefault.align === "text-right",
					"flex-row": sectionSettingsDefault.align !== "text-right",
				})}
				style={{ borderColor: colorSettingsDefault.h2Color + "50" }}
			>
				{store.image && (
					<img
						src={store.image}
						height={sectionSettingsDefault.imageSize}
						width={sectionSettingsDefault.imageSize}
						alt={"Personal"}
						className="rounded-full flex-shrink-0"
						style={{ objectFit: "cover" }}
					/>
				)}
				<div className={cn("flex flex-col w-full", getAlignmentClass())}>
					<h1
						style={{ color: colorSettingsDefault.h1Color }}
						className={cn(
							`w-full font-bold`,
							sectionSettingsDefault.align,
							fontSettingsDefault.h1FontSize
						)}
					>
						{store.personal.name} {store.personal.surname}
					</h1>
					<h2
						style={{ color: colorSettingsDefault.h2Color }}
						className={cn(
							"w-full font-semibold mt-0.5",
							sectionSettingsDefault.align,
							fontSettingsDefault.h2FontSize
						)}
					>
						{store.personal.jobTitle}
					</h2>
					<p
						style={{ color: colorSettingsDefault.textColor }}
						className={cn(
							"w-full mt-1.5 opacity-90",
							fontSettingsDefault.textFontSize,
							sectionSettingsDefault.align
						)}
					>
						{store.personal.city && store.personal.city}
						{store.personal.country &&
							`${store.personal.city ? ", " : ""} ${store.personal.country}`}
						{store.personal.email && (
							<>
								{(store.personal.city || store.personal.country) && " • "}
								<a
									className={cn(
										"hover:underline",
										fontSettingsDefault.hyperLinkFontSize
									)}
									style={{ color: colorSettingsDefault.hyperLinkColor }}
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
									store.personal.email) &&
									" • "}
								<a
									className={cn(
										"hover:underline",
										fontSettingsDefault.hyperLinkFontSize
									)}
									style={{ color: colorSettingsDefault.hyperLinkColor }}
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
			</header>

			{/* --- Summary Section (if exists) --- */}
			{store.summary &&
				store.summary !== "<p><br></p>" &&
				store.summary !== "<p></p>" && (
					<Section
						id="summary"
						title={"Summary"} // Hardcoded title
						color={colorSettingsDefault.h2Color}
						size={fontSettingsDefault.h2FontSize}
						align={sectionSettingsDefault.align}
						titleCase={sectionSettingsDefault.titleCase}
						space={"mb-6"}
						className="px-0"
					>
						<div
							dangerouslySetInnerHTML={{ __html: store.summary }}
							style={{ color: colorSettingsDefault.textColor }}
							className={cn(
								fontSettingsDefault.textFontSize,
								sectionSettingsDefault.align,
								"opacity-90 w-full prose prose-sm max-w-none",
								`prose-p:${fontSettingsDefault.textFontSize}`,
								`prose-ul:${fontSettingsDefault.textFontSize}`,
								`prose-li:${fontSettingsDefault.textFontSize}`
							)}
						></div>
					</Section>
				)}

			{/* --- Main Content Grid --- */}
			<div className="grid grid-cols-[30%_calc(70%_-_2rem)] gap-8 mt-0 w-full justify-between print:grid-cols-[35%_calc(65%_-_2rem)]">
				{/* --- Left Column --- */}
				<div className="flex flex-col gap-y-6">
					{Object.values(store.socialLinks || {}).some((link) => link) && (
						<Section
							id="socials"
							title={"Social"} // Hardcoded title
							color={colorSettingsDefault.h2Color}
							size={fontSettingsDefault.h2FontSize}
							align={sectionSettingsDefault.align}
							titleCase={sectionSettingsDefault.titleCase}
						>
							<div
								className={cn(
									"flex flex-col w-full gap-1.5",
									getAlignmentClass()
								)}
							>
								{Object.keys(store.socialLinks || {}).map((key) => {
									const socialInput = String(
										store.socialLinks[key] || ""
									).trim();
									if (!socialInput) return null;

									const socialEntry = LOCAL_SOCIALS_T2.find(
										(e) => e.name.toLowerCase() === key.toLowerCase()
									);

									if (socialEntry) {
										const url =
											socialInput.startsWith("http://") ||
											socialInput.startsWith("https://")
												? socialInput
												: `https://${socialInput}`;

										return (
											<a
												href={url}
												target="_blank"
												rel="noopener noreferrer"
												key={key}
												className={cn(
													"flex items-start gap-2 group w-full",
													fontSettingsDefault.hyperLinkFontSize
												)}
												style={{ color: colorSettingsDefault.hyperLinkColor }}
											>
												<span className="opacity-90 group-hover:opacity-100 transition-opacity pt-0.5 flex-shrink-0">
													{" "}
													{/* Added flex-shrink-0 to icon span */}
													{React.cloneElement(socialEntry.logo, { size: 16 })}
												</span>
												{/* MODIFIED: Changed break-words to break-all and added min-w-0 */}
												<span
													className="hover:underline break-all min-w-0"
													title={url}
												>
													{url}
												</span>
											</a>
										);
									}
									return null;
								})}
							</div>
						</Section>
					)}
					{store.skills?.length > 0 && (
						<Section
							id="skills"
							title={"Skills"}
							color={colorSettingsDefault.h2Color}
							size={fontSettingsDefault.h2FontSize}
							align={sectionSettingsDefault.align}
							titleCase={sectionSettingsDefault.titleCase}
						>
							<div
								className={cn(
									`w-full flex flex-wrap gap-1.5 print-exact`,
									getJustifyClass()
								)}
							>
								{store.skills?.map((e, index) => (
									<span
										key={index}
										style={{
											backgroundColor:
												colorSettingsDefault.hyperLinkColor + "20",
											color: colorSettingsDefault.hyperLinkColor,
										}}
										className={cn(
											"px-2.5 py-1 rounded-md text-xs font-medium",
											fontSettingsDefault.textFontSize
										)}
									>
										{e}
									</span>
								))}
							</div>
						</Section>
					)}
					{store.references?.length > 0 && (
						<Section
							id="references"
							title={"References"}
							color={colorSettingsDefault.h2Color}
							size={fontSettingsDefault.h2FontSize}
							align={sectionSettingsDefault.align}
							titleCase={sectionSettingsDefault.titleCase}
						>
							<div className="flex flex-col w-full gap-3">
								{store.references.map((ref, index) => (
									<div
										key={index}
										className={cn("flex flex-col w-full", getAlignmentClass())}
									>
										<h3
											className={cn(
												`font-semibold`,
												fontSettingsDefault.h3FontSize
											)}
											style={{ color: colorSettingsDefault.h3Color }}
										>
											<span>{ref.name}</span>
											{ref.company && (
												<span className="font-normal opacity-80 text-sm">
													, {ref.company}
												</span>
											)}
										</h3>
										<div
											className={cn(
												`flex flex-col mt-0.5`,
												getAlignmentClass(),
												fontSettingsDefault.textFontSize
											)}
										>
											{ref.email && (
												<a
													className={cn(
														"hover:underline",
														fontSettingsDefault.hyperLinkFontSize
													)}
													target="_blank"
													rel="noopener noreferrer"
													href={`mailto:${ref.email}`}
													style={{ color: colorSettingsDefault.hyperLinkColor }}
												>
													{ref.email}
												</a>
											)}
											{ref.phone && (
												<a
													className={cn(
														"hover:underline",
														fontSettingsDefault.hyperLinkFontSize
													)}
													target="_blank"
													rel="noopener noreferrer"
													href={`tel:${ref.phone}`}
													style={{ color: colorSettingsDefault.hyperLinkColor }}
												>
													{ref.phone}
												</a>
											)}
											<Description
												color={colorSettingsDefault.descriptionColor}
												size={fontSettingsDefault.descriptionFontSize}
												state={ref.description}
											/>
										</div>
									</div>
								))}
							</div>
						</Section>
					)}
					{store.languages?.length > 0 && (
						<Section
							id="languages"
							title={"Languages"}
							color={colorSettingsDefault.h2Color}
							size={fontSettingsDefault.h2FontSize}
							align={sectionSettingsDefault.align}
							titleCase={sectionSettingsDefault.titleCase}
						>
							<div className="flex flex-col w-full gap-2">
								{store.languages.map((lang, index) => (
									<div
										key={index}
										className={cn("flex flex-col w-full", getAlignmentClass())}
									>
										<h3
											className={cn(
												"font-semibold",
												fontSettingsDefault.h3FontSize
											)}
											style={{ color: colorSettingsDefault.h3Color }}
										>
											{lang.language}
										</h3>
										<p
											style={{ color: colorSettingsDefault.textColor }}
											className={cn(
												"whitespace-nowrap opacity-80",
												fontSettingsDefault.textFontSize
											)}
										>
											{`${lang.level}`}
										</p>
									</div>
								))}
							</div>
						</Section>
					)}
					{store.interests?.length > 0 && (
						<Section
							id="interests"
							title={"Interests"}
							color={colorSettingsDefault.h2Color}
							size={fontSettingsDefault.h2FontSize}
							align={sectionSettingsDefault.align}
							titleCase={sectionSettingsDefault.titleCase}
						>
							<p
								style={{ color: colorSettingsDefault.textColor }}
								className={cn(
									"w-full opacity-90",
									fontSettingsDefault.textFontSize,
									sectionSettingsDefault.align
								)}
							>
								{store.interests.join(" · ")}
							</p>
						</Section>
					)}
				</div>
				{/* --- Right Column --- */}
				<div className="flex flex-col gap-y-6">
					{store.experience?.length > 0 && (
						<Section
							id="experience"
							title={"Experience"}
							color={colorSettingsDefault.h2Color}
							size={fontSettingsDefault.h2FontSize}
							align={"text-left"}
							titleCase={sectionSettingsDefault.titleCase}
						>
							<div className="flex flex-col w-full gap-4">
								{store.experience.map((exp, index) => (
									<div
										key={index}
										className="flex flex-col w-full text-left print-break-inside-avoid"
									>
										<div className="flex items-center justify-between w-full flex-wrap">
											<h3
												className={cn(
													"font-semibold",
													fontSettingsDefault.h3FontSize
												)}
												style={{ color: colorSettingsDefault.h3Color }}
											>
												{exp.jobTitle}
											</h3>
											<p
												style={{ color: colorSettingsDefault.textColor }}
												className={cn(
													"text-xs opacity-70 whitespace-nowrap ml-2 flex-shrink-0",
													fontSettingsDefault.textFontSize
												)}
											>
												{formatDate(exp.startDate, localeIso)} -{" "}
												{exp.endDate
													? formatDate(exp.endDate, localeIso)
													: "Present"}
											</p>
										</div>
										<h4
											style={{ color: colorSettingsDefault.textColor }}
											className={cn(
												"font-normal opacity-90 mt-0.5",
												fontSettingsDefault.textFontSize
											)}
										>
											{exp.company}
											{exp.city && `, ${exp.city}`}
										</h4>
										<Description
											color={colorSettingsDefault.descriptionColor}
											size={fontSettingsDefault.descriptionFontSize}
											state={exp.description}
										/>
									</div>
								))}
							</div>
						</Section>
					)}
					{store.education?.length > 0 && (
						<Section
							id="education"
							title={"Education"}
							color={colorSettingsDefault.h2Color}
							size={fontSettingsDefault.h2FontSize}
							align={"text-left"}
							titleCase={sectionSettingsDefault.titleCase}
						>
							<div className="flex flex-col w-full gap-4">
								{store.education.map((edu, index) => (
									<div
										key={index}
										className="flex flex-col w-full text-left print-break-inside-avoid"
									>
										<div className="flex items-center justify-between w-full flex-wrap">
											<h3
												className={cn(
													"font-semibold",
													fontSettingsDefault.h3FontSize
												)}
												style={{ color: colorSettingsDefault.h3Color }}
											>
												{edu.degree}
												{edu.fieldOfStudy && ` - ${edu.fieldOfStudy}`}
											</h3>
											<p
												style={{ color: colorSettingsDefault.textColor }}
												className={cn(
													"text-xs opacity-70 whitespace-nowrap ml-2 flex-shrink-0",
													fontSettingsDefault.textFontSize
												)}
											>
												{formatDate(edu.startDate, localeIso)} -{" "}
												{edu.endDate
													? formatDate(edu.endDate, localeIso)
													: "Present"}
											</p>
										</div>
										<h4
											style={{ color: colorSettingsDefault.textColor }}
											className={cn(
												"font-normal opacity-90 mt-0.5",
												fontSettingsDefault.textFontSize
											)}
										>
											{edu.institution}
											{edu.city && `, ${edu.city}`}
										</h4>
										<Description
											color={colorSettingsDefault.descriptionColor}
											size={fontSettingsDefault.descriptionFontSize}
											state={edu.description}
										/>
									</div>
								))}
							</div>
						</Section>
					)}
					{store.projects?.length > 0 && (
						<Section
							id="projects"
							title={"Projects"}
							color={colorSettingsDefault.h2Color}
							size={fontSettingsDefault.h2FontSize}
							align={"text-left"}
							titleCase={sectionSettingsDefault.titleCase}
						>
							<div className="flex flex-col w-full gap-4">
								{store.projects.map((project, index) => (
									<div
										key={index}
										className="flex flex-col w-full text-left print-break-inside-avoid"
									>
										<div className="flex items-center justify-between w-full flex-wrap gap-x-2">
											<h3
												className={cn(
													"font-semibold",
													fontSettingsDefault.h3FontSize
												)}
												style={{ color: colorSettingsDefault.h3Color }}
											>
												{project.title}
											</h3>
											<div className="flex items-center gap-2 ml-auto flex-shrink-0">
												{project.liveLink && (
													<a
														target="_blank"
														rel="noopener noreferrer"
														href={
															String(project.liveLink).startsWith("http")
																? project.liveLink
																: `https://${project.liveLink}`
														}
														className={cn(
															"flex items-center gap-1 hover:underline",
															fontSettingsDefault.hyperLinkFontSize
														)}
														style={{
															color: colorSettingsDefault.hyperLinkColor,
														}}
														aria-label={`${project.title} Live Link`}
													>
														{sectionSettingsDefault.projectLink === "icon" ? (
															<MdArrowOutward size={14} />
														) : (
															"Live"
														)}
													</a>
												)}
												{project.liveLink && project.githubLink && (
													<span className="opacity-40 text-xs">|</span>
												)}
												{project.githubLink && (
													<a
														target="_blank"
														rel="noopener noreferrer"
														href={
															String(project.githubLink).startsWith("http")
																? project.githubLink
																: `https://${project.githubLink}`
														}
														className={cn(
															"flex items-center gap-1 hover:underline",
															fontSettingsDefault.hyperLinkFontSize
														)}
														style={{
															color: colorSettingsDefault.hyperLinkColor,
														}}
														aria-label={`${project.title} Github Link`}
													>
														{sectionSettingsDefault.projectLink === "icon" ? (
															<FaGithub size={13} />
														) : (
															"GitHub"
														)}
													</a>
												)}
											</div>
										</div>
										{project?.technologies?.length > 0 && (
											<p
												style={{ color: colorSettingsDefault.textColor }}
												className={cn(
													"text-left mt-0.5 opacity-80",
													fontSettingsDefault.textFontSize
												)}
											>
												<span
													className={cn(
														"font-medium opacity-100",
														fontSettingsDefault.textFontSize
													)}
													style={{ color: colorSettingsDefault.h3Color }}
												>
													{"Technologies"}:
												</span>{" "}
												{project.technologies.join(", ")}
											</p>
										)}
										<Description
											color={colorSettingsDefault.descriptionColor}
											size={fontSettingsDefault.descriptionFontSize}
											state={project.description}
										/>
									</div>
								))}
							</div>
						</Section>
					)}
					{store.certificates?.length > 0 && (
						<Section
							id="certificates"
							title={"Certificates"}
							color={colorSettingsDefault.h2Color}
							size={fontSettingsDefault.h2FontSize}
							align={"text-left"}
							titleCase={sectionSettingsDefault.titleCase}
						>
							<div className="flex flex-col w-full gap-4">
								{store.certificates.map((certificate, index) => (
									<div
										key={index}
										className="flex flex-col w-full text-left print-break-inside-avoid"
									>
										<div className="flex items-center justify-between w-full flex-wrap">
											<h3
												className={cn(
													"font-semibold",
													fontSettingsDefault.h3FontSize
												)}
												style={{ color: colorSettingsDefault.h3Color }}
											>
												{certificate.title}
											</h3>
											<p
												style={{ color: colorSettingsDefault.textColor }}
												className={cn(
													"text-xs opacity-70 whitespace-nowrap ml-2 flex-shrink-0",
													fontSettingsDefault.textFontSize
												)}
											>
												{formatDate(certificate.date, localeIso)}
											</p>
										</div>
										{certificate.institution && (
											<h4
												style={{ color: colorSettingsDefault.textColor }}
												className={cn(
													"font-normal opacity-90 mt-0.5 italic",
													fontSettingsDefault.textFontSize
												)}
											>
												{certificate.institution}
											</h4>
										)}
										<Description
											color={colorSettingsDefault.descriptionColor}
											size={fontSettingsDefault.descriptionFontSize}
											state={certificate.description}
										/>
									</div>
								))}
							</div>
						</Section>
					)}
				</div>
			</div>
		</div>
	);
};

export default Template2;
