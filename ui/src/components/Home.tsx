import {
  // Container,
  Text,
  // Table,
  Title,
  Stack,
  Button,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import ScanDialog from "./ScanDialog";
import BookDetailsDialog from "./BookDetailsDialog";
import { searchBookByISBN, searchBookByTitleOrKeyword } from "../actions/Book.action";
import type { BookItem } from "../shared/types/book";

function Home() {
  const [scanDialogOpened, setScanDialogOpened] = useState<boolean>(false);
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [bookDetailsDialogOpened, setBookDetailsDialogOpened] = useState<boolean>(false);
  const [books, setBooks] = useState<BookItem[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isReset, setIsReset] = useState<boolean>(true);

  const handleBarcodeScanned = async (barcodeText: string) => {
    setScannedBarcode(scannedBarcode || barcodeText);
    if (barcodeText) {
      const books = await searchBookByISBN(barcodeText);
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
    const books = await searchBookByTitleOrKeyword(searchKeyword);
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
    <div>
      <Stack>
        <Title>My Books</Title>
        <Button
          leftSection={<FiCamera />}
          onClick={() => {
            openScanDialog();
          }}
        >
          Scan Book
        </Button>
        <Text>Scan the barcode of your book or search by title or keyword to add it to your library.</Text>
        <TextInput
          placeholder="Search by title or keyword"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
        />
        <Button onClick={handleSearchBookByTitleOrKeyword}>Search</Button>
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
}

export default Home;
