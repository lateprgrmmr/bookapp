import { Router } from "express";
import { googleBooksRequest } from "../../utils/googleBooks";
import { SearchTypeEnum } from "../../shared/types/book";

const router = Router();

const getSearchOperator = (searchType: any) => {
  switch (searchType) {
    case SearchTypeEnum.ISBN:
      return "isbn:";
    case SearchTypeEnum.TITLE:
      return "intitle:";
    case SearchTypeEnum.KEYWORD:
      return "subject:";
    case SearchTypeEnum.AUTHOR:
      return "inauthor:";
    default:
      return "";
  }
};

router.get("/search", async (req, res) => {
  const { searchType, searchQuery } = req.query;
  if (!searchType || !searchQuery) {
    return res
      .status(400)
      .json({ error: "Search type and search query are required" });
  }
  const encodedSearchQuery = encodeURIComponent(searchQuery as string);
  const queryString = `${getSearchOperator(searchType)}${encodedSearchQuery}`;

  const booksResponse = await googleBooksRequest({
    method: "GET",
    path: `volumes?q=${queryString}`,
  });
  res.json(booksResponse);
});

export default router;
