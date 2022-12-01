import axios from "axios";
import { useState } from "react";
import type { City, Error } from "../../types/types";
export const useFetch = () => {
  const [data, setData] = useState<City>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const fetch = (url: string) => {
    if (error) setError(undefined);
    setIsFetching(true);
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => setError({ msg: err.message }))
      .finally(() => setIsFetching(false));
  };

  return { fetch, data, isFetching, error };
};
