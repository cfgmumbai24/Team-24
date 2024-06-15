import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClusterUserPage from "./cluster_user/page";
import AddPage from "./cluster_user/AddPage";
import ViewPage from "./cluster_user/ViewPage";
import SignIn from "./auth/SignIn";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/page" element={<ClusterUserPage />} />
          <Route path="/add-page" element={<AddPage />} />
          <Route path="/view-page" element={<ViewPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
