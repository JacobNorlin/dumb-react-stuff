import { useMemo } from "react";
import { useSyncViewModel } from "../useSyncViewModel/useSyncViewModel";
import { GrugStuff, Notifier } from "./GrugDecorator";

export function useGrug(grugClass: any) {
    const notifier = (grugClass as any)[GrugStuff].notifier;
    useSyncViewModel(notifier);
}

export function useGrugObject<T extends Record<string, any>>(obj: T) {
    if ((obj as any)[GrugStuff]) {
        return obj;
    }

    function addGrugObjWrapper(out: Record<any, any>, o: T) {
        for (let key in o) {
            const val = o[key];
            if (Object.prototype.toString.call(val) === "[object Object]") {
                //Objects that are already handled by grug can be ignored.
                //This should prevent cyclic objects from breaking everything
                if (val[GrugStuff]) {
                    //In case we are reusing a portion of a grug object
                    //in a new grug object we still need to assign that
                    //into the new grug object. Everything below this
                    //object should already be grugged.
                    out[key] = val;
                    continue;
                }
                
                //Append grug stuff to nested objects to allow sending
                //a portion of a grug object  to a child component.
                //Unclear exactly how notifiers should work in this case,
                //but we just reuse the parent notifier since if the parent
                //component triggers a re-render it should also re-render
                //the child. Performance may suffer.
                val[GrugStuff] = {
                    Notifier: (out as any)[GrugStuff].notifier
                }

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
