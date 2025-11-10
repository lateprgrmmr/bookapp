import { makeGetRequest, makePostRequest } from ".";
import type { LibraryUXRecord } from "../shared/types/library";

export const getLibraries = async () => {
  const response = await makeGetRequest<LibraryUXRecord[]>("/library");
  return response;
};

export const createLibrary = async (userId: number, name: string, description: string) => {
  const response = await makePostRequest<LibraryUXRecord>("/library", { userId, name, description });
  return response;
};