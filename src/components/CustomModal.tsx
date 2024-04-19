import React from "react";

const CustomModal = ({ children }: { children: React.ReactNode }) => {
	return (
		<dialog id="my_modal_1" className="modal">
			<div className="modal-box">
				{children}
				<div className="modal-action">
					<form method="dialog">
						<button className="btn">Close</button>
					</form>
				</div>
			</div>
		</dialog>
	);
};

export default CustomModal;
