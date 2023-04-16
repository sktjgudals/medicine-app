import { useCallback, useState, ChangeEvent } from "react";

const useInput = (initialValue: any) => {
  const [value, setValue] = useState<any>(initialValue);
  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setValue(e.target.value);
    },
    [value]
  );

  return [value, onChangeValue];
};
export default useInput;
