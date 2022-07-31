// Persons - component
const Persons = ({ persons, filter, removeHandler }) => {
  // Fiter the persons using regular expressions
  const regex = new RegExp(filter, 'i')
  const filteredPersons = persons.filter(person => person.name.match(regex))

  return <div>
    <ul>
      {filteredPersons.map(person =>
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => {removeHandler(person.id)}}>Delete</button>
        </li>)}
    </ul>
  </div>
}

export default Persons