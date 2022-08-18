import {getPageSeries, getShowSearch} from '@shared/services/dataService';
import {Ishow} from '@shared/types';
import {useEffect, useState} from 'react';
import isEmpty from 'lodash.isempty';

export function useSeriesQuery(page?: number, search?: string | null) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Ishow[] | null>(null);

  const fetchSeriesList = async () => {
    setLoading(true);
    setError(null);
    const resp = !isEmpty(search)
      ? await getShowSearch(search)
      : await getPageSeries(page);

    if (resp.error) {
      setError(resp.error);
      return setLoading(false);
    }
    setData(resp.data as Ishow[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchSeriesList();
  }, [page, search]);

  return {
    error,
    loading,
    data,
    refetch: fetchSeriesList,
  };
}
