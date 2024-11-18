import { useState, useEffect } from 'react'
import axios from 'axios'

function kvIn(arry, item) {
  let i = 0;
  do {
    const curCheck = arry[i]

    if (curCheck.name === item.name) {
      return true;
    }
    i++;
  } while (i<arry.length)
  return false;
}

const Filter = ({val, changeFunc}) => {
  return (
    <>
    filter shown with: <input 
        value = {val}
        onChange = {changeFunc}
      />
    </>
  )
}

const Form = ({onSub, val1, val1ch, val2, val2ch}) => {
  return (
  <>
  <form onSubmit={onSub}>
    <div>
      name: <input 
        value = {val1}
        onChange = {val1ch}
      />
    </div>
    <div>
      number: <input
        value = {val2}
        onChange = {val2ch}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  </>)
}

const Person = ({person}) => {
  return (
    <>
      <p>{person.name} {person.number}</p>
    </>
  )
}

const Persons = ({personArry}) => {
  return (
    <div>
      {personArry.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}
    const inPhonebook = kvIn(persons, personObject)
    
    if (inPhonebook) {
      alert(`${newName} already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  function filterFun(item) {
    const str1 = String(item.name).toLowerCase()
    const lowerFilter = String(newFilter).toLowerCase()
    return str1.includes(lowerFilter)
  }

  const filteredPersons = persons.filter(filterFun)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter val={newFilter} changeFunc={e => setNewFilter(e.target.value)}/>
      <h2>Add a new</h2>
      <Form onSub={addPerson} val1={newName} val1ch={e => setNewName(e.target.value)} val2={newNumber} val2ch={e => setNewNumber(e.target.value)} />
      <h2>Numbers</h2>
      <Persons personArry={filteredPersons} />
    </div>
  )
}

export default App