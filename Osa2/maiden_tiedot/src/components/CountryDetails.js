import WeatherDetails from "./WeatherDetails"

// CountryDetails-component
const CountryDetails = ({country}) => {
    // RENDER
    return (
      <div>
        <h1>{country.name.common}</h1>
        <img src = {country.flags.png} alt="Country flag" width="150"/>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Population:</strong> {country.population}</p>
        <h3>Spoken languages:</h3>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        <h2>Weather in {country.capital}</h2>
        <WeatherDetails capital={country.capital} />
      </div>
    )
  }
  
  export default CountryDetails