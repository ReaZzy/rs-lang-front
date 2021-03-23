export const getData = (level, numberPage) => {
  let items = [];
  let group = 0;
  const url = 'https://api-rslang.pet-projects.ru/words';

  const wordsData = async () => {
    if (group > numberPage) return items;

    const rawResponse = await fetch(`${url}?page=${level}&group=${group}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const words = await rawResponse.json();
    items = [...items, ...words];
    group += 1;
    return wordsData();
  };
  return wordsData;
};
