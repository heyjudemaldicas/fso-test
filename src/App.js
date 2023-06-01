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
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    phonebookService.fetchPersons().then(response => {
      setPersons(response);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    if (newName.trim() === '' || number.trim() === '') return;

    let match = persons.find(person => person.name?.toLowerCase() === newName.toLowerCase());
    if (match) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        phonebookService.updatePerson(match.id, { name: newName, number: number }).then(response => {
          setPersons(persons.map(person => person.id !== match.id ? person : response));
          setNewName('');
          setNumber('');
          setSuccessMessage(`${newName}'s mobile number has been updated.`);
        }).catch(error => {
          console.log(error);
          setSuccessMessage('');
          setErrorMessage(`Information of ${newName} has already been removed from the server.`);
        });
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
        setSuccessMessage(`Added ${newName}.`);
      });
    }
  };

  const handleSearch = (event) => {
    let term = event.target.value;
    setSearchTerm(term);
    setSuccessMessage('');
  }

  const handleDelete = (id, name) => {
    setErrorMessage('');
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService.deletePerson(id).then(response => {
        setPersons(persons.filter(person => person.id !== id));
      }).catch(error => {
        console.log(error);
        setSuccessMessage('');
        setErrorMessage(`Unexpected error. Check server.`);
      });
    }
  }

  const filtered = persons.filter(person => person?.name?.toLowerCase().includes(searchTerm?.toLowerCase()));

  const handleAddName = (event) => {
    setNewName(event.target.value);
    setSuccessMessage('');
  }

  const handleNewNumber = (event) => {
    setNumber(event.target.value);
    setSuccessMessage('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} successMessage={successMessage} errorMessage={errorMessage} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleAddName={handleAddName} number={number} handleNewNumber={handleNewNumber} handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons filtered={filtered} handleDelete={handleDelete} />
    </div>
  );
}

export default App;