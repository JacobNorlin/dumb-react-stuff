import "./Todo.css";
import { TodoList, TodoListViewModel } from "./TodoList";

const listViewModel = new TodoListViewModel();

export function GrugTodoApp() {
    return <TodoList viewModel={listViewModel} />;
}
