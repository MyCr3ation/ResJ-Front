import create from "zustand";
import { persist } from "zustand/middleware";

// Helper to define the initial structure for clarity, used implicitly by your setup
const initialStoreStructure = {
	personal: {
		name: "",
		surname: "",
		email: "",
		phone: "",
		jobTitle: "",
		country: "",
		city: "",
		driving: "",
	},
	socialLinks: {
		linkedin: "",
		github: "",
		twitter: "",
		facebook: "",
		instagram: "",
		website: "",
		xing: "",
		medium: "",
		figma: "",
		dribbble: "",
	},
	image: null,
	summary: "",
	certificates: [],
	experience: [],
	languages: [],
	education: [],
	skills: [],
	projects: [],
	interests: [],
	references: [],
	journal: {},
};

const useStore = create(
	persist(
		(set) => ({
			store: {
				//! personal
				personal: {
					name: "",
					surname: "",
					email: "",
					phone: "",
					jobTitle: "",
					country: "",
					city: "",
					driving: "",
				},

				//! Social
				socialLinks: {
					linkedin: "",
					github: "",
					twitter: "",
					facebook: "",
					instagram: "",
					website: "",
					xing: "",
					medium: "",
					figma: "",
					dribbble: "",
				},

				//! Photo
				image: null,

				//! Summary
				summary: "",

				//! Certificates
				certificates: [],

				//! Experiences
				experience: [],

				//! Languages
				languages: [],

				//! Education
				education: [],

				//! Skills
				skills: [],

				//! Projects
				projects: [],

				//! Interests
				interests: [],

				//! References
				references: [],

				//! Journal
				journal: {}, // As in your provided store
			},

			//! Generic setter (Now handles journal correctly)
			setStore: (key, value) =>
				set((state) => {
					const keys = key.split(".");
					// Create a new copy of the top-level store
					const newStore = { ...state.store };
					let current = newStore;

					// Traverse and shallow copy each nested object along the key path
					for (let i = 0; i < keys.length - 1; i++) {
						current[keys[i]] = { ...(current[keys[i]] || {}) };
						current = current[keys[i]];
					}
					// Set the final key to the new value
					current[keys[keys.length - 1]] = value;
					return { store: newStore };
				}),

			//! Add, remove, edit, reorder utilities
			addItem: (section, newItem) =>
				set((state) => ({
					store: {
						...state.store,
						[section]: [...state.store[section], newItem],
					},
				})),

			removeItem: (section, index) =>
				set((state) => ({
					store: {
						...state.store,
						[section]: state.store[section].filter((_, i) => i !== index),
					},
				})),

			editItem: (section, index, updatedItem) =>
				set((state) => ({
					store: {
						...state.store,
						[section]: state.store[section].map((item, i) =>
							i === index ? updatedItem : item
						),
					},
				})),

			updateOrder: (section, updatedItems) =>
				set((state) => ({
					store: {
						...state.store,
						[section]: updatedItems,
					},
				})),

			//! Load sample data (MODIFIED with error handling)
			loadSampleData: async () => {
				try {
					const response = await fetch("/sampleData.json"); // Using your specified path
					if (!response.ok) {
						const errorText = await response.text();
						// Try to parse errorText if it's JSON, otherwise use it as is
						let detail = errorText;
						try {
							const jsonError = JSON.parse(errorText);
							detail = jsonError.message || JSON.stringify(jsonError);
						} catch (e) {
							// Not JSON, use errorText as is
						}
						throw new Error(
							`HTTP error! status: ${response.status}, message: ${detail}`
						);
					}
					const sampleData = await response.json();

					// The merge strategy { ...state.store, ...sampleData } means:
					// - Sections in sampleData will overwrite corresponding sections in the current state.
					// - Sections in the current state NOT present in sampleData (e.g., 'journal' if sampleData.json doesn't have it) will be preserved.
					// - New sections in sampleData not in the initial store structure will be added.
					set((state) => ({
						store: {
							...state.store, // Base with current state (preserves things like 'journal')
							...sampleData, // Overlay with sample data
						},
					}));
				} catch (error) {
					console.error(
						"Failed to load and set sample data in Zustand store:",
						error
					);
					// Re-throw the error so it can be caught by the component
					// calling this action (e.g., Resume.jsx to show a toast message)
					throw error;
				}
			},

			//! Import data from JSON file (only for the store's specific sections)
			importDataFromFile: async (data) => {
				try {
					let finalData;
					if (data instanceof File) {
						const content = await data.text();
						const parsedData = JSON.parse(content);
						finalData = parsedData;
					} else if (typeof data === "object" && data !== null) {
						finalData = data;
					} else {
						throw new Error(
							"Invalid input: data must be a valid object or file"
						);
					}
					set((state) => ({
						store: {
							...state.store,
							personal:
								finalData.general ||
								finalData.basics ||
								finalData.personal ||
								state.store.personal,
							socialLinks:
								finalData.socialLinks ||
								finalData.social ||
								finalData.profiles ||
								state.store.socialLinks,
							image:
								finalData.image ||
								finalData.personal?.image ||
								finalData.basics?.image ||
								finalData.general?.image ||
								state.store.image,
							summary:
								finalData.summary ||
								finalData.personal?.summary ||
								finalData.general?.summary ||
								finalData.basics?.summary ||
								state.store.summary,
							certificates: finalData.certificates || state.store.certificates,
							experience:
								finalData.experience ||
								finalData.experiences ||
								finalData.work ||
								finalData.workExperience ||
								state.store.experience,
							languages: finalData.languages || state.store.languages,
							education: finalData.education || state.store.education,
							skills: finalData.skills || state.store.skills,
							projects: finalData.projects || state.store.projects,
							interests: finalData.interests || state.store.interests,
							references: finalData.references || state.store.references,
							// journal would be preserved from ...state.store if not in finalData's direct mappings
						},
					}));
				} catch (error) {
					console.error("Error importing data from file:", error);
					// Optionally, re-throw or handle as needed for UI feedback
					throw error;
				}
			},
		}),
		{
			name: "resume-data",
			getStorage: () => localStorage,
		}
	)
);

export default useStore;
