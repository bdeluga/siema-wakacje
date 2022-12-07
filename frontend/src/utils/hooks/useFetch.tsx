import axios from "axios";
import { useState } from "react";
import type { City, Error } from "../../types/types";
export const useFetch = () => {
  const [data, setData] = useState<City>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const fetch = (url: string) => {
    setError(undefined);
    setIsFetching(true);
    setData(undefined);
    axios
      .get(url, { timeout: 5000 })
      .then((res) => setData(res.data))
      .catch((err) => setError({ msg: err.response.data.message }))
      .finally(() => setIsFetching(false));
  };

  const clear = () => {
    setData(undefined);
    setError(undefined);
  };

  //returning clear method in case of debounce
  return { fetch, data, isFetching, error, clear };
};
