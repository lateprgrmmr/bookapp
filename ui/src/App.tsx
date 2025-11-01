import { MantineProvider } from "@mantine/core";
import Home from "./components/Home";
import { StrictMode } from "react";
import "@mantine/core/styles.css";

function App() {
  return (
    <StrictMode>
      <MantineProvider>
        <div>Hello???</div>
        <Home />
      </MantineProvider>
    </StrictMode>
  );
}

export default App;
