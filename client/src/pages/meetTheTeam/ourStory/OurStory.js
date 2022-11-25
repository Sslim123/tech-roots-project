import React from "react";
import Jpg from "./OurStory.jpg";
import "./ourStory.css";
//import GitInTouch from "./GitInTouch";

function OurStory() {
	return (
		<div className="our_container">
			<div className="our_story">
				<img src={Jpg} />
				<p>
					Now you are, and here is our story. We are a group of 3 trainees who
					met in 2021, through Code Your Future. This is our first project
					together. Now that we have completed our Software Development Course,
					we are ready to be part of the Tech World. We have been through the
					asylum system and faced with hardships none of us could afford a
					laptop. Our lived experience is one of the many reasons why we have
					decided to help people who are seeking asylum, to get laptops from
					well-wishers. So join us on our journey and help make a difference in
					someone’s life. Donate a Laptop!
				</p>
			</div>
		</div>
	);
}
export default OurStory;
