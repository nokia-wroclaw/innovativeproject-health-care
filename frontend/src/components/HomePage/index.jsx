import React from "react";
import { Container } from "semantic-ui-react";
import TemplatePage from "../common/TemplatePage/";

const HomePage = () => {
  return (
    <TemplatePage>
      <Container textAlign="justified">
        <div className="flex-space-evenly" style={{ flexWrap: "wrap" }}>
          <div
            style={{
              paddingTop: 20,
              maxWidth: 700,
              fontSize: "0.9em",
              margin: "1em"
            }}
          >
            <p>
              Health-check is a clever way of measuring a team’s feelings: once
              a month, team members are asked to rate their satisfaction with
              certain areas, such as ‘Delivering value’ or ‘Teamwork’. Squad
              Health Care allows us to find problems when they are small and
              define proper solution.
              <br />
              Additionally we are engaging all employees to be active in
              organization improvement topic. It is a massive amount of people
              who are thinking about
              <br />
              <span style={{ fontWeight: "bold" }}>
                “What has to change to create better work environment?”.
              </span>
            </p>
          </div>
          <div>
            <i
              className="fa fa-users"
              aria-hidden="true"
              style={{
                fontSize: 150
              }}
            />
          </div>
        </div>
      </Container>
    </TemplatePage>
  );
};

export default HomePage;
