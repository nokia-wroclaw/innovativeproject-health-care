import React from "react";
import { connect } from "react-redux";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import TableRow from './TableRow.jsx';
import './matrix.css';

const Matrix = ({ questions, teams }) => {
  return (
  <ScrollSync>
      <table style={{ width: 1100, borderCollapse: 'collapse' }}>

        <ScrollSyncPane group="horizontal">
          <thead className="matrixHeader">
            <tr>
            <th className=" cell cornerCell"/>
            <th className=" cell headerCell">
              <span className="headerSpan">
                Percentage result
              </span>
            </th>
            {questions.map(question => (
              <th key={question.id} className="cell headerCell">
                <span className="headerSpan">
                  {question.subject}
                </span>
              </th>
            ))}
            </tr>
          </thead>
        </ScrollSyncPane>

        <ScrollSyncPane group={["horizontal", "vertical"]}>
          <tbody className="matrixBody">
            {teams.map((team, i) => (
                <TableRow key={team.id} team={team} row={i}/>
            ))}
          </tbody>
        </ScrollSyncPane>

      </table>
  </ScrollSync>
);
};

const mapStateToProps = state => ({
  questions: state.results.tribeMatrix.questions || [],
  teams: state.results.tribeMatrix.teams || [],
});

export default connect(mapStateToProps)(Matrix);
