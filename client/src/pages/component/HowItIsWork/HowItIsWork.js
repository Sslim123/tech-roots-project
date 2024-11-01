import React from "react";
//import Img from "./icon-laptop.jpg";
import Svg3 from "./icon-contact-detail.svg";
import Svg2 from "./icon-team-detail.svg";
import Svg1 from "./icon-pick-up.svg";

import "./howitiswork.css";

function HowIsWORK() {
	return (
		<div className="howitwork-container">
			<div className="how-it-works-text">
				<h1> How It works</h1>
			</div>
			<div className="howItWorkCard">
				<div className="body-span">
					<div className="imgSvg">
						<img src={Svg3} alt=" " />
					</div>
					<p>
						Fill out a form to request a laptop
						<br />
						or <br />
						Fill out a form to donate some laptops
					</p>
				</div>
				<div className="body-span">
					<div className="imgSvg">
						<img src={Svg2} alt=" " />
					</div>
					<p>
						If you requested a laptop you will be notified as soon as you are
						matched with a donor
					</p>
				</div>
				<div className="body-span">
					<div className="imgSvg">
						<img src={Svg1} alt=" " />
					</div>
					<p>
						{" "}
						The laptop is delivered to the requestor or picked up at the donor
						is address
					</p>
				</div>
			</div>
		</div>
	);
}
export default HowIsWORK;
