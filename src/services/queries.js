import webfox from './initialize';
const logError = (error) => {
  console.log(error,'==>>>LOG API ERROR')
};


const exec = async (fn, params = null, error = null) => {
  const res = {
    data: null,
    error: null,
    syserror: null,
  };

  await fn(params)
    .then((response) => {
      res.data = response;
    })
    .catch((err) => {
      if (err.response) {
        res.error = err.response;
      } else if (err.request) {
        res.error = err.request;
      } else {
        res.error = err;
      }
    });

  return res;
};

export const getCoins = (page,per_page,vs_currency='eur',order='market_cap_desc',sparkline=false) =>
  exec(() => {
    return webfox.get(`/v3/coins/markets`, { params: { 
      vs_currency: vs_currency,
      order:order,
      //per_page,
      page,
      sparkline:sparkline
    } });
});

export const getCoinsById = (id) =>
  exec(() => {
    return webfox.get(`/v3/coins/${id}`);
});



export default {
  logError,
  getCoins,
  getCoinsById
}
