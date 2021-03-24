export const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max - min);
  return Math.round(rand);
};
export const rightAnswer = (counterAnswer, pointForAnswer) => {
  if (counterAnswer < 3) return pointForAnswer + 10;
  if (counterAnswer >= 3 && counterAnswer < 6) return pointForAnswer + 20;
  if (counterAnswer >= 6 && counterAnswer < 9) return pointForAnswer + 40;
  if (counterAnswer >= 9 && counterAnswer < 12) return pointForAnswer + 80;
  if (counterAnswer >= 12 && counterAnswer < 15) return pointForAnswer + 160;
  if (counterAnswer >= 15 && counterAnswer < 18) return pointForAnswer + 320;
  if (counterAnswer >= 18) return pointForAnswer + 640;
  return pointForAnswer;
};
