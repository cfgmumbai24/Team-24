import React from "react";

const MoonjBasedHandicrafts = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <DashboardTitle />
        <div className="p-4">
          <div>
            <h2>Moonj Based Handicrafts</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoonjBasedHandicrafts;
