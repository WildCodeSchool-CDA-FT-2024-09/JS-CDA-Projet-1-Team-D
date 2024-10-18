import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { NoPage } from "./views/404";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <StrictMode>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </StrictMode>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
