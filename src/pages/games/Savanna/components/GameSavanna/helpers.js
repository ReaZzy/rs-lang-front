export const RandomInteger = (min, max) => {
  const rand = min + Math.random() * (max - min);
  return Math.round(rand);
};

export const getRandom = (min, max, count) => {
  const arr = [];
  return function getRandomCount() {
    const randomItem = RandomInteger(min, max);
    if (arr.includes(randomItem)) {
      getRandomCount();
    } else {
      arr.push(randomItem);
    }
    if (arr.length < count) {
      getRandomCount();
    }
    return arr;
  };
};

export const RightAnswer = (point) => {
  return point + 1;
};

export const lifesIconColor = ['orange', 'red', 'green', 'brown', 'pink'];
