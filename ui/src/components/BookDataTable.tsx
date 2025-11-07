import { useEffect, useMemo, useState } from "react";
import type { BookDataTableRecord, BookItem } from "../shared/types/book";
import {
  DataTable,
  type DataTableColumn,
  type DataTableSortStatus,
} from "mantine-datatable";
import "mantine-datatable/styles.css";
import classes from "../styles/BookDataTable.module.css";
import { Tooltip } from "@mantine/core";
import { sortBy } from "lodash";

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

const columns: DataTableColumn<BookDataTableRecord>[] = [
  {
    accessor: "title",
    sortable: true,
    title: "Title",
    width: 200,
    ellipsis: true,
    render: ({ title }: { title: string }) => (
      <CellWithTooltip>{title}</CellWithTooltip>
    ),
  },
  {
    accessor: "author",
    sortable: true,
    title: "Author",
    width: 200,
    ellipsis: true,
    render: ({ author }: { author: string }) => (
      <CellWithTooltip>{author}</CellWithTooltip>
    ),
  },
  {
    accessor: "genre",
    sortable: true,
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
    sortable: true,
    title: "Published Date",
    width: 200,
    noWrap: true,
  },
  { accessor: "isbn", title: "ISBN", width: 200, noWrap: true, sortable: true },
  {
    accessor: "cover",
    title: "Cover",
    width: 200,
    render: ({ cover }: { cover?: string }) =>
      cover ? (
        <img src={cover} alt="Cover" width={100} height={100} />
      ) : (
        <div>No cover available</div>
      ),
  },
];

const dataToColumnMapper = (book: BookItem) => {
  return {
    id: book.id,
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors?.join(", "),
    genre: book.volumeInfo.categories?.join(", "),
    summary: book.volumeInfo.description,
    publishedDate: book.volumeInfo.publishedDate,
    isbn: book.volumeInfo.industryIdentifiers?.find(
      (identifier) => identifier.type === "ISBN_13"
    )?.identifier,
    cover: book.volumeInfo.imageLinks?.thumbnail,
  };
};

interface DataTableProps {
  books: BookItem[];
  handleLoadMore: () => void;
  onScrollToBottom: () => void;
  onSelectRecordsChange: (recordIds: string[]) => void;
  selectedBookIds: string[];
  scrollViewportRef: React.RefObject<HTMLDivElement | null>;
}
const BookDataTable = (props: DataTableProps) => {
  const {
    books,
    onScrollToBottom,
    scrollViewportRef,
    onSelectRecordsChange,
    selectedBookIds,
  } = props;

  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<BookDataTableRecord>
  >({
    columnAccessor: "title",
    direction: "asc",
  });
  const [records, setRecords] = useState<BookDataTableRecord[]>();

  const selectedRecords = useMemo(() => {
    return records?.filter((record) => selectedBookIds.includes(record.id));
  }, [records, selectedBookIds]);

  useEffect(() => {
    setRecords(books.map(dataToColumnMapper));
  }, [books]);

  useEffect(() => {
    const data = sortBy(
      records,
      sortStatus.columnAccessor
    ) as BookDataTableRecord[];
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);

  const handleSelectRecordChange = (selectedRecords: BookDataTableRecord[]) => {
    onSelectRecordsChange(selectedRecords.map((record) => record.id));
  };

  return (
    <DataTable
      height={800}
      withColumnBorders
      striped
      highlightOnHover
      verticalSpacing="xs"
      columns={columns}
      records={records}
      classNames={classes}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      onScroll={onScrollToBottom}
      scrollViewportRef={scrollViewportRef}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={handleSelectRecordChange}
    />
  );
};

export default BookDataTable;
