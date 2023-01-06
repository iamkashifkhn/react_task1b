import { useDrag } from "react-dnd";

function DraggableRow(props) {
  const [{ isDragging }, drag] = useDrag({
    type: "row",
    item: () => ({ id: props?.id }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <tr ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {props?.id}
    </tr>
  );
}
export default DraggableRow;
