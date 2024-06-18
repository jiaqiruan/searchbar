type DebounceFunction = (...args: any[]) => void;

export function debounce(func: DebounceFunction, wait: number) {
    let timeout: any;
  
    return (...args: any[]) => {

        clearTimeout(timeout);
    
        timeout = setTimeout(() => {
            func(...args);
        }, wait);
        };
  }