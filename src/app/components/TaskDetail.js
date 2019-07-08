import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

export const TaskDetail = ({
  id,
  groups,
  task,
  comments,
  isComplete,
  setTaskCompletion,
  setTaskGroup,
  setTaskName
}) => (
    <div>
      <div>
        <input value={task.name} onChange={setTaskName}/>
      </div>
      <div>
        <button onClick={() => setTaskCompletion(id, !isComplete)}>{isComplete ? 'Reopen' : 'Mark as Completed'}</button>
      </div>
      <div>
        <select onChange={setTaskGroup} value={task.group}>
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
      <div>
        {comments.map((comment, index) => (
          <div key={comment.id}>
          <div>Comment {index + 1}:</div>
          <div >{comment.content}</div>
          </div>))}
      </div>
    </div>
);

TaskDetail.propTypes = {
  task: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  groups: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  isComplete: PropTypes.bool.isRequired,
  setTaskCompletion: PropTypes.func.isRequired,
  setTaskName: PropTypes.func.isRequired,
  setTaskGroup: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const task = state.tasks.find(item => item.id === id);
  const comments = state.comments.filter(item => item.task === id);

  return {
    id,
    task,
    comments,
    groups: state.groups,
    isComplete: task.isComplete
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(actions.setTaskCompletion(id, isComplete));
    },
    setTaskGroup(e) {
      dispatch(actions.setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispatch(actions.setTaskName(id, e.target.value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
