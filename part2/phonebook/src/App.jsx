import { useState, useEffect } from 'react'
import axios from 'axios'
import bookService from './services/phonebook';


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

const Person = ({person, delFunc}) => {
  return (
    <>
      <p>{person.name} {person.number} <button onClick={delFunc}>delete</button></p>
      
    </>
  )
}

const Persons = ({personArry, delFunc}) => {
  return (
    <div>
      {personArry.map(person => <Person key={person.name} person={person} delFunc={() => delFunc(person)}/>)}
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
    bookService
      .getAll()
      .then(entries => setPersons(entries))
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}
    const waldo = persons.find(person => person.name === personObject.name)

    if (waldo) { //non unique
      const auth = window.confirm(`${newName} already added to phonebook, replace the old number with a new one?`)
      if (auth) {
        const editData = {number: newNumber}
        bookService
          .edit(waldo.id, editData)
          .then(resp => {
            setPersons(persons.map(p => p.id === waldo.id ? resp.data : p))
          })

      }
    } else { //add to book
      bookService
        .create(personObject)
        .then(returnedEntry => {
          setPersons(persons.concat(returnedEntry))
        
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const delBut = person => {
    const auth = window.confirm(`Delete ${person.name}?`)
    if (auth) {
      bookService
        .del(person.id)
        .then(() => {
          setPersons(persons.filter(delperson => delperson.id !== person.id))
        })
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
      <Persons personArry={filteredPersons} delFunc={delBut}/>
    </div>
  )
}

export default App