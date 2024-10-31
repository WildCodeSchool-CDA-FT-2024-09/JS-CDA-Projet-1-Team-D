import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssVarsProvider } from "@mui/joy/styles";
import { ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { NoPage } from "./views/404/NoPage";
import { Error } from "./views/Error/Error";
// Theme personnalisé JoyUI
import { theme } from "./theme";
import { client } from "./services/client";
import "./index.css";
import ConnexionPage from "./views/ConnexionPage/ConnexionPage";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
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
