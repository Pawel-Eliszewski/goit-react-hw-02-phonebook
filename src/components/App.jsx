import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleFormSubmit = input => {
    if (
      !this.state.contacts.map(contact => contact.name).includes(input.name)
    ) {
      this.setState(prev => ({
        contacts: [
          ...prev.contacts,
          { id: nanoid(), name: input.name, number: input.number },
        ],
      }));
    } else {
      alert(`${input.name} is already in contacts.`);
    }
  };

  setFilterToState = value => {
    this.setState({ ...this.state, filter: `${value}` });
  };

  filteredContacts = contacts => {
    let arr = contacts.filter(contact =>
      contact.name.toLocaleUpperCase().includes(this.state.filter)
    );
    return arr;
  };

  handleElementDelete = id => {
    this.setState(state => ({
      contacts: [...this.state.contacts].filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div className="main">
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={this.handleFormSubmit} />
        <h2>Contacts</h2>
        <Filter onFilterInput={this.setFilterToState} />
        <ContactList
          contacts={this.filteredContacts(this.state.contacts)}
          onContactDelete={this.handleElementDelete}
        />
      </div>
    );
  }
}
