// src/pages/Resume.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { HiChevronDown } from "react-icons/hi";
import SectionNavigationItems from "../components/Resume/SectionNavigationItems.jsx";
import Stepper from "../components/Resume/Stepper.jsx";
import useStore from "../store/store.jsx";

// Import your actual section components
import Personal from "../components/Resume/Sections/Personal.jsx";
import Social from "../components/Resume/Sections/Social.jsx";
import Summary from "../components/Resume/Sections/Summary.jsx";
import Experience from "../components/Resume/Sections/Experience.jsx";
import Education from "../components/Resume/Sections/Education.jsx";
import Skills from "../components/Resume/Sections/Skills.jsx";
import Projects from "../components/Resume/Sections/Projects.jsx";
import Languages from "../components/Resume/Sections/Languages.jsx";
import Certificates from "../components/Resume/Sections/Certificates.jsx";
import Interests from "../components/Resume/Sections/Interests.jsx";
import References from "../components/Resume/Sections/References.jsx";

const SECTIONS_CONFIG = [
	{ id: "personal", label: "Personal Information" },
	{ id: "social", label: "Social Links" },
	{ id: "summary", label: "Summary" },
	{ id: "experience", label: "Experience" },
	{ id: "education", label: "Education" },
	{ id: "skills", label: "Skills" },
	{ id: "projects", label: "Projects" },
	{ id: "languages", label: "Languages" },
	{ id: "certificates", label: "Certificates" },
	{ id: "interests", label: "Interests" },
	{ id: "references", label: "References" },
];

const getSectionIdFromQuery = (queryStep, sectionsArray) => {
	if (!queryStep) {
		return sectionsArray[0].id;
	}
	// No need to parse as int if IDs are strings
	if (sectionsArray.some((sec) => sec.id === queryStep)) {
		return queryStep;
	}
	return sectionsArray[0].id;
};

