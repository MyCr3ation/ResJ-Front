// src/pages/Template.jsx
import React, { useRef, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { HiDocumentDownload } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";

import Button from "../components/Button";

// Import your actual template components
import Template1 from "../components/Templates/Template1";
import Template2 from "../components/Templates/Template2";
import Template3 from "../components/Templates/Template3";
import Template4 from "../components/Templates/Template4";
import Template5 from "../components/Templates/Template5";
import Template6 from "../components/Templates/Template6";
import Template7 from "../components/Templates/Template7";
import Template8 from "../components/Templates/Template8";
import Template9 from "../components/Templates/Template9";
import Template10 from "../components/Templates/Template10";

import useStore from "../store/store";

// Helper function to get A4 dimensions in points (PDF unit)
const getA4InPoints = () => ({ width: 595.28, height: 841.89 });

const Template = () => {
	const [name, setName] = useState("");
	const { templateId } = useParams();
	const { store } = useStore();
	const navigate = useNavigate();
	const templatePreviewRef = useRef(null);

	const handleBackToChooseTemplate = () => {
		navigate("/choose-template");
	};

	useEffect(() => {
		switch (templateId) {
			case "template1":
				setName("Classic Harmony");
				break;
			case "template2":
				setName("Modern Columnar");
				break;
			case "template3":
				setName("Sidebar Spotlight");
				break;
			case "template4":
				setName("Creative Timeline Header");
				break;
			case "template5":
				setName("Dynamic Card Grid");
				break;
			case "template6":
				setName("Traditional Professional");
				break;
			case "template7":
				setName("Clean Two-Column");
				break;
			case "template8":
				setName("Minimalist Timeline Focus");
				break;
			case "template9":
				setName("Color Block Grid");
				break;
			case "template10":
				setName("Asymmetric Slant");
				break;
			default:
				setName("");
		}
	});

	const handleDownloadPdf = async () => {
		if (!templatePreviewRef.current) {
			console.error("Template preview element not found.");
			alert("Could not generate PDF: preview element missing.");
			return;
		}

		const elementToCapture = templatePreviewRef.current;

		try {
			const canvas = await html2canvas(elementToCapture, {
				scale: 2,
				useCORS: true,
				logging: false,
				windowWidth: elementToCapture.scrollWidth,
				windowHeight: elementToCapture.scrollHeight,
			});

			const imgData = canvas.toDataURL("image/jpeg", 0.9);

			const pdf = new jsPDF({
				orientation: "portrait",
				unit: "pt",
				format: "a4",
			});

			const a4 = getA4InPoints();
			const imgProps = pdf.getImageProperties(imgData);

			const ratio = Math.min(
				a4.width / imgProps.width,
				a4.height / imgProps.height
			);
			const imgWidth = imgProps.width * ratio;
			const imgHeight = imgProps.height * ratio;
			const x = (a4.width - imgWidth) / 2;
			const y = (a4.height - imgHeight) / 2;

			pdf.addImage(
				imgData,
				"JPEG",
				x,
				y,
				imgWidth,
				imgHeight,
				undefined,
				"FAST"
			);
			pdf.save(`${store.personal.name + " " + store.personal.surname}.pdf`);
		} catch (error) {
			console.error("Error generating PDF:", error);
			alert("Sorry, there was an error generating the PDF.");
		}
	};

	const renderSelectedTemplate = () => {
		let componentToRender;
		switch (templateId) {
			case "template1":
				componentToRender = <Template1 resumeData={store} />;
				break;
			case "template2":
				componentToRender = <Template2 resumeData={store} />;
				break;
			case "template3":
				componentToRender = <Template3 resumeData={store} />;
				break;
			case "template4":
				componentToRender = <Template4 resumeData={store} />;
				break;
			case "template5":
				componentToRender = <Template5 resumeData={store} />;
				break;
			case "template6":
				componentToRender = <Template6 resumeData={store} />;
				break;
			case "template7":
				componentToRender = <Template7 resumeData={store} />;
				break;
			case "template8":
				componentToRender = <Template8 resumeData={store} />;
				break;
			case "template9":
				componentToRender = <Template9 resumeData={store} />;
				break;
			case "template10":
				componentToRender = <Template10 resumeData={store} />;
				break;
			default:
				return (
					<div className="text-center py-10">
						<h2 className="text-2xl font-semibold mb-4">Template Not Found</h2>
						<p className="text-gray-600">
							The selected template ID "{templateId}" is not recognized.
						</p>
						<Link
							to="/choose-template"
							className="mt-6 inline-block bg-brandGreen-500 text-white px-6 py-2 rounded hover:bg-brandGreen-600 transition-colors"
						>
							Choose a Template
						</Link>
					</div>
				);
		}
		return (
			<div
				ref={templatePreviewRef}
				className="template-render-area bg-white shadow-xl mx-auto my-8"
				style={{
					width: "210mm",
					minHeight: "297mm",
				}}
			>
				{componentToRender}
			</div>
		);
	};

	if (!store) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				Loading resume data...
			</div>
		);
	}

	return (
		<div className="template-preview-page bg-gray-100 min-h-screen p-4 sm:p-8">
			<div className="mb-6 flex flex-wrap justify-between items-center gap-4">
				<Button
					onClick={handleBackToChooseTemplate}
					// Overriding default Button styles for this specific "Change Template" button
					className="!px-4 !py-2 !text-sm !font-medium !rounded-lg !shadow hover:!shadow-md"
					ariaLabel="Change selected template"
					IconComponent={FaArrowLeft}
					iconPosition="left"
					moveDisabled={true}
				>
					Change Template
				</Button>
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
					CV Preview:{" "}
					<span className="capitalize text-brandGreen-600">{name}</span>
				</h1>
				<div className="flex gap-2 sm:gap-3">
					{" "}
					{/* Added sm:gap-3 for slightly more space on small screens */}
					<Button
						onClick={handleDownloadPdf}
						// Overriding default Button styles for this specific "Download PDF" button
						className="!px-4 !py-2 !text-sm !font-medium !rounded-lg !shadow hover:!shadow-md"
						ariaLabel="Download resume as PDF"
						IconComponent={HiDocumentDownload}
						iconPosition="left"
						moveDisabled={true}
					>
						Download as PDF
					</Button>
				</div>
			</div>
			{renderSelectedTemplate()}
		</div>
	);
};

export default Template;
