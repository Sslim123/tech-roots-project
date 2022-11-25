import React from "react";
import "./ContactUs.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
function ContactUs() {
	return (
		<div className="contactUs-container">
			<div className="contactUs-main-card">
				<h1 className="h1">Contact Us</h1>
				<div className="contactUs-card">
					<div className="contactUs-link">
						<div className="contact-ul-container">
							<ul className="contact-ul-link">
								<li className="fa-brands fa-linkedin">
									<FaLinkedin className="contact-icon" />
									<a
										target="_blank"
										href="https://www.linkedin.com/in/salem-dayfan-0a9399206"
										rel="noreferrer"
									>
										linked.in/salem-dayfan
									</a>
								</li>
								<li className="fa-brands fa-linkedin">
									<FaGithub className="contact-icon" />
									<a
										target="_blank"
										href="https://github.com/Sslim123"
										rel="noreferrer"
									>
										github.com/salem-dayfan
									</a>
								</li>
							</ul>
						</div>
						<div className="contact-ul-container">
							<ul className="contact-ul-link">
								<li className="fa-brands fa-linkedin">
									<FaLinkedin className="contact-icon" />
									<a
										target="_blank"
										href="https://www.linkedin.com/in/yawe-fareed"
										rel="noreferrer"
									>
										linked.in/yawe-fareed
									</a>
								</li>
								<li className="fa-brands fa-linkedin">
									<FaGithub className="contact-icon" />
									<a
										target="_blank"
										href="https://github.com/Fareedh-12"
										rel="noreferrer"
									>
										github.com/yawe-fareed
									</a>
								</li>
							</ul>
						</div>
						<div className="contact-ul-container">
							<ul className="contact-ul-link">
								<li className="fa-brands fa-linkedin">
									<FaLinkedin className="contact-icon" />
									<a
										target="_blank"
										href="https://www.linkedin.com/in/abdalrazaq94t/"
										rel="noreferrer"
									>
										linked.in/abdalrazaq
									</a>
								</li>
								<li className="fa-brands fa-linkedin">
									<FaGithub className="contact-icon" />
									<a
										target="_blank"
										href="https://github.com/Abdalrazaq94"
										rel="noreferrer"
									>
										github.com/abdalrazaq
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContactUs;
