import { ViewModelLike } from "../util";

export abstract class ViewModelBase implements ViewModelLike {
    listeners: (() => void)[] = [];
    numNotifies = 0;

    addChangeListener(listener: () => void): void {
        this.listeners.push(listener);
    }
    removeChangeListener(listener: () => void): void {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    notifyPropertyChanged() {
        this.numNotifies++;
        this.listeners.forEach((l) => l());
    }
}
