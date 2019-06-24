import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const TaskDetail = ({
  id,
  groups,
  task,
  isComplete
}) => (
    <div>
      <h2>{task.name}</h2>
      <button>{isComplete ? 'Reopen' : 'Mark as Completed'}</button>
      <select>
        {groups.map(group => (
          <option key={group.id} value={group.id}>{group.name}</option>
        ))}
      </select>
      <Link to="/dashboard">
        <button>Done</button>
      </Link>
    </div>
);

TaskDetail.propTypes = {
  task: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  groups: PropTypes.array.isRequired,
  isComplete: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const task = state.tasks.find(item => item.id === id);
  return {
    id,
    task,
    groups: state.groups,
    isComplete: task.isComplete
  };
};

export default connect(mapStateToProps)(TaskDetail);
