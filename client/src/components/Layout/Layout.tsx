import { ConnectedUser } from "../../types/User";
import { Header } from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./Layout.css";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const connectedUser: ConnectedUser = {
    username: "Minouche",
    avatarUrl:
      "https://imgs.search.brave.com/bWacxyxQbYXhq75ppFyxwnG2z3wK8xDHut72pRbYOZM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9h/ZG9yYWJsZS1jYXQt/bGlmZXN0eWxlXzIz/LTIxNTE1OTMzMjEu/anBnP3NlbXQ9YWlz/X2h5YnJpZA",
  };

  return (
    <section className="layout-container">
      <header className="layout-header">
        <Header {...connectedUser} />
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
