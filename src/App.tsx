import "./App.css";
import { GrugTodoApp } from "./useGrug/example/GrugTodoApp";
import ViewModelTodoApp from "./useSyncViewModel/example/ViewModelTodoApp";

function App() {
    return <div>
        <h1>
            useSyncViewModel
        </h1>
        <div>
            <ViewModelTodoApp/>
        </div>
        <h1>
            useGrug
        </h1>
        <div>
            <GrugTodoApp/>
        </div>
    </div>
}

export default App;
