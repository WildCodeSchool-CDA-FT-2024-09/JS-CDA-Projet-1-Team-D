import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssVarsProvider } from "@mui/joy/styles";
import { ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { NoPage } from "./views/404/NoPage";
import { Matches } from "./views/Matches/Matches";
import { Likes } from "./views/Likes/Likes";
import { PersonalSettings } from "./views/PersonalSettings/Personalsettings";
import { Error } from "./views/Error/Error";

import { theme } from "./theme";
import { client } from "./services/client";
import "./style/index.css";
import { Layout } from "./components/Layout/Layout";
import ConnexionPage from "./views/ConnexionPage/ConnexionPage";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./views/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/matches",
        element: <Matches />,
      },
      {
        path: "/likes",
        element: <Likes />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/settings",
        element: <PersonalSettings />,
      },
    ],
  },
  {
    path: "/login",
    element: <ConnexionPage />,
    errorElement: <Error />,
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
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ApolloProvider>
      </CssVarsProvider>
    </StrictMode>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
