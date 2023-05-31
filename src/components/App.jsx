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
    let contactsArr = [];
    contactsArr = this.state.contacts.map(contact => contact.name);
    if (!contactsArr.includes(input.name)) {
      let updatedContactsArr = [];
      updatedContactsArr = [
        ...this.state.contacts,
        { id: nanoid(), name: input.name, number: input.number },
      ];
      return this.setState({ ...this.state, contacts: updatedContactsArr });
    } else {
      alert(`${input.name} is already in contacts.`);
    }
  };

  setFilterToState = value => {
    this.setState({ ...this.state, filter: `${value}` });
  };

  filteredContacts = contacts => {
    let filteredContactsArr = contacts.filter(contact =>
      contact.name.toUpperCase().includes(this.state.filter)
    );
    return filteredContactsArr;
  };

  elementDelete = (contacts, id) => {
    let contactsArr = contacts.filter(contact => contact.id !== id);
    return contactsArr;
  };

  deleteContactFromArr = id => {
    let contactsArrAfterDel = this.elementDelete(this.state.contacts, id);
    this.setState({
      ...this.state,
      contacts: [...contactsArrAfterDel],
    });
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
          del={this.deleteContactFromArr}
        />
      </div>
    );
  }
}
