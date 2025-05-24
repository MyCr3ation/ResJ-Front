// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				brand: "#356851",
				brandGreen: {
					50: "#f2f8f5",
					100: "#e6f1eb",
					200: "#c0dbcc",
					300: "#9bc5ad",
					400: "#71ad8b",
					500: "#356851",
					600: "#2f5f49",
					700: "#274f3d",
					800: "#203e31",
					900: "#172c24",
				},
				brandAccent: "#735168",
				back: "#161616",
			},
			screens: {
				xs: "475px",
			},
			keyframes: {
				glow: {
					"0%, 100%": {
						textShadow:
							"0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.6)",
					},
					"50%": {
						textShadow:
							"0 0 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.6)",
					},
				},
				pulse: {
					"0%, 100%": { opacity: 1, transform: "scale(1)" },
					"50%": { opacity: 0.85, transform: "scale(1.05)" },
				},
				fadeIn: {
					"0%": { opacity: 0, transform: "translateY(10px)" },
					"100%": { opacity: 1, transform: "translateY(0)" },
				},
				shimmer: {
					"0%": {
						backgroundPosition: "-100% 0",
					},
					"100%": {
						backgroundPosition: "100% 0",
					},
				},
				modalFadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				modalSlideUp: {
					"0%": { opacity: "0", transform: "translateY(20px) scale(0.98)" },
					"100%": { opacity: "1", transform: "translateY(0) scale(1)" },
				},
				modalFadeOut: {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
				modalSlideDown: {
					"0%": { opacity: "1", transform: "translateY(0) scale(1)" },
					"100%": { opacity: "0", transform: "translateY(20px) scale(0.98)" },
				},
			},
			animation: {
				glow: "glow 2s infinite",
				pulse: "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				fadeIn: "fadeIn 0.8s ease-out forwards",
				shimmer: "shimmer 1.5s infinite linear",
				modalBackdropEnter: "modalFadeIn 0.3s ease-out forwards",
				modalContentEnter: "modalSlideUp 0.3s ease-out 0.1s forwards",
				modalBackdropLeave: "modalFadeOut 0.2s ease-in forwards",
				modalContentLeave: "modalSlideDown 0.2s ease-in forwards",
			},
			boxShadow: {
				"glow-brand": "0 0 15px 5px rgba(53, 104, 81, 0.5)",
				"glow-brand-light": "0 0 8px 2px rgba(155, 197, 173, 0.6)",
			},
		},
	},
	plugins: [],
};
