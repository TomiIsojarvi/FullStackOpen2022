import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

// App - component
const App = () => {

  // HOOKS
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [noteMessage, setNoteMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

    // Has the user gave a name and a number?
    // No?
    if (newName === '' || newNumber === '') {
      setError(true)
      // Show the notification for 5 seconds
      setNoteMessage('Please give a name and a number.')
      setTimeout(() => {
        setNoteMessage(null)
      }, 5000)
      return
    }

    // Has the person already been added in the phonebook?
    const found = persons.find(person => person.name === newName)

    if (found) {
      // Yes. Person has been already added.
      if (window.confirm(`${newName} has been already added to the phonebook, replace the old number with a new one?`) === true) {

        // Update the number
        personService
          .update(found.id, personObject)
          .then(response => {
            // Map a new array with the changed number
            const newArray = persons.map(person => person.id === found.id ?
              { ...person, number: newNumber } : person)
            setPersons(newArray)
            setError(false)   // Set notification as non-error

            // Show the notification for 5 seconds
            setNoteMessage(`Changed the number for ${response.name}`)
            setTimeout(() => {
              setNoteMessage(null)
            }, 5000)

            // Update
            setNewName('')
            setNewNumber('')
          })
          // Error
          .catch(error => {
            // Set notification as an error
            setError(true)

            // User ID not found?
            if (error.response.status === 404) {
              // Show notification for 5 secoonds
              setNoteMessage(
                `Information of ${newName} has already been removed from the server`
              )
              setTimeout(() => {
                setNoteMessage(null)
              }, 5000)

              // Update
              setPersons(persons.filter(n => n.id !== found.id))

            // Validation error?
            } else {
              // Show notification for 5 secoonds
              setNoteMessage(error.response.data.error)
              setTimeout(() => {
                setNoteMessage(null)
              }, 5000)
            }
          })
      }
      return
    }

    // No. Person has not been added. Let's add it:
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))

        setError(false)
        // Show notification for 5 secoonds
        setNoteMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNoteMessage(null)
        }, 5000)

        setNewName('')
        setNewNumber('')
      })
      // Validation error
      .catch(error => {
        // Set notification as an error
        setError(true)
        // Show notification for 5 secoonds
        setNoteMessage(error.response.data.error)
        setTimeout(() => {
          setNoteMessage(null)
        }, 5000)
      })
  }

  // removePerson - Removes a person from the phonebook
  const removePerson = (id) => {
    // find the name of the person using id
    const name = persons.find(person => person.id === id).name

    // Confirm deletion:
    if (window.confirm(`Delete ${name}?`) === true) {
      // Delete the person
      personService
        .remove(id)
        .then(() => {
          // Filter a new array without the deleted user
          const newArray = persons.filter(person => person.id !== id)
          // Update
          setPersons(newArray)
          setError(false)   // Set notification as non-error
          // Show notification for 5 secoonds
          setNoteMessage(`Deleted ${name}`)
          setTimeout(() => {
            setNoteMessage(null)
          }, 5000)
        })
    }
  }

  // RENDER
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={noteMessage} error={error} />
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
      <Persons persons={persons} filter={filter} removeHandler={removePerson} />
    </div>
  )

}

export default App