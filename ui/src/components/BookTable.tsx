import { Button, Table } from "@mantine/core";
import type { BookItem } from "../shared/types/book";

interface BookTableProps {
  books: BookItem[];
  isReset: boolean;
  handleLoadMore: () => void;
  hasMore: boolean;
}

const BookTable = (props: BookTableProps) => {
  const { books, isReset, handleLoadMore, hasMore } = props;

  const handleNextPage = () => {
    handleLoadMore();
  };

  return (
    <div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: "15%" }}>Title</Table.Th>
            <Table.Th style={{ width: "15%" }}>Author</Table.Th>
            <Table.Th style={{ width: "15%" }}>Genre</Table.Th>
            <Table.Th
              style={{
                width: "15%",
                textWrap: "nowrap",
                textOverflow: "ellipsis",
                height: "50px",
              }}
            >
              Summary
            </Table.Th>
            <Table.Th style={{ width: "15%" }}>Published Date</Table.Th>
            <Table.Th style={{ width: "15%" }}>ISBN</Table.Th>
            <Table.Th>Cover</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {books.length === 0 &&
            (isReset ? (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  Search for a title, keyword, or author in our library and add
                  it to your personal library. Or, scan the barcode of your book
                  to add it to your personal library.
                </Table.Td>
              </Table.Tr>
            ) : (
              <Table.Td colSpan={5}>
                No results found. Adjust your search criteria and try again.
              </Table.Td>
            ))}
          {books.map((book) => (
            <Table.Tr key={book.id}>
              <Table.Td>{book.volumeInfo.title}</Table.Td>
              <Table.Td>{book.volumeInfo.authors?.join(", ")}</Table.Td>
              <Table.Td>{book.volumeInfo.categories?.join(", ")}</Table.Td>
              <Table.Td>{book.volumeInfo.description}</Table.Td>
              <Table.Td>{book.volumeInfo.publishedDate}</Table.Td>
              <Table.Td>
                {
                  book.volumeInfo.industryIdentifiers?.find(
                    (identifier) => identifier.type === "ISBN_13"
                  )?.identifier
                }
              </Table.Td>
              <Table.Td>
                {(book.volumeInfo.imageLinks?.thumbnail && (
                  <img
                    src={
                      book.volumeInfo.imageLinks?.thumbnail ||
                      book.volumeInfo.imageLinks?.smallThumbnail ||
                      ""
                    }
                    alt={book.volumeInfo.title}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                  />
                )) || <div>No image</div>}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {hasMore && <Button onClick={handleNextPage}>Load More</Button>}
    </div>
  );
};

export default BookTable;
