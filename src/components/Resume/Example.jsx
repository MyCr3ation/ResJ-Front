import React from "react";
import { FaArrowDown, FaArrowUp, FaEdit, FaTrash } from "react-icons/fa";
import { TbClick } from "react-icons/tb";
import Button from "../Button.jsx"; // Adjust path if needed

const Example = ({
	children,
	index,
	state,
	title,
	edit,
	remove,
	up,
	down,
	cursor = true,
}) => {
	return (
		<details
			key={index}
			className="bg-white border border-gray-200 hover:bg-gray-50 px-4 py-3 rounded-lg shadow-sm mt-2 text-sm group"
		>
			<summary className="font-semibold text-black/90 flex flex-col-reverse xs:flex-row items-center justify-between list-none -webkit-details-marker:hidden">
				<div className="flex-grow flex items-center gap-2 cursor-pointer py-1">
					<span className="text-base max-w-full truncate">{title}</span>
					{cursor && (
						<TbClick
							className="text-gray-400 group-hover:text-brand animation-all"
							size={18}
						/>
					)}
				</div>

				<div className="flex items-center gap-2 mb-2 xs:mb-0 xs:ml-auto">
					{up && down && (
						<div className="flex items-center gap-0.5">
							<button
								type="button"
								title={"Move Up"}
								onClick={(e) => {
									e.preventDefault();
									up(index);
								}}
								disabled={index === 0}
								className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-brand disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent animation-all"
							>
								<FaArrowUp size={13} />
							</button>
							<button
								type="button"
								title={"Move Down"}
								onClick={(e) => {
									e.preventDefault();
									down(index);
								}}
								disabled={index === state.length - 1}
								className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-brand disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent animation-all"
							>
								<FaArrowDown size={13} />
							</button>
						</div>
					)}

					{edit && (
						<Button
							onClick={(e) => {
								e.preventDefault();
								edit(index);
							}}
							className="!px-2.5 !py-1 !text-xs !font-medium !rounded-md !shadow-none bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-300 !transform-none hover:!scale-100 group-hover:!translate-x-0" // Added group-hover:!translate-x-0 to stop icon movement
							IconComponent={FaEdit}
							iconPosition="left"
							moveDisabled={true}
						>
							Edit
						</Button>
					)}

					{remove && (
						<Button
							onClick={(e) => {
								e.preventDefault();
								remove(index);
							}}
							className="!px-2.5 !py-1 !text-xs !font-medium !rounded-md !shadow-none bg-red-500 hover:bg-red-600 text-white focus:ring-red-300 !transform-none hover:!scale-100 group-hover:!translate-x-0" // Added group-hover:!translate-x-0 to stop icon movement
							IconComponent={FaTrash}
							iconPosition="left"
							moveDisabled={true}
						>
							Remove
						</Button>
					)}
				</div>
			</summary>

			<div className="pt-3 text-black/80">{children}</div>
		</details>
	);
};

export default Example;
