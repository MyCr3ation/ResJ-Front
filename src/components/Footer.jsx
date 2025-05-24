import React from "react";

function Footer() {
	return (
		<footer className="text-center py-6 border-t border-brandGreen-200 bg-brandGreen-50">
			<p className="text-sm text-brandGreen-400">
				© {new Date().getFullYear()} Resume and Journal (ResJ). Your Story, Your
				Growth, Your Resume.
			</p>
		</footer>
	);
}

export default Footer;
