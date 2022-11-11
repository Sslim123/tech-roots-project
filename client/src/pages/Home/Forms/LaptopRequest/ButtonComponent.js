import React from 'react';
import { Link } from "react-router-dom";

const ButtonComponent = (props) => {

  return props.validateForm ? (
		<button type="submit" className="btn1" onClick={props.handleSubmit}>
			<Link to={"/laptop-request-status/" + props.requestId }>
				<p style={{ color: "white" }}>Submit</p>
			</Link>
		</button>
	) : (
		<button type="submit" className="btn1">
			<p style={{ color: "white" }}>Submit</p>
		</button>
	);
}

export default ButtonComponent