import React from 'react';
import ModulePage from '../ModulePage'
import { Switch, Route, Link } from "react-router-dom";

export const TextBook = () => {
  const moduleNumbers = [1, 2, 3, 4, 5, 6]

  return (
    <div>
      <h1>Страница учебника</h1>
      {moduleNumbers.map(module =>  module <= moduleNumbers.length 
      ? 
      <Link key={module} to={`/textbook/module/${module}`}>Раздел {module}</Link>
      :
      null)}
      
      <Switch>
      {moduleNumbers.map(module => module <= moduleNumbers.length 
      ? <Route key={module} path={`/textbook/module/${module}`}><ModulePage moduleNumber={module}/></Route>
      : null
      )}
        
      </Switch>
    </div>
  )
}
