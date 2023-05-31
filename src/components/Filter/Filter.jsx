import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';

export class Filter extends Component {
  handleFilterInput = e => {
    let value = e.currentTarget.value.toUpperCase();
    this.props.onFilterInput(value);
  };

  render() {
    const filterInputId = nanoid();
    return (
      <div className={css.filter}>
        <label className={css.label} htmlFor={filterInputId}>
          Find contacts by name
        </label>
        <input
          onChange={this.handleFilterInput}
          className={css.input}
          id={filterInputId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
    );
  }
}

Filter.propTypes = {
  onFilterInput: PropTypes.func.isRequired,
};
