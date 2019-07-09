import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TaskListContainer from './TaskList';

export const Dashboard = ({ groups }) => (
    <div className="row">
        {groups.map(group => (
            <TaskListContainer
              key={group.id}
              id={group.id}
              className="column"
              name={group.name}/>
        ))}
    </div>
);

Dashboard.propTypes = {
  groups: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    groups: state.groups
  };
}

export default connect(mapStateToProps)(Dashboard);