const Resume = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const { store, loadSampleData: zustandLoadSampleData } = useStore();

	const sections = SECTIONS_CONFIG; // sections constant can be defined outside if it never changes

	const [activeSection, setActiveSection] = useState(() => {
		const initialStepFromQuery = searchParams.get("step");
		return getSectionIdFromQuery(initialStepFromQuery, sections);
	});

	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	useEffect(() => {
		const stepFromQuery = searchParams.get("step");
		// Directly set active section based on query param.
		// The getSectionIdFromQuery handles defaults and validation.
		setActiveSection(getSectionIdFromQuery(stepFromQuery, sections));
	}, [searchParams, sections]); // Simplified dependency array

	const baseHandleLoadSampleData = async () => {
		try {
			await zustandLoadSampleData();
			toast.success("Sample data loaded!");
		} catch (error) {
			toast.error("Failed to load sample data.");
			console.error("Error loading sample data in Resume component:", error);
		}
	};

	const handleSidebarSectionChange = (sectionId) => {
		setActiveSection(sectionId);
		setSearchParams({ step: sectionId }, { replace: true });
		setMobileNavOpen(false);
	};

	const handleMobileLoadSampleDataClick = async () => {
		await baseHandleLoadSampleData();
		setMobileNavOpen(false);
	};

	const isSectionComplete = (sectionIdToCheck, currentFullStoreData) => {
		if (!currentFullStoreData) return false;
		let isItComplete = false;
		switch (sectionIdToCheck) {
			case "personal":
				isItComplete = !!(
					currentFullStoreData.personal?.name &&
					currentFullStoreData.personal?.surname &&
					currentFullStoreData.personal?.email &&
					currentFullStoreData.personal?.phone &&
					currentFullStoreData.personal?.jobTitle &&
					currentFullStoreData.personal?.country &&
					currentFullStoreData.personal?.city
				);
				break;
			case "social":
				isItComplete = !!(
					currentFullStoreData.socialLinks &&
					Object.values(currentFullStoreData.socialLinks).some(
						(link) => link && link.trim() !== ""
					)
				);
				break;
			case "summary":
				isItComplete = !!(
					currentFullStoreData.summary &&
					currentFullStoreData.summary.replace(/<(.|\n)*?>/g, "").trim() !== ""
				);
				break;
			case "experience":
				isItComplete = !!(
					currentFullStoreData.experience?.length > 0 &&
					currentFullStoreData.experience.some(
						(exp) => exp.company && exp.jobTitle
					)
				);
				break;
			case "education":
				isItComplete = !!(
					currentFullStoreData.education?.length > 0 &&
					currentFullStoreData.education.some(
						(edu) => edu.institution && edu.degree
					)
				);
				break;
			case "skills":
				isItComplete = !!(
					currentFullStoreData.skills?.length > 0 &&
					currentFullStoreData.skills.some(
						(skill) => skill && skill.trim() !== ""
					)
				);
				break;
			case "projects":
				isItComplete = !!(
					currentFullStoreData.projects?.length > 0 &&
					currentFullStoreData.projects.some((proj) => proj.title)
				);
				break;
			case "languages":
				isItComplete = !!(
					currentFullStoreData.languages?.length > 0 &&
					currentFullStoreData.languages.some(
						(lang) => lang.language && lang.level
					)
				);
				break;
			case "certificates":
				isItComplete = !!(
					currentFullStoreData.certificates?.length > 0 &&
					currentFullStoreData.certificates.some(
						(cert) => cert.title && cert.date
					)
				);
				break;
			case "interests":
				isItComplete = !!(
					currentFullStoreData.interests?.length > 0 &&
					currentFullStoreData.interests.some(
						(interest) => interest && interest.trim() !== ""
					)
				);
				break;
			case "references":
				isItComplete = !!(
					currentFullStoreData.references?.length > 0 &&
					currentFullStoreData.references.some((ref) => ref.name && ref.company)
				);
				break;
			default:
				isItComplete = false;
		}
		return isItComplete;
	};

	const areAllSectionsComplete = () => {
		return sections.every((section) => isSectionComplete(section.id, store));
	};

	const handleFinishAndPreview = () => {
		if (areAllSectionsComplete()) {
			// --- MODIFIED: Navigate to the choose template page instead of opening a modal ---
			navigate("/choose-template");
		} else {
			toast.error("Please complete all sections before choosing a template.");
			const firstIncomplete = sections.find(
				(section) => !isSectionComplete(section.id, store)
			);
			if (firstIncomplete) {
				handleSidebarSectionChange(firstIncomplete.id);
			}
		}
	};

	const currentIndex = sections.findIndex((sec) => sec.id === activeSection);
	const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
	const nextSection =
		currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

	const baseRouteForStepper = location.pathname;
	const prevLink = prevSection
		? `${baseRouteForStepper}?step=${prevSection.id}`
		: null;
	const nextLinkIfAvailable = nextSection
		? `${baseRouteForStepper}?step=${nextSection.id}`
		: null;

	const prevTitle = prevSection ? prevSection.label : undefined;
	const nextTitle = nextSection ? nextSection.label : undefined;
	const currentSectionLabel =
		sections.find((s) => s.id === activeSection)?.label || "Resume Sections";

	const renderSectionComponent = () => {
		switch (activeSection) {
			case "personal":
				return <Personal />;
			case "social":
				return <Social />;
			case "summary":
				return <Summary />;
			case "experience":
				return <Experience />;
			case "education":
				return <Education />;
			case "skills":
				return <Skills />;
			case "projects":
				return <Projects />;
			case "languages":
				return <Languages />;
			case "certificates":
				return <Certificates />;
			case "interests":
				return <Interests />;
			case "references":
				return <References />;
			default:
				return (
					<div className="text-center text-gray-500 py-10">
						Please select a section.
					</div>
				);
		}
	};

	return (
		<>
			<div className="min-h-screen py-6 sm:py-8 w-full bg-brandGreen-50">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
					{/* Mobile Navigation Dropdown */}
					<div className="lg:hidden mb-6 relative z-20">
						{" "}
						{/* Increased z-index for mobile nav */}
						<button
							onClick={() => setMobileNavOpen(!mobileNavOpen)}
							className="w-full flex items-center justify-between px-4 py-4 bg-white text-gray-700 font-semibold rounded-2xl shadow-lg border border-brandGreen-200 hover:shadow-xl transition-all duration-200 ease-in-out focus:outline-none"
							aria-expanded={mobileNavOpen}
							aria-controls="mobile-sections-nav"
						>
							<span className="truncate text-left">
								<span className="text-xs text-gray-500 block -mb-0.5">
									Current Section
								</span>
								{currentSectionLabel}
							</span>
							<HiChevronDown
								className={`w-5 h-5 transform transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-gray-500 ${
									mobileNavOpen ? "rotate-180" : "rotate-0"
								}`}
							/>
						</button>
						<div
							id="mobile-sections-nav"
							className={`absolute top-full left-0 right-0 mt-2 origin-top z-50 bg-white rounded-2xl shadow-xl border border-brandGreen-200 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
								mobileNavOpen
									? "max-h-[calc(80vh-100px)] opacity-100 visible scale-100 p-3 sm:p-4 overflow-y-auto" // Adjusted max-h
									: "max-h-0 opacity-0 invisible scale-95 p-0"
							}`}
						>
							<SectionNavigationItems
								sections={sections}
								activeSection={activeSection}
								isSectionComplete={isSectionComplete}
								store={store}
								onSectionClick={handleSidebarSectionChange}
								onLoadSampleDataClick={handleMobileLoadSampleDataClick}
								isMobile={true}
							/>
						</div>
					</div>

					{/* Main Layout: Sidebar and Content Area */}
					<div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
						{/* Desktop Sidebar */}
						<aside className="hidden lg:block lg:w-72 xl:w-80 bg-white rounded-2xl shadow-lg border border-brandGreen-200 p-4 sm:p-5 h-fit lg:sticky lg:top-8 z-10">
							{" "}
							{/* Added z-index for sidebar */}
							<SectionNavigationItems
								sections={sections}
								activeSection={activeSection}
								isSectionComplete={isSectionComplete}
								store={store}
								onSectionClick={handleSidebarSectionChange}
								onLoadSampleDataClick={baseHandleLoadSampleData}
								isMobile={false}
							/>
						</aside>

						{/* Content Area */}
						<div className="flex-1 w-full">
							<div className="bg-white rounded-2xl shadow-lg border border-brandGreen-200 p-6 sm:p-8 min-h-[300px]">
								{renderSectionComponent()}
								<div className="mt-8 sm:mt-10 pt-3 sm:pt-5 border-t border-brandGreen-200 flex justify-between w-full">
									{" "}
									{/* Changed justify-content-space-between to justify-between */}
									<Stepper
										prev={prevLink}
										next={nextLinkIfAvailable}
										prevTitle={prevTitle}
										nextTitle={nextTitle}
										isLastStep={!nextSection}
										onFinishAndPreview={handleFinishAndPreview}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Resume;
