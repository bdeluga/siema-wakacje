import { useState } from "react";
import axios, { type AxiosError } from "axios";
import type { FetchResponse } from "@/types";

export const useFetch = () => {
  const [res, setRes] = useState<FetchResponse | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetch = (url: string) => {
    setIsFetching(true);
    axios
      .get(url, { timeout: 5000 })
      .then((res) => {
        setRes({
          data: res.data,
        });
      })
      .catch((err: AxiosError) => {
        setRes({
          error: err,
        });
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  return { fetch, res, isFetching };
};
