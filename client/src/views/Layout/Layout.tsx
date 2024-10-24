import "./Layout.css";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="container">
      <div className="header">Header</div>
      <div className="layout-content">
        <Outlet />
      </div>
      <div className="footer">Footer</div>
    </div>
  );
};
