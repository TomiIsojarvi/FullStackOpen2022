import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

// App - component
const App = () => {

  // HOOKS
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // EVENT HANDLERS
  // handleNameChange - Handles the changes in the Name-input field.
  const handleNameChange = (event) => { setNewName(event.target.value) }

  // handleNumberChange - Handles the changes in the Number-input field.
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }

  // handleFilterChange - Handles the changes in the Filter-input field.
  const handleFilterChange = (event) => { setFilter(event.target.value) }

  // addPerson - Adds a new person into the phonebook.
  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    // Has the person already been added in the phonebook?
    const found = persons.find(person => person.name === newName)

    if (found) {
      // Yes. Person has been already added.
      alert(`${found.name} has been already added to phonebook.`)
      return
    }

    // No. Person has not been added. Let's add it:
    setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')
  }

  // RENDER
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterHandler={handleFilterChange} />
      <h2>Add new person</h2>
      <PersonForm
        addPerson={addPerson}
        name={newName}
        number={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )

}

export default App