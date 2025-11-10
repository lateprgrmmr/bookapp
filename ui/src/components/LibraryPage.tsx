import { DataTable } from "mantine-datatable";
import { useLibrary } from "../contexts/LibraryContext";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const LibraryPage = () => {
  const { libraries, loadLibraries } = useLibrary();

  useEffect(() => {
    loadLibraries();
  }, [loadLibraries]);

  return (
    <div>
      <DataTable
        striped={true}
        highlightOnHover={true}
        withTableBorder={true}
        withColumnBorders={true}
        records={libraries}
        fetching={false}
        onRowClick={(row) => {
          // navigate to library
          <Navigate to={`/library/${row.record.id}`} />;
          console.log(row);
        }}
        columns={[
          { accessor: "name", title: "Name" },
          { accessor: "description", title: "Description" },
          { accessor: "book_count", title: "Book Count" },
        ]}
      />
    </div>
  );
};

export default LibraryPage;
