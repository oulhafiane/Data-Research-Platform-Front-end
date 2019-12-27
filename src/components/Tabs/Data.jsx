import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Table from "./Table";
import update from "immutability-helper";

const styles = {
  width: "100%",
  height: "60vh",
  border: "1px solid black",
  position: "relative"
};
const Data = ({ hideSourceOnDrag }) => {
  const [tables, setTables] = useState({
    a: {
      top: 20,
      left: 80,
      title: "Region",
      variables: [{ type: "Text", name: "Name" }]
    },
    b: {
      top: 20,
      left: 599,
      title: "Farmer",
      variables: [
        { type: "Text", name: "FirstName" },
        { type: "Text", name: "LastName" },
        { type: "Integer", name: "Age" }
      ]
    }
  });
  const [, drop] = useDrop({
    accept: ItemTypes.TABLE,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveTable(item.id, left, top);
      return undefined;
    }
  });
  const moveTable = (id, left, top) => {
    setTables(
      update(tables, {
        [id]: {
          $merge: { left, top }
        }
      })
    );
  };
  return (
    <div className="scrollbar scrollbar-custom" ref={drop} style={styles}>
      {Object.keys(tables).map(key => {
        const { left, top, title, variables } = tables[key];
        return (
          <Table
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
            title={title}
            onChangeTitle={e => {
              console.log(e.target);
            }}
            variables={variables}
          ></Table>
        );
      })}
    </div>
  );
};
export default Data;
