import React from 'react';

const Hello = () => (
  <h2>
    Hello World
  </h2>
  );


Hello.propTypes = {
  message: React.PropTypes.string,
};

export { Hello };
