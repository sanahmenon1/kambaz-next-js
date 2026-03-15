import React from "react";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";


export default function TodoForm(
) {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center p-3">
      <FormControl className="me-3" value={todo.title} onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
      <div className="ms-auto d-flex">
        <Button onClick={() => dispatch(updateTodo(todo))} id="wd-update-todo-click"  className="btn btn-warning me-2">
          Update
        </Button>
        <Button onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click" className="btn btn-success">
          Add
        </Button>
      </div>
    </ListGroupItem>
  );
}
