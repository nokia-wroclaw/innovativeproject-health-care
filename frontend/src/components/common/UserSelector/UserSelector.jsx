import React, {useState} from 'react';
import {Search} from 'semantic-ui-react';
import {get} from 'lodash';
import {useDebouncedCallback} from 'use-debounce';
import { getUsersByName } from "../../../services/inputHints";

import styles from './UserSelector.module.scss';

export const UserSelector = ({selectedUser, onSelect}) => {
  const [query, setQuery] = useState(get(selectedUser, 'name'));
  const [searchResults, setSearchResults] = useState([]);

  const handleResultSelect = (_, {result}) => {
    onSelect(result);
    setQuery(result.title);
  };
  const handleSearchChange = async (_, {value}) => {
    setQuery(value);
    queryUsers(value);
  };
  const [queryUsers] = useDebouncedCallback(value => {
    if (value.length >= 4) {
      getUsersByName(value).then(({data}) => {
        setSearchResults(data.map(user => ({
          ...user,
          title: user.name,
          description: user.mail
        })));
      });
    }
  }, 500);


  return (
    <Search
      fluid
      className={styles.selector}
      value={query}
      results={searchResults}
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      minCharacters={4}
    />
  );
};
