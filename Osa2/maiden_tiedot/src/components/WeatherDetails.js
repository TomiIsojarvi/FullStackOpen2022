import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = /*process.env.REACT_APP_API_KEY*/ '592a45163d902716f06c20c1b9f53d29'

const WeatherDetails = ({ capital }) => {
    // HOOKS
    const [ weather, setWeather ] = useState([])
    const [ ready, setReady ] = useState(false);

    useEffect(() => {
        // Get the weather from the capital city
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeather(response.data)
                setReady(true)
            })
    }, [])

    // HELPER FUNCTIONS
    const kelvinToCelcius = temp => temp - 273.15

    // RENDER
    return (
        <div>
            {
                // Is the weather data ready?
                ready === true ?
                    // Yes
                    <div>
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt='Plaa plaa plaa' />
                        <p><strong>Temperature:</strong> {weather.main.temp} Celcius</p>
                        <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
                    </div>
                    :
                    // No
                    ""
            }
        </div>
    )
}

export default WeatherDetails