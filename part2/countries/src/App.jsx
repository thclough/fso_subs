import { useState, useEffect } from 'react'
import countryService from './services/countryservice';

const Filter = ({value, changeFunc}) => {
  return (
    <>
      search for country: <input 
        value = {value}
        onChange = {changeFunc}
      />
    </>
  )
}

const Country = ({countryName, showFunc}) => {
  return (
    <>
      <br/>{countryName} <button onClick={showFunc}>Show</button>
    </>
  )
} 

const CandCountries = ({cands, qry, showFunc}) => {

  if (qry === '') {
    return (
      <>
      <p>Please enter a search query</p>
      </>
    )
  }
  if (1 < cands.length && cands.length <= 10) {
    return (
      <>
      {cands.map(country => <Country key={country} countryName={country} showFunc={() => showFunc(country)}/>)}
      </>
    )
  } 
  if (cands.length === 0) {
    return (
      <>
      <p>No results found for query</p>
      </>
    ) 
    }
  return null
}

const CountryWeather = ({capital, weatherData}) => {
  
  
  if (weatherData == null) {
    return null
  }
  
  const temp_c = weatherData.main.temp - 273.15
  const temp_f = temp_c * 1.8 + 32
  const icon_url = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

  return (
    <>
    <h2>Weather in {capital}</h2>
    <p>Temperature: {temp_c.toFixed(2)}°C ({temp_f.toFixed(2)}°F) </p>
    <p>Humidity: {weatherData.main.humidity} %</p>
    <p>{weatherData.weather[0].main}</p>
    <img src={icon_url} />
    </>
  )
}

const CountryDisplay = ({countryInfo, weatherData}) => {
  if (countryInfo == null) {
    return null
  }
  
  const langs = Object.values(countryInfo.languages)

  return (
    <>
    <h1>{countryInfo.name.common}</h1>
    <p><i>{countryInfo.name.official}</i></p>
    
    <ul>
    <li>capital: {countryInfo.capital}</li>
    <li>area: {countryInfo.area} square kilometers</li>
    <li>languages:
      <ul>
      {langs.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
    </li>
    </ul>
    <img src={countryInfo.flags.png} alt={`${countryInfo.name} flag`} />
    <CountryWeather capital={countryInfo.capital[0]} weatherData={weatherData}/>
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [qry, setQry] = useState('')
  const [targetCountry, setTargetCountry] = useState(null)
  const [lastCandLen, setLastCandLen] = useState(250)
  const [countryInfo, setCountryInfo] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  

  const getNameFromData = (data) => {
    return data.map(entry => {
      return entry.name.common
    })
  } 

  const allHook = () => {
    countryService
      .getAll()
      .then(data => setCountries(getNameFromData(data)))
  }
  
  useEffect(allHook, [])

  const infoHook = () => {
    if (targetCountry) {
      countryService
        .getCountryData(targetCountry)
        .then(data => {
          setCountryInfo(data)
          countryService
          .getWeatherData(data.capital[0])
          .then(newWeatherData => setWeatherData(newWeatherData))
        })
    } else {
      setCountryInfo(null)
      setWeatherData(null)
    }
  }

  // country info directly linked to target country (changed from 1. only available result OR 2. show button)
  useEffect(infoHook, [targetCountry])

  // filter the country names
  function filterFunc(item) {
    const str1 = String(item).toLowerCase()
    const lowerFilter = String(qry).toLowerCase()
    return str1.includes(lowerFilter)
  }

  const filteredCountries = countries.filter(filterFunc)

  // behavior of the country info display
  if (filteredCountries.length === 1 && lastCandLen !== 1) {
    setTargetCountry(filteredCountries[0])
    setLastCandLen(1)
  } else if (filteredCountries.length !== lastCandLen) { //possibly change to qry != last qry, what if you paste something in
    setLastCandLen(filteredCountries.length)
    if (targetCountry) {
      setTargetCountry(null)
    }
  }

  return (
    <div>
      <Filter value={qry} changeFunc={txt => setQry(txt.target.value)}/>
      <CandCountries cands={filteredCountries} qry={qry} showFunc={setTargetCountry}/> 
      <CountryDisplay countryInfo={countryInfo} weatherData={weatherData}/>

    </div>
  )

}


export default App
