import { useGrugObject } from "../useGrug";

export function GrugObjectApp() {

    const grugObj = useGrugObject({
        count: 0,
        nested: {
            innerCount: 0,
            list: [] as string[],
        },
    });

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <button onClick={() => (grugObj.count += 1)}>Count {grugObj.count}</button>
            <button onClick={() => (grugObj.nested.innerCount += 1)}>
                Nested count {grugObj.nested.innerCount}
            </button>
            <button onClick={() => (grugObj.nested.list = [...grugObj.nested.list, ":^)"])}>
                List {grugObj.nested.list}
            </button>

            <NestedComp nested={grugObj.nested}/>
        </div>
    );
}


const NestedComp = (props: { nested: { innerCount: number } }) => {
    const nestedGrug = useGrugObject({
        lol: 0,
        nested: props.nested
    });
    return <div>
        <button onClick={() => nestedGrug.nested.innerCount += 1}>Inner count</button>
        <button onClick={() => nestedGrug.lol += 1}>wut {nestedGrug.lol}</button>
        </div>
}