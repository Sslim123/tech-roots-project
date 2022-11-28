import React from "react";
import Navbar from "../component/navbar/navbar";
import Homebody from "../component/homeBody/Homebody";
import Footer from "../component/footer/Footer";
import "./Home.css";
import Mission from "../component/Mission/Mission";
import ContactUs from "../component/ContactUs/ContactUs";
import HowItIsWORK from "../component/HowItIsWork/HowItIsWork";

export function Home() {
	return (
		<main role="main">
			<Navbar isActive="homePage" />
			<Homebody />
			<HowItIsWORK />
			<Mission />
			<ContactUs />
			<Footer />
		</main>
	);
}

export default Home;
