import { makeGetRequest, makePostRequest } from ".";
import type { LibraryRecord } from "../shared/types/library";

export const getLibraries = async () => {
  const response = await makeGetRequest<LibraryRecord[]>("/library");
  return response;
};

export const createLibrary = async (userId: number, name: string, description: string) => {
  const response = await makePostRequest<LibraryRecord>("/library", { userId, name, description });
  return response;
};