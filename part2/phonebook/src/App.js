import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [levelMessage, setLevelMessage] = useState(true)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const found = persons.some((person) => person.name === newName)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (!found) {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage(
          `Person ${returnedPerson.name} was added to server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).catch(error => {
        setErrorMessage(
          `${error.response.data.error}`
        )
        setLevelMessage(false)
        setTimeout(() => {
          setErrorMessage(null)
          setLevelMessage(true)
        }, 5000)
        console.log(error.response.data)
      })
    } else {
      const updatedObject = persons.filter((person) => person.name === newName)[0]
      const confirmUpdate = window.confirm(`${updatedObject.name} already added, replace?`)
      if (confirmUpdate) {
        personService.update(updatedObject.id, personObject).then((returnedPerson) => {
          setNewName('')
          setNewNumber('')
          personService.getAll().then((initialPersons) => {
            setPersons(initialPersons)
          })
          setErrorMessage(
            `Person ${updatedObject.name} updated`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
          .catch(() => {
            setErrorMessage(
            `Person ${updatedObject.name} already deleted`
            )
            setLevelMessage(false)
            setTimeout(() => {
              setErrorMessage(null)
              setLevelMessage(true)
            }, 5000)
            setPersons(persons.filter((person) => person.name !== newName))
          })
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(personsToShow)
    setNewFilter(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personRemove = (id) => {
    const person = persons.find((p) => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)
    if (confirmDelete) {
      personService.remove(id).then(() => {
        const filteredPersons = persons.filter((person) => person.id !== id)
        setPersons(filteredPersons)
        setErrorMessage(
            `Person ${person.name} deleted`
        )
        setLevelMessage(true)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
        .catch(() => {
          setErrorMessage(
            `Person ${person.name} already deleted`
          )
          setLevelMessage(false)
          setTimeout(() => {
            setErrorMessage(null)
            setLevelMessage(true)
          }, 5000)
          setPersons(persons.filter((person) => person.id !== id))
        })
    }
  }

  const personsToShow = newFilter
    ? persons.filter(
      (person) => person.name.toLowerCase().search(newFilter) !== -1
    )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} info = {levelMessage} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <p></p>
      <PersonForm
        onSubmit={addName}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} personRemove={personRemove} />
    </div>
  )
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter show with:
      <input value={value} onChange={onChange} />
    </div>
  )
}

const Persons = ({ persons, personRemove }) => {
  if (persons) {
    console.log(persons)
    return (
      <div>
        {persons.map((person, index) => (
          <p key={index}>{person.name} {person.number}
            <button onClick={() => personRemove(person.id)}>
          Delete
            </button>
          </p>
        ))}
      </div>
    )
  } else {
    console.log('Хуй')
    return <div></div>
  }
}

const PersonForm = ({
  onSubmit,
  name,
  number,
  onNameChange,
  onNumberChange
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default App
