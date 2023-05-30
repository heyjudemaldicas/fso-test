import { useState, useEffect } from 'react';
import './App.css';
import phonebookService from './services/phonebookService';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    phonebookService.fetchPersons().then(response => {
      setPersons(response);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName.trim() === '' || number.trim() === '') return;

    let match = persons.find(person => person.name?.toLowerCase() === newName.toLowerCase());
    if (match) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        phonebookService.updatePerson(match.id, { name: newName, number: number }).then(response => {
          setPersons(persons.map(person => person.id !== match.id ? person : response));
          setNewName('');
          setNumber('');
        })
      }
      else return null;
    }
    else {
      let newPerson = {
        name: newName,
        number: number
      };

      phonebookService.addPerson(newPerson).then(response => {
        setPersons([...persons, response]);
        setNewName('');
        setNumber('');
      });
    }
  };

  const handleSearch = (event) => {
    let term = event.target.value;
    setSearchTerm(term);
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService.deletePerson(id).then(response => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  }

  const filtered = persons.filter(person => person?.name?.toLowerCase().includes(searchTerm?.toLowerCase()));

  const handleAddName = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    setNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleAddName={handleAddName} number={number} handleNewNumber={handleNewNumber} handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons filtered={filtered} handleDelete={handleDelete} />
    </div>
  );
}

export default App;