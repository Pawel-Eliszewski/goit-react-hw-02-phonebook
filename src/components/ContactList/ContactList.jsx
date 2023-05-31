import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactList.module.css';

export class ContactList extends Component {
  deleteContact = id => {
    this.props.del(id);
  };

  createList = () => {
    return this.props.contacts.map(contact => {
      return (
        <li key={nanoid()} id={contact.id}>
          {`${contact.name}: ${contact.number}`}
          <button
            className={css.btn}
            onClick={() => this.deleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      );
    });
  };

  render() {
    return <ul>{this.createList()}</ul>;
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  del: PropTypes.func.isRequired,
};
