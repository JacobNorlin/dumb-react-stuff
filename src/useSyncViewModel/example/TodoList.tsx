import { useEffect } from "react";
import { useSyncViewModel } from "../useSyncViewModel";
import { TodoItem, TodoItemViewModel } from "./TodoItem";
import { ViewModelBase } from "./ViewModelBase";

type TodoListProps = {
    viewModel: TodoListViewModel;
};

export const TodoList = (props: TodoListProps) => {
    const viewModel = props.viewModel;
    useSyncViewModel(viewModel);

    const selectedItem = viewModel.getSelectedItem();

    useEffect(() => {
        //Because we are displaying the title of an item inside the list,
        //but the item itself changes the title we need to be able to
        //propagate change events for the selected item to the parent.
        const notifyParent = () => viewModel.notifyPropertyChanged();
        if (selectedItem) {
            selectedItem.addChangeListener(notifyParent);

            return () => selectedItem.removeChangeListener(notifyParent);
        }
    }, [selectedItem]);

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
                            <div className="list-item__title">{todoItem.title}</div>
                            <div className="list-item__summary">{todoItem.date}</div>
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

export class TodoListViewModel extends ViewModelBase {
    protected static uniqItemId = 0;
    private selectedItemId: number = -1;

    todos: TodoItemViewModel[] = [];

    constructor() {
        super();
    }

    createItem() {
        const item = new TodoItemViewModel(TodoListViewModel.uniqItemId++);
        this.todos.push(item);
        this.notifyPropertyChanged();
    }

    removeItemById(id: number) {
        this.todos = this.todos.filter((t) => t.id !== id);
        this.notifyPropertyChanged();
    }

    getItemById(id: number) {
        return this.todos.find((t) => t.id === id);
    }

    getSelectedItem() {
        return this.getItemById(this.selectedItemId);
    }

    setSelectedItemId(id: number) {
        if (this.isItemIdSelected(id)) {
            this.selectedItemId = -1;
        } else {
            this.selectedItemId = id;
        }
        this.notifyPropertyChanged();
    }

    isItemIdSelected(id: number) {
        return this.selectedItemId === id;
    }
}
