import { GrugClass, GrugMethod } from "../GrugDecorator";
import { useGrug } from "../useGrug";
import { TodoItem, TodoItemViewModel } from "./TodoItem";

type TodoListProps = {
    viewModel: TodoListViewModel;
};

export const TodoList = (props: TodoListProps) => {
    const viewModel = props.viewModel;
    useGrug(viewModel);

    const selectedItem = viewModel.getSelectedItem();

    return (
        <div>
            <div className="todo-list-header">
                <div style={{ fontSize: "2em" }}>Todo List</div>
                <button onClick={() => viewModel.createItem()}>Add new item</button>
            </div>
            <div className="todo-list">
                {viewModel.todos.map((todoItem) => (
                    <div key={todoItem.id} className={"todo-list__item list-item"}>
                        <div
                            className={
                                viewModel.isItemIdSelected(todoItem.id)
                                    ? "list-item__header list-item--selected"
                                    : "list-item__header"
                            }
                        >
                            <TodoListItemSummary viewModel={todoItem}></TodoListItemSummary>
                        </div>

                        <button onClick={() => viewModel.setSelectedItemId(todoItem.id)}>
                            {viewModel.isItemIdSelected(todoItem.id) ? "Hide" : "View"}
                        </button>
                        <button onClick={() => viewModel.removeItemById(todoItem.id)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            {selectedItem ? <TodoItem viewModel={selectedItem} /> : null}
        </div>
    );
};

const TodoListItemSummary = (props: { viewModel: TodoItemViewModel }) => {
    const viewModel = props.viewModel;
    useGrug(viewModel);

    return (
        <>
            <div className="list-item__title">{viewModel.title}</div>
            <div className="list-item__summary">{viewModel.date}</div>
        </>
    );
};

@GrugClass
export class TodoListViewModel {
    protected static uniqItemId = 0;
    private selectedItemId: number = -1;

    todos: TodoItemViewModel[] = [];

    @GrugMethod
    createItem() {
        const item = new TodoItemViewModel(TodoListViewModel.uniqItemId++);
        this.todos.push(item);
    }

    @GrugMethod
    removeItemById(id: number) {
        this.todos = this.todos.filter((t) => t.id !== id);
    }

    getItemById(id: number) {
        return this.todos.find((t) => t.id === id);
    }

    getSelectedItem() {
        return this.getItemById(this.selectedItemId);
    }

    @GrugMethod
    setSelectedItemId(id: number) {
        if (this.isItemIdSelected(id)) {
            this.selectedItemId = -1;
        } else {
            this.selectedItemId = id;
        }
    }

    isItemIdSelected(id: number) {
        return this.selectedItemId === id;
    }
}
