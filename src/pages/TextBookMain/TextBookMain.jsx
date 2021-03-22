import React from 'react';
import { Link  } from "react-router-dom";

export const TextBookMain = () => {
  const moduleNumbers = [1, 2, 3, 4, 5, 6]

  return (
    <section className="module-list">
      {
        moduleNumbers.map((item, key) => (
          <div className={`module${item}`} key={`module${key}`}>
            <Link to={`/textbook/${item}/1`}>Модуль {item }</Link>
          </div>
        ))
      }
    </section>

  )
}