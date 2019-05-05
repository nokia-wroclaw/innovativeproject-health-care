import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Container } from "semantic-ui-react";

const PageNotFound = () => {
  return (
    <Container textAlign="center">
      <br />
      <Header as="h1">404 Page not found</Header>
      <p>
        It seems the page you're trying to visit doesn't exist or you don't have
        required permissions to access it.
      </p>
      <Link to="/">
        <Button primary>Go to main page</Button>
      </Link>
    </Container>
  );
};

export default PageNotFound;
