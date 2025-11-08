import { Button, Modal } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import type { LibraryRecord } from "../shared/types/library";

interface LibraryDialogProps {
  open: boolean;
  onClose: () => void;
  libraries: LibraryRecord[];
  onAddLibrary: () => void;
  selectedBookIds: string[];
}
const LibraryDialog = (props: LibraryDialogProps) => {
  const { open, onClose, libraries, onAddLibrary, selectedBookIds } = props;

  const handleAddLibrary = () => {
    onAddLibrary();
    onClose();
  };

  const handleEditLibrary = (id: string) => {
    console.log(id);
    // addBooksToLibrary(id, selectedBookIds);
  };

  return (
    <Modal opened={open} onClose={onClose}>
      <DataTable
        records={libraries.map((library) => ({
          id: library.id,
          name: library.name,
          description: library.description,
        }))}
        columns={[
          { accessor: "name", title: "Name" },
          { accessor: "description", title: "Description" },
          { accessor: "action",
             title: "Action",
              render: (record) => 
              <Button onClick={() =>
                 handleEditLibrary(record.id)}>{`Add ${selectedBookIds.length > 0 
                    ? "Selected Books" : "This Book"} to ${record.name}`}</Button> },
        ]}
      />
      <Button onClick={handleAddLibrary}>+ Add Library</Button>
    </Modal>
  );
};

export default LibraryDialog;
