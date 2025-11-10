import { Route, Routes } from "react-router-dom";
import SearchPage from "./SearchPage";
import HomePage from "./HomePage";
import LibraryPage from "./LibraryPage";
import { Suspense } from "react";

const BookAppRouter = () => {
  return (
    <div className="book-app-router">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default BookAppRouter;
