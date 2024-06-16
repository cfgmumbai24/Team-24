// import Sidebar from "../components/Sidebar/Sidebar";
import CardContainer from "./Cardcontainer";
import Sidebar from "./Sidebar/Sidebar";
import DashboardTitle from "./Dashboardtitle";

const Home = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <DashboardTitle />
        <div className="p-4">
          <div className="d-flex">
            {/* <Sidebar /> */}
            <div className="flex-grow-1 p-4">
              <CardContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
