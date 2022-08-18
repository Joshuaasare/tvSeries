import axios from 'axios';

export const getPageSeries = async (page = 1) => {
  try {
    const pageParam = page - 1;
    const resp = await axios.get(
      `https://api.tvmaze.com/shows?page=${pageParam}`,
    );
    return {data: resp?.data};
  } catch (err) {
    return {
      error: 'Error: Could not load data',
    };
  }
};

export const getShowSearch = async (search?: string | null) => {
  try {
    const resp = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${search}`,
    );
    const formattedData = resp.data.map(item => item.show);
    return {data: formattedData};
  } catch (err) {
    return {
      error: 'Error: Could not load data',
    };
  }
};
