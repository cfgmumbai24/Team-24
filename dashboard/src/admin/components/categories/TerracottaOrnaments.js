import React from "react";

const TerracottaOrnaments = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <DashboardTitle />
        <div className="p-4">
          <div>
            <h2>Terracotta Ornaments & Home Décor</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerracottaOrnaments;
