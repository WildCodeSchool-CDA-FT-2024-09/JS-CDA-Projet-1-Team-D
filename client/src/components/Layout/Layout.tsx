import { Header } from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./Layout.css";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <section className="layout-container">
      <header className="layout-header">
        <Header />
      </header>
      <main className="layout-content">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <NavigationBar />
      </footer>
    </section>
  );
};
