import CustomForm from "@/components/CustomForm";
import React from "react";

const page = () => {
	return (
		<>
			<CustomForm
				title="Add User"
				fields={[
					{ type: "text", placeholder: "Username" },
					{ type: "text", placeholder: "Password" },
				]}
				method="post"
				type="add"
				url="/api/user/register"
				successpath="/home"
			/>
		</>
	);
};

export default page;
