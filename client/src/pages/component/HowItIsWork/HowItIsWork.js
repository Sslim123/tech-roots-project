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
						Fill out a form to request a laptop
						<br />
						or <br />
						Fill out a form to donate some laptops
					</p>
				</div>
				<div className="body-span">
					<div className="imgSvg">
						<img src={Svg2} />
					</div>
					<p>
						If you requested a laptop you will be notified as soon as you are
						matched with a donor
					</p>
				</div>
				<div className="body-span">
					<div className="imgSvg">
						<img src={Svg1} />
					</div>
					<p>
						{" "}
						The laptop is delivered to the requestor or picked up at the donor's
						address
					</p>
				</div>
			</div>
		</div>
	);
}
export default HowIsWORK;
