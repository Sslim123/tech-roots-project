import { Route, Routes } from "react-router-dom";

// Home page
import Home from "./pages/Home/Home";
import LaptopForm from "./pages/Home/Forms/LaptopRequest/LaptopForm";
import DonatorForm from "./pages/Home/Forms/DonatorFormReqest/DonatorForm";
//navbar links
import MeetTheTeam from "./pages/meetTheTeam/MeetTheTeam";

// Table View

import LaptopTable from "./pages/ViewTableRequest/LaptopViewTable/LaptopTable";
import DonatorTable from "./pages/ViewTableRequest/DonatorViewTable/DonatorTable";

// Status request view
import RequestView from "./pages/ViewTableRequest/RequestView";
import RequestStatus from "./pages/ViewRequestStatus/RequestStatusView";
import DonationRequestStatues from "./pages/ViewRequestStatus/DonationRequestStatus";

const App = () => (
	<Routes>
		{/* Home */}
		<Route path="/" element={<Home />} />

		{/* Home- laptop & Donator form */}
		<Route path="/create-laptop-requests" element={<LaptopForm />} />
		<Route path="/create-donator-requests" element={<DonatorForm />} />
		{/* nav-links */}
		<Route path="/meet-the-team" element={<MeetTheTeam />} />

		{/* Table view page */}
		<Route path="/list-requests" element={<RequestView />} />
		<Route path="/list-laptop-requests" element={<LaptopTable />} />
		<Route path="/list-donator-requests" element={<DonatorTable />} />

		{/* request status */}
		<Route path="/laptop-request-status/:id" element={<RequestStatus />} />
		<Route
			path="/laptop-donation-status/:id"
			element={<DonationRequestStatues />}
		/>
	</Routes>
);

export default App;
