import { Modal, Stack, Text } from "@mantine/core";
import type { BookItem } from "../shared/types/book";

interface BookDetailsDialogProps {
    opened: boolean;
    onClose: () => void;
    books: BookItem[];
    isReset: boolean;
}

const BookDetailsDialog = (props: BookDetailsDialogProps) => {
    const { opened, onClose, books, isReset } = props;

    console.log("books", books);
    console.log("isReset", isReset);
    return (
        <Modal opened={opened} onClose={onClose} title="Book Details">
            {(!books || books.length === 0) && <Text>No book details found</Text>}
            {isReset && books && books.length > 0 &&
                (
                    books.map((book) => (
                        <Stack key={book.id}>
                            <Text> {book.volumeInfo.title} </Text>
                            <Text>{book.volumeInfo.authors}</Text>
                            <Text>{book.volumeInfo.publishedDate}</Text>
                            <Text>{book.volumeInfo.industryIdentifiers?.find((identifier) => identifier.type === "ISBN_13")?.identifier}</Text>
                            <img src={book.volumeInfo.imageLinks?.thumbnail} />
                        </Stack>))
                )}
        </Modal>
    )
};

export default BookDetailsDialog;