export const getData = (level, numberPage, id="", token="") => {
  let items = [];
  let group = 0;
  const url = 'https://api-rslang.pet-projects.ru/';

  const wordsData = async () => {
    if (group > numberPage) return items;

    const rawResponse = await fetch(`${url}users/${id}/aggregatedWords?group=${level}&page=${group}&filter=%7B%20%22%24or%22%3A%20%5B%20%7B%20%22userWord.difficulty%22%3A%20null%20%7D%2C%20%7B%20%22userWord.difficulty%22%3A%20%22hard%22%20%7D%2C%20%7B%22userWord.difficulty%22%3A%22learn%22%7D%20%5D%20%7D`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });

    const words = await rawResponse.json();
    items = [...items, ...words[0]?.paginatedResults];
    group += 1;
    return wordsData();
  };
  return wordsData;
};
