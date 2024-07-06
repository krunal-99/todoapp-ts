import "./TodoContainer.css";
import { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import SingleTodoItem from "./SingleTodoItem";

const TodoContainer: React.FC = () => {
  const [todoItem, setTodoItem] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<number>();
  const [update, setUpdate] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    const storedTodos = todoString ? JSON.parse(todoString) : [];
    setTodos(storedTodos);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isMounted]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [update]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoItem) {
      setTodos([...todos, { id: Date.now(), todoItem, isDone: false }]);
      setTodoItem("");
    }
  };

  const handleEdit = (id: number) => {
    let editTodo = todos.find((todo) => todo.id === id);
    if (editTodo) {
      setTodoItem(editTodo.todoItem);
      setUpdateId(id);
      setUpdate(true);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateId !== undefined) {
      setTodos(
        todos.map((todo) =>
          todo.id === updateId ? { ...todo, todoItem } : todo
        )
      );
    }
    setUpdate(false);
    setTodoItem("");
  };

  const handleDelete = (todoId: number) => {
    console.log(todos);
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className="container my-5 py-5 rounded shadow-lg text-white">
      <h1 className="text-center mb-4">Todo App</h1>
      <div className="row justify-content-center">
        <form className="col-md-6 d-flex mb-3">
          <input
            type="text"
            value={todoItem}
            ref={inputRef}
            onChange={(e) => setTodoItem(e.target.value)}
            className="form-control me-2"
            placeholder="Enter Your Task"
          />
          {update ? (
            <button onClick={handleUpdate} className="btn btn-success">
              Update
            </button>
          ) : (
            <button onClick={handleAdd} className="btn btn-success">
              Add
            </button>
          )}
        </form>
      </div>
      <div className="container col-md-10 mt-4">
        <ul className="list-group">
          {todos.length === 0 ? (
            <h2 className="text-center fw-bold">No Todos To Display</h2>
          ) : (
            todos.map((todo) => (
              <SingleTodoItem
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoContainer;
