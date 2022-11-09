import { Route, Routes } from "react-router-dom";

// Home page
import Home from "./pages/Home/Home";
import LaptopForm from "./pages/Home/Forms/LaptopRequest/LaptopForm";
import DonatorForm from "./pages/Home/Forms/DonatorFormReqest/DonatorForm";

// Table View
import RequestView from "./pages/ViewTableRequest/RequestView";
import LaptopTable from "./pages/ViewTableRequest/LaptopViewTable/LaptopTable";
import DonatorTable from "./pages/ViewTableRequest/DonatorViewTable/DonatorTable";

const App = () => (
	<Routes>
		{/* Home */}
		<Route path="/" element={<Home />} />

		{/* Home- laptop & Dontor form */}
		<Route path="/create-laptop-requests" element={<LaptopForm />} />
		<Route path="/create-donator-requests" element={<DonatorForm />} />

		{/* Table view page */}
		<Route path="/list-requests" element={<RequestView />} />
		<Route path="/list-laptop-requests" element={<LaptopTable />} />
		<Route path="/list-donator-requests" element={<DonatorTable />} />
	</Routes>
);

export default App;
