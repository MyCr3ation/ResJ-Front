// Template9.jsx
import React from "react";
// MODIFIED: Icon Imports based on your list for social links
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
import useStore from "../../store/store";

// --- Local Helper: cn (Conditional ClassNames) ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Local Helper: formatDate (from previous templates) ---
const formatDate = (
	dateString,
	locale, // Can be undefined
	options = { month: "long", year: "numeric" } // Default options to match HTML example (e.g., "September 2013")
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
const DEFAULT_FONT_FAMILY_MERRIWEATHER = "'Merriweather', serif";
const DEFAULT_FONT_FAMILY_SOURCE_SANS = "'Source Sans Pro', sans-serif";

const translations = {
	present: "Present",
	// Section titles will be taken from the HTML example where possible
};

// MODIFIED: Social Icons Map for Template 9 based on your list
const LOCAL_SOCIALS_MAP_T9 = {
	linkedin: {
		name: "LinkedIn",
		logo: <FaLinkedin />,
		className: "inline mr-1.5",
	},
	github: { name: "GitHub", logo: <FaGithub />, className: "inline mr-1.5" },
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

// Default template settings for Template9 - "HTML CV Style"
const defaultTemplateSettings = {
	name: "HTML CV Style",
	templateNumber: 9,

	// Theme Colors from style.css
	primaryColor: "#ba0018",
	textColorMain: "#444", // for .desc and general text
	textColorLight: "#aaa", // for .light
	textColorKeyBefore: "#555", // for .key::before
	borderColor: "#ddd",
	bodyBgColor: "#fff", // From html, body in CSS (though it's #181818 there, page is #fff)
	pageBgColor: "#fff", // From .page in CSS

	// Fonts (will be applied via inline styles)
	fontFamilyMerriweather: DEFAULT_FONT_FAMILY_MERRIWEATHER,
	fontFamilySourceSans: DEFAULT_FONT_FAMILY_SOURCE_SANS,

	// These are less relevant for dynamic control in this static HTML port
	// but kept for structural consistency with other templates.
	imageSize: "0", // HTML doesn't have an image in the header
	projectLink: "text",
	spaceBetween: "normal",
	align: "left",
	titleCase: "normal-case",
	fontFamily: "", // Will use the specific families above
	h1Color: "",
	h2Color: "",
	h3Color: "",
	textColor: "",
	descriptionColor: "",
	hyperLinkColor: "",
	h1FontSize: "",
	h2FontSize: "",
	h3FontSize: "",
	textFontSize: "",
};

// --- Helper: Description Component ---
const Description = ({ state, color, size, className, settings }) => {
	if (!state || state === "<p><br></p>" || state === "<p></p>") return null;
	// If description is a simple string, wrap it in a p tag styled like .desc
	if (typeof state === "string" && !state.startsWith("<")) {
		return (
			<p
				style={{
					fontFamily: settings.fontFamilySourceSans,
					color: color || settings.textColorMain,
					fontSize: "16px",
				}}
				className={cn("leading-normal", size, className)}
			>
				{state}
			</p>
		);
	}
	// If it's HTML, use dangerouslySetInnerHTML and try to style with prose
	return (
		<div
			dangerouslySetInnerHTML={{ __html: state }}
			className={cn(
				"prose prose-sm max-w-none",
				// Attempt to match .desc styling for paragraphs within the HTML
				"prose-p:font-['Source_Sans_Pro'] prose-p:text-base prose-p:text-[#444]",
				"prose-ul:font-['Source_Sans_Pro'] prose-ul:text-base prose-ul:text-[#444] prose-ul:pl-[15px] prose-ul:list-disc", // Match ul.desc from css
				"prose-li:font-['Source_Sans_Pro'] prose-li:text-base prose-li:text-[#444]",
				size, // Tailwind font size class
				className
			)}
		/>
	);
};

// --- Reusable Section Component for HTML CV Style ---
const CvHtmlSection = ({
	title,
	children,
	settings,
	titleWidthClass = "md:w-[150px]",
}) => {
	// Do not render section if children are effectively empty
	const hasContent = React.Children.toArray(children).some((child) => {
		if (child === null || child === undefined) return false;
		if (typeof child === "string" && child.trim() === "") return false;
		if (
			React.isValidElement(child) &&
			child.props.state &&
			(child.props.state === "<p><br></p>" || child.props.state === "<p></p>")
		)
			return false;
		if (Array.isArray(child) && child.length === 0) return false; // Check for empty arrays (e.g. mapping an empty list)
		return true;
	});

	if (!hasContent && !title) return null;
	// If there is a title but no content (after filtering empty children), don't render
	if (title && !hasContent) return null;

	return (
		<div
			className="border-b py-[10px] px-0 last:border-none"
			style={{ borderColor: settings.borderColor }}
		>
			<div className="flex flex-col md:flex-row">
				{" "}
				{/* .section .row */}
				<h2
					className={cn("text-lg font-bold pl-5 pt-3", titleWidthClass)}
					style={{
						fontFamily: settings.fontFamilyMerriweather,
						color: settings.primaryColor,
					}}
				>
					{title}
				</h2>
				<div className="md:flex-1 text-lg leading-6 my-2.5 px-2.5">
					{" "}
					{/* .section-text .col-right */}
					{children}
				</div>
			</div>
		</div>
	);
};

// --- Main Template Component ---
const Template9 = ({}) => {
	const { store } = useStore();
	const template = defaultTemplateSettings;
	// MODIFIED: localeIso removed

	const settings = { ...template }; // Use settings directly

	// Helper to generate date string like "September 2013 - May 2015" or "July 2015 - Present"
	const formatDateRange = (startDate, endDate) => {
		const start = startDate ? formatDate(startDate, undefined) : "";
		const end = endDate ? formatDate(endDate, undefined) : translations.present;
		if (!start && !end) return "";
		if (start && end === translations.present && !endDate)
			return `${start} - ${translations.present}`; // Only show present if endDate is truly absent
		if (start && end) return `${start} - ${end}`;
		return start || end;
	};

	return (
		// MODIFIED: Outermost div for A4 page consistency
		<div
			style={{ fontFamily: settings.fontFamilySourceSans }} // Default body font
			className="w-[210mm] min-h-[297mm] bg-white mx-auto my-0 shadow-lg rounded-sm overflow-x-hidden overflow-y-auto print:shadow-none print:my-0 print:bg-transparent"
		>
			{/* Inner div mimicking .page from HTML */}
			<div
				className="max-w-[1000px] min-h-[29.7cm] mx-auto px-[20px] md:px-[50px] py-[20px] print:w-full print:min-h-0 print:p-[1cm]"
				style={{ backgroundColor: settings.pageBgColor }}
			>
				{/* Header Section */}
				<div
					className="border-b py-[10px] px-0"
					style={{ borderColor: settings.borderColor }}
				>
					<div className="flex flex-col md:flex-row items-start md:items-center">
						{" "}
						{/* .section .row */}
						<h1
							className="text-[40px] font-light p-2.5 md:pb-[10px] md:pl-[10px] md:pr-[10px]"
							style={{
								fontFamily: settings.fontFamilyMerriweather,
								color: settings.primaryColor,
								marginBottom: "0px",
								marginTop: "5px",
							}}
						>
							<span className="font-bold">{store.personal.name}</span>{" "}
							{store.personal.surname}
						</h1>
						<div className="text-base text-left md:text-right md:ml-auto mt-2 md:mt-0 px-2.5 md:px-0">
							{" "}
							{/* .contact-info .col-right */}
							{store.personal.phone && <div>{store.personal.phone}</div>}
							{store.personal.email && (
								<div>
									<a
										href={`mailto:${store.personal.email}`}
										className="text-[#ba0018] inline-block no-underline px-1 py-0.5 rounded hover:bg-[#ba0018] hover:text-white"
									>
										{store.personal.email}
									</a>
								</div>
							)}
							{/* Displaying social links here */}
							{Object.entries(store.socialLinks || {}).map(([key, value]) => {
								if (!value) return null;
								const socialEntry = LOCAL_SOCIALS_MAP_T9[key.toLowerCase()];
								const url = String(value).startsWith("http")
									? String(value)
									: `https://${String(value)}`;
								if (socialEntry) {
									return (
										<div key={key} className="mt-0.5">
											<a
												href={url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-[#ba0018] inline-flex items-start gap-1 no-underline px-1 py-0.5 rounded hover:bg-[#ba0018] hover:text-white"
												title={url}
											>
												{React.cloneElement(socialEntry.logo, {
													className: socialEntry.className,
													size: "1em",
												})}
												<span className="min-w-0 break-all">
													{url.replace(/^https?:\/\/(www\.)?/, "")}
												</span>
											</a>
										</div>
									);
								}
								return null;
							})}
						</div>
					</div>
				</div>

				{/* Interests Section */}
				{store.interests?.length > 0 && (
					<CvHtmlSection title="Interests" settings={settings}>
						<div className="flex flex-wrap">
							{store.interests.map((interest, index) => (
								<span
									key={index}
									className="mx-2.5 relative first:ml-0 before:content-['◆'] before:absolute before:left-[-15px] before:text-[#555] before:text-[7pt] first:before:content-none"
								>
									{interest}
								</span>
							))}
						</div>
					</CvHtmlSection>
				)}

				{/* Skills Section */}
				{store.skills?.length > 0 && (
					<CvHtmlSection title="Skills" settings={settings}>
						<div className="flex flex-wrap">
							{store.skills.map((skill, index) => (
								<span
									key={index}
									className="mx-2.5 relative first:ml-0 before:content-['◆'] before:absolute before:left-[-15px] before:text-[#555] before:text-[7pt] first:before:content-none"
								>
									{skill}
								</span>
							))}
						</div>
					</CvHtmlSection>
				)}

				{/* Education Section */}
				{store.education?.length > 0 && (
					<CvHtmlSection title="Education" settings={settings}>
						{store.education.map((edu, index) => (
							<div key={index} className="mb-4 last:mb-0">
								{" "}
								{/* Each education entry */}
								<h3
									className="text-lg font-bold leading-7 mt-1.25 mb-0"
									style={{ fontFamily: settings.fontFamilyMerriweather }}
								>
									<span className="font-bold">{edu.degree}</span>{" "}
									{edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
								</h3>
								<div>{edu.institution}</div>
								<div className="flex flex-col sm:flex-row justify-between">
									<div
										className="text-[#aaa] tracking-wider text-sm leading-7 uppercase"
										style={{ fontFamily: settings.fontFamilySourceSans }}
									>
										{edu.city}
									</div>
									<div
										className="text-[#aaa] tracking-wider text-sm leading-7 uppercase sm:text-right"
										style={{ fontFamily: settings.fontFamilySourceSans }}
									>
										{formatDateRange(edu.startDate, edu.endDate)}
									</div>
								</div>
								{edu.description && (
									<Description
										state={edu.description}
										settings={settings}
										className="text-sm mt-1"
										color={settings.textColorMain}
									/>
								)}
							</div>
						))}
					</CvHtmlSection>
				)}

				{/* Experience Section */}
				{store.experience?.length > 0 && (
					<CvHtmlSection title="Experience" settings={settings}>
						{store.experience.map((exp, index) => (
							<div key={index} className="mb-4 last:mb-0">
								{" "}
								{/* Each experience entry */}
								<h3
									className="text-lg font-bold leading-7 mt-1.25 mb-0"
									style={{ fontFamily: settings.fontFamilyMerriweather }}
								>
									{exp.company}
								</h3>
								<div className="my-[10px] mt-2.5 mb-1.25">
									{" "}
									{/* .subsection */}
									<div className="flex flex-col sm:flex-row justify-between">
										<div
											className="font-bold"
											style={{ fontFamily: settings.fontFamilyMerriweather }}
										>
											{exp.jobTitle}
										</div>
										<div
											className="text-[#aaa] tracking-wider text-sm leading-7 uppercase sm:text-right"
											style={{ fontFamily: settings.fontFamilySourceSans }}
										>
											{formatDateRange(exp.startDate, exp.endDate)}
										</div>
									</div>
								</div>
								{/* The HTML uses <ul> for description items. Assuming exp.description is HTML <li> string */}
								<Description
									state={exp.description}
									settings={settings}
									className="text-base"
									color={settings.textColorMain}
								/>
							</div>
						))}
					</CvHtmlSection>
				)}

				{/* Projects Section */}
				{/* The HTML only shows a GitHub link. We can adapt to show store.projects or default to github link */}
				{(store.projects?.length > 0 || store.socialLinks?.github) && (
					<CvHtmlSection title="Projects" settings={settings}>
						{store.projects?.length > 0
							? store.projects.map((project, index) => (
									<div key={index} className="mb-4 last:mb-0">
										<h3
											className="text-lg font-bold leading-7 mt-1.25 mb-0"
											style={{ fontFamily: settings.fontFamilyMerriweather }}
										>
											<a
												href={project.liveLink || project.githubLink || "#"}
												target="_blank"
												rel="noopener noreferrer"
												className="text-[#ba0018] inline-block no-underline px-1 py-0.5 rounded hover:bg-[#ba0018] hover:text-white"
											>
												{project.title}
											</a>
										</h3>
										{project.technologies?.length > 0 && (
											<div className="text-sm text-[#aaa] italic my-1">
												Built with: {project.technologies.join(", ")}
											</div>
										)}
										<Description
											state={project.description}
											settings={settings}
											className="text-base"
											color={settings.textColorMain}
										/>
									</div>
							  ))
							: store.socialLinks?.github && (
									<h3
										className="text-lg font-bold leading-7 mt-1.25 mb-0"
										style={{ fontFamily: settings.fontFamilyMerriweather }}
									>
										<a
											href={
												String(store.socialLinks.github).startsWith("http")
													? store.socialLinks.github
													: `https://${store.socialLinks.github}`
											}
											target="_blank"
											rel="noopener noreferrer"
											className="text-[#ba0018] inline-block no-underline px-1 py-0.5 rounded hover:bg-[#ba0018] hover:text-white"
										>
											{String(store.socialLinks.github).replace(
												/^https?:\/\//,
												""
											)}
										</a>
									</h3>
							  )}
					</CvHtmlSection>
				)}

				{/* Certificates (Honors in HTML) Section */}
				{store.certificates?.length > 0 && (
					<CvHtmlSection title="Honors" settings={settings}>
						{" "}
						{/* Using "Honors" as per HTML */}
						{store.certificates.map((cert, index) => (
							<div key={index} className="mb-4 last:mb-0">
								<h3
									className="text-lg font-bold leading-7 mt-1.25 mb-0"
									style={{ fontFamily: settings.fontFamilyMerriweather }}
								>
									{cert.title}
								</h3>
								<div className="my-[10px] mt-2.5 mb-1.25">
									{" "}
									{/* .subsection */}
									<div className="flex flex-col sm:flex-row justify-between">
										{/* Assuming cert.issuer or a similar field for "Algorithmic Programming Competition" line */}
										{cert.institution && (
											<div
												className="font-bold"
												style={{ fontFamily: settings.fontFamilyMerriweather }}
											>
												{cert.institution}
											</div>
										)}
										<div
											className="text-[#aaa] tracking-wider text-sm leading-7 uppercase sm:text-right"
											style={{ fontFamily: settings.fontFamilySourceSans }}
										>
											{cert.date ? formatDate(cert.date, undefined) : ""}
										</div>
									</div>
								</div>
								<Description
									state={cert.description}
									settings={settings}
									className="text-base"
									color={settings.textColorMain}
								/>
							</div>
						))}
					</CvHtmlSection>
				)}

				{/* Add Languages and References if data exists, following the CvHtmlSection pattern */}
				{store.languages?.length > 0 && (
					<CvHtmlSection title="Languages" settings={settings}>
						<div className="flex flex-wrap">
							{store.languages.map((lang, index) => (
								<span
									key={index}
									className="mx-2.5 relative first:ml-0 before:content-['◆'] before:absolute before:left-[-15px] before:text-[#555] before:text-[7pt] first:before:content-none"
								>
									{lang.language} ({lang.level})
								</span>
							))}
						</div>
					</CvHtmlSection>
				)}
			</div>
		</div>
	);
};

export default Template9;
