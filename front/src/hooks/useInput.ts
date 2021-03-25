import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T> = [T, (e: React.ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

const useInput = <T extends string | number>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
