import "./Todo.css";
import { TodoList, TodoListViewModel } from "./TodoList";

const listViewModel = new TodoListViewModel();

function ViewModelTodoApp() {
    return <TodoList viewModel={listViewModel} />;
}

export default ViewModelTodoApp;
