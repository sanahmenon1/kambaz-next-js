import { Button, ListGroupItem } from "react-bootstrap";

import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

type Todo = {
  id: string;
  title: string;
};

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center p-3">
      <span>{todo.title}</span>
      <div className="ms-auto d-flex">
        <Button onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click" className="btn btn-primary me-2">
          Edit
        </Button>

        <Button onClick={() => dispatch(deleteTodo(todo.id))} id="wd-delete-todo-click" className="btn btn-danger">
          Delete
        </Button>
      </div>
    </ListGroupItem>
  );
}