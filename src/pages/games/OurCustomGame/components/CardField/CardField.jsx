import React, { useCallback, useState, useEffect } from 'react';
import Card from '../Card';
import shuffle from '../../shuffle';
import styles from './styles.module.css';

function CardField({ words, setGameIsOver, addCorrect, addIncorrect }) {
  const [isBlockedClick, setIsBlockedClick] = useState(false);
  const [openedCard, setOpenedCard] = useState(null);
  const [cards, setCards] = useState([]);

  const makeCards = (arr, translate, startIndex) => {
    return arr.map((word, i) => {
      return {
        word: translate ? word.wordTranslate : word.word,
        image: word.image,
        opened: false,
        hidden: false,
        id: word._id,
        index: startIndex + i,
        audio: word.audio,
        text: word.word,
        translate: word.wordTranslate,
      };
    });
  };

  const checkGameStatus = useCallback(
    (cardsArray) => {
      const allCardsIsHidden = (el) => el.hidden;
      if (cardsArray.every(allCardsIsHidden)) {
        setGameIsOver(true);
      }
    },
    [setGameIsOver]
  );

  useEffect(() => {
    setCards(
      shuffle([
        ...makeCards(words, false, 0),
        ...makeCards(words, true, words.length),
      ])
    );
    setGameIsOver(false);
  }, [words, setGameIsOver]);

  const timer1 = useCallback(
    (id) => {
      setTimeout(() => {
        const newCards = cards.map((card) => {
          const newCard = Object.assign(card);
          if (newCard.id === id) {
            newCard.hidden = true;
          }
          return newCard;
        });
        checkGameStatus(newCards);
        setCards(newCards);
        setOpenedCard(null);
        setIsBlockedClick(false);
      }, 1500);
    },
    [cards, checkGameStatus]
  );

  const timer2 = useCallback(
    (ind) => {
      setTimeout(() => {
        setCards(
          cards.map((card) => {
            const newCard = Object.assign(card);
            if (newCard.index === ind || newCard.index === openedCard.index) {
              newCard.opened = false;
            }
            return newCard;
          })
        );
        setOpenedCard(null);
        setIsBlockedClick(false);
      }, 1500);
    },
    [cards, openedCard]
  );

  const onClickHandle = useCallback(
    (e) => {
      const ind = +e.currentTarget.dataset.index;
      if (openedCard && openedCard.index === ind) return;
      if (isBlockedClick) return;
      setIsBlockedClick(true);
      const { id } = e.currentTarget.dataset;

      setCards(
        cards.map((card) => {
          const newCard = Object.assign(card);
          if (newCard.index === ind) {
            newCard.opened = true;
          }
          return newCard;
        })
      );
      if (openedCard) {
        if (id === openedCard.id) {
          timer1(id);
          addCorrect(openedCard);
        } else {
          timer2(ind);
          addIncorrect(openedCard);
        }
      } else {
        setOpenedCard(cards.filter((card) => card.index === ind)[0]);
        setIsBlockedClick(false);
      }
    },
    [
      isBlockedClick,
      openedCard,
      cards,
      addIncorrect,
      addCorrect,
      timer2,
      timer1,
    ]
  );
  useEffect(() => {
    return () => clearTimeout(timer1);
  }, [timer1]);
  useEffect(() => {
    return () => clearTimeout(timer2);
  }, [timer2]);
  return (
    <div className={styles.cardField_container}>
      {cards.map((card) => (
        <Card
          key={card.index}
          index={card.index}
          onClick={onClickHandle}
          picture={card.image}
          opened={card.opened}
          hidden={card.hidden}
          text={card.word}
          id={card.id}
        />
      ))}
    </div>
  );
}

export default React.memo(CardField);
