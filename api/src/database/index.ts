import { connectDb } from "./connection";
import LibraryDAO from "./dao/LibraryDAO";

export async function databaseConnectionFunction() {
  return connectDb();
}

export default {
  library: new LibraryDAO(),
}
