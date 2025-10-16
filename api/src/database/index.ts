import { connectDb } from "./connection";

export async function databaseConnectionFunction() {
  return connectDb();
}
