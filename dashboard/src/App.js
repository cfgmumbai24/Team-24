import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./admin/screens/Home";
import Subadmin from "./subadmin/screens/Home";
import Sidebar from "./admin/components/Sidebar/Sidebar";
import ApprovalRequest from "./admin/components/ApprovalRequest";
import TerracottaOrnaments from "./admin/components/categories/TerracottaOrnaments";
import MacrameBasedHandicraft from "./admin/components/categories/MacrameBasedHandicraft";
import MoonjBasedHandicrafts from "./admin/components/categories/MoonjBasedHandicrafts";
import BananaFiberOrnaments from "./admin/components/categories/BananaFiberOrnaments";
import JuteBags from "./admin/components/categories/JuteBags";
import DashboardTitle from "./admin/components/Dashboardtitle";
import Editpop from "./admin/components/EditPop/EditPop";
import Navbar from "./admin/components/Navbar/Navbar";
import Users from "./admin/components/Users/Users";
import Add from "./admin/pages/Add/Add";
import List from "./admin/pages/List/List";

const App = () => {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <Users />
        <div className="flex-grow-1">
          <DashboardTitle />
          <div className="p-4">
            <Routes>
              <Route path="/subadmin" element={<Subadmin />} />
              <Route path="/admin" element={<Home />} />
              <Route path="/admin/approve" element={<ApprovalRequest />} />
              <Route
                path="/admin/category/terracotta-ornaments"
                element={<TerracottaOrnaments />}
              />
              <Route
                path="/admin/category/macrame-based-handicraft"
                element={<MacrameBasedHandicraft />}
              />
              <Route
                path="/admin/category/moonj-based-handicrafts"
                element={<MoonjBasedHandicrafts />}
              />
              <Route
                path="/admin/category/banana-fiber-ornaments"
                element={<BananaFiberOrnaments />}
              />
              <Route path="/admin/category/jute-bags" element={<JuteBags />} />

              <Route path="/subadmin/approve" element={<ApprovalRequest />} />
              <Route
                path="/subadmin/category/terracotta-ornaments"
                element={<TerracottaOrnaments />}
              />
              <Route
                path="/subadmin/category/macrame-based-handicraft"
                element={<MacrameBasedHandicraft />}
              />
              <Route
                path="/subadmin/category/moonj-based-handicrafts"
                element={<MoonjBasedHandicrafts />}
              />
              <Route
                path="/subadmin/category/banana-fiber-ornaments"
                element={<BananaFiberOrnaments />}
              />
              <Route
                path="/subadmin/category/jute-bags"
                element={<JuteBags />}
              />
              <Route path="/edit-form" element={<Editpop />} />
              <Route path="/users" element={<Users />} />
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
