import "./App.css";
import { GrugObjectApp } from "./useGrug/example/GrugObjectApp";
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
        <h1>
            useGrugObject
        </h1>
        <div>
            <GrugObjectApp/>
        </div>
    </div>
}

export default App;
