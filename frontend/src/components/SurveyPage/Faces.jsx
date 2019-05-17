import React from 'react';
import { Grid } from 'semantic-ui-react';

const Faces = () => {
  return (
    <Grid style={{ padding: 14 }}>
      <Grid.Column mobile={10} tablet={13} computer={13} />
      <Grid.Column mobile={6} tablet={3} computer={3}>
        <div className='flex-space-evenly'>
          <i className='fa fa-smile-o' aria-hidden='true' />
          <i className='fa fa-meh-o' aria-hidden='true' />
          <i className='fa fa-frown-o' aria-hidden='true' />
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default Faces;
