import React from "react";
import Img from "./icon-laptop.jpg";
import Svg3 from "./icon-contact-detail.svg";
import Svg2 from "./icon-team-detail.svg";
import Svg1 from "./icon-pick-up.svg";

import "./howitiswork.css";

function HowIsWORK() {
	return (
		<div className="howitwork-container">
			<div className="h2">
				<img src={Img} />
			</div>
			<div className="howItWorkCard">
				<div className="body-span">
					<div className="imgSvg">
						<img src={Svg3} />
					</div>
					<p>
						First you fill out the form on our website and leave your contact
						details
					</p>
				</div>
				<div className="body-span">
					<div className="imgSvg">
						<img src={Svg2} />
					</div>
					<p>Our team contacts you to clarify all the details</p>
				</div>
				<div className="body-span">
					<div className="imgSvg">
						<img src={Svg1} />
					</div>
					<p>On a pre-agreed day, the laptop is delivered or picked up</p>
				</div>
			</div>
		</div>
	);
}
export default HowIsWORK;
