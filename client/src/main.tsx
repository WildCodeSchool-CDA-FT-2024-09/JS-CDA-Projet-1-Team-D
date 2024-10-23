import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssVarsProvider } from "@mui/joy/styles";
import { ApolloProvider } from "@apollo/client";
import { createBrowserRouter, NavLink, RouterProvider } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Layout } from "./views/Layout/Layout";
import { NoPage } from "./views/404/NoPage";
import { Error } from "./views/Error/Error";
// Theme personnalisé JoyUI
import { theme } from "./theme";
import { client } from "./services/client";
import "./index.css";

const Swipe = () => {
  return (
    <>
      <div>Page Swipe</div>
      <NavLink to="/">Clique pour revenir sur la Home page</NavLink>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/swipe",
        element: <Swipe />,
      },
    ],
  },
  {
    path: "*",
    element: <NoPage />,
    errorElement: <Error />,
  },
]);

export default function App() {
  return (
    <StrictMode>
      <CssVarsProvider theme={theme}>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </CssVarsProvider>
    </StrictMode>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
