// Persons - component
const Persons = ({ persons, filter }) => {
  // Fiter the persons using regular expressions
  const regex = new RegExp(filter, 'i')
  const filteredPersons = persons.filter(person => person.name.match(regex))

  return <div>
    {filteredPersons.map(person =>
      <p key={person.name}>{person.name} {person.number}</p>)}
  </div>
}

export default Persons