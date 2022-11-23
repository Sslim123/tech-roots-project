import React from "react";
import "./BackgroundImage.css";

const BackgroundImage = (props) => {
	return (
		<div className="background-image-container">
			<div className="main-container">
				<div className="main-card">
					<p className="primary-text">{props.primaryText}</p>
					{props.secondaryText && <p>{props.secondaryText}</p>}
				</div>
			</div>
		</div>
	);
};

export default BackgroundImage;
