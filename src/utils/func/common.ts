const arrCompare = (targetArr: any, compareArr: any, target: string) => {
  return targetArr.reduce(
    (acc: any, curr: any) => {
      const index = compareArr.findIndex(
        (item: any) => item[target] === curr[target]
      );
      index !== -1 && acc[1].push(curr);
      index === -1 && acc[0].push(curr);
      return acc;
    },
    [[], []]
  );
};

const debounceFunc = (callback: any, delay: any) => {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    // 실행한 함수(setTimeout())를 취소
    clearTimeout(timer);
    // delay가 지나면 callback 함수를 실행
    timer = setTimeout(() => callback(...args), delay);
  };
};

export { arrCompare, debounceFunc };
