import React from 'react';
import { Link } from "react-router-dom";

const ButtonComponent = (props) => {
  return ( 
    props.handleClick &&
		<button type="submit" className="btn1" >
			<Link to="/request-status">
				<p style={{ color: "white" }}>Submit</p>
			</Link>
		</button>
	);
}

export default ButtonComponent