import type { BookItem } from "./book";

export interface LibraryRecord {
  id: string;
  user_id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface LibraryUXRecord extends LibraryRecord {
  book_count: number;
}

export interface LibraryBookRecord {
  id: string;
  library_id: number;
  book_id: number;
  book: BookItem;
  created_at: string;
  updated_at: string;
}