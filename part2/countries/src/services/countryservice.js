import axios from 'axios'
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    const req = axios.get(`${baseUrl}/all`)
    return req.then(response => response.data)
}

const getCountryData = (name) => {
    const modName = name.split(' ').join('%20')
    const req = axios.get(`${baseUrl}/name/${modName}`)
    return req.then(response => response.data)
}

const getWeatherData = (city) => {
    const modCity = city.split(' ').join('%20')
    const req = axios.get(`${weatherUrl}?q=${modCity}&appid=${api_key}`)
    return req.then(response => response.data)
}

export default { getAll, getCountryData, getWeatherData }