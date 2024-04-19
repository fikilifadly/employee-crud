import CustomForm from "@/components/CustomForm";
import React, { ChangeEvent, FormEvent, FormEventHandler } from "react";

const fields = [
	{
		type: "text",
		name: "Username",
		placeholder: "Username",
	},
	{
		type: "password",
		name: "Password",
		placeholder: "Password",
	},
];
const page = () => {
	return (
		<>
			<CustomForm title="Register" fields={fields} url="/api/user/register" successpath="/login" method="post" type="logres" />
		</>
	);
};

export default page;
