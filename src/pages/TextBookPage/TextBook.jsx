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
      <Link to={`/textbook/module/${module}`}>Раздел {module}</Link>
      :
      null)}
      
      <Switch>
      {moduleNumbers.map(module => module <= moduleNumbers.length 
      ? <Route path={`/textbook/module/${module}`}><ModulePage moduleNumber={module}/></Route>
      : null
      )}
        
      </Switch>
    </div>
  )
}
{/* <NavLink to={to}>
<span>{`${name},`}</span>
<span style={capitalStringStyle}>{capital}</span>
</NavLink>

<CountryCard
          to={`/country/${country.linkName
            .toLowerCase()
            .replace(/[-\s]/g, "_")}`} */}