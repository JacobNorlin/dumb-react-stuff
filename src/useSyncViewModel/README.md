# useSyncViewModel

Are you tired of the draconian state management introduced by React? Do you long for the good old days of MVVM and WPF? With `useSyncViewModel` you no longer need to worry about keeping track of `useState` or `useReducer` calls. Instead, simply keep all state in your very own view model classes and sync them with React by using `useSyncViewModel`.

**_NOTE:_** Performance not guaranteed

## Minimal example

```tsx

export interface ViewModelLike {
    addChangeListener(listener: () => void): void;
    removeChangeListener(listener: () => void): void;
}

class ViewModel implements ViewModelLike {
    private listeners: (() => void)[] = [];

    private _count = 0;

    addChangeListener(listener: () => void): void {
        this.listeners.push(listener);
    }
    removeChangeListener(listener: () => void): void {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    notifyPropertyChanged() {
        this.listeners.forEach((l) => l());
    }

    get count(){
        return this._count;
    }

    set count(val: number){
        this._count = val;
        this.notifyPropertyChanged();
    }
}

const viewModel = new ViewModel();

const Comp = () => {
    useSyncViewModel(viewModel);
    return (
        <div onClick={() => viewModel.count += 1}>{viewModel.count}</div>
    )
}


```