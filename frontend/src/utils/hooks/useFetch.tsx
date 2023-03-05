import { useState } from "react";
import axios from "axios";

export const useFetch = () => {
  const [isFetching, setIsFetching] = useState(false);

  const fetch = (url: string) => {
    setIsFetching(true);
    return axios.get(url, { timeout: 5000 }).finally(() => {
      setIsFetching(false);
    });
  };

  return { fetch, isFetching };
};
