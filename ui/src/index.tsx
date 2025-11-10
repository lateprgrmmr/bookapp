import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import Navigation from "./components/Navigation";
import BookAppRouter from "./components/BookAppRouter";
import { createRoot } from "react-dom/client";
import { LibraryProvider } from "./contexts/LibraryContext";

const RootComponent = () => {
  return (
    <MantineProvider>
      <LibraryProvider>
        <BrowserRouter>
          <Navigation />
          <BookAppRouter />
        </BrowserRouter>
      </LibraryProvider>
    </MantineProvider>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container!);

root.render(
  <div className="book-app">
    <h1>Book App</h1>
    <RootComponent />
  </div>
);
