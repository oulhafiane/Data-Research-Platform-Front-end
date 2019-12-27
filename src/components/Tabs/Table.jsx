import React, { useState } from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "./ItemTypes";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  InputGroup,
  Pagination,
  PaginationLink,
  PaginationItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const style = {
  position: "absolute",
  backgroundColor: "white",
  cursor: "move"
};
const Table = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  title,
  onChangeTitle,
  variables
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.TABLE },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div ref={drag} style={{ ...style, left, top }}>
      <Card className="shadow">
        <CardHeader
          className="border-0"
          style={{ padding: "0.7rem", backgroundColor: "#5e72e4" }}
        >
          <Input
            value={title}
            type="tableName"
            onChange={onChangeTitle}
            style={{
              backgroundColor: "#5e72e4",
              border: "0",
              color: "white",
              fontSize: "1.3rem",
              textAlign: "center"
            }}
          />
        </CardHeader>
        <CardBody className="px-lg-2 py-lg-2">
          <FormGroup style={{ marginBottom: "1px" }}>
            <InputGroup className="input-group-alternative">
              <UncontrolledDropdown
                style={{
                  marginRight: "10px",
                  backgroundColor: "#e9ecef"
                }}
              >
                <DropdownToggle
                  className="text-dark"
                  href="#pablo"
                  role="button"
                  color=""
                  onClick={e => e.preventDefault()}
                >
                  Text
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    Action
                  </DropdownItem>
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    Another action
                  </DropdownItem>
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    Something else here
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Input placeholder="Email" type="email" />
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  color=""
                  onClick={e => e.preventDefault()}
                  style={{ marginTop: "4px", paddingTop: "3px" }}
                >
                  <i className="ni ni-fat-remove" />
                </DropdownToggle>
              </UncontrolledDropdown>
            </InputGroup>
          </FormGroup>
          <Pagination
            className="pagination justify-content-end mb-0"
            listClassName="justify-content-end mb-0"
            style={{ marginTop: "5px" }}
          >
            <PaginationItem>
              <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                <i className="ni ni-fat-add" />
                <span className="sr-only">+</span>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </div>
  );
};
export default Table;
