import PropTypes from 'prop-types';

import { Li, Img } from './ImageGalleryItemStyles.js';

const ImageGalleryItem = ({ id, tags, webformatURL }) => (
  <Li key={id}>
    <Img src={webformatURL} alt={tags} />
  </Li>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};

export { ImageGalleryItem };
