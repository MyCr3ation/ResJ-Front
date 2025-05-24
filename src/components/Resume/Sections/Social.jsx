import React from "react";
import useStore from "../../../store/store";
import {
	FaLinkedin,
	FaGithub,
	FaTwitter,
	FaFacebook,
	FaInstagram,
	FaGlobe,
	FaDribbbleSquare,
} from "react-icons/fa";
import { SiFigma, SiMedium, SiXing } from "react-icons/si";

// Define social media platforms with their icons
const SOCIALS = [
	{ name: "LinkedIn", logo: <FaLinkedin className="inline mr-2" /> },
	{ name: "Github", logo: <FaGithub className="inline mr-2" /> },
	{ name: "Twitter", logo: <FaTwitter className="inline mr-2" /> },
	{ name: "Facebook", logo: <FaFacebook className="inline mr-2" /> },
	{ name: "Instagram", logo: <FaInstagram className="inline mr-2" /> },
	{ name: "Website", logo: <FaGlobe className="inline mr-2" /> },
	{ name: "Xing", logo: <SiXing className="inline mr-2" /> },
	{ name: "Medium", logo: <SiMedium className="inline mr-2" /> },
	{ name: "Figma", logo: <SiFigma className="inline mr-2" /> },
	{ name: "Dribbble", logo: <FaDribbbleSquare className="inline mr-2" /> },
];

const Social = () => {
	const { store, setStore } = useStore();

	return (
		<div className="w-full mx-auto px-2 bg-white">
			<h1 className="text-center font-bold text-3xl text-brand mb-4">
				Social Links
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 -mb-4">
				{SOCIALS.map((social) => (
					<div key={social.name.toLowerCase()} className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							{social.logo} {social.name}
						</label>
						<input
							type="text"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							value={store.socialLinks[social.name.toLowerCase()] || ""}
							onChange={(e) =>
								setStore(
									`socialLinks.${social.name.toLowerCase()}`,
									e.target.value
								)
							}
							placeholder={`Your ${social.name} URL`}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Social;
