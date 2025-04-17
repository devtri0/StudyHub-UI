import React from "react";
import { Outlet } from "react-router";

const DashLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DashLayout;
