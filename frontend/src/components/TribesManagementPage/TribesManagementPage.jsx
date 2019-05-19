import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { Accordion, Container, Header, Item } from 'semantic-ui-react';
import { setTribes } from './../../store/actions/tribes';
import TemplatePage from '../common/TemplatePage/';
import TribeDetails from './TribeDetails';
import AddTribePopup from './AddTribePopup';

export const TribesManagementPage = props => {
  useLayoutEffect(() => {
    props.setTribes();
  }, []);

  const tribePanels = [
    ...props.tribes.map(tribe => {
      const details = <TribeDetails tribe={tribe} />;
      return {
        key: tribe.id,
        title: tribe.name,
        content: { content: details }
      };
    })
  ];

  return (
    <TemplatePage>
      <Container>
        <Item style={{ margin: '1em 0' }}>
          <AddTribePopup />
          <Header as='h3'>Your tribes</Header>
        </Item>
        <Accordion
          className='tribes-accordion'
          fluid
          styled
          panels={tribePanels}
          exclusive={false}
        />
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  tribes: state.tribes
});

export default connect(
  mapStateToProps,
  { setTribes }
)(TribesManagementPage);