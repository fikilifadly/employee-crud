import CustomModal from "@/components/CustomModal";
import Link from "next/link";
import React, { Children } from "react";

const layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<div className="w-full h-screen flex justify-center items-center">
				<div className="w-[450px] min-h-[250px] p-6  mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">{children}</div>
			</div>
		</>
	);
};

export default layout;
