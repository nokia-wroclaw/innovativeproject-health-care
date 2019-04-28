import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Button, Form } from "semantic-ui-react";
import { addTribe } from "../../store/actions/tribes";

export const AddTribeForm = props => {
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{ tribeName: "" }}
      validate={values => {
        let errors = {};
        if (!values.tribeName) errors.tribeName = "Tribe name required";
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setLoading(true);
        props.addTribe(values.tribeName).then(() => {
          setLoading(false);
          setSubmitting(false);
        });
      }}
    >
      {({ errors, handleChange, handleSubmit, isSubmiting }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Form.Input
              onChange={handleChange}
              name="tribeName"
              placeholder="Tribe name"
              disabled={isSubmiting}
              error={!!errors.tribeName}
            />
          </Form.Field>

          <Button
            type="submit"
            floated="right"
            color="green"
            disabled={isSubmiting}
            loading={loading}
          >
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default connect(
  null,
  { addTribe }
)(AddTribeForm);
