import React from "react";
import Card from "react-bootstrap/Card";
import Svg from "./IMG_Salem.jpg";
import Svg2 from "./IMG_Abed.jpg";

import Img from "./TechRootTeam.jpg";
import "./About-us.css";
export default function AboutUs() {
	return (
		<div className="card-container">
			<div className="team-img">
				<img src={Img} />
			</div>
			<div className="card-img">
				<div className="card1">
					<Card style={{ width: "21rem", borderRadius: "1.3rem" }}>
						<Card.Img
							variant="top"
							src={Svg}
							style={{ borderRadius: "1.3rem" }}
						/>
						{/* holder.js/100px180 */}
						<Card.Body>
							<Card.Text
								style={{
									fontSize: "1.5rem",
								}}
							>
								Salem Dayfan
							</Card.Text>
							<Card.Title>Full Stack Developer</Card.Title>
						</Card.Body>
					</Card>
				</div>
				<div className="card1">
					<Card style={{ width: "21rem", borderRadius: "1.3rem" }}>
						<Card.Img
							variant="top"
							src={Svg2}
							style={{ borderRadius: "1.3rem" }}
						/>
						{/* holder.js/100px180 */}
						<Card.Body>
							<Card.Text style={{ fontSize: "1.5rem" }}>
								Abdalrazaq Altaih
							</Card.Text>
							<Card.Title>Full Stack Developer</Card.Title>
						</Card.Body>
					</Card>
				</div>
				<div className="card1">
					<Card style={{ width: "21rem", borderRadius: "1.3rem" }}>
						<Card.Img
							variant="top"
							src={Svg}
							style={{ borderRadius: "1.3rem" }}
						/>
						{/* holder.js/100px180 */}
						<Card.Body>
							<Card.Text style={{ fontSize: "1.5rem" }}>Salem Dayfan</Card.Text>
							<Card.Title>Full Stack Developer</Card.Title>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	);
}
