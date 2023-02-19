import { useSyncViewModel } from "../useSyncViewModel/useSyncViewModel";
import { GrugStuff } from "./GrugDecorator";

export function useGrug(grugClass: any) {
    const notifier = (grugClass as any)[GrugStuff].notifier;
    useSyncViewModel(notifier);
}