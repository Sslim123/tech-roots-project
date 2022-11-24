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
				<Card
					style={{ width: "21rem", borderRadius: "1.3rem" }}
				>
					<Card.Img variant="top" src={Svg}  style={{ borderRadius: "1.3rem"}}/>
					{/* holder.js/100px180 */}
					<Card.Body>
						<Card.Text>Salem Dayfan</Card.Text>
						<Card.Title>Full stack developer</Card.Title>
					</Card.Body>
				</Card>
				<Card style={{ width: "21rem",  borderRadius: "1.3rem" }}>
					<Card.Img variant="top" src={Svg2} style={{ borderRadius: "1.3rem"}} />
					{/* holder.js/100px180 */}
					<Card.Body>
						<Card.Text>Abdalrazaq Altaih</Card.Text>
						<Card.Title>Full stack developer</Card.Title>
					</Card.Body>
				</Card>
				<Card style={{ width: "21rem",  borderRadius: "1.3rem" }}>
					<Card.Img variant="top" src={Svg} style={{ borderRadius: "1.3rem"}} />
					{/* holder.js/100px180 */}
					<Card.Body>
						<Card.Text>Salem Dayfan</Card.Text>
						<Card.Title>Full stack developer</Card.Title>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
}
