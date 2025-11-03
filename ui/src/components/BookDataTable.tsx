import type { BookItem } from "../shared/types/book";
import { DataTable } from "mantine-datatable";
import "mantine-datatable/styles.css";
import classes from "../styles/BookDataTable.module.css";
import { Tooltip } from "@mantine/core";

const CellWithTooltip = ({ children }: { children: string }) => (
  <Tooltip
    label={children}
    withArrow
    position="top"
    multiline
    miw={100}
    maw={400}
  >
    <div
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  </Tooltip>
);

const columns = [
  {
    accessor: "title",
    title: "Title",
    width: 200,
    ellipsis: true,
    render: ({ title }: { title: string }) => (
      <CellWithTooltip>{title}</CellWithTooltip>
    ),
  },
  {
    accessor: "author",
    title: "Author",
    width: 200,
    ellipsis: true,
    render: ({ author }: { author: string }) => (
      <CellWithTooltip>{author}</CellWithTooltip>
    ),
  },
  {
    accessor: "genre",
    title: "Genre",
    width: 200,
    ellipsis: true,
    render: ({ genre }: { genre: string }) => (
      <CellWithTooltip>{genre}</CellWithTooltip>
    ),
  },
  {
    accessor: "summary",
    title: "Summary",
    ellipsis: true,
    width: 200,
    render: ({ summary }: { summary: string }) => (
      <CellWithTooltip>{summary}</CellWithTooltip>
    ),
  },
  {
    accessor: "publishedDate",
    title: "Published Date",
    width: 200,
    noWrap: true,
  },
  { accessor: "isbn", title: "ISBN", width: 200, noWrap: true },
  {
    accessor: "cover",
    title: "Cover",
    width: 200,
  },
];

const dataToColumnMapper = (book: BookItem) => {
  return {
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors?.join(", "),
    genre: book.volumeInfo.categories?.join(", "),
    summary: book.volumeInfo.description,
    publishedDate: book.volumeInfo.publishedDate,
    isbn: book.volumeInfo.industryIdentifiers?.[0]?.identifier,
    cover: (book.volumeInfo.imageLinks?.thumbnail && (
      <img
        src={book.volumeInfo.imageLinks?.thumbnail}
        alt={book.volumeInfo.title}
        width={100}
        height={100}
      />
    )) || <div>No cover available</div>,
  };
};

interface DataTableProps {
  books: BookItem[];
  handleLoadMore: () => void;
  onScrollToBottom: () => void;
  scrollViewportRef: React.RefObject<HTMLDivElement | null>;
}
const BookDataTable = (props: DataTableProps) => {
  const { books, onScrollToBottom, scrollViewportRef } = props;

  const data = books.map(dataToColumnMapper);

  return (
    <DataTable
      height={800}
      withColumnBorders
      striped
      highlightOnHover
      verticalSpacing="xs"
      columns={columns}
      records={data}
      classNames={classes}
      onScroll={onScrollToBottom}
      scrollViewportRef={scrollViewportRef}
    />
  );
};

export default BookDataTable;
