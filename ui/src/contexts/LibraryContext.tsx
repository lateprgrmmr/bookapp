import { createContext, useCallback, useContext, useReducer } from "react";
import { LibraryUXRecord } from "../shared/types/library";
import { getLibraries } from "../actions/Library.action";

type LibraryState = {
  libraries: LibraryUXRecord[];
  selectedBookIds: string[];
};

type LibraryAction = { type: "SET_LIBRARIES"; payload: LibraryUXRecord[] };
// {type: "SET_SELECTED_BOOK_IDS", payload: string[]} |
// {type: "ADD_BOOK_TO_LIBRARY", payload: {libraryId: string, bookId: string}} |
// {type: "REMOVE_BOOK_FROM_LIBRARY", payload: {libraryId: string, bookId: string}} |
// {type: "CLEAR_SELECTED_BOOK_IDS"}

const LibraryContext = createContext<
  | (LibraryState & {
      loadLibraries: () => Promise<void>;
    //   addLibrary: (name: string, description: string) => Promise<void>;
    //   setSelectedBookIds: (bookIds: string[]) => void;
    })
  | undefined
>(undefined);

const initialState: LibraryState = {
  libraries: [],
  selectedBookIds: [],
};

const libraryReducer = (
  state: LibraryState,
  action: LibraryAction
): LibraryState => {
  switch (action.type) {
    case "SET_LIBRARIES":
      return { ...state, libraries: action.payload };
    default:
      return state;
  }
};

export const LibraryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(libraryReducer, initialState);

  const loadLibraries = useCallback(async () => {
    const data = await getLibraries();
    if (data) {
      dispatch({ type: "SET_LIBRARIES", payload: data });
    }
  }, []);

  return (
    <LibraryContext.Provider
      value={{
        ...state,
        loadLibraries,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return ctx;
}
