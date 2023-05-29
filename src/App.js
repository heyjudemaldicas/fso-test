import { useState } from 'react';
import './App.css';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1, number: '09123456789' },
    { name: 'Ada Lovelace', number: '39445323523', id: 2 },
    { name: 'Dan Abramov', number: '1243234345', id: 3 },
    { name: 'Mary Poppendieck', number: '3236423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName.trim() === '' || number.trim() === '') return;

    let match = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    if (match) {
      alert(`${newName} is already added to the phonebook!`);
      setNewName('');
    }
    else {
      let newPerson = {
        id: persons.length + 1,
        name: newName,
        number: number
      };
      let list = [...persons]
      setPersons(list.concat(newPerson));
      setNewName('');
      setNumber('');
    }
  };

  const handleSearch = (event) => {
    let term = event.target.value;
    setSearchTerm(term);
  }

  const filtered = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
      <Persons filtered={filtered} />
    </div>
  );
}

export default App;