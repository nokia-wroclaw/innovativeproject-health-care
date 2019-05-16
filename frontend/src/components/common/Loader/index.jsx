import React from 'react';
import { Loader as SemanticLoader } from 'semantic-ui-react';

const Loader = () => {
  return (
    <SemanticLoader size='medium' active inline='centered'>
      Loading
    </SemanticLoader>
  );
};

export default Loader;
