
import React, { useEffect, useState } from "react";
import './StatusView.css'
import { useParams } from "react-router-dom";


function DonationRequestStatues() {
    const [request, setRequest] = useState(null);
	// this helps get the id from the router
	const { id } = useParams();

    //  this use effect/ it may be not the right Api that we are going to Fetch the data with
    // this only template 
	useEffect(() => {
		fetch(`/laptop_assignment/{id}`)
			.then((res) => res.json())
			.then((data) => setRequest(data));
	}, [id]);
    return ( <>
    
    <div className='main-container-donation-status'>
        <p>Thank you for your donation. We will notify you when you have been matched with someone who has requested a laptop</p>
    </div>
    </> );
}

export default DonationRequestStatues;