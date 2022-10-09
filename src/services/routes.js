import api from './queries';

const logerror = (error) => {
  api.logError(error);
} 

export const getCoins = async (page,per_page) => {
  const res = await api.getCoins(page,per_page).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};


export const getCoinsById = async (id) => {
  const res = await api.getCoinsById(id).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });
  const val = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

