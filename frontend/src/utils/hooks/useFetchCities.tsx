import axios from "axios";
import { useState } from "react";
import type { City, Error } from "../../types/types";
import _ from "lodash";
export const useFetchCities = () => {
  const [cities, setCities] = useState<City>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const callback = async (url: string) => {
    setIsFetching(true);
    axios
      .get(url)
      .then((res) => setCities(res.data))
      .catch((err) => setError(err.body))
      .finally(() => setIsFetching(false));
  };

  const fetch = _.debounce(callback, 300);

  return { fetch, cities, isFetching, error };
};
