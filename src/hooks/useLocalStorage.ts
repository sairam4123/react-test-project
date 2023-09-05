import { useEffect, useRef, useState } from "react";

export default function useLocalStorage<TValue extends {}>(
    keyName: string,
    initialValue: TValue
) {
    const [state, setState] = useState<TValue>(initialValue);

    const onMountRef = useRef<boolean>(false);

    useEffect(() => {
        const storedString = localStorage.getItem(keyName);
        if (!storedString) return;
        const storedData = JSON.parse(storedString) as TValue;
        if (!storedData) return;
        setState(storedData);
    }, []);

    useEffect(() => {
        if (onMountRef.current) {
            const currentData = JSON.stringify(state);
            if (!currentData) return;
            localStorage.setItem(keyName, currentData);
        } else {
            onMountRef.current = true;
        }
    }, [state]);
    return { state, setState };
}
