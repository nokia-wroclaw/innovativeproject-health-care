import React, { useEffect } from "react";
import {
  setEditors,
  addEditor,
  deleteEditor
} from "../../store/actions/editors";
import { connect } from "react-redux";
import EditingCard from "../common/EditingCard/EditingCard";
import { revalidateUser } from "../../services/auth"

export const EditorsSection = props => {
  useEffect(() => {
    props.setEditors();
  }, []);

  return (
    <EditingCard
      data={props.editors}
      title="Editors"
      useUsersForm={true}
      onAddBtnClick={u => revalidateUser(u, props.addEditor(u))}
      onItemDelete={u => revalidateUser(u, props.deleteEditor(u))}
    />
  );
};

const mapStateToProps = state => ({
  editors: state.editors
});

export default connect(
  mapStateToProps,
  { setEditors, addEditor, deleteEditor }
)(EditorsSection);
