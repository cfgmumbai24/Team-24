// import Sidebar from "../components/Sidebar/Sidebar";
import CardContainer from "../components/Cardcontainer";

const Home = () => {
  return (
    <div className="d-flex">
      {/* <Sidebar /> */}
      <div className="flex-grow-1 p-4">
        <CardContainer />
      </div>
    </div>
  );
};

export default Home;
