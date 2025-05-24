import React from "react";
import ImageUpload from "../../Common/ImageUpload.jsx";
import Input from "../../Common/Input.jsx";
import useStore from "../../../store/store.jsx";

const Personal = () => {
	const { store, setStore } = useStore();

	return (
		<div className="w-full mx-auto px-2 bg-white">
			<h1 className="text-center font-bold text-3xl text-brand mb-4">
				Personal Information
			</h1>
			<div className="flex items-center justify-center">
				<ImageUpload />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Input
					state={store.personal.name}
					setState={(value) => setStore("personal.name", value)}
					name={"name"}
					label="Name"
				/>
				<Input
					state={store.personal.surname}
					setState={(value) => setStore("personal.surname", value)}
					name={"surname"}
					label="Surname"
				/>
				<Input
					state={store.personal.email}
					setState={(value) => setStore("personal.email", value)}
					name={"mail"}
					label="Email"
				/>
				<Input
					state={store.personal.phone}
					setState={(value) => setStore("personal.phone", value)}
					name={"phone"}
					label="Phone"
				/>
				<Input
					state={store.personal.jobTitle}
					setState={(value) => setStore("personal.jobTitle", value)}
					name={"jobtitle"}
					label="Job Title"
				/>
				<Input
					state={store.personal.driving}
					setState={(value) => setStore("personal.driving", value)}
					name={"drivingLicense"}
					label="Driving License"
				/>
				<Input
					state={store.personal.country}
					setState={(value) => setStore("personal.country", value)}
					name={"country"}
					label="Country"
				/>
				<Input
					state={store.personal.city}
					setState={(value) => setStore("personal.city", value)}
					name={"city"}
					label="City"
				/>
			</div>
		</div>
	);
};

export default Personal;
