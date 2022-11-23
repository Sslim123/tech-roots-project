import React from "react";
import "./ButtonComponent.css";
const ButtonComponent = (props) => {
	return (
		<button id="button-component" onClick={props.handleClick}>
			{props.text}
		</button>
	);
};

export default ButtonComponent;
