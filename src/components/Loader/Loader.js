import { Audio } from 'react-loader-spinner';

import { LoaderWrapper } from './LoaderStyles.js';

const Loader = () => (
  <LoaderWrapper>
    <Audio
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
    />
  </LoaderWrapper>
);

export { Loader };
