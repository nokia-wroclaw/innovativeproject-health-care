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
    <Card>
      <EditingCardHeader
        title={title}
        useUsersForm={useUsersForm}
        onlyEditors={onlyEditors}
        onAddBtnClick={onAddBtnClick}
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
