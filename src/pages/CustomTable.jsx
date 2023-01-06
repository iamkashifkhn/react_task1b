import { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableRow from "./DraggableRow";

function CustomTable(props) {
  const [tableState, setTableState] = useState({...props});
  const [{ isOver }, drop] = useDrop({
    accept: "row",
    drop: (item, a) => {
      console.log("isover", isOver, item, props, a);
      setTableState({ rows: [{id:2}, {id:1}] });
      // This function is called when a draggable component is dropped on the droppable component
      // You can use the item.id to reorder your rows
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return (
    <table ref={drop}>
      <tbody>
        {tableState.rows.map((row) => (
          <DraggableRow key={row.id} id={row.id} />
        ))}
      </tbody>
    </table>
  );
}

export default CustomTable;
