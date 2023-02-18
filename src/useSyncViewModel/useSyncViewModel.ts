import { useCallback, useEffect, useSyncExternalStore } from "react";
import { ViewModelLike } from "./util";



export function useSyncViewModel(viewModel: ViewModelLike) {
    let someValue = 0;

    //We don't actually care about the snapshot retuned by the "store" since
    //the viewmodel already contains the state we care about. Instead we
    //only change the snapshot value when the state of the view model has 
    //changed.
    const internalSnapshot = useCallback(() => {
        return someValue;
    }, [viewModel]);

    const internalSnapshotUpdater = useCallback(() => {
        someValue++;
    }, [viewModel]);

    const internalSubscribe = useCallback(
        (onChange: () => void) => {
            //Listener to update the snapshot whenever the view model
            //notifies that a value has changed.
            viewModel.addChangeListener(internalSnapshotUpdater);
            viewModel.addChangeListener(onChange);
            return () => {
                viewModel.removeChangeListener(onChange);
                viewModel.removeChangeListener(internalSnapshotUpdater);
            };
        },
        [viewModel]
    );

    useSyncExternalStore(internalSubscribe, internalSnapshot);
}
