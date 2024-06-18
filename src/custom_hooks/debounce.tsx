import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "../utils/debounce";

export function useDebounce<T>(value: T, wait: number){
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const setDebounce = useCallback(debounce(setDebouncedValue , wait), []);
    useEffect(()=>{
        setDebounce(value);
    },[value])
    return debouncedValue;
}