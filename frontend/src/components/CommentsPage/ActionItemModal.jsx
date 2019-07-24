import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Modal, Input, TextArea, Form, Header, Button} from 'semantic-ui-react';
import {get, isEmpty} from 'lodash';
import { UserSelector } from "../common/UserSelector/UserSelector";

import styles from './ActionItemModal.module.scss';
import { addActionItem } from "../../store/actions/results";

export const ActionItemModalComponent = ({isOpen, close, addActionItem, answerId, teamId}) => {
  const [user, selectUser] = useState(null);
  const [userEditing, setUserEditing] = useState(true);
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const handleUserSelect = user => {
    selectUser(user);
    setUserEditing(false);
  };
  const onDescriptionChange = (_, {value}) => setDescription(value);
  const onUrlChange = (_, {value}) => setUrl(value);

  const handleSubmit = () => {
    addActionItem({
      user_id: user.id,
      answer_id: answerId,
      date: new Date(),
      message: description,
      url,
      team_id: teamId
    }, answerId);
    close();
  };

  const editUser = () => setUserEditing(true);

  const selectedUserControl = (
    <div>
      <a href="#" onClick={editUser}>{get(user, 'name')}</a>
      <Button basic className={styles.userControl} circular onClick={editUser} icon='pencil' />
    </div>
  );

  return (
    <Modal open={isOpen} onClose={close} size='mini'>
      <Modal.Header>Add action item</Modal.Header>
      <Modal.Content>
        <Modal.Description className={styles.form}>
          <Form>
            <Header as='h5'>Assignee</Header>
            {userEditing
              ? <UserSelector selectedUser={user} onSelect={handleUserSelect} />
              : selectedUserControl
            }

            <Header as='h5'>Description</Header>
            <TextArea onChange={onDescriptionChange} value={description} />
            <Header as='h5'>URL</Header>
            <Input fluid onChange={onUrlChange} value={url} />

          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button primary content='Save' onClick={handleSubmit} disabled={[user, description].some(isEmpty)} />
        <Button onClick={close} content='Cancel' />
      </Modal.Actions>
    </Modal>
  )
};

export const ActionItemModal = connect(null, {addActionItem})(ActionItemModalComponent);
