import React, { useContext, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import CountryCard from './CountryCard';
import ShimmerEffect from './ShimmerEffect';
import { ThemeContext } from '../ContextAPI';


const CountriesData = () => {
  const [localData, setLocalData] = useState([]);
  const [IsDark] = useContext(ThemeContext)


  // const data = useLoaderData();
  const [qry, setQry] = useState('');
  const [sortData, setUpdatedList] = useState([])
  const [areaList, setAreaList] = useState([]);
  const [populationList, setPopulationList] = useState([]);

  // ==========data-fetching=============
  const filteredList = localData.filter((element) => element.name.common.toLowerCase().includes(qry) || element.region.toLowerCase().includes(qry));
  const fetchDataFun = async () => {
    await fetch(`https://restcountries.com/v3.1/all`).then((res) => res.json()
      .then((result) => setLocalData(result)
      ))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchDataFun()
  }, []);

  // =============Accending===========
  function sorting() {
    const arr = localData.sort(function (a, b) {
      if (a.name.common > b.name.common) {
        return 1;
      }
      if (a.name.common < b.name.common) {
        return -1; // a comes before b
      }
      return 0;
    });
    setUpdatedList(arr)
    setAreaList([])
    setPopulationList([]);
  }
  // =============DecSorting===========
  function DecSorting() {
    const arr = localData.sort(function (b, a) {
      if (a.name.common > b.name.common) {
        // console.log(a.name.common, '=====',b.name.common, 'ab===')
        return 1; // a comes after b 
      }
      if (a.name.common < b.name.common) {
        return -1; // a comes before b
      }
      return 0; // a and b are equal
    });
    setUpdatedList(arr)
    setAreaList([])
    setPopulationList([]);
  }
  // =============sort-by-area===========
  function SortAreaFun() {
    const arr = localData.sort(function (a, b) {
      if (a.area > b.area) {
        // console.log(a.area, '=====',b.area, 'ab===')
        return 1; // a comes after b 
      }
      if (a.area < b.area) {
        return -1; // a comes before b
      }
      return 0; // a and b are equal
    });
    setAreaList(arr)
    setUpdatedList([])
    setPopulationList([]);
  }
  // =============sort-by-population===========
  function SortPopulationFun() {
    const arr = localData.sort(function (a, b) {
      if (a.population > b.population) {
        // console.log(a.population, '=====',b.population, 'ab===')
        return 1; // a comes after b 
      }
      if (a.population < b.population) {
        return -1; // a comes before b
      }
      return 0; // a and b are equal
    });
    setPopulationList(arr)
    setUpdatedList([])
    setAreaList([]);
  }

  const viewData = filteredList ? filteredList : sortData || areaList || populationList;

  return (
    localData.length == 0 ? <ShimmerEffect /> : <>
      <main className={`${IsDark ? 'dark' : ''}`}>
        <div className='countries-listing'>
          <h1 className='text-center'>All Countries List</h1>
          <div className='button-group top-1 z-10 flex items-center justify-center p-1 pb-5 flex-wrap'>
            <input placeholder='Search Country' type="text"
              onChange={(e) => setQry(e.target.value.toLowerCase())}
              className='SearchCountry'
            />
            <button className='sortBtn' onClick={sorting}>Ascending Order</button>
            <button className='sortBtn' onClick={DecSorting}>Descending Order</button>
            <button className='sortBtn' onClick={SortAreaFun}>Sort by Area </button>
            <button className='sortBtn' onClick={SortPopulationFun}>Sort by Population </button>

            <select className='SearchCountry' id="" onChange={(e) => setQry(e.target.value.toLowerCase())}>
              <option hidden>Filter by Region</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Oceania">Oceania</option>
              <option value="Antarctic">Antarctic</option>
            </select>
          </div>
          <div className="countries-container">
            {viewData.map((country) => {
              return <CountryCard
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population}
                region={country?.region}
                capital={country.capital?.[0]}
                area={country.area}
                LocalData={country}
              />
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export default CountriesData