interface ThrottleOptions {
    leading?: boolean,
    trailing?: boolean
}
export function throttle(
    func: Function,
    wait: number,
    options?: ThrottleOptions
  ) {
    const leading = options?.leading !== undefined ? options.leading : true;
    const trailing = options?.trailing !== undefined ? options.trailing : true;
  
    let lastTime = 0;
    let stash: any[] = [];
  
    return (...args: any[]) => {
      const nowTime = new Date().getTime();
      const passedTime = nowTime - lastTime;
      if (passedTime >= wait) {
        // leading call
        if (leading) {
          func(...args);
        } else {
          stash = [...args];
        }
        lastTime = nowTime;
  
        if (trailing) {
          setTimeout(() => {
            if (stash.length > 0) func(stash[0]);
            stash = [];
          }, wait);
        }
      } else {
        stash = [...args];
      }
    };
  }