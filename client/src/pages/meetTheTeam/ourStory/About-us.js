import React from "react";
import Card from "react-bootstrap/Card";
import Svg from "./IMG_Salem.jpg";
import Svg2 from "./IMG_Abed.jpg";
import Svg3 from "./IMG_yawe.jpg";

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
					<Card className="cardImgBody">
						<Card.Img
							variant="top"
							src={Svg}
							style={{ borderRadius: "1.3rem" }}
						/>
						<Card.Body className="card-body">
							<Card.Text className="text-card">Salem Dayfan</Card.Text>
							<Card.Title className="title-card">
								Full Stack Developer
							</Card.Title>
						</Card.Body>
					</Card>
				</div>
				<div className="card1">
					<Card className="cardImgBody">
						<Card.Img
							variant="top"
							src={Svg2}
							style={{ borderRadius: "1.3rem" }}
						/>
						{/* holder.js/100px180 */}
						<Card.Body className="card-body">
							<Card.Text className="text-card">Abdalrazaq Altaih</Card.Text>
							<Card.Title className="title-card">
								Full Stack Developer
							</Card.Title>
						</Card.Body>
					</Card>
				</div>
				<div className="card1">
					<Card className="cardImgBody">
						<Card.Img
							variant="top"
							src={Svg3}
							style={{ borderRadius: "1.3rem" }}
						/>
						{/* holder.js/100px180 */}
						<Card.Body className="card-body">
							<Card.Text className="text-card">Fareedh Yawe</Card.Text>
							<Card.Title className="title-card">
								Full Stack Developer
							</Card.Title>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	);
}
