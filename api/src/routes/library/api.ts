import daos from "../../database"
import { Connection } from "../../database/connection";

export const getLibraries = async (db: Connection) => {
  const libraries = await daos.library.findAllLibraryUX(db);
  return libraries;
};

export const createLibrary = async (db: Connection, userId: number, name: string, description: string) => {
  const newLibrary = await db.library.insert({ user_id: userId, name, description });
  return newLibrary[0];
};

export const addBooksToLibrary = async (db: Connection, libraryId: number, bookIds: number[]) => {
  const books = await db.book.find({ id: { $in: bookIds } });
  const library = await db.library.find({ id: libraryId });
  if (!library) {
    throw new Error("Library not found");
  }
  library.books.push(...books);
  await db.library.update({ id: libraryId }, { books: library.books });
  return library;
};