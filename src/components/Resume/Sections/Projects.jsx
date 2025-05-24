import { useState, Suspense } from "react"; // Keep Suspense if Editor was the only lazy part
import toast from "react-hot-toast";
import useStore from "../../../store/store.jsx"; // Adjusted
import Input from "../../Common/Input.jsx"; // Adjusted
import Button from "../../Button.jsx"; // Adjusted
import TextArea from "../../Common/TextArea.jsx"; // Using TextArea
import Example from "../Example.jsx"; // Assuming shared Example
import { FaPlus } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { MdOutlineArrowOutward } from "react-icons/md";

const Project = () => {
	const {
		store: { projects },
		addItem,
		editItem,
		removeItem,
		updateOrder,
	} = useStore();

	const initialProjectState = {
		title: "",
		description: "",
		technologies: [],
		githubLink: "",
		liveLink: "",
	};

	const [newProject, setNewProject] = useState(initialProjectState);
	const [newTechnology, setNewTechnology] = useState("");
	const [editedIndex, setEditedIndex] = useState(null);

	const isFormValid = () => {
		return newProject.title.trim() !== "";
		// Other fields can be optional
	};

	const handleAddProject = () => {
		if (isFormValid()) {
			addItem("projects", { ...newProject }); // Pass a new object
			setNewProject(initialProjectState);
			toast.success("Project added.");
		} else {
			toast.error("Project Title is required.");
		}
	};

	const handleEditProject = () => {
		if (newProject.title.trim()) {
			try {
				editItem("projects", editedIndex, { ...newProject }); // Pass a new object
				toast.success("Project updated.");
				setEditedIndex(null);
				setNewProject(initialProjectState);
			} catch (error) {
				console.error(error);
				toast.error("Failed to update project.");
			}
		} else {
			toast.error("Project Title cannot be empty when editing.");
		}
	};

	const handleChooseProject = (index) => {
		setEditedIndex(index);
		const project = projects[index];
		setNewProject({
			title: project.title || "",
			description: project.description || "",
			technologies: Array.isArray(project.technologies)
				? [...project.technologies]
				: [], // Ensure it's an array
			githubLink: project.githubLink || "",
			liveLink: project.liveLink || "",
		});
	};

	const handleCloseEdit = () => {
		setEditedIndex(null);
		setNewProject(initialProjectState);
	};

	const handleRemoveProject = (index) => {
		removeItem("projects", index);
		toast.success("Project removed.");
		if (editedIndex === index) {
			handleCloseEdit();
		}
	};

	const handleAddTechnology = () => {
		if (newTechnology.trim() !== "") {
			setNewProject((prev) => ({
				...prev,
				technologies: [...prev.technologies, newTechnology.trim()],
			}));
			setNewTechnology("");
		}
	};

	const handleRemoveTechnology = (techIndexToRemove) => {
		setNewProject((prev) => ({
			...prev,
			technologies: prev.technologies.filter((_, i) => i !== techIndexToRemove),
		}));
	};

	const handleMoveProjectUp = (index) => {
		if (index > 0) {
			const updatedItems = [...projects];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index - 1, 0, movedItem);
			updateOrder("projects", updatedItems);
		}
	};

	const handleMoveProjectDown = (index) => {
		if (index < projects.length - 1) {
			const updatedItems = [...projects];
			const [movedItem] = updatedItems.splice(index, 1);
			updatedItems.splice(index + 1, 0, movedItem);
			updateOrder("projects", updatedItems);
		}
	};

	return (
		<div className="w-full mx-auto px-2 bg-white">
			<h1 className="text-center font-bold text-3xl text-brand mb-4">
				{"Projects"}
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Input
					state={newProject.title}
					setState={(value) => setNewProject({ ...newProject, title: value })}
					name={"project_title"}
					label={"Project Title" + "*"}
				/>
				<Input
					state={newProject.githubLink}
					setState={(value) =>
						setNewProject({ ...newProject, githubLink: value })
					}
					name={"project_githubLink"}
					label={"GitHub Link"}
				/>
				<Input
					state={newProject.liveLink}
					setState={(value) =>
						setNewProject({ ...newProject, liveLink: value })
					}
					className={`sm:col-span-2`}
					name={"project_liveLink"}
					label={"Live URL"}
				/>
				<div className="sm:col-span-2">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Technologies
					</label>
					<div className="flex items-stretch gap-2">
						{" "}
						{/* items-stretch for button height */}
						<Input
							state={newTechnology}
							setState={setNewTechnology}
							name={"newTechnology"}
							label={"Add Technology"} // Label for input, not a title
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									handleAddTechnology();
								}
							}}
						/>
						<Button onClick={handleAddTechnology} className="px-4">
							<FaPlus size={16} />
						</Button>
					</div>
					{newProject?.technologies?.length > 0 && (
						<div className="mt-2 flex flex-wrap gap-2">
							{newProject.technologies.map((tech, index) => (
								<span
									key={index}
									className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 cursor-pointer hover:bg-indigo-200"
									onClick={() => handleRemoveTechnology(index)}
									title="Click to remove"
								>
									{tech}
									<button
										type="button"
										className="ml-1.5 flex-shrink-0 text-indigo-500 hover:text-indigo-700"
									>
										×
									</button>
								</span>
							))}
						</div>
					)}
				</div>
			</div>

			<div className="mt-2">
				<TextArea
					state={newProject.description}
					setState={(value) =>
						setNewProject({ ...newProject, description: value })
					}
					label="Project Description (Optional)"
					name="project_description"
					rows={5}
				/>
			</div>
			<div className="mt-4 flex gap-2">
				<Button
					onClick={() =>
						editedIndex === null ? handleAddProject() : handleEditProject()
					}
					disabled={editedIndex === null && !isFormValid()}
					className={
						editedIndex === null && !isFormValid()
							? "!bg-gray-400 hover:!bg-gray-400 cursor-not-allowed opacity-70"
							: ""
					}
				>
					{editedIndex !== null ? "Save Changes" : "Add Project"}
				</Button>
				{editedIndex !== null && (
					<Button
						onClick={() => handleCloseEdit()}
						className="bg-gray-500 hover:bg-gray-600 focus:ring-gray-400"
					>
						Cancel Edit
					</Button>
				)}
			</div>

			<div className="mt-6">
				{projects.length > 0 && (
					<div className="space-y-4 text-black/80">
						{projects.map((project, index) => (
							<Example
								key={project.id || index}
								index={index}
								remove={handleRemoveProject}
								edit={handleChooseProject}
								down={handleMoveProjectDown}
								up={handleMoveProjectUp}
								title={project.title || "N/A"}
								state={projects}
							>
								{project?.technologies?.length > 0 && (
									<p className="text-sm">
										<strong className="font-semibold text-brand">
											Technologies:
										</strong>{" "}
										{project.technologies.join(", ")}
									</p>
								)}
								<div className="flex flex-col gap-1 mt-2">
									{project.githubLink && (
										<div className="flex items-center gap-1 text-sm">
											<strong className="text-brand">
												<SiGithub />
											</strong>{" "}
											<a
												href={
													project.githubLink.startsWith("http")
														? project.githubLink
														: `https://${project.githubLink}`
												}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:underline truncate"
											>
												{project.githubLink}
											</a>
										</div>
									)}
									{project.liveLink && (
										<div className="flex items-center gap-1 text-sm">
											<strong className="text-brand">
												<MdOutlineArrowOutward />
											</strong>{" "}
											<a
												href={
													project.liveLink.startsWith("http")
														? project.liveLink
														: `https://${project.liveLink}`
												}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:underline truncate"
											>
												{project.liveLink}
											</a>
										</div>
									)}

									{project.description && (
										<div
											className="text-left mt-2 text-sm opacity-80 prose prose-sm max-w-none"
											dangerouslySetInnerHTML={{
												__html: String(project.description).replace(
													/\n/g,
													"<br />"
												),
											}}
										></div>
									)}
								</div>
							</Example>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Project;
