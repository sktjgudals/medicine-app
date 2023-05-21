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

export { arrCompare };
