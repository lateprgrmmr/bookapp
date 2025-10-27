import {
  // Container,
  Text,
  // Table,
  Title,
  Stack,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import ScanDialog from "./ScanDialog";

// interface Book {
//   id: number;
//   title: string;
//   author: string;
//   year: number;
// }

// const mockNewBooks: Book[] = [
//   { id: 1, title: "The Midnight Library", author: "Matt Haig", year: 2020 },
//   { id: 2, title: "Project Hail Mary", author: "Andy Weir", year: 2021 },
//   {
//     id: 3,
//     title: "The Seven Husbands of Evelyn Hugo",
//     author: "Taylor Jenkins Reid",
//     year: 2017,
//   },
//   { id: 4, title: "Klara and the Sun", author: "Kazuo Ishiguro", year: 2021 },
//   { id: 5, title: "The Four Winds", author: "Kristin Hannah", year: 2021 },
// ];

// const mockSuggestedBooks: Book[] = [
//   { id: 6, title: "Educated", author: "Tara Westover", year: 2018 },
//   { id: 7, title: "Becoming", author: "Michelle Obama", year: 2018 },
//   { id: 8, title: "Sapiens", author: "Yuval Noah Harari", year: 2014 },
//   {
//     id: 9,
//     title: "The Silent Patient",
//     author: "Alex Michaelides",
//     year: 2019,
//   },
//   {
//     id: 10,
//     title: "Where the Crawdads Sing",
//     author: "Delia Owens",
//     year: 2018,
//   },
// ];

function Home() {
  const [scanDialogOpened, setScanDialogOpened] = useState(false);
  const openScanDialog = () => {
    setScanDialogOpened(true);
  };
  const closeScanDialog = () => {
    setScanDialogOpened(false);
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
        <Text>Scan the barcode of your book to add it to your library.</Text>
      </Stack>
      <ScanDialog opened={scanDialogOpened} onClose={closeScanDialog} />
    </div>
  );
}

export default Home;
