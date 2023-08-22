import PropTypes from 'prop-types';

import { Overlay, Backdrop, Img } from './ModalStyles.js';

const Modal = ({ hideModal, largeImageURL, title }) => (
  <Overlay onClick={e => hideModal()}>
    <Backdrop>
      <Img src={largeImageURL} alt={title} />
    </Backdrop>
  </Overlay>
);
export { Modal };

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};
