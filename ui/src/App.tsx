import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import "@mantine/core/styles.css";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <StrictMode>
      <MantineProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </StrictMode>
  );
}

export default App;
