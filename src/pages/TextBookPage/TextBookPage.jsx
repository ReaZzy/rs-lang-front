import React from 'react';
import { useParams } from 'react-router-dom';

export const TextBookPage = () => {

  let { module, page } = useParams();
  

  return (
    <div>
      <h1>Раздел {module}</h1>
      <h2> Страница {page }</h2>
    </div>
  )
}
