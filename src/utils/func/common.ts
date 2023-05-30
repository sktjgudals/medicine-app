import { DATE_TYPE } from "@/types/common";

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

const dateFunc = (num: number) => {
  const date = new Date(num);
  return date.toLocaleDateString("ko").replaceAll(". ", "-").split(".")[0];
};

const customTime = (getedValue: Date | number | string) => {
  const date =
    typeof getedValue === "object" ? getedValue : new Date(getedValue);
  const now = new Date();
  const timeGap = now.getTime() - date.getTime();
  if (timeGap < 60000) {
    return `${Math.floor(timeGap / 1000)}초전`;
  } else if (timeGap < 3600000) {
    return `${Math.floor(timeGap / 60000)}분전`;
  } else if (timeGap < 86400000) {
    return `${Math.floor(timeGap / 3600000)}시간전`;
  } else if (timeGap < 345600000) {
    return `${Math.floor(timeGap / 86400000)}일전`;
  } else {
    return date.toLocaleDateString("ko");
  }
};

export { arrCompare, debounceFunc, dateFunc, customTime };
