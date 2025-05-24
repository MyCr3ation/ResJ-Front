// src/pages/ChooseTemplate.jsx
import React, { useRef } from "react"; // Removed useEffect as onLoad handles the timing
import { useNavigate, Link } from "react-router-dom"; // Link for back button (optional)
import Button from "../components/Button.jsx"; // Your Button component

// Import your template preview images
import Template1Img from "../assets/templates/template1.webp";
import Template2Img from "../assets/templates/template2.webp";
import Template3Img from "../assets/templates/template3.webp";
import Template4Img from "../assets/templates/template4.webp";
import Template5Img from "../assets/templates/template5.webp";
import Template6Img from "../assets/templates/template6.webp";
import Template7Img from "../assets/templates/template7.webp";
import Template8Img from "../assets/templates/template8.webp";
import Template9Img from "../assets/templates/template9.webp";
import Template10Img from "../assets/templates/template10.webp";

const TEMPLATE_PREVIEWS = [
	{
		id: "template1",
		name: "Classic Harmony",
		imageSrc: Template1Img,
		description: "A timeless design focusing on clarity and professionalism.",
	},
	{
		id: "template2",
		name: "Modern Columnar",
		imageSrc: Template2Img,
		description:
			"A sleek, two-column layout for structured, contemporary appeal.",
	},
	{
		id: "template3",
		name: "Sidebar Spotlight",
		imageSrc: Template3Img,
		description:
			"Features a prominent sidebar for contact details and key skills.",
	},
	{
		id: "template4",
		name: "Creative Timeline Header",
		imageSrc: Template4Img,
		description:
			"A dynamic header combined with a clear timeline for experience.",
	},
	{
		id: "template5",
		name: "Dynamic Card Grid",
		imageSrc: Template5Img,
		description:
			"Organizes content into visually distinct cards on a responsive grid.",
	},
	{
		id: "template6",
		name: "Traditional Professional",
		imageSrc: Template6Img,
		description:
			"A very standard, no-frills layout ideal for conservative fields.",
	},
	{
		id: "template7",
		name: "Clean Two-Column",
		imageSrc: Template7Img,
		description:
			"A balanced and modern two-column design for excellent readability.",
	},
	{
		id: "template8",
		name: "Minimalist Timeline Focus",
		imageSrc: Template8Img,
		description:
			"Emphasizes a clean, single-column layout with a strong vertical timeline.",
	},
	{
		id: "template9",
		name: "Color Block Grid",
		imageSrc: Template9Img,
		description:
			"Features a bold color block header and a grid layout for key sections.",
	},
	{
		id: "template10",
		name: "Asymmetric Slant",
		imageSrc: Template10Img,
		description:
			"A modern design using a diagonal division for a dynamic visual flow.",
	},
];

// A simple Left Arrow Icon for the Button component
const ArrowLeftIcon = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={2.5}
		stroke="currentColor"
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
		/>
	</svg>
);

// Helper component for individual template card with logging
const TemplateCard = ({ template, onSelect }) => {
	const imageContainerRef = useRef(null);
	const imageRef = useRef(null);

	const handleImageError = () => {
		if (imageRef.current) {
			console.error(
				`[IMAGE LOAD ERROR] Template: ${template.id} - Source: ${imageRef.current.src}`
			);
		} else {
			console.error(
				`[IMAGE LOAD ERROR] Template: ${template.id} - Image ref not available.`
			);
		}
	};

	return (
		<div
			className="group bg-white rounded-xl shadow-lg hover:shadow-xl
                       border border-gray-300 hover:border-brandGreen-500
                       transition-all duration-300 ease-in-out
                       transform hover:-translate-y-1.5 flex flex-col cursor-pointer"
			onClick={() => onSelect(template)}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onSelect(template);
				}
			}}
			aria-label={`Select the ${template.name} template`}
		>
			{/* Image Container - This is the style discussed that should focus on top, fill width */}
			<div
				ref={imageContainerRef}
				className="w-full aspect-[3/4] overflow-hidden relative rounded-t-xl bg-gray-100 border-b border-gray-200"
			>
				<img
					ref={imageRef}
					src={template.imageSrc}
					alt={`${template.name} CV Template Preview`}
					className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
					loading="lazy"
					onError={handleImageError}
				/>
			</div>

			{/* Content Below Image */}
			<div className="p-5 text-center flex-grow flex flex-col justify-between">
				<div>
					<h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-brandGreen-600">
						{template.name}
					</h3>
					<p className="text-sm text-gray-600 mb-5 min-h-[4.5rem] overflow-hidden line-clamp-3">
						{template.description}
					</p>
				</div>
				<Button
					onClick={(e) => {
						e.stopPropagation(); // Prevent card's onClick from firing twice
						onSelect(template);
					}}
					className="w-full py-2.5 text-sm"
					ariaLabel={`Choose and customize the ${template.name} template`}
				>
					Select this Template
				</Button>
			</div>
		</div>
	);
};

const ChooseTemplate = () => {
	const navigate = useNavigate();

	const handleTemplateSelect = (template) => {
		// Navigate to the actual template preview page (e.g., /template/template1)
		navigate(`/template/${template.id}`);
	};

	return (
		<div className="min-h-screen bg-slate-200 py-10 sm:py-16">
			<div className="container mx-auto px-4">
				{/* Page Header */}
				<div className="mb-10 md:mb-14 text-center">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
						Select Your CV Template
					</h1>
					<p className="text-gray-700 text-md sm:text-lg max-w-2xl mx-auto">
						Browse our professionally designed templates. Find the perfect style
						to showcase your skills and experience, and start crafting your CV
						in minutes.
					</p>
				</div>

				{/* Template Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
					{TEMPLATE_PREVIEWS.map((template) => (
						<TemplateCard
							key={template.id}
							template={template}
							onSelect={handleTemplateSelect}
						/>
					))}
				</div>

				{/* Back Button */}
				<div className="mt-16 text-center">
					<Button
						onClick={() => navigate("/resume")} // Or wherever users come from
						IconComponent={ArrowLeftIcon}
						iconPosition="left"
						ariaLabel="Return to Resume Editor"
					>
						Back to Editor
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ChooseTemplate;
