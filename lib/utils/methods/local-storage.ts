const saveToLocalStorage = (key: string, data: string) => {
  try {
    localStorage.setItem(key, data);

    return true;
  } catch (err) {
    return false;
  }
};

const getFromLocalStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    return null;
  }
};

export const onUseLocalStorage = (
  type: 'save' | 'get',
  key: string,
  data: string = ''
) => {
  switch (type) {
    case 'get':
      return getFromLocalStorage(key);
    case 'save':
      return saveToLocalStorage(key, data);
  }
};
