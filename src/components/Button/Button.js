import PropTypes from 'prop-types';

import { Load, ButtonWrapper } from './ButtonStyles.js';

const Button = ({ changePage }) => (
  <ButtonWrapper>
    <Load type="button" onClick={evt => changePage()}>
      Load more
    </Load>
  </ButtonWrapper>
);
export { Button };

Button.propTypes = {
  changePage: PropTypes.func.isRequired,
};
