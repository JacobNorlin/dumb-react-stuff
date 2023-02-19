import { useMemo } from "react";
import { useSyncViewModel } from "../useSyncViewModel/useSyncViewModel";
import { GrugStuff, Notifier } from "./GrugDecorator";

export function useGrug(grugClass: any) {
    const notifier = (grugClass as any)[GrugStuff].notifier;
    useSyncViewModel(notifier);
}

export function useGrugObject<T extends Record<string, any>>(obj: T) {
    function addGrugObjWrapper(out: Record<any, any>, o: T) {
        for (let key in o) {
            const val = o[key];
            if (Object.prototype.toString.call(val) === "[object Object]") {
                out[key] = addGrugObjWrapper(out, val);
            } else {
                Object.defineProperty(out, key, {
                    get() {
                        return o[key];
                    },
                    set(val: any) {
                        o[key] = val;
                        this[GrugStuff].notifier.notify();
                    },
                });
            }
        }

        return out;
    }

    const grugObject = useMemo(() => {
        let out = {
            [GrugStuff]: {
                notifier: new Notifier(),
            },
        } as Record<any, any>;

        return addGrugObjWrapper(out, obj);
    }, []);

    useGrug(grugObject);

    return grugObject as unknown as T;
}
