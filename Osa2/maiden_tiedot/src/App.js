import { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import CountryDetails from "./components/CountryDetails"

function App() {
  // HOOKS
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  // EVENT HANDLERS
  // handleFilterChange - Handles the changes in the Filter-input field.
  const handleFilterChange = (event) => { setFilter(event.target.value) }

  // OTHER FUNCTIONS
  // Filter the data using regular expression
  const regex = new RegExp(filter, 'i');
  const filteredCountries = countries.filter(country => country.name.common.match(regex));

  // RENDER
  return (
    <div className="App">
      <Filter filter={filter} filterHandler={handleFilterChange} />
      <ul style={{ listStyleType: "none", padding: "0px" }}>
        {
          // Is there more than 10 results?
          filteredCountries.length > 10 ?
            // Yes
            <p>Too many matches, specify another filter</p> :
            // No
            // Is there more than one result?
            filteredCountries.length !== 1 ?
              // Yes
              filteredCountries.map(country =>
                <li key={country.name.common}>{country.name.common} <button onClick={() => setFilter(country.name.common)}>Show</button></li>) :
              // No
              <CountryDetails country={filteredCountries[0]} />
        }
      </ul>
    </div>
  )
}

export default App;
