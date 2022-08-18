import axios from 'axios';
import {useEffect, useState} from 'react';

export function useGenericQuery<T>(queryUrl: string) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);

  const runGetQuery = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get(queryUrl);
      setData(resp?.data as T);
      setLoading(false);
    } catch (err) {
      setError('Error: could not load data');
      return setLoading(false);
    }
  };

  useEffect(() => {
    runGetQuery();
  }, [queryUrl]);

  return {
    error,
    loading,
    data,
    refetch: runGetQuery,
  };
}
