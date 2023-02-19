import { GrugClass, GrugProperty, GrugStuff } from "../GrugDecorator";
import { useGrug } from "../useGrug";

type TodoItemProps = {
    viewModel: TodoItemViewModel;
};

export const TodoItem = (props: TodoItemProps) => {
    const viewModel = props.viewModel;
    useGrug(viewModel);

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
                    <div className="item-option__title">Grug</div>
                    <div>{(viewModel as any)[GrugStuff].notifier.listeners.length}</div>
                </div>
            </div>
        </div>
    );
};

@GrugClass
export class TodoItemViewModel {
    private _date: string = "";
    private _description: string = "";
    private _title: string;
    readonly id: number;

    constructor(id: number) {
        this._title = "Todo " + id;
        this.id = id;
    }

    get date() {
        return this._date;
    }

    @GrugProperty
    set date(val: string) {
        this._date = val;
    }

    get description() {
        return this._description;
    }

    @GrugProperty
    set description(val: string) {
        this._description = val;
    }

    get title() {
        return this._title;
    }

    @GrugProperty
    set title(val: string) {
        this._title = val;
    }
}
