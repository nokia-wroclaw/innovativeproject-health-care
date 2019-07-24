import React, {useState} from 'react';
import {connect} from 'react-redux';
import { Button, Header, Icon, List } from "semantic-ui-react";
import {isEmpty} from 'lodash';

import styles from './ActionItems.module.scss';
import { ActionItemModal } from "./ActionItemModal";
import { removeActionItem } from "../../store/actions/results";
import { confirmDialog } from "../common/functions";

export const ActionItemsComponent = ({actionItems, answerId, teamId, removeActionItem}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleDelete = actionItem => () => {
    if (confirmDialog()) {
      removeActionItem(actionItem);
    }
  };

  return (
    <div className={styles.actionItems}>
      {!isEmpty(actionItems) && (
        <>
          <Header as='h4'>Action items</Header>
          <List divided relaxed>
            {actionItems.map(actionItem => (
              <List.Item key={actionItem.id}>
                <List.Icon name='mail forward' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header>Assignee: {actionItem.username}</List.Header>
                  <List.Description className={styles.item}>
                    {actionItem.message}
                    <Button negative circular icon='trash' size='mini' onClick={handleDelete(actionItem)} />

                  </List.Description>
                  {!isEmpty(actionItem.url) && <List.Header as='a' href={actionItem.url} target='_blank'>{actionItem.url}</List.Header>}
                </List.Content>
              </List.Item>
            ))}
          </List>
        </>
      )}
      <Button basic icon labelPosition='right' onClick={openModal}>
        Add action item
        <Icon name='plus' />
      </Button>
      <ActionItemModal close={closeModal} isOpen={isModalOpen} answerId={answerId} teamId={teamId} />
    </div>
  )
};

export const ActionItems = connect(null, {removeActionItem})(ActionItemsComponent);
