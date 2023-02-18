export interface ViewModelLike {
    addChangeListener(listener: () => void): void;
    removeChangeListener(listener: () => void): void;
}