import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { requestTaskCreation } from '../actions';

export const TaskList = ({
  tasks, name, groupID, createNewTask
}) => (
    <div className="card p-2 m-2">
      <h3>{name}</h3>
      <div>
          {tasks.map(task => (
            <Link key={task.id} to={`task/${task.id}`}>
              <div className="card p-2 mt-2">{task.name}</div>
            </Link>
          ))}
      </div>
      <button
        className="btn btn-primary ml-2"
        onClick={() => createNewTask(groupID)}>
        Add Task
      </button>
    </div>
);

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  groupID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createNewTask: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  groupID: ownProps.id,
  name: ownProps.name,
  tasks: state.tasks.filter(task => task.group === ownProps.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createNewTask(id) {
    console.log('Creating new task... ', id);
    dispatch(requestTaskCreation(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
