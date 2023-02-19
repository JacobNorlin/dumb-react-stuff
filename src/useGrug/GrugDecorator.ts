type Ctor = { new (...args: any[]): {} };
type VoidFn = () => void;

export class Notifier {
    listeners: VoidFn[] = [];

    addChangeListener(l: () => void) {
        this.listeners.push(l);
    }

    removeChangeListener(l: () => void) {
        this.listeners.splice(this.listeners.indexOf(l), 1);
    }

    notify() {
        this.listeners.forEach((l) => l());
    }
}

export const GrugStuff = Symbol("GrugStuff");

export function GrugClass<T extends Ctor>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);

            const notifier = new Notifier();
            (this as any)[GrugStuff] = {
                notifier: notifier,
            };
        }
    };
}

export function GrugMethod(_target: any, _key: string, desc: PropertyDescriptor) {
    const orig = desc.value;
    desc.value = function (...args: any) {
        orig.apply(this, args);
        (this as any)[GrugStuff].notifier.notify();
    };
}

export function GrugProperty(_target: any, _key: string, desc: PropertyDescriptor) {
    const orig = desc.set;
    if (!orig) {
        return;
    }
    desc.set = function (...args: any) {
        orig.apply(this, args);
        (this as any)[GrugStuff].notifier.notify();
    };
}
