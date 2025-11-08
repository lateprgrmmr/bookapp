import { makeGetRequest } from ".";
import type {
  BookResponse,
  BookItem,
  SearchTypeEnum,
} from "../shared/types/book";

export const searchBook = async (
  searchType: SearchTypeEnum,
  searchQuery: string,
  sortCriteria: string,
  startIndex: number
): Promise<BookItem[]> => {
  if (!searchType || !searchQuery) {
    return [];
  }
  const booksResponse = await makeGetRequest<BookResponse>(
    `/book/search?searchType=${searchType}` +
      `&searchQuery=${searchQuery}` +
      `&sortCriteria=${sortCriteria}` +
      `&startIndex=${startIndex}`
  );
  if (!booksResponse) {
    return [];
  }
  return booksResponse.totalItems > 0 ? booksResponse.items : [];
};
