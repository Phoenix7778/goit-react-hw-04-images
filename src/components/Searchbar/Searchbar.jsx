import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import Notiflix from 'notiflix';

import {
  SearchForm,
  SearchFormInput,
  SearchFormButton,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setNameValue] = useState('');

  const handleInput = event => {
    setNameValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      Notiflix.Notify.failure('Please enter the word');
      return;
    }

    onSubmit(query);
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchFormInput
        name="query"
        value={query}
        onChange={handleInput}
        type="text"
        autoComplete="on"
        placeholder="Search images and photos"
      />
      <SearchFormButton type="submit">
        <FiSearch />
      </SearchFormButton>
    </SearchForm>
  );
};

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
