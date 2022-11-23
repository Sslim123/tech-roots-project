import React from "react";
import Svg from "./Getintouch.jpg";
import "./GetInTouch.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";

function GitInTouch() {
	return (
		<div>
			<div className="getTouch-container">
				<div className="get-touch-img">
					<img src={Svg} />
				</div>
				<div className="getTouch-main-card">
					<div className="getTouch-card">
						<div className="getTouch-link">
							<div>
								<ul className="getTouch-ul-link">
									<li className="fa-brands fa-linkedin">
										<FaGithub className="getTouch-icon" />
										<a
											target="_blank"
											href="https://www.linkedin.com/in/salem-dayfan-0a9399206"
											rel="noreferrer"
										>
											linked.in/salem-dayfan
										</a>
									</li>
									<li className="fa-brands fa-linkedin">
										<FaLinkedin className="getTouch-icon" />
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
							<div>
								<ul className="getTouch-ul-link">
									<li className="fa-brands fa-linkedin">
										<FaGithub className="getTOUCH-icon" />
										<a
											target="_blank"
											href="https://www.linkedin.com/in/yawe-fareed"
											rel="noreferrer"
										>
											linked.in/yawe-fareed
										</a>
									</li>
									<li className="fa-brands fa-linkedin">
										<FaLinkedin className="getTouch-icon" />
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
							<div>
								<ul className="contact-ul-link">
									<li className="fa-brands fa-linkedin">
										<FaGithub className="contact-icon" />
										<a
											target="_blank"
											href="https://www.linkedin.com/in/abdalrazaq94t/"
											rel="noreferrer"
										>
											linked.in/abdalrazaq-altaih
										</a>
									</li>
									<li className="fa-brands fa-linkedin">
										<FaLinkedin className="contact-icon" />
										<a
											target="_blank"
											href="https://github.com/Abdalrazaq94"
											rel="noreferrer"
										>
											github.com/abdalrazaq-altaih
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GitInTouch;
