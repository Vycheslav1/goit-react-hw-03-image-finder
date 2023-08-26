import { Header, Form, Button, Span, Input } from './SearchbarStyles.js';

import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';

const inputId = nanoid();

const Searchbar = ({ valueSubmit }) => (
  <Header>
    <Form onSubmit={evt => valueSubmit(evt)}>
      <Button type="submit">
        <Span>Search</Span>
      </Button>

      <Input
        type="text"
        id={inputId}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </Form>
  </Header>
);

export { Searchbar };

Searchbar.propTypes = {
  valueSubmit: PropTypes.func.isRequired,
};
