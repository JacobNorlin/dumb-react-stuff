# useGrug

<img src="https://github.com/JacobNorlin/dumb-react-stuff/blob/main/src/useGrug/assets/useGrugObject.png?raw=true" width=800px>


```tsx
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
        </div>
    );
}

```
