import { makeGetRequest } from ".";
import type { BookResponse, BookItem } from "../shared/types/book";


export const searchBookByISBN = async (val: string): Promise<BookItem[]> => {
    if (!val) {
        return [];
    }
    const booksResponse = await makeGetRequest<BookResponse>(`/books/isbn-search?isbn=${val}`);
    if (!booksResponse) {
        return [];
    }
    return booksResponse.totalItems > 0 ? booksResponse.items : [];
};

export const searchBookByTitleOrKeyword = async (val: string): Promise<BookItem[]> => {
    if (!val) {
        return [];
    }
    const booksResponse = await makeGetRequest<BookResponse>(`/books/title-or-keyword-search?titleOrKeyword=${val}`);
    if (!booksResponse) {
        return [];
    }
    return booksResponse.totalItems > 0 ? booksResponse.items : [];
};