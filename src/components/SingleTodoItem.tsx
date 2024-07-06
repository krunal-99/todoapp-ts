import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { Todo } from "../model";

interface Props {
  todos: Todo[];
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleEdit: (id: number) => void;
  handleDelete: (todoId: number) => void;
}

const SingleTodoItem: React.FC<Props> = ({
  todos,
  todo,
  setTodos,
  handleEdit,
  handleDelete,
}) => {
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <li
      key={todo.id}
      className="list-group-item  d-flex flex-wrap justify-content-between align-items-center bg-secondary text-white mb-2 rounded"
    >
      <div className="d-flex align-items-center">
        {todo.isDone ? (
          <button
            type="button"
            className="btn p-1 btn-danger text-white me-2"
            onClick={() => handleDone(todo.id)}
          >
            <ImCross />
          </button>
        ) : (
          <button
            type="button"
            className="btn p-1  btn-success text-white me-2"
            onClick={() => handleDone(todo.id)}
          >
            <TiTick />
          </button>
        )}

        {todo.isDone ? (
          <s className="fs-5">{todo.todoItem}</s>
        ) : (
          <span className="fs-5">{todo.todoItem}</span>
        )}
      </div>
      <div>
        <button
          disabled={todo.isDone}
          className="btn btn-info  flex-fill text-white me-2"
          onClick={() => handleEdit(todo.id)}
        >
          <FaEdit /> Edit
        </button>

        <button
          className="btn btn-danger flex-fill me-2"
          onClick={() => handleDelete(todo.id)}
        >
          <MdDelete /> Delete
        </button>
      </div>
    </li>
  );
};

export default SingleTodoItem;
