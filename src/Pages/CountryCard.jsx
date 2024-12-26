import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const CountryCard = ({ name, flag, population, region, capital, area, LocalData }) => {
  return (
    <>
      <div className="card">
        <NavLink className="country-card" to={`${name}`} state={LocalData}>
          <div className='flag-image'>
            <img src={flag} alt={name + ' Flag'} />
          </div>
          <div className="card-text">
            <h3 className="card-title">{name}</h3>
            <p>
              <b>Population: </b>
              {population.toLocaleString('en-IN')}
            </p>
            <p>
              <b>Region: </b>{region}
            </p>
            <p>
              <b>Area: </b>{area.toLocaleString()}
            </p>
            <p>
              <b>Capital: </b>{capital}
            </p>
          </div>
        </NavLink>
      </div>
    </>
  )
}

export default CountryCard