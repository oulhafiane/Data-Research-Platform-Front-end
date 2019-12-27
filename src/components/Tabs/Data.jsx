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
  const [tables, setTables] = useState([
    {
      top: 20,
      left: 80,
      title: "Region",
      variables: [{ type: "Text", name: "Name" }]
    },
    {
      top: 20,
      left: 599,
      title: "Farmer",
      variables: [
        { type: "Text", name: "FirstName" },
        { type: "Text", name: "LastName" },
        { type: "Integer", name: "Age" }
      ]
    }
  ]);
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
      {tables.map((val, key) => {
        return (
          <Table
            key={key}
            id={key}
            left={val.left}
            top={val.top}
            hideSourceOnDrag={hideSourceOnDrag}
            title={val.title}
            onChangeTitle={e => {
              setTables(
                tables.map((val, key2) => {
                  if (key2 === key) {
                    return { ...val, title: e.target.value };
                  }
                  return val;
                })
              );
            }}
            variables={val.variables}
          ></Table>
        );
      })}
    </div>
  );
};
export default Data;
