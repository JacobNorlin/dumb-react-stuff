import { useCallback, useEffect, useSyncExternalStore } from "react";

class StoreHandler{
    listeners: (() => void)[] = [];

    addListener(l: () => void) {
        this.listeners.push(l);
    }

    removeListener(l: () => void) {
        this.listeners.splice(this.listeners.indexOf(l), 1);
    }

    notify() {
        this.listeners.forEach(l => l());
    }
}

function getProxiedArray(arr: any[]) {
    const arrayHandler: ProxyHandler<any[]> = {
        apply(target: any[], thisArg: any, args: any[]) {
            targ
        }
    }
}

function reactify<T extends object>(clazz: T) {
    const storeHandler = new StoreHandler();
    const handler: ProxyHandler<T> = {
        set(obj: any, prop: string, value: any){
            obj[prop] = value;
            storeHandler.notify();
            return true;
        },
        get(target, prop) {
            const value = (target as unknown as any)[prop];

            if (Array.isArray(value)) {
                
            }

        }
    }

    return new Proxy(clazz, handler);
}

export function useGrug<T>(clazz: T) {
    let someValue = 0;
    //We don't actually care about the snapshot retuned by the "store" since
    //the viewmodel already contains the state we care about. Instead we
    //only change the snapshot value when the state of the view model has 
    //changed.
    const internalSnapshot = useCallback(() => {
        return someValue
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
