import { useSyncViewModel } from "../useSyncViewModel";
import { ViewModelBase } from "./ViewModelBase";

type TodoItemProps = {
    viewModel: TodoItemViewModel;
};

export const TodoItem = (props: TodoItemProps) => {
    const viewModel = props.viewModel;
    useSyncViewModel(viewModel);

    return (
        <div className="todo-item">
            <div className="todo-item__title">{viewModel.title}</div>
            <div className="todo-item__options">
                <div className="item-option">
                    <div className="item-option__title">Title</div>
                    <input
                        className="item-option__setting"
                        type="text"
                        value={viewModel.title}
                        onChange={(e) => (viewModel.title = e.target.value)}
                    />
                </div>
                <div className="item-option">
                    <div className="item-option__title">Description</div>
                    <textarea
                        className="item-option__setting"
                        value={viewModel.description}
                        onChange={(e) => (viewModel.description = e.target.value)}
                    />
                </div>

                <div className="item-option">
                    <div className="item-option__title">Date</div>
                    <input
                        className="item-option__setting"
                        type="text"
                        value={viewModel.date}
                        onChange={(e) => (viewModel.date = e.target.value)}
                    />
                </div>

                <div className="item-option">
                    <div className="item-option__title">Stats</div>
                    <div className="item-option__setting">
                        <div className="item-option">
                            <div className="item-option__title">Num listeners:</div>
                            <div>{viewModel.listeners.length}</div>
                        </div>
                        <div className="item-option">
                            <div className="item-option__title">Notify called:</div>
                            <div>{viewModel.numNotifies}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export class TodoItemViewModel extends ViewModelBase {
    private _date: string = "";
    private _description: string = "";
    private _title: string;
    readonly id: number;

    constructor(id: number) {
        super();
        this._title = "Todo " + id;
        this.id = id;
    }

    get date() {
        return this._date;
    }

    set date(val: string) {
        this._date = val;
        this.notifyPropertyChanged();
    }

    get description() {
        return this._description;
    }

    set description(val: string) {
        this._description = val;
        this.notifyPropertyChanged();
    }

    get title() {
        return this._title;
    }

    set title(val: string) {
        this._title = val;
        this.notifyPropertyChanged();
    }
}
