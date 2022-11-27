import React from "react";
import OurStory from "./ourStory/OurStory";
import Navbar from "../component/navbar/navbar";
import Footer from "../component/footer/Footer";
import GitInTouch from "./ourStory/GitInTouch";
import AboutUs from "./ourStory/About-us";
import "./MeetTheTeam.css";

function MeetTheTeam() {
	return (
		<div>
			<Navbar />
			<AboutUs />
			<OurStory />
			<GitInTouch GetInTouchText="Get In Touch" />
			<Footer />
		</div>
	);
}
export default MeetTheTeam;
