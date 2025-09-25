import { useEffect, useState } from "react";

const useDebounce = (initialValue, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(initialValue);
        }, 800);

        return () => {
            clearTimeout(handler);
        };
    }, [initialValue, delay]);

    return debouncedValue;
};

export default useDebounce;
