import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { requestTaskCreation } from '../actions';

export const TaskList = ({
  tasks, name, groupID, createNewTask
}) => (
    <div>
      <h3>{name}</h3>
      <div>
          {tasks.map(task => (
            <Link key={task.id} to={`task/${task.id}`}>
              <div>{task.name}</div>
            </Link>
          ))}
      </div>
      <button onClick={() => createNewTask(groupID)}>Add Task</button>
    </div>
);

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  // id: PropTypes.number.isRequired,
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
