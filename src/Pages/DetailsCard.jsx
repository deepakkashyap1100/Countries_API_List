import React, { useContext, useEffect, useState } from 'react'
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import Loading from '../Layout/Loading';
import { ThemeContext } from '../ContextAPI';

const DetailsCard = () => {
  const [countryData, SetCountryData] = useState({});
  // const data = useLoaderData();
  const countryName = useParams();
  const LocalDataState = useLocation();
  function fetchCountryRecord(data) {
    SetCountryData({
      countryN: data.name.common,
      area: data.area,
      flag: data.flags?.svg,
      population: data.population,
      maps: data.maps.googleMaps,
      timeZone: data.timezones,
      subregion: data.subregion,
      capital: data.capital,
      language: Object.values(data.languages).join(', '),
      currencies: Object.values(data.currencies).map((cur) => cur.name).join(', '),
      borders: data.borders,
    });
    if (!data.borders) {
      data.borders = []
    }
  }

  useEffect(() => {
    if (LocalDataState.state) {
      console.log(LocalDataState, 'local state')
      fetchCountryRecord(LocalDataState.state)
      return
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName.name}`).then((res) => res.json()
      .then(([data]) => {
        fetchCountryRecord(data);
      }))
      .catch((err) => console.log(err))
  }, [countryName.name])

  const [IsDark] = useContext(ThemeContext)

  return !countryData.countryN ? (<Loading />) : (
    <>
      <main className={`h-screen ${IsDark ? 'dark' : ""}`}>
        <div className='container m-auto'>
          <button className='bg-pink-600 px-5 py-2 rounded-full text-white' onClick={() => history.back()}>back</button>
          <h1 className='text-2xl text-center mb-5'> Detail Page</h1>
          <div className=' gap-4 lg:grid-cols-4 grid' >
            <div >
              <div className='flag'><img src={countryData.flag} alt='' width={240} /></div>
              <h5 className="card-title">{countryData.countryN}</h5>
            </div>
            <div className="col-span-3 grid px-3">
              <div className='gap-4 lg:grid-cols-3 md:grid-col-2 grid-col-1 grid'>
                <div className='detail-card p-4 '>
                  <b>Other Details</b>
                  <div>capital: {countryData.capital}</div>
                  <h5>Area: {countryData.area?.toLocaleString()}</h5>
                  <h5>Population: {countryData.population?.toLocaleString()}</h5>
                  <h5>SubReason: {countryData.subregion}</h5>
                  <h5>Currencies: {countryData.currencies}</h5>
                  <span>Google Map: <a href={countryData.maps} target='_blank' className='text-pink-700'>Click Here</a></span>
                </div>
                <div className='detail-card p-4'>
                  <b>Country Languages:</b>
                  <p>{countryData.language}</p>
                  <div className='pt-2'>
                    <b >Country TimeZone:</b>
                    <p >{countryData.timeZone.join(', ')}</p>
                  </div>
                </div>
                <div className='detail-card p-4'>
                  <b>Border Country:</b>
                  <div className='flex flex-wrap gap-2'>
                    {countryData.borders?.map((i) => <div key={i} ><div className='p-1 bg-slate-300'>{i}</div></div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default DetailsCard