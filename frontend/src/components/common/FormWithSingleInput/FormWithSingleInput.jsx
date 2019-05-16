import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'semantic-ui-react';

const FormWithSingleInput = ({ buttonText, handleClick }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{ inputValue: '' }}
      validate={values => {
        let errors = {};
        if (!values.inputValue) errors.inputValue = 'Tribe name required';
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setLoading(true);
        handleClick(values.inputValue).then(() => {
          setLoading(false);
          setSubmitting(false);
        });
      }}
    >
      {({ errors, handleChange, handleSubmit, isSubmiting }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Form.Input
              type='text'
              action
              onChange={handleChange}
              name='inputValue'
              placeholder='Name...'
              disabled={isSubmiting}
              error={!!errors.inputValue}
            >
              <input />

              <Button
                type='submit'
                color='violet'
                disabled={isSubmiting}
                loading={loading}
              >
                {buttonText}
              </Button>
            </Form.Input>
          </Form.Field>
        </Form>
      )}
    </Formik>
  );
};

export default FormWithSingleInput;
