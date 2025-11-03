import { makeGetRequest } from ".";
import type {
  BookResponse,
  BookItem,
  SearchTypeEnum,
} from "../shared/types/book";

export const searchBook = async (
  searchType: SearchTypeEnum,
  searchQuery: string
): Promise<BookItem[]> => {
  if (!searchType || !searchQuery) {
    return [];
  }
  const booksResponse = await makeGetRequest<BookResponse>(
    `/books/search?searchType=${searchType}&searchQuery=${searchQuery}`
  );
  if (!booksResponse) {
    return [];
  }
  return booksResponse.totalItems > 0 ? booksResponse.items : [];
};
