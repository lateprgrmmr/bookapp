import type { LibraryRecord } from "../../shared/types/library";
import type { Connection } from "../../database/connection";

export const getLibraries = async (db: Connection) => {
  const libraries = await db.library.find();
  return libraries;
};

export const createLibrary = async (db: Connection, userId: number, name: string, description: string) => {
//   const db = await connectDb();
  const newLibrary = await db.library.insert({ user_id: userId, name, description });
  return newLibrary[0];
};