import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setEditors,
  addEditor,
  deleteEditor
} from "../../store/actions/editors";
import { revalidateUser } from "../../store/actions/user";
import EditingCard from "../common/EditingCard/EditingCard";

export const EditorsSection = props => {
  useEffect(() => {
    props.setEditors();
  }, []);

  return (
    <EditingCard
      data={props.editors}
      title="Editors"
      useUsersForm={true}
      onAddBtnClick={u => props.revalidateUser(u, props.addEditor(u))}
      onItemDelete={u => props.revalidateUser(u, props.deleteEditor(u))}
    />
  );
};

const mapStateToProps = state => ({
  editors: state.editors
});

export default connect(
  mapStateToProps,
  { setEditors, addEditor, deleteEditor, revalidateUser }
)(EditorsSection);
