import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

const layout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<div className="flex gap-5">
			<div className="p-5 w-full">
				<Sidebar />
			</div>
			<div className="p-5 w-full">
				<div className="p-10 shadow-lg bg-white rounded-lg w-full h-full">{children}</div>
			</div>
		</div>
	);
};

export default layout;
