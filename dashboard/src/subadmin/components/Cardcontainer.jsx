import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import config from "../../config/config";

const BlogContainer = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.BACKEND_URL}/product-request/sub-admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRequests(response.data.data.requests);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8 mb-8 px-4 flex flex-wrap justify-evenly">
      {/* <div>
        <h1>Admin Dashboard</h1>
      </div> */}
      {requests.map((d) => {
        return <Card card={d} />;
      })}
    </div>
  );
};

export default BlogContainer;
