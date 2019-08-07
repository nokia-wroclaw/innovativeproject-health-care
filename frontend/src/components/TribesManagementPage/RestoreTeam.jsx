import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { Modal, Button, Container, Segment, Message, SegmentGroup } from "semantic-ui-react";
import {
    addTeamToTribe,
  } from "../../store/actions/tribes";
import {
  restoreTeamToTribe
  } from "../../store/actions/teams";
import "../../styles/common.css";

const RestoreTeam = ({ isOpen, tribe, teamName, close, ...props }) => {
    const deletedTeams = tribe.teams.filter(team => team.deleted === true);
    const [selectedTeam, selectTeam] = useState(null);
    const [hovered, setHovered] = useState(null);

    const handleAddNewTeam = async () => {
      await props.addTeamToTribe(tribe, teamName);
      close();
    }

    const handleRestoreTeam = async (team) => {
      if (selectedTeam) {
        await props.restoreTeamToTribe(team);
        close();
      }
    }

    const handleSelectTeam = team => 
      selectTeam(team);

    const handleSetHovered = team => 
      setHovered(team);

    return(
      <Modal open={isOpen} onClose={close}>
        <Modal.Content>
          <Message>
            <Message.Header>
            Team with this name was created in the past. You can restore any team from the list or create a new one.
            </Message.Header>
          </Message>
          <Segment.Group>
          {deletedTeams
            ? deletedTeams.filter(team => team.name === teamName).map(team => (
              <SegmentGroup 
                horizontal
                key={team.id}
                onClick={() => handleSelectTeam(team)} 
                onMouseEnter={() => handleSetHovered(team)} 
                onMouseLeave={() => handleSetHovered(null)}
                className={(hovered === team ? " hovered" : "") + (selectedTeam === team ? " clicked" : "")}
              >
                <Segment>{team.name}</Segment>
                <Segment>{team.deleted_at}</Segment>
              </SegmentGroup>
              ))
            : null}
          </Segment.Group>
          <Container className="buttonsContainer">
            <Button floated="left" onClick={() => handleRestoreTeam(selectedTeam)}>
              Restore
            </Button>
            <Button floated="right" onClick={handleAddNewTeam}>
              Add new
            </Button>
          </Container>
        </Modal.Content>
      </Modal>
    )
};

export default connect(
  null,
  {
    addTeamToTribe,
    restoreTeamToTribe
  }
)(RestoreTeam);