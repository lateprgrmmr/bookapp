import {
  // Table,
  // Container,
  Text,
  Title,
  Stack,
  Button,
  TextInput,
  Group,
  Radio,
  Select,
  Typography,
} from "@mantine/core";
import { useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";
import ScanDialog from "./ScanDialog";
import { searchBook } from "../actions/Book.action";
import {
  SearchTypeEnum,
  SortCriteriaEnum,
  type BookItem,
} from "../shared/types/book";
import { useMantineTheme } from "@mantine/core";
import BookDataTable from "./BookDataTable";

function useStyles() {
  const theme = useMantineTheme();
  return {
    root: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.gray[0],
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.md,
      border: `1px solid ${theme.colors.blue[6]}`,
      margin: theme.spacing.md,
      maxWidth: "100%",
    },
    scanButton: {
      width: 200,
    },
    searchInput: {
      width: 500,
    },
    searchButton: {
      width: 100,
    },
    resetButton: {
      width: 125,
    },
    sortSelect: {
      width: 200,
    },
    selectBooksButton: {
      width: 150,
    },
  };
}

const SearchPage = () => {
  const styles = useStyles();
  const [scanDialogOpened, setScanDialogOpened] = useState<boolean>(false);
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [books, setBooks] = useState<BookItem[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchType, setSearchType] = useState<SearchTypeEnum>(
    SearchTypeEnum.TITLE
  );
  const [sortCriteria, setSortCriteria] = useState<SortCriteriaEnum>(
    SortCriteriaEnum.NEWEST
  );
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollViewportRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

  const handleScrollToBottom = async () => {
    if (isLoading || !hasMore) {
      return;
    }
    setIsLoading(true);
    const newStartIndex = books.length;
    const newBooks = await searchBook(
      searchType,
      searchKeyword,
      sortCriteria,
      newStartIndex
    );
    if (newBooks.length > 0) {
      setBooks([...books, ...newBooks]);
      setStartIndex(newStartIndex + 10);
    }
    setIsLoading(false);
  };

  const handleBarcodeScanned = async (barcodeText: string) => {
    setScannedBarcode(scannedBarcode || barcodeText);
    setSearchType(SearchTypeEnum.ISBN);
    if (barcodeText) {
      const books = await searchBook(
        SearchTypeEnum.ISBN,
        barcodeText,
        sortCriteria,
        startIndex
      );
      console.log(books);
      if (books.length > 0) {
        setBooks(books);
        setHasMore(books.length > 0);
      }
    }
  };

  const openScanDialog = () => {
    setScanDialogOpened(true);
  };
  const closeScanDialog = () => {
    setScanDialogOpened(false);
  };

  const handleSearchBookByTitleOrKeyword = async () => {
    const books = await searchBook(
      searchType,
      searchKeyword,
      sortCriteria,
      startIndex
    );
    console.log(books);
    if (books.length > 0) {
      setBooks(books);
      setHasMore(books.length > 0);
    }
  };

  const resetSearch = () => {
    setSearchKeyword("");
    setBooks([]);
    setSelectedBookIds([]);
    setScannedBarcode(null);
    handleSelectRecordsChange([]);
  };

  const handleLoadMore = async () => {
    const newBooks = await searchBook(
      searchType,
      searchKeyword,
      sortCriteria,
      startIndex + 10
    );
    console.log(newBooks);
    setBooks([...books, ...newBooks]);
    setStartIndex(startIndex + 10);
  };

  const handleSearchKeywordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchKeyword(event.target.value);
    setStartIndex(0);
  };

  const handleSelectRecordsChange = (recordIds: string[]) => {
    setSelectedBookIds(recordIds);
  };

  const handleSelectBooks = () => {
    alert("pussy ass bitch");
    console.log(selectedBookIds);
  };

  return (
    <div>
      <Stack gap="xl" style={styles.root}>
        <Title order={2}>Search Our Books</Title>
        <Group align="center">
          <Button
            leftSection={<FiCamera size={16} style={{ marginRight: 1 }} />}
            style={styles.scanButton}
            onClick={() => {
              openScanDialog();
            }}
          >
            Scan Book
          </Button>
          <Text size="sm">
            Scan the barcode of your book or search by title or keyword to add
            it to your library.
          </Text>
        </Group>
        <Group align="center">
          <TextInput
            placeholder="Search by title or keyword"
            style={styles.searchInput}
            value={searchKeyword}
            onChange={handleSearchKeywordChange}
          />
          <Button
            onClick={handleSearchBookByTitleOrKeyword}
            style={styles.searchButton}
          >
            Search
          </Button>
          <Radio.Group
            value={searchType}
            onChange={(value) => setSearchType(value as SearchTypeEnum)}
          >
            <Group>
              <Radio
                value={SearchTypeEnum.ISBN}
                label="ISBN"
                onChange={() => setSearchType(SearchTypeEnum.ISBN)}
              />
              <Radio
                value={SearchTypeEnum.TITLE}
                label="Title"
                onChange={() => setSearchType(SearchTypeEnum.TITLE)}
              />
              <Radio
                value={SearchTypeEnum.KEYWORD}
                label="Keyword"
                onChange={() => setSearchType(SearchTypeEnum.KEYWORD)}
              />
              <Radio
                value={SearchTypeEnum.AUTHOR}
                label="Author"
                onChange={() => setSearchType(SearchTypeEnum.AUTHOR)}
              />
            </Group>
          </Radio.Group>
          <Button onClick={resetSearch} style={styles.resetButton}>
            Clear Search
          </Button>
          <Typography>Sort By:</Typography>
          <Select
            data={[
              { label: "Newest", value: SortCriteriaEnum.NEWEST },
              { label: "Relevance", value: SortCriteriaEnum.RELEVANCE },
            ]}
            placeholder="Sort By"
            style={styles.sortSelect}
            value={sortCriteria}
            onChange={(value) => setSortCriteria(value as SortCriteriaEnum)}
          />
          {selectedBookIds.length > 0 && (
            <Button
              onClick={handleSelectBooks}
              style={styles.selectBooksButton}
            >
              Add to Library
            </Button>
          )}
        </Group>
      </Stack>
      <ScanDialog
        open={scanDialogOpened}
        onClose={closeScanDialog}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <BookDataTable
        books={books}
        handleLoadMore={handleLoadMore}
        onScrollToBottom={handleScrollToBottom}
        scrollViewportRef={scrollViewportRef}
        onSelectRecordsChange={handleSelectRecordsChange}
        selectedBookIds={selectedBookIds}
      />
    </div>
  );
};

export default SearchPage;
