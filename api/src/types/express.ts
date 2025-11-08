import type { Connection } from "../database/connection";

declare global {
  namespace Express {
    interface Request {
      db: Connection;
    }
  }
}

export {}; 