import React from "react";
import { Card } from "semantic-ui-react";
import EditingCardHeader from "./EditingCardHeader";
import EditingCardContent from "./EditingCardContent";

const EditingCard = ({
  data,
  title,
  useUsersForm,
  onlyEditors,
  onAddBtnClick,
  onItemDelete,
  alertMsg
}) => {
  return (
    <Card style={{ margin: "10px" }} className="editing-card">
      <EditingCardHeader
        title={title}
        useUsersForm={useUsersForm}
        onlyEditors={onlyEditors}
        onAddBtnClick={onAddBtnClick}
        className="editing-card-header"
      />
      {data.map((item, i) => (
        <EditingCardContent
          key={i}
          item={item}
          onDelete={onItemDelete}
          alertMsg={alertMsg}
        />
      ))}
    </Card>
  );
};

export default EditingCard;
