import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import CustomTable from "./CustomTable";

function AdminTable() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* Your components go here */}
      <CustomTable rows={[{ id: 1 }, { id: 2 }]} />
    </DndProvider>
  );
}
export default AdminTable;
