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
} from "@mantine/core";
import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import ScanDialog from "./ScanDialog";
import BookDetailsDialog from "./BookDetailsDialog";
import { searchBook } from "../actions/Book.action";
import { SearchTypeEnum, type BookItem } from "../shared/types/book";
import { useMantineTheme } from "@mantine/core";

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
      maxWidth: 1000,
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
  };
}

const Home = () => {
  const styles = useStyles();
  const [scanDialogOpened, setScanDialogOpened] = useState<boolean>(false);
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [bookDetailsDialogOpened, setBookDetailsDialogOpened] =
    useState<boolean>(false);
  const [books, setBooks] = useState<BookItem[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isReset, setIsReset] = useState<boolean>(true);
  const [searchType, setSearchType] = useState<SearchTypeEnum>(
    SearchTypeEnum.ISBN
  );
  const handleBarcodeScanned = async (barcodeText: string) => {
    setScannedBarcode(scannedBarcode || barcodeText);
    setSearchType(SearchTypeEnum.ISBN);
    if (barcodeText) {
      const books = await searchBook(SearchTypeEnum.ISBN, barcodeText);
      console.log(books);
      if (books.length > 0) {
        setBookDetailsDialogOpened(true);
        setBooks(books);
      }
    }
  };

  const openScanDialog = () => {
    setScanDialogOpened(true);
  };
  const closeScanDialog = () => {
    setScanDialogOpened(false);
  };
  const closeBookDetailsDialog = () => {
    setBookDetailsDialogOpened(false);
    resetSearch();
  };

  const handleSearchBookByTitleOrKeyword = async () => {
    const books = await searchBook(searchType, searchKeyword);
    console.log(books);
    if (books.length > 0) {
      setBookDetailsDialogOpened(true);
      setBooks(books);
    }
  };

  const resetSearch = () => {
    setSearchKeyword("");
    setBooks([]);
    setScannedBarcode(null);
    setIsReset(true);
  };

  return (
    <div style={styles.root}>
      <Stack gap="xl">
        <Title order={2}>My Books</Title>
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
          <Button
            onClick={handleSearchBookByTitleOrKeyword}
            style={styles.searchButton}
          >
            Search
          </Button>
          <TextInput
            placeholder="Search by title or keyword"
            style={styles.searchInput}
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
          />
          <Group>
            <Radio.Group>
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
            </Radio.Group>
            <Radio.Group>
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
            </Radio.Group>
          </Group>
        </Group>
      </Stack>
      <ScanDialog
        opened={scanDialogOpened}
        onClose={closeScanDialog}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <BookDetailsDialog
        isReset={isReset}
        books={books}
        opened={bookDetailsDialogOpened}
        onClose={closeBookDetailsDialog}
      />
    </div>
  );
};

export default Home;
