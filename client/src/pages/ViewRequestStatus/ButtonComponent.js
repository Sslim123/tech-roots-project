import React from "react";

const ButtonComponent = (props) => {
	return (
		<div>
			<button onClick={props.handleClick}>{props.command}</button>
		</div>
	);
};

export default ButtonComponent;
