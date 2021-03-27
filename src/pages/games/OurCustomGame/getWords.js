const getWords = async (page, group) => {
  const url = 'https://api-rslang.pet-projects.ru/words';
  const rawResponse = await fetch(`${url}?page=${page}&group=${group}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const content = await rawResponse.json();
  return content;
};

export default getWords;
