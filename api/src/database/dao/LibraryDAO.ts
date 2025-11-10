import { LibraryUXRecord } from "src/shared/types/library";
import type { Connection } from "../connection";


export default class LibraryDAO {
    async findAllLibraryUX(db: Connection) {
        const libraries: LibraryUXRecord[] = await db.library.findAllLibraryUX();
        console.log(libraries);
        return libraries;
    }
}