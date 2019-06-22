import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TaskListContainer from './TaskList';

export const Dashboard = ({ groups }) => (
    <div>
         <h2>My Dashboard</h2>
        {groups.map(group => (
            <TaskListContainer key={group.id} id={group.id} name={group.name}/>
        ))}
    </div>
);

Dashboard.propTypes = {
  groups: PropTypes.array
};

function mapStateToProps(state) {
  return {
    groups: state.groups
  };
}

export default connect(mapStateToProps)(Dashboard);
