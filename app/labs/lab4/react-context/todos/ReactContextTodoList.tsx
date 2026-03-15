"use client";
import { ListGroup, ListGroupItem, FormControl, Button } from "react-bootstrap";
import { useTodos } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos, todo, addTodo, deleteTodo, updateTodo, setTodo } = useTodos();

  return (
    <div id="wd-todo-list-context" className="w-100">
      <h2 className="mb-4">Todo List</h2>
      <ListGroup>
        <ListGroupItem className="d-flex align-items-center p-3">
          <FormControl
            className="me-3"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <div className="ms-auto d-flex">
            <Button
              onClick={updateTodo}
              id="wd-update-todo-context-click"
              className="btn btn-warning me-2"
            >
              Update
            </Button>
            <Button
              onClick={addTodo}
              id="wd-add-todo-context-click"
              className="btn btn-success"
            >
              Add
            </Button>
          </div>
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem key={t.id} className="d-flex align-items-center p-3">
            <span>{t.title}</span>
            <div className="ms-auto d-flex">
              <Button
                onClick={() => setTodo(t)}
                id="wd-set-todo-context-click"
                className="btn btn-primary me-2"
              >
                Edit
              </Button>
              <Button
                onClick={() => deleteTodo(t.id)}
                id="wd-delete-todo-context-click"
                className="btn btn-danger"
              >
                Delete
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
