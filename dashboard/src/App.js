import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClusterUserPage from './cluster_user/page';
import AddPage from './cluster_user/AddPage';
import ViewPage from './cluster_user/ViewPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClusterUserPage />} />
        <Route path="/add-page" element={<AddPage />} />
        <Route path="/view-page" element={<ViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
