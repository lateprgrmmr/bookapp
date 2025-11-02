import { Router } from "express";
import { googleBooksRequest } from "../../utils/googleBooks";

const router = Router();

router.get("/isbn-search", async (req, res) => {

    const { isbn } = req.query;
    if (!isbn) {
        return res.status(400).json({ error: "ISBN is required" });
    }
    const book = await googleBooksRequest({
        method: "GET",
        path: `volumes?q=isbn:${isbn}`,
    });
    res.json(book);
});

router.get("/title-or-keyword-search", async (req, res) => {
    const { titleOrKeyword } = req.query;
    if (!titleOrKeyword) {
        return res.status(400).json({ error: "Title or keyword is required" });
    }
    const booksResponse = await googleBooksRequest({
        method: "GET",
        path: `volumes?q=${titleOrKeyword}`,
    });
    if (!booksResponse) {
        return res.status(400).json({ error: "No books found" });
    }
    res.json(booksResponse);
});

export default router;