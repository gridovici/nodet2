import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

export const TaskDetail = ({
  id,
  groups,
  task,
  isComplete,
  setTaskCompletion
}) => (
    <div>
      <div>
        <input value={task.name}/>
      </div>
      <div>
        <button onClick={() => setTaskCompletion(id, !isComplete)}>{isComplete ? 'Reopen' : 'Mark as Completed'}</button>
      </div>
      <div>
        <select>
          {groups.map(group => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
      </div>
      <div>
        <Link to="/dashboard">
          <button>Done</button>
        </Link>
      </div>
    </div>
);

TaskDetail.propTypes = {
  task: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  groups: PropTypes.array.isRequired,
  isComplete: PropTypes.bool.isRequired,
  setTaskCompletion: PropTypes.func.isRequired
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

const mapDispatchToProps = (dispatch, ownProps) => {
  // const { id } = ownProps.match.params;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(actions.setTaskCompletion(id, isComplete));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
