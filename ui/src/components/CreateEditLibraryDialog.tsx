import { Button, TextInput, Modal } from "@mantine/core";
import { useState } from "react";
import { createLibrary } from "../actions/Library.action";
import { USER_ID } from "../shared/constants";

interface CreateEditLibraryDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateEditLibraryDialog = (props: CreateEditLibraryDialogProps) => {
  const { open, onClose } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateLibrary = () => {
    createLibrary(USER_ID, name, description);
    onClose();
  };

  return (
    <Modal opened={open} onClose={onClose}>
        <h1>Create or Edit Library</h1>
        <TextInput label="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextInput label="Description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <Button onClick={handleCreateLibrary}>Create</Button>
    </Modal>
  );
};

export default CreateEditLibraryDialog;